from app.models import db, User, Company, Estimate, Customer, Service, environment, SCHEMA
from sqlalchemy.sql import text

def seed_estimates():
    est1 = Estimate(
        owner_id=1,
        company_id=1,
        customer_id=1,
        services= '{"1":{"id":1,"companyId":1,"name":"Basic Carpet Cleaning","description":"Basic carpet cleaning using our X45 carpet cleaner. \\nPrice per sq.ft","price":1.55,"quantity":300},"2":{"id":2,"companyId":1,"name":"Deep Carpet Cleaning","description":"Deep carpet cleaning using our X545 carpet cleaner, capet shampoo and UI-Steamer. \\nPrice per sq.ft","price":2.15,"quantity":200},"3":{"id":3,"companyId":1,"name":"Carpet patch","description":"Patch and repair carpet damage.\\nPrice per hole/damaged spot up to 1 sq.ft","price":250,"quantity":1}}',
        discount=150,
        date='11/8/2022'
    )
    est2 = Estimate(
        owner_id=1,
        company_id=1,
        customer_id=1,
        services= '{"1":{"id":1,"companyId":1,"name":"Basic Carpet Cleaning","description":"Basic carpet cleaning using our X45 carpet cleaner. \\nPrice per sq.ft","price":1.55,"quantity":100},"2":{"id":2,"companyId":1,"name":"Deep Carpet Cleaning","description":"Deep carpet cleaning using our X545 carpet cleaner, capet shampoo and UI-Steamer. \\nPrice per sq.ft","price":2.15,"quantity":50},"3":{"id":4,"companyId":1,"name":"Carpet protection plan","description":"1 year protection plan for all carpet area deep cleaned","price":350,"quantity":1}}',
        discount=150,
        date='21/4/2023'
    )
    est3 = Estimate(
        owner_id=2,
        company_id=1,
        customer_id=4,
        services= '{"1":{"id":1,"companyId":1,"name":"Basic Carpet Cleaning","description":"Basic carpet cleaning using our X45 carpet cleaner. \\nPrice per sq.ft","price":1.55,"quantity":500},"2":{"id":2,"companyId":1,"name":"Deep Carpet Cleaning","description":"Deep carpet cleaning using our X545 carpet cleaner, capet shampoo and UI-Steamer. \\nPrice per sq.ft","price":2.15,"quantity":100},"3":{"id":4,"companyId":1,"name":"Carpet protection plan","description":"1 year protection plan for all carpet area deep cleaned","price":350,"quantity":1}}',
        discount=150,
        date='11/5/2023'
    )
    est4 = Estimate(
        owner_id=2,
        company_id=1,
        customer_id=3,
        services= '{"1":{"id":1,"companyId":1,"name":"Basic Carpet Cleaning","description":"Basic carpet cleaning using our X45 carpet cleaner. \\nPrice per sq.ft","price":1.55,"quantity":200},"2":{"id":3,"companyId":1,"name":"Carpet patch","description":"Patch and repair carpet damage.\\nPrice per hole/damaged spot up to 1 sq.ft","price":250,"quantity":3},"3":{"id":4,"companyId":1,"name":"Carpet protection plan","description":"1 year protection plan for all carpet area deep cleaned","price":350,"quantity":1}}',
        discount=150,
        date='19/7/2023'
    )

    db.session.add(est1)
    db.session.add(est2)
    db.session.add(est3)
    db.session.add(est4)
    db.session.commit()

def undo_estimates():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.estimates RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM estimates"))

    db.session.commit()
