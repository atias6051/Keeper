from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Company, Customer, Estimate, db

documents_routes = Blueprint('documents',__name__)

@documents_routes.route('/estimates')
@login_required
def get_estimates():
    estimates = Estimate.query.filter(Estimate.company_id == current_user.company_id).order_by(Estimate.date).all()
    return jsonify([est.to_dict() for est in estimates])
