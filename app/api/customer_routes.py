from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Company, Customer, db
from ..forms.new_customer_form import NewCustomerForm
from flask_login import current_user, login_user, logout_user

customer_routes = Blueprint('customers', __name__)

# Get all company customers
@customer_routes.route('')
@login_required
def get_all_customer():
    res = Customer.query.filter(Customer.company_id == current_user.company_id).all()
    return jsonify([customer.to_dict() for customer in res])

@customer_routes.route('',methods=['POST'])
@login_required
def create_customer():
    form = NewCustomerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        customer = Customer(
            company_id = current_user.company_id,
            name = form.name.data,
            email = form.email.data,
            phone = form.phone.data,
            address = form.address.data,
            city = form.city.data,
            state = form.state.data,
        )
        db.session.add(customer)
        db.session.commit()
        return jsonify(customer.to_dict())
    return jsonify({'errors': form.errors})

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

@customer_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_customer(id):
    customer = Customer.query.get(int(id))
    if not customer:
        return jsonify({"message":"Customer not found","statuscode":404}),404
    if customer.company_id != current_user.company_id:
        return jsonify({"message":"Customer is not in your company data","statuscode":404}),404
    if not current_user.admin:
        return jsonify({"message":"Only Admin user can delete customer records","statuscode":404}),404
    db.session.delete(customer)
    db.session.commit()
    return jsonify({
            "message": "Successfully deleted",
            "statusCode": 200
        }), 200
