import json
import requests

API = "http://YOUR_SERVER_IP:5000/predict"


def lambda_handler(event, context):

    body = json.loads(event['body'])

    requests.post(API, json=body)

    return {
        'statusCode': 200,
        'body': 'sent to backend'
    } 