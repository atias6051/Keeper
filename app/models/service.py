from .db import db, environment, SCHEMA, add_prefix_for_prod

class Service(db.Model):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), nullable=False)
    name = db.Column(db.String(255),nullable=False)
    description = db.Column(db.Text,nullable=False)
    price = db.Column(db.float, nullable=False)

    company = db.relationship("Company", back_populates='services')
