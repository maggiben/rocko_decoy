from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

import os

def send_email_alert(to_email, subject, message):
  message = Mail(
    from_email='noreply@rocko.co',
    to_emails=to_email,
    subject=subject,
    html_content=message)
  try:
    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
    return True
  except Exception as e:
    print(e)
    print(e.message)
    return False
