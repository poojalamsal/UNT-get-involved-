"""
api_client.py
-------------
This file is the "one place" where the frontend talks to the backend.

Why we keep this separate:
- ui_routes.py stays clean (no messy requests.get/post everywhere)
- if the backend URL changes, we update it once here
- error handling stays consistent across the app

CURRENT BACKEND REALITY (Node/Express):
- Server runs on: http://localhost:3000
- Clubs route available right now:
    GET /clubs/search?category=technology

NOT IMPLEMENTED YET (placeholders for later):
- GET /clubs/<id>
- POST /clubs/<id>/join-requests
"""

import os
import requests

# Node backend is running on port 3000 (from backend/server.js)
# No "/api" prefix is used in that server setup.
API_BASE = os.getenv("API_BASE", "http://localhost:3000")


def _auth_headers():
    """
    OPTIONAL (Aashi):
    If the team decides to protect endpoints with login later,
    we'll attach auth here (token/cookie/etc.).

    For now, the backend routes we have are open, so we return {}.
    """
    return {}


def _raise_for_status(resp: requests.Response):
    """
    Turn backend errors into something readable.

    If the backend sends JSON like {"message": "..."},
    we surface that message so the UI can display it.
    """
    try:
        resp.raise_for_status()
    except requests.HTTPError:
        content_type = resp.headers.get("content-type", "")
        if "application/json" in content_type:
            data = resp.json()
            raise Exception(data.get("message") or str(data))
        raise


def get_clubs(category: str = ""):
    """
    Clubs list/search call (THIS ONE ACTUALLY WORKS RIGHT NOW).

    Calls:
      GET /clubs/search?category=...

    Returns:
      [
        {"id": 1, "name": "Coding Club", "category": "technology"},
        ...
      ]

    NOTE:
    - The backend currently filters by category only.
    - If category is blank, backend may return empty or error depending on implementation.
    """
    resp = requests.get(
        f"{API_BASE}/clubs/search",
        params={"category": category},
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()


# -------------------------------------------------------------------
# PLACEHOLDERS FOR "FINAL API INTEGRATION"
# These routes do NOT exist in the Node backend yet.
# Keep these functions so we can complete the feature later
# once the backend team adds the endpoints.
# -------------------------------------------------------------------

def get_club_by_id(club_id: int):
    """
    TODO:
    Needs backend route:
      GET /clubs/<id>

    Right now, this is not implemented in backend/genreSearch.js,
    so we raise NotImplementedError to make it obvious during testing.
    """
    raise NotImplementedError("Backend does not support GET /clubs/<id> yet.")


def create_join_request(club_id: int, message: str = ""):
    """
    TODO:
    Needs backend route:
      POST /clubs/<id>/join-requests

    Right now, join requests do not exist in the Node backend,
    so we raise NotImplementedError until it's added.
    """
    raise NotImplementedError("Backend does not support join requests yet.")
