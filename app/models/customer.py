from .db import db, environment, SCHEMA, add_prefix_for_prod

class Customer(db.Model):
    __tablename__ = 'customers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')),nullable=False)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    state = db.Column(db.String(), nullable=False)

    comapny = db.relationship("Company",back_populates='services')
