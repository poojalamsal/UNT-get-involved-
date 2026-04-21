"""
api_client.py
-------------
This file is the "one place" where the frontend talks to the backend.

Why we keep this separate:
- ui_routes.py stays clean (no messy requests.get/post everywhere)
- if the backend URL changes, we update it once here
- error handling stays consistent across the app

CURRENT BACKEND (Node/Express):
- Server runs on: http://localhost:3000
- Clubs route available now:
    GET /clubs/search?category=technology

NOT IMPLEMENTED YET (placeholders):
- GET /clubs/<id>
- POST /clubs/<id>/join-requests
"""

import os
import requests

# Node backend is running on port 3000 (backend/server.js)
API_BASE = os.getenv("API_BASE", "http://localhost:3000")


def _auth_headers():
    """
    OPTIONAL (Aashi):
    If endpoints require login later, attach auth here.
    For now, return empty dict.
    """
    return {}


def _raise_for_status(resp: requests.Response):
    """Make backend errors readable in the UI."""
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
    WORKING ENDPOINT:
      GET /clubs/search?category=...

    Returns:
      [{"id": 1, "name": "...", "category": "..."}, ...]
    """
    resp = requests.get(
        f"{API_BASE}/clubs/search",
        params={"category": category},
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()


# -----------------------------
# Not implemented in backend yet
# -----------------------------

def get_club_by_id(club_id: int):
    raise NotImplementedError("Backend does not support GET /clubs/<id> yet.")


def create_join_request(club_id: int, message: str = ""):
    raise NotImplementedError("Backend does not support join requests yet.")
