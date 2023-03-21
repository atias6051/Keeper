from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Company, Customer, db
from flask_login import current_user, login_user, logout_user

customer_routes = Blueprint('customers', __name__)

# Get all company customers
@customer_routes.route('')
@login_required
def get_all_customer():
    res = Customer.query.filter(Customer.company_id == current_user.company_id).all()
    return jsonify([customer.to_dict() for customer in res])

@customer_routes.route('/<int:id>',methods=['PUT'])
@login_required
def edit_customer(id):
    customer = Customer.query.get(int(id))
    if not customer:
        return jsonify({"message":"Customer not found","statuscode":404}),404
    if customer.company_id != current_user.company_id:
        return jsonify({"message":"Customer is not in your company data","statuscode":404}),404
    customer_data = request.get_json()
    customer.name = customer_data.get('name', customer.name)
    customer.email = customer_data.get('email', customer.email)
    customer.phone = customer_data.get('phone', customer.phone)
    customer.address = customer_data.get('address', customer.address)
    customer.city = customer_data.get('city', customer.city)
    customer.state = customer_data.get('state', customer.state)
    db.session.commit()

    return jsonify(customer.to_dict())
