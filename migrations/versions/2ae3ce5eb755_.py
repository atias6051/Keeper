"""empty message

Revision ID: 2ae3ce5eb755
Revises: 
Create Date: 2023-03-20 19:11:27.266316

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ae3ce5eb755'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('companies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('state', sa.String(), nullable=False),
    sa.Column('logo_url', sa.String(), nullable=True),
    sa.Column('terms_conditions', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('customers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('state', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_invites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_key', sa.String(length=255), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('estimates',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.Column('services', sa.Text(), nullable=True),
    sa.Column('discount', sa.Float(), nullable=False),
    sa.Column('date', sa.String(), nullable=False),
    sa.Column('is_invoice', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('estimates')
    op.drop_table('users')
    op.drop_table('user_invites')
    op.drop_table('services')
    op.drop_table('customers')
    op.drop_table('companies')
    # ### end Alembic commands ###
