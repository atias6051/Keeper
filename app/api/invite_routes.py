from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user, login_user
from sqlalchemy import desc
from app.models import User, Company, Service, UserInvite, db

from ..forms.user_invite_form import UserInviteForm
from ..forms.singup_invite_form import SignUpInviteForm

invite_routes = Blueprint('invites',__name__)


@invite_routes.route('/check',methods=['POST'])
def tester_route():
    invite_data = request.get_json()
    invite = UserInvite.query.filter(UserInvite.email == invite_data.get('email')).first()
    if not invite:
        return jsonify({"message":"error no invite to this email"}),404
    if not invite.active:
        return jsonify({"message":"Invite is inactive"}),404
    if invite.check_key(invite_data.get('key')):
        return jsonify(invite.to_dict())
    return jsonify("invalid"),404

@invite_routes.route('')
@login_required
def get_invites():
    res = UserInvite.query.filter(UserInvite.company_id == current_user.company_id).order_by(desc(UserInvite.active)).all()
    return jsonify([invite.to_dict() for invite in res])

@invite_routes.route('',methods=['POST'])
@login_required
def create_invite():
    form = UserInviteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_invite = UserInvite(
            email = form.email.data,
            company_id = current_user.company_id,
            key = form.key.data,
            first_name = form.first_name.data,
            last_name = form.last_name.data
        )
        db.session.add(new_invite)
        db.session.commit()
        return jsonify(new_invite.to_dict())
    return jsonify({'errors': form.errors})

@invite_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_invite(id):
    invite = UserInvite.query.get(int(id))
    if not invite:
        return jsonify({"message":"Invite not found","statuscode":404}),404
    if invite.company_id != current_user.company_id:
        return jsonify({"message":"Invite is not in your company data","statuscode":404}),404
    db.session.delete(invite)
    db.session.commit()
    return jsonify({
            "message": "Successfully deleted",
            "statusCode": 200
        }), 200

@invite_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_invite(id):
    invite = UserInvite.query.get(int(id))
    if not invite:
        return jsonify({"message":"Invite not found","statuscode":404}),404
    if invite.company_id != current_user.company_id:
        return jsonify({"message":"Invite is not in your company data","statuscode":404}),404
    invite_data = request.get_json()
    invite.email = invite_data.get('email', invite.email)
    invite.key = invite_data.get('key', invite.key)
    invite.active = invite_data.get('active', invite.active)
    invite.first_name = invite_data.get('first_name', invite.first_name)
    invite.last_name = invite_data.get('last_name', invite.last_name)
    db.session.commit()
    return jsonify(invite.to_dict())

@invite_routes.route('/signup',methods=['POST'])
def invite_signup():
    form = SignUpInviteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user = User(
            first_name = form.first_name.data,
            last_name = form.last_name.data,
            email = form.email.data,
            password = form.password.data,
            phone = form.phone.data,
            admin = False,
            company_id = form.company_id.data
        )

        db.session.add(user)

        invite = UserInvite.query.get(int(form.invite_id.data))
        invite.active = False

        db.session.add(invite)
        db.session.commit()

        user_login = User.query.filter(User.email == form.data['email']).first()
        login_user(user_login)
        return jsonify(user_login.to_dict())
    return jsonify({'errors': form.errors})
