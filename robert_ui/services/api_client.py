"""
API client = one place where the frontend talks to the backend.

I’m doing it this way so:
- routes don’t get messy with requests.get/post everywhere
- if the backend URL changes, we update it once
- error handling stays consistent
"""

import os
import requests

# Backend is Node/Express on port 3000 (server.js). No "/api" prefix.
API_BASE = os.getenv("API_BASE", "http://localhost:3000")

def _auth_headers():
    """
    OPTIONAL (Aashi):
    If endpoints require login later, attach auth here.
    For now, it returns an empty dict so the calls still work in dev.
    """
    return {}

def _raise_for_status(resp: requests.Response):
    """
    If the backend returns an error, this tries to show a readable message
    (especially if the backend returns JSON like {"message": "..."}).
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
    Backend call (CURRENTLY IMPLEMENTED):
    GET /clubs/search?category=...
    Returns a list of clubs (JSON).
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
# PLACEHOLDERS (not implemented in the Node backend yet)
# These will be completed once routes exist in backend (Ifunaya/team).
# -------------------------------------------------------------------

def get_club_by_id(club_id: int):
    """
    TODO: Needs backend endpoint GET /clubs/<id>
    """
    raise NotImplementedError("Backend does not support GET /clubs/<id> yet.")

def create_join_request(club_id: int, message: str = ""):
    """
    TODO: Needs backend endpoint POST /clubs/<id>/join-requests
    """
    raise NotImplementedError("Backend does not support join requests yet.")
