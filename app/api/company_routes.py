from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Company, db

company_routes = Blueprint('company', __name__)

@company_routes.route('')
@login_required
def get_company():
    res = Company.query.get(current_user.company_id)
    if current_user.admin:
        res = res.to_dict_admin()
        return jsonify(res)
    else:
        res = res.to_dict(current_user.id)
        return jsonify(res)

@company_routes.route('',methods=['PUT'])
def update_company_info():
    comp = Company.query.get(current_user.company_id)
    if not current_user.admin:
        return jsonify({"message":"Forbidden! Only admin can update business info!",
                 "statuscode": "404"}),404
    company_data=request.get_json()
    comp.name = company_data.get('name', comp.name)
    comp.phone = company_data.get('phone', comp.phone)
    comp.address = company_data.get('address', comp.address)
    comp.city = company_data.get('city', comp.city)
    comp.state = company_data.get('state', comp.state)
    comp.logo_url = company_data.get('logo_url', comp.logo_url)
    comp.terms_conditions = company_data.get('terms_conditions', comp.terms_conditions)
    db.session.commit()

    return jsonify(comp.to_dict_admin())
