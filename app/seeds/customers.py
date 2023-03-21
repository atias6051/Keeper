from app.models import db, User, Company, Customer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_customers():
    customer1 = Customer(
        company_id = 1,
        name = 'David Customer',
        email = 'david@customer.com',
        phone = '4154624345',
        address = '265 Customer Ave',
        city = 'New York City',
        state = 'NY'
    )
    customer2 = Customer(
        company_id = 1,
        name = 'Donna Customer',
        email = 'donna@customer.com',
        phone = '4154667345',
        address = '535 Customer Ave',
        city = 'New York City',
        state = 'NY'
    )
    customer3 = Customer(
        company_id = 1,
        name = 'Roger Customer',
        email = 'roger@customer.com',
        phone = '4154624945',
        address = '124 Client St',
        city = 'New York City',
        state = 'NY'
    )
    customer4 = Customer(
        company_id = 1,
        name = 'Madison Client',
        email = 'madison@customer.com',
        phone = '4159894115',
        address = '99 Deals Ave',
        city = 'New York City',
        state = 'NY'
    )

    db.session.add(customer1)
    db.session.add(customer2)
    db.session.add(customer3)
    db.session.add(customer4)
    db.session.commit()

def undo_customers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.customers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM customers"))

    db.session.commit()
