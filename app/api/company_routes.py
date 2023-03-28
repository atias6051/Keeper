from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Company, db
from ..forms.new_company_form import NewCompanyForm
from flask_login import current_user, login_user, logout_user

company_routes = Blueprint('company', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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
@login_required
def update_company_info():
    comp = Company.query.get(current_user.company_id)
    # if not current_user.admin:
    #     return jsonify({"message":"Forbidden! Only admin can update business info!",
    #              "statuscode": "404"}),404
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

@company_routes.route('',methods=['POST'])
def create_new_company():
    form = NewCompanyForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        company = Company(
            name = form.name.data,
            phone = form.business_phone.data,
            address = form.address.data,
            city = form.city.data,
            state = form.state.data,
            logo_url = form.logo_url.data if form.logo_url.data else "https://i.imgur.com/liRLhba.png"
        )
        db.session.add(company)
        db.session.flush()

        user = User(
            first_name = form.first_name.data,
            last_name = form.last_name.data,
            email = form.email.data,
            password = form.password.data,
            phone = form.phone.data,
            admin = True,
            company_id = company.id
        )
        db.session.add(user)
        db.session.commit()

        user_login = User.query.filter(User.email == form.data['email']).first()
        login_user(user_login)
        return jsonify({
            "user": user_login.to_dict(),
            "company": company.to_dict_admin()
        })
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@company_routes.route('',methods=['DELETE'])
@login_required
def delete_company():
    if not current_user.admin:
        return jsonify({"message":"Forbidden! Only admin can delete the business!",
                "statuscode": "404"}),404
    comp = Company.query.get(current_user.company_id)
    logout_user()
    db.session.delete(comp)
    db.session.commit()
    return {"message": "Business and user account successfully deleted"}
