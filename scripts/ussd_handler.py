import os
from flask import Flask, request
import requests

app = Flask(__name__)

# Replace with the actual URL of your Django API
DJANGO_API_URL = "http://localhost:8000/api/verify/"

@app.route("/ussd", methods=['POST'])
def ussd():
    session_id = request.values.get("sessionId", None)
    serviceCode = request.values.get("serviceCode", None)
    phone_number = request.values.get("phoneNumber", None)
    text = request.values.get("text", "default")

    if text == '':
        # This is the first request. Ask for the delivery code.
        response = "CON Enter the delivery code:"
    else:
        # This is the second request. The user has entered the code.
        code = text
        try:
            # Make a POST request to the Django API to verify the code
            api_response = requests.post(DJANGO_API_URL, json={'code': code})
            if api_response.status_code == 200:
                response = "END Order delivered successfully."
            else:
                response = "END Invalid or expired code."
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            response = "END Could not connect to the verification service. Please try again later."

    return response

if __name__ == '__main__':
    # You will need to install requests: pip install requests
    # You will also need to run this with a tool like ngrok to expose it to the internet
    app.run(debug=True)