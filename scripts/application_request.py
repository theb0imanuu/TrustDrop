# works with both python 2 and 3
from __future__ import print_function

import africastalking

class APPLICATION_DATA:
    def __init__(self):
		# Set your app credentials
        self.username = "Derro-MN"
        self.api_key = "atsk_6ee7fb54d61e338fa64c9c5ad555e0631be78c2cbdf6b13180ccd48aaa13095aaf187d97"

		# Initialize the SDK
        africastalking.initialize(self.username, self.api_key)

        # Get the application service
        self.application = africastalking.Application

    def fetchdata(self):
        try:
			# Fetch the application data
            res = self.application.fetch_application_data()
            print (res)
        except Exception as e:
            print ("Received error response:%s" %str(e))

if __name__ == '__main__':
    APPLICATION_DATA().fetchdata()

