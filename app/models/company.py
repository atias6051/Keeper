from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import json


class Company(db.Model):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(), nullable=False)
    logo_url = db.Column(db.String())
    terms_conditions = db.Column(db.Text)

    users = db.relationship("User", back_populates='company', cascade="all,delete")
    services = db.relationship("Service", back_populates='company', cascade="all,delete")
    customers = db.relationship("Customer", back_populates='company', cascade="all,delete")
    invites = db.relationship("UserInvite", back_populates='company', cascade="all,delete")
    estimates = db.relationship("Estimate", back_populates='company', cascade="all,delete")


    def stats(self):
        estimates = [estimate.to_dict() for estimate in self.estimates]
        parsed = [json.loads(est['services']) for est in estimates]
        service_count = dict()
        for services in parsed:
            for service in services:
                current = services[service]
                name = services[service]['name']
                id = services[service]['id']
                if id in service_count:
                    service_count[id]['count'] += 1
                    service_count[id]['totalSold'] += float(current['quantity'])*float(current['price'])
                else:
                    service_count[id] = {
                        'name': name,
                        'count': 1,
                        'totalSold': float(current['quantity'])*float(current['price'])
                    }
        customer_cities = dict()
        customers = [customer.to_dict() for customer in self.customers]
        for cust in customers:
            city = cust['city']
            if city in customer_cities:
              customer_cities[city] += 1
            else:
                customer_cities[city] = 1


        return {
            'service_stats': service_count,
            'cities_stats': customer_cities
        }

    def to_dict(self,id):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'logoUrl': self.logo_url,
            'termsConditions': self.terms_conditions,
            'users': [user.to_dict() for user in self.users],
            'services': [service.to_dict() for service in self.services],
            'customers': [customer.to_dict() for customer in self.customers],
            'estimates': [estimate.to_dict() for estimate in self.estimates if estimate.owner_id == id],
            'stats': self.stats()
        }

    def to_dict_admin(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'logoUrl': self.logo_url,
            'termsConditions': self.terms_conditions,
            'users': [user.to_dict() for user in self.users],
            'services': [service.to_dict() for service in self.services],
            'customers': [customer.to_dict() for customer in self.customers],
            'invites': [invite.to_dict() for invite in self.invites],
            'estimates': [estimate.to_dict() for estimate in self.estimates],
            'stats': self.stats()
        }
