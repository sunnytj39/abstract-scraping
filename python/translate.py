# -*- coding: utf-8 -*-

from consts import KEY
import http.client, urllib.parse, uuid, json
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

# **********************************************
# *** Update or verify the following values. ***
# **********************************************
class Translate:
    def __init__(self, text):
        self.subscriptionKey = KEY
        self.host = 'api.cognitive.microsofttranslator.com'
        self.path = '/translate?api-version=3.0'

        self.params = "&to=ja&to=it";

        print(text)

        requestBody = [{
            'Text' : text,
        }]
        self.content = json.dumps(requestBody, ensure_ascii=False).encode('utf-8')

    def translate_text (self):

        headers = {
                'Ocp-Apim-Subscription-Key': self.subscriptionKey,
                'Content-type': 'application/json',
                'X-ClientTraceId': str(uuid.uuid4())
                }

        conn = http.client.HTTPSConnection(self.host)
        conn.request ("POST", self.path + self.params, self.content, headers)
        response = conn.getresponse ()
        return response.read ()

