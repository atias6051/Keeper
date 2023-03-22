from .db import db, environment, SCHEMA, add_prefix_for_prod

class Customer(db.Model):
    __tablename__ = 'customers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')),nullable=False)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    address = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    state = db.Column(db.String(), nullable=False)

    company = db.relationship("Company",back_populates='customers')
    estimates = db.relationship("Estimate",back_populates='customer')

    def to_dict(self):
        return{
            'id': self.id,
            'companyId': self.company_id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'estimates': [est.to_dict() for est in self.estimates]
        }
