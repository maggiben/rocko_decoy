from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To, From, Cc, Bcc

import os

def send_email_alert(email_to, email_message):

  message = Mail(
    from_email=From(email_message[0]),
    to_emails=To(email_to),
    subject=email_message[1],
    html_content=email_message[2])
  try:
    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
    return True
  except Exception as e:
    print(e)
    print(e.message)
    return False
