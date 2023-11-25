from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email_alert(to_email, subject, message):
  message = Mail(
    from_email='noreply@rocko.co',
    to_emails=to_email,
    subject=subject,
    html_content=message)
  try:
    sg = SendGridAPIClient('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')
    response = sg.send(message)
    return True
  except Exception as e:
    print(e)
    print(e.message)
    return False
