from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import json
from datetime import datetime


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

    def stats2(self):
        current_month = datetime.now().month
        estimates = [est.parsed_dict() for est in self.estimates]
        salesmen = {x['id']:x for x in [y.to_dict() for y in self.users]}
        service_count = dict()
        sales_stats = {"numEstimates":0,"numSales":0,"totalEstimates":0,"totalSales":0}
        year_sales = {}
        for est in estimates:
            estMonth = datetime.strptime(est['date'], '%m/%d/%Y').month
            if estMonth in year_sales:
                year_sales[estMonth]['totalEstimates'] += float(est['total'])
                year_sales[estMonth]['totalSales'] += float(est['total']) if est['isInvoice'] else 0
            else:
                year_sales[estMonth] = {
                    'totalEstimates': float(est['total']),
                    'totalSales': float(est['total']) if est['isInvoice'] else 0
                }

            for id,service in est['services'].items():
                if service['id'] in service_count:
                    service_count[service['id']]['count'] += 1
                    service_count[service['id']]['totalOffers'] += float(service['price']) * float(service['quantity'])
                    service_count[service['id']]['totalSales'] += float(service['price']) * float(service['quantity']) if est['isInvoice'] else 0
                else:
                    service_count[service['id']] = {
                        'name': service['name'],
                        'count': 1,
                        'totalOffers': float(service['price']) * float(service['quantity']),
                        'totalSales': float(service['price']) * float(service['quantity']) if est['isInvoice'] else 0
                    }
            if estMonth == current_month:
            # if est['isInvoice'] and datetime.strptime(est['date'], '%m/%d/%Y').month == current_month:
                # if est['isInvoice']:
                sales_stats['numEstimates'] += 1
                sales_stats['numSales'] += 1 if est["isInvoice"] else 0
                sales_stats['totalEstimates'] += float(est['total'])
                sales_stats['totalSales'] += float(est['total']) if est["isInvoice"] else 0

                if 'thisMonth' in salesmen[est['ownerId']]:
                    salesmen[est['ownerId']]['thisMonth']+=float(est['total']) if est['isInvoice'] else 0
                else:
                    salesmen[est['ownerId']]['thisMonth'] = float(est['total']) if est['isInvoice'] else 0

            if 'totalEstimates' in salesmen[est['ownerId']]:
                salesmen[est['ownerId']]['totalEstimates'] += float(est['total'])
                salesmen[est['ownerId']]['numEstimates'] += 1
                salesmen[est['ownerId']]['totalSales'] += float(est['total']) if est['isInvoice'] else 0
                salesmen[est['ownerId']]['numSales'] += 1 if est['isInvoice'] else 0
            else:
                salesmen[est['ownerId']]['totalEstimates'] = float(est['total'])
                salesmen[est['ownerId']]['totalSales'] = float(est['total']) if est['isInvoice'] else 0
                salesmen[est['ownerId']]['numEstimates'] = 1
                salesmen[est['ownerId']]['numSales'] = 1 if est['isInvoice'] else 0
        for id,salesman in salesmen.items():
            salesman['totalSales'] = round(salesman['totalSales'],2)
            salesman['closeRate'] = round(float(salesman['numSales']) / float(salesman['numEstimates']) * 100,2)
        customer_cities = dict()
        customers = [customer.to_dict() for customer in self.customers]
        for cust in customers:
            city = cust['city']
            if city in customer_cities:
              customer_cities[city] += 1
            else:
                customer_cities[city] = 1
        return {
            # 'estimates':estimates,
            'serviceStats': [serv for id,serv in service_count.items()],
            'citiesStats': customer_cities,
            'salesmenStats': [user for id,user in salesmen.items()],
            'monthlyStats': sales_stats,
            'yearSalesStats': year_sales
        }

    # def stats(self):
    #     estimates = [estimate.to_dict() for estimate in self.estimates]
    #     parsed = [json.loads(est['services']) for est in estimates]
    #     service_count = dict()
    #     salesmen = {x['id']:x for x in [y.to_dict() for y in self.users]}
    #     for services in parsed:
    #         for service in services:
    #             current = services[service]
    #             name = services[service]['name']
    #             id = services[service]['id']
    #             if id in service_count:
    #                 service_count[id]['count'] += 1
    #                 service_count[id]['totalSold'] += float(current['quantity'])*float(current['price'])
    #             else:
    #                 service_count[id] = {
    #                     'name': name,
    #                     'count': 1,
    #                     'totalSold': float(current['quantity'])*float(current['price'])
    #                 }
    #     customer_cities = dict()
    #     customers = [customer.to_dict() for customer in self.customers]
    #     for cust in customers:
    #         city = cust['city']
    #         if city in customer_cities:
    #           customer_cities[city] += 1
    #         else:
    #             customer_cities[city] = 1


    #     return {
    #         'service_stats': service_count,
    #         'cities_stats': customer_cities,
    #         'salesmen': salesmen
    #     }

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
            # 'stats': self.stats()
        }
