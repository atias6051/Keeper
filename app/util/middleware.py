from flask import request, abort
from flask_login import current_user

def admin_only(func):
    def wrapper(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.admin:
            error_message = "Only admin allowed to access this action."
            return abort(403, description=error_message)
        return func(*args, **kwargs)
    return wrapper
