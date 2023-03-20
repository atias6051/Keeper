from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Company(db.Model):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    state = db.Column(db.String(), nullable=False)
    logo_url = db.Column(db.String())
    terms_conditions = db.Column(db.Text)

    users = db.relationship("User", back_populates='company', cascade="all,delete")
    services = db.relationship("Service", back_populates='company', cascade="all,delete")
    customers = db.relationship("Customer", back_populates='company', cascade="all,delete")
    invites = db.relationship("UserInvite", back_populates='company', cascade="all,delete")
    estimates = db.relationship("Estimate", back_populates='company', cascade="all,delete")

    def to_dict_admin(self):
        return {
            'id': self.id,
            'name': self,
            'phone': self,
            'address': self,
            'city': self,
            'state': self,
            'logoUrl': self,
            'termsConditions': self,
            'users': [user.to_dict() for user in self.users],
            'services': [service.to_dict() for service in self.services],
            'customers': [customer.to_dict() for customer in self.customers],
            'invites': [invite.to_dict() for invite in self.invites],
            'estimates': [estimate.to_dict() for estimate in self.estimates]
        }
