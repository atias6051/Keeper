from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class UserInvite(db.Model):
    __tablename__ = 'user_invites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_key = db.Column(db.String(255), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')),nullable=False)
    first_name = db.Column(db.String(255),nullable=False)
    last_name = db.Column(db.String(255),nullable=False)
    active = db.Column(db.Boolean,nullable=False,default=True)

    company = db.relationship("Company",back_populates='invites')

    @property
    def key(self):
        return self.hashed_key

    @key.setter
    def key(self, key):
        self.hashed_key = generate_password_hash(key)

    def check_key(self, key):
        return check_password_hash(self.key, key)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'companyId': self.company_id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'active': self.active
        }
