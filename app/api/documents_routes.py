from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Company, Customer, Estimate, db

documents_routes = Blueprint('documents',__name__)

@documents_routes.route('/<int:id>')
@login_required
def get_single_doc(id):
    doc = db.session.query(Estimate).filter_by(id=id).first()
    if doc.company_id != current_user.company_id:
        return {"message": "documnet is not in your company records"}
    return jsonify(doc.to_dict())

@documents_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_single_doc(id):
    estimate = db.session.query(Estimate).filter_by(id=id).first()
    if not estimate:
        return jsonify({"message":"Estimate not found","statuscode":404}),404
    if estimate.company_id != current_user.company_id:
        return jsonify({"message":"Estimate is not in your company data","statuscode":404}),404
    db.session.delete(estimate)
    db.session.commit()
    return jsonify({
            "message": "Successfully deleted",
            "statusCode": 200
        }), 200


@documents_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_single_doc(id):
    estimate = db.session.query(Estimate).filter_by(id=id).first()
    if not estimate:
        return jsonify({"message":"Estimate not found","statuscode":404}),404
    if estimate.company_id != current_user.company_id:
        return jsonify({"message":"Estimate is not in your company data","statuscode":404}),404

    estimate_data = request.get_json()
    estimate.date = estimate_data.get('date', estimate.date)
    estimate.discount = estimate_data.get('discount', estimate.discount)
    estimate.services = estimate_data.get('services', estimate.services)
    db.session.commit()
    return jsonify(estimate.to_dict())

@documents_routes.route('/<int:id>/invoice',methods=['POST'])
@login_required
def update_to_invoice(id):
    estimate = db.session.query(Estimate).filter_by(id=id).first()
    if not estimate:
        return jsonify({"message":"Estimate not found","statuscode":404}),404
    if estimate.company_id != current_user.company_id:
        return jsonify({"message":"Estimate is not in your company data","statuscode":404}),404
    if estimate.is_invoice:
        return jsonify({"message":"Document is already invoiced","statuscode":404}),404
    estimate.is_invoice = True
    db.session.commit()
    return jsonify(estimate.to_dict())

@documents_routes.route('/estimates')
@login_required
def get_estimates():
    estimates = Estimate.query.filter(Estimate.company_id == current_user.company_id).order_by(Estimate.date).all()
    return jsonify([est.parsed_dict() for est in estimates])

@documents_routes.route('/estimates',methods=['POST'])
@login_required
def create_estimate():
    estimate_data = request.get_json()
    estimate = Estimate(
        owner_id = current_user.id,
        company_id = current_user.company_id,
        customer_id = estimate_data.get('customerId'),
        services = estimate_data.get('services'),
        discount = estimate_data.get('discount'),
        date = estimate_data.get('date'),
        is_invoice = False
    )
    db.session.add(estimate)
    db.session.commit()

    return jsonify(estimate.to_dict())
