from flask import Blueprint, render_template, request, redirect, url_for, flash

# Bridge to backend endpoints (Node/Express via api_client.py)
from services.api_client import get_clubs, get_club_by_id, create_join_request

ui = Blueprint("ui", __name__)

@ui.get("/")
def home():
    return redirect(url_for("ui.clubs_page"))

@ui.get("/clubs")
def clubs_page():
    """
    Clubs directory page.
    CURRENT BACKEND SUPPORT:
    - GET /clubs/search?category=...
    """
    # The current backend only supports searching by category.
    category = request.args.get("category", "").strip()

    try:
        clubs = get_clubs(category=category)
        return render_template(
            "clubs.html",
            clubs=clubs,
            category=category,
            error=None
        )
    except Exception as e:
        return render_template(
            "clubs.html",
            clubs=[],
            category=category,
            error=str(e)
        )

@ui.get("/clubs/<int:club_id>")
def club_details_page(club_id: int):
    """
    Club details page.
    NOTE: Backend endpoint GET /clubs/<id> is not implemented yet,
    so this will raise NotImplementedError until added.
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
    NOTE: Backend join endpoint is not implemented yet,
    so this will raise NotImplementedError until added.
    """
    message = request.form.get("message", "").strip()

    try:
        create_join_request(club_id, message=message)
        flash("Join request sent! Status: Pending")
    except Exception as e:
        flash(f"Join request failed: {e}")

    return redirect(url_for("ui.club_details_page", club_id=club_id))
