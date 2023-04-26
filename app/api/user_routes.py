from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>',methods=['PUT'])
@login_required
def user_update(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return jsonify({"message":"User not found","statuscode":404}),404
    if user.company_id != current_user.company_id or id != current_user.id and not current_user.admin:

    # if id != current_user.id and not current_user.admin:
        return jsonify({"message":"forbidden","statuscode":404}),404
    user_data = request.get_json()
    user.first_name = user_data.get('first_name',user.first_name)
    user.last_name = user_data.get('last_name',user.last_name)
    user.phone = user_data.get('phone',user.phone)
    db.session.commit()

    return jsonify(user.to_dict())

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
