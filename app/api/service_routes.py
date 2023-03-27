from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Company, Service, db
from ..forms.new_service_form import NewServiceForm

service_routes = Blueprint('service', __name__)

@service_routes.route('')
@login_required
def get_services():
    res = Service.query.filter(Service.company_id == current_user.company_id).all()
    return jsonify([service.to_dict() for service in res])

@service_routes.route('',methods=['POST'])
@login_required
def create_service():
    form = NewServiceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        service = Service(
            company_id = current_user.company_id,
            name = form.name.data,
            description = form.description.data,
            price = form.price.data
        )
        db.session.add(service)
        db.session.commit()
        return jsonify(service.to_dict())
    return jsonify({'errors': form.errors})

@service_routes.route('/<int:id>')
@login_required
def get_single_service(id):
    service = Service.query.get(int(id))
    if not service:
        return jsonify({"message":"Service not found","statuscode":404}),404
    if service.company_id != current_user.company_id:
        return jsonify({"message":"Service is not in your company records","statuscode":404}),404
    return jsonify(service.to_dict())

@service_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_service(id):
    # if not current_user.admin:
    #     return jsonify({"message":"Only Admin user can edit service records","statuscode":404}),404
    service = Service.query.get(int(id))
    if not service:
        return jsonify({"message":"Service not found","statuscode":404}),404
    if service.company_id != current_user.company_id:
        return jsonify({"message":"Service is not in your company records","statuscode":404}),404

    service_data = request.get_json()
    service.name = service_data.get('name', service.name)
    service.description = service_data.get('description', service.description)
    service.price = service_data.get('price', service.price)
    db.session.commit()

    return jsonify(service.to_dict())

@service_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_service(id):
    if not current_user.admin:
        return jsonify({"message":"Only Admin user can delete service records","statuscode":404}),404
    service = Service.query.get(int(id))
    if not service:
        return jsonify({"message":"Service not found","statuscode":404}),404
    if service.company_id != current_user.company_id:
        return jsonify({"message":"Service is not in your company records","statuscode":404}),404

    db.session.delete(service)
    db.session.commit()
    return jsonify({
            "message": "Successfully deleted",
            "statusCode": 200
        }), 200
