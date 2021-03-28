import re
regex = r'^[\w_]+\Z'
text = ''
if (re.match(regex, text)):
  print(True)
else:
  print(False)
