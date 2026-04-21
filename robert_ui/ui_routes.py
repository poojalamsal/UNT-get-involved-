from flask import Blueprint, render_template, request, redirect, url_for, flash

# UI Controller layer:
# - Handles browser routes like /clubs and /clubs/<id>
# - Calls api_client.py to talk to the Node backend (localhost:3000)
# - Renders templates with the JSON data returned by the backend
#
# Current backend routes supported:
#   GET  /clubs
#   GET  /clubs/search?category=...
#   GET  /clubs/:id
#   POST /clubs/:id/join-requests
from services.api_client import get_clubs, get_club_by_id, create_join_request

ui = Blueprint("ui", __name__)


@ui.get("/")
def home():
    """Redirect home to the clubs page."""
    return redirect(url_for("ui.clubs_page"))


@ui.get("/clubs")
def clubs_page():
    """
    Explore / Clubs Directory page.

    Behavior:
    - If category is provided -> show filtered results (GET /clubs/search?category=...)
    - If category is empty -> show all clubs (GET /clubs)
    """
    category = request.args.get("category", "").strip()

    try:
        clubs = get_clubs(category=category)
        return render_template("clubs.html", clubs=clubs, category=category, error=None)
    except Exception as e:
        return render_template("clubs.html", clubs=[], category=category, error=str(e))


@ui.get("/clubs/<int:club_id>")
def club_details_page(club_id: int):
    """
    Club Details page (GET /clubs/:id).
    """
    try:
        club = get_club_by_id(club_id)
        return render_template("club_details.html", club=club, error=None)
    except Exception as e:
        return render_template("club_details.html", club=None, error=str(e))


@ui.post("/clubs/<int:club_id>/join")
def join_club(club_id: int):
    """
    Join Request action:
    - Takes optional message from form
    - Sends POST to backend /clubs/:id/join-requests
    - Shows success/fail message and redirects back to details page
    """
    message = request.form.get("message", "").strip()

    try:
        create_join_request(club_id, message=message)
        flash("Join request sent! Status: pending")
    except Exception as e:
        flash(f"Join request failed: {e}")

    return redirect(url_for("ui.club_details_page", club_id=club_id))
