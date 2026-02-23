# works with both python 2 and 3
from __future__ import print_function
import africastalking

class SMS:
    def __init__(self):
        # Set your app credentials
        self.username = "sandbox"
        self.api_key = "atsk_274496e7c2ece70736a2d300f718407b448eeb3959dd0423c8e804ee0c8ed364a9870ae7"

        # Initialize the SDK
        africastalking.initialize(self.username, self.api_key)

        # Get the SMS service
        self.sms = africastalking.SMS

    def send(self):
        # Set the numbers you want to send to in international format
        recipients = ["+254735663485"]

        # Set your message
        message = "I'm a lumberjack and it's ok, I sleep all night and I work all day"

        # Set your shortCode or senderId
        # Use "sandbox" if testing, or your registered alphanumeric senderID
        sender = "31315" 
        
        try:
            # Thats it, hit send and we'll take care of the rest.
            response = self.sms.send(message, recipients, sender)
            print(response)
        except Exception as e:
            print('Encountered an error while sending: %s' % str(e))

if __name__ == '__main__':
    SMS().send()