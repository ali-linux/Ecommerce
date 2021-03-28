import re
from django.core.validators import validate_email

def validate_email(email):
  try:
    validate_email( email )
    return True
  except Exception:
    return False

def validate_username(username):
  regex = r'^[\w_]+\Z'
  if (username == '' or not re.match(regex, username)):
    return True
  else:
    return False
