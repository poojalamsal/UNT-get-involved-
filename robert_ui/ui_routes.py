from flask import Blueprint, render_template, request, redirect, url_for, flash

# These functions are my “bridge” to Ifunaya’s backend endpoints
from services.api_client import get_clubs, get_club_by_id, create_join_request

# Blueprint keeps routes organized instead of dumping everything into app.py
ui = Blueprint("ui", __name__)

@ui.get("/")
def home():
    """
    Small convenience: going to / just sends you to the clubs directory page.
    """
    return redirect(url_for("ui.clubs_page"))

@ui.get("/clubs")
def clubs_page():
    """
    PAGE 1 (Pooja’s UI): Clubs directory page.

    What I do here:
    - read search + category from the URL query string
    - call the backend (GET /api/clubs)
    - render clubs.html with the list of clubs

    NEEDS FROM OTHERS:
    - Ifunaya: confirm endpoint + JSON fields (id, name, description, etc.)
    - Pooja: final HTML/CSS for templates/clubs.html (I’ll plug the data into her layout)
    """
    search = request.args.get("search", "").strip()
    category = request.args.get("category", "").strip()

    try:
        clubs = get_clubs(search=search, category=category)
        return render_template(
            "clubs.html",
            clubs=clubs,
            search=search,
            category=category,
            error=None
        )
    except Exception as e:
        # If backend is down, at least the page still loads with an error message
        return render_template(
            "clubs.html",
            clubs=[],
            search=search,
            category=category,
            error=str(e)
        )

@ui.get("/clubs/<int:club_id>")
def club_details_page(club_id: int):
    """
    PAGE 2 (Pooja’s UI): Club details page.

    What I do here:
    - use club_id from the URL
    - call the backend (GET /api/clubs/<id>)
    - render club_details.html with that club’s info
    """
    try:
        club = get_club_by_id(club_id)
        return render_template("club_details.html", club=club, error=None)
    except Exception as e:
        return render_template("club_details.html", club=None, error=str(e))

@ui.post("/clubs/<int:club_id>/join")
def join_club(club_id: int):
    """
    Join request action.

    What happens:
    - user submits a small form on the club details page
    - I forward it to the backend (POST /api/clubs/<id>/join-requests)
    - show a flash message (success/fail)
    - redirect back to the club page (prevents double-submit on refresh)

    OPTIONAL:
    - If Aahi makes login required, I’ll add auth headers in api_client.py
    """
    message = request.form.get("message", "").strip()

    try:
        create_join_request(club_id, message=message)
        flash("Join request sent! Status: Pending")
    except Exception as e:
        flash(f"Join request failed: {e}")

    return redirect(url_for("ui.club_details_page", club_id=club_id))
