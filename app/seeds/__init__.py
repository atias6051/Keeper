from flask.cli import AppGroup
from .users import seed_users, undo_users
from .companies import seed_companies, undo_companies
from .customers import seed_customers, undo_customers
from .services import seed_services, undo_services
from .estimates import seed_estimates, undo_estimates
from .invites import seed_invites, undo_invites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_estimates()
        undo_customers()
        undo_services()
        undo_invites()
        undo_users()
        undo_companies()
    seed_companies()
    seed_users()
    seed_invites()
    seed_services()
    seed_customers()
    seed_estimates()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_invites()
    undo_companies()
    undo_services()
    undo_customers()
    undo_estimates()
    # Add other undo functions here
