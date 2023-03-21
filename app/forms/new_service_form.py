from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError

class NewServiceForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
