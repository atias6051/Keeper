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
    service5 = Service(
        company_id=1,
        name='Air Duct Cleaning',
        description='Complete cleaning of air ducts in your home using state-of-the-art equipment and technology. Price per vent.',
        price=25.00
    )

    service6 = Service(
        company_id=1,
        name='Air Duct Disinfecting',
        description='Using hospital-grade disinfectants, we sanitize the air ducts in your home to kill bacteria and viruses. Price per vent.',
        price=30.00
    )

    service7 = Service(
        company_id=1,
        name='Carpet Restoration',
        description='We bring your old carpets back to life by restoring their original look and feel. Price per sq.ft.',
        price=2.50
    )

    service8 = Service(
        company_id=1,
        name='Carpet Stain Removal',
        description='We use eco-friendly stain removers to get rid of even the toughest stains on your carpets. Price per sq.ft.',
        price=1.75
    )

    service9 = Service(
        company_id=1,
        name='Odor Removal',
        description='We remove unpleasant odors from your carpets and air ducts using our advanced deodorizing technology. Price per room.',
        price=50.00
    )

    service10 = Service(
        company_id=1,
        name='Carpet Stretching',
        description='We stretch your carpets to remove wrinkles, lumps, and bumps. Price per room.',
        price=75.00
    )

    service11 = Service(
        company_id=1,
        name='Furnace Cleaning',
        description='We thoroughly clean your furnace to ensure efficient heating and prolong its lifespan. Price per unit.',
        price=150.00
    )

    service12 = Service(
        company_id=1,
        name='Dryer Vent Cleaning',
        description='We clean the lint and debris from your dryer vent to prevent fires and improve drying efficiency. Price per vent.',
        price=35.00
    )

    service13 = Service(
        company_id=1,
        name='Air Duct Repair',
        description='We repair damaged air ducts to ensure proper airflow and energy efficiency. Price per unit.',
        price=200.00
    )

    service14 = Service(
        company_id=1,
        name='Carpet Maintenance Plan',
        description='Regular maintenance plan to keep your carpets looking and smelling like new. Price per month.',
        price=99.00
    )

    db.session.add(service1)
    db.session.add(service2)
    db.session.add(service3)
    db.session.add(service4)
    db.session.add(service5)
    db.session.add(service6)
    db.session.add(service7)
    db.session.add(service8)
    db.session.add(service9)
    db.session.add(service10)
    db.session.add(service11)
    db.session.add(service12)
    db.session.add(service13)
    db.session.add(service14)
    db.session.commit()

def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()
