from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, UserInvite

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def user_invited(form, field):
    email = field.data
    invite = UserInvite.query.filter(UserInvite.email == email).first()
    if invite:
        raise ValidationError('Email address is already in use.')

class UserInviteForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists,user_invited])
    key = StringField('name', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
