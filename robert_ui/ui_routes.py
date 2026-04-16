from flask import Blueprint, render_template, request, redirect, url_for, flash

# This file is my "UI controller" layer:
# - It handles browser routes like /clubs
# - It calls api_client.py to fetch data from the backend
# - Then it renders the HTML templates with that data
#
# Ifunaya's current Node backend only supports:
#   GET http://localhost:3000/clubs/search?category=...
#
# So for now, the clubs page is category-based.
from services.api_client import get_clubs, get_club_by_id, create_join_request

# Blueprint keeps things organized (instead of putting all routes in app.py)
ui = Blueprint("ui", __name__)


@ui.get("/")
def home():
    """
    Simple redirect:
    If someone visits the root URL (/), send them to the clubs page.
    """
    return redirect(url_for("ui.clubs_page"))


@ui.get("/clubs")
def clubs_page():
    """
    Clubs Directory Page (Explore)

    What this does:
    1) Reads inputs from the URL query string (right now: category)
    2) Calls the backend through api_client.py
    3) Renders the Explore page template with the results

    CURRENT LIMITATION:
    - The backend only supports category search (no "search" keyword yet)
      via GET /clubs/search?category=...
    """
    # Backend expects "category" (technology/music/community)
    category = request.args.get("category", "").strip()

    try:
        # Calls get_clubs(category=...) which hits /clubs/search on Node backend
        clubs = get_clubs(category=category)

        return render_template(
            "clubs.html",
            clubs=clubs,
            category=category,
            error=None
        )

    except Exception as e:
        # If backend is down or category is missing, we show the page with an error message
        return render_template(
            "clubs.html",
            clubs=[],
            category=category,
            error=str(e)
        )


@ui.get("/clubs/<int:club_id>")
def club_details_page(club_id: int):
    """
    Club Details Page

    NOTE:
    - The Node backend does NOT have GET /clubs/<id> yet.
    - So api_client.get_club_by_id() will raise NotImplementedError until that endpoint exists.
    """
    try:
        club = get_club_by_id(club_id)
        return render_template("club_details.html", club=club, error=None)
    except Exception as e:
        return render_template("club_details.html", club=None, error=str(e))


@ui.post("/clubs/<int:club_id>/join")
def join_club(club_id: int):
    """
    Join Request Action

    Intended behavior:
    - User clicks "Request to Join" on the details page
    - We send that request to the backend
    - Show a success/fail message
    - Redirect back to the details page so refresh doesn't re-submit the form

    NOTE:
    - The Node backend does NOT have POST /clubs/<id>/join-requests yet.
    - So api_client.create_join_request() will raise NotImplementedError until that endpoint exists.
    """
    message = request.form.get("message", "").strip()

    try:
        create_join_request(club_id, message=message)
        flash("Join request sent! Status: Pending")
    except Exception as e:
        flash(f"Join request failed: {e}")

    return redirect(url_for("ui.club_details_page", club_id=club_id))
