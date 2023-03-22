from app.models import db, User, Company, environment, SCHEMA
from sqlalchemy.sql import text

def seed_companies():
    demo = Company(
        name="The Testing Company",
        phone='8881541544',
        address="123 Testing Ave",
        city="Fairport",
        state="NY",
        logo_url="https://i.imgur.com/3s1jky2.png",
        terms_conditions="You must pay for the work. fair enough?"
    )

    db.session.add(demo)
    db.session.commit()

def undo_companies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM companies"))

    db.session.commit()
