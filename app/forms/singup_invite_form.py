from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class SignUpInviteForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])
    company_id = IntegerField('company_id', validators=[DataRequired()])
    invite_id = IntegerField('invite_id', validators=[DataRequired()])
