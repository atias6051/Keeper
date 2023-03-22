from app.models import db, UserInvite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_invites():
    invite1 = UserInvite(
        email = "invite1@gmail.com",
        company_id = 1,
        key = "ABC1",
        first_name = 'invited',
        last_name = 'user1',
    )
    invite2 = UserInvite(
        email = "invite2@gmail.com",
        company_id = 1,
        key = "ABC2",
        first_name = 'invited2',
        last_name = 'user2',
    )
    invite3 = UserInvite(
        email = "invite3@gmail.com",
        company_id = 1,
        key = "ABC3",
        first_name = 'invited3',
        last_name = 'user3',
    )
    invite4 = UserInvite(
        email = "invite4@gmail.com",
        company_id = 1,
        key = "ABC4",
        first_name = 'invited4',
        last_name = 'user4',
    )
    db.session.add(invite1)
    db.session.add(invite2)
    db.session.add(invite3)
    db.session.add(invite4)
    db.session.commit()

def undo_invites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_invites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_invites"))

    db.session.commit()
