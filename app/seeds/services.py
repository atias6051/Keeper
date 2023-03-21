from app.models import db, User, Company, Customer, Service, environment, SCHEMA
from sqlalchemy.sql import text

def seed_services():
    service1 = Service(
        company_id = 1,
        name = 'Basic Carpet Cleaning',
        description = 'Basic carpet cleaning using our X45 carpet cleaner. \nPrice per sq.ft',
        price = 1.55
    )
    service2 = Service(
        company_id = 1,
        name = 'Deep Carpet Cleaning',
        description = 'Deep carpet cleaning using our X545 carpet cleaner, capet shampoo and UI-Steamer. \nPrice per sq.ft',
        price = 2.15
    )
    service3 = Service(
        company_id = 1,
        name = 'Carpet patch',
        description = 'Patch and repair carpet damage.\nPrice per hole/damaged spot up to 1 sq.ft',
        price = 250
    )
    service4 = Service(
        company_id = 1,
        name = 'Carpet protection plan',
        description = '1 year protection plan for all carpet area deep cleaned',
        price = 350
    )

    db.session.add(service1)
    db.session.add(service2)
    db.session.add(service3)
    db.session.add(service4)
    db.session.commit()

def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()
