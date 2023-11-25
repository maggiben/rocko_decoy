#from twilio.rest import Client
import json
import os
import requests
import sys

API_BASE = "https://api-app2.simpletexting.com/v2/api"
PHONE_SEND = "2067048713"
API_KEY=os.environ.get('ROCKO_SIMPLETEXTING_API_KEY')

def send_sms(phone_number, message):

  if API_KEY is None:
    print("Error, API_KEY is not set")
    sys.exit(1)


  headers = {
    "Authorization": "Bearer {os.environ.get('ROCKO_SIMPLETEXTING_API_KEY')}",
    "Content-type": "application/json"
  }

  # Get a contact with this number
  response = requests.get(f"{API_BASE}/contacts/{phone_number}", headers=headers)
  print("GETTING CONTACT")
  print(response.status_code)
  print(response.text)

  if response.status_code == 404:
    # The contact is not in simpletexting, add them
    print("ADDING CONTACT")
    post_data = {}
    post_data['contactPhone'] = phone_number
    post_data['listIds'] = ['Rocko']

    response = requests.post(f"{API_BASE}/contacts", headers=headers, data=json.dumps(post_data))

  # Send message
  post_data = {}
  post_data['accountPhone'] = PHONE_SEND
  post_data['contactPhone'] = phone_number
  post_data['text'] = message

  response = requests.post(f"{API_BASE}/messages", headers=headers, data=json.dumps(post_data))

  return True
