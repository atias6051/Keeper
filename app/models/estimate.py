from .db import db, environment, SCHEMA, add_prefix_for_prod

class Estimate(db.Model):
    __tablename__ = 'estimates'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')),nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('customers.id')),nullable=False)
    services = db.Column(db.Text)
    discount = db.Column(db.float, nullable=False)
    date = db.Column(db.String(), nullable=False)
    is_invoice = db.Column(db.Boolean, nullable=False, default=False)
