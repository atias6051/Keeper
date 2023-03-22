from app.models import db, User, Company, Customer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_customers():
    customer_list = []
    customer1 = Customer(
        company_id = 1,
        name = 'David Customer',
        email = 'david@customer.com',
        phone = '4154624345',
        address = '265 Customer Ave',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer1)
    customer2 = Customer(
        company_id = 1,
        name = 'Donna Customer',
        email = 'donna@customer.com',
        phone = '4154667345',
        address = '535 Customer Ave',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer2)
    customer3 = Customer(
        company_id = 1,
        name = 'Roger Customer',
        email = 'roger@customer.com',
        phone = '4154624945',
        address = '124 Client St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer3)
    customer4 = Customer(
        company_id = 1,
        name = 'Madison Client',
        email = 'madison@customer.com',
        phone = '4159894115',
        address = '99 Deals Ave',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer4)
    customer5 = Customer(
        company_id = 1,
        name = 'Alexis Johnson',
        email = 'alexisj@example.com',
        phone = '2125551212',
        address = '123 Main St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer5)

    customer6 = Customer(
        company_id = 1,
        name = 'Michael Chang',
        email = 'michaelc@example.com',
        phone = '2125551212',
        address = '456 Elm St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer6)

    customer7 = Customer(
        company_id = 1,
        name = 'Elizabeth Smith',
        email = 'elizabeths@example.com',
        phone = '2125551212',
        address = '789 Maple St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer7)

    customer8 = Customer(
        company_id = 1,
        name = 'David Kim',
        email = 'davidk@example.com',
        phone = '2125551212',
        address = '321 Oak St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer8)

    customer9 = Customer(
        company_id = 1,
        name = 'Sarah Lee',
        email = 'sarahlee@example.com',
        phone = '2125551212',
        address = '654 Pine St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer9)

    customer10 = Customer(
        company_id = 1,
        name = 'John Lee',
        email = 'johnlee@example.com',
        phone = '2125551212',
        address = '987 Cedar St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer10)

    customer11 = Customer(
        company_id = 1,
        name = 'Lisa Park',
        email = 'lisapark@example.com',
        phone = '2125551212',
        address = '246 Elm St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer11)

    customer12 = Customer(
        company_id = 1,
        name = 'Jennifer Kim',
        email = 'jenniferk@example.com',
        phone = '2125551212',
        address = '135 Maple St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer12)

    customer13 = Customer(
        company_id = 1,
        name = 'Andrew Lee',
        email = 'andrewlee@example.com',
        phone = '2125551212',
        address = '579 Pine St',
        city = 'New York City',
        state = 'NY'
    )
    customer_list.append(customer13)

    db.session.add_all(customer_list)
    db.session.commit()

def undo_customers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.customers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM customers"))

    db.session.commit()
