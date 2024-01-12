import json
import os
import requests
import sys

API_KEY=os.environ.get('MESSAGEBIRD_API_KEY')

CHANNEL_ID = "bca1c70c-bf08-4832-b821-459cc85e8fcc"
WORKSPACE_ID = "18c67992-c7ba-470d-9189-da495ab636a6"
API_BASE = "https://nest.messagebird.com"

def send_sms(phone_number, message):

  if API_KEY is None:
    print("Error, API_KEY is not set")
    sys.exit(1)


  url = f"https://nest.messagebird.com/workspaces/{WORKSPACE_ID}/channels/{CHANNEL_ID}/messages"

  headers = {
      'Authorization': f'AccessKey {API_KEY}',
      'Content-Type': 'application/json'
  }

  # Send message
  data = {
    "body": {
        "type": "text",
        "text": {
            "text": message
        }
    },
    "receiver": {
        "contacts": [
            {
                "identifierValue": phone_number,
                "identifierKey": "phonenumber"
            }
        ]
    }
}

  response = requests.post(url, headers=headers, data=json.dumps(data))

  print(response)
  return True
