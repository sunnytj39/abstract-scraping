# 必要なモジュールの読み込み
from flask import Flask, jsonify, abort, make_response, request
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import http.client, urllib.parse, uuid, json
from flask_cors import CORS
from consts import KEY
import http.client, urllib.parse, uuid, json
import ssl 
ssl._create_default_https_context = ssl._create_unverified_context
import re

# Flaskクラスのインスタンスを作成
# __name__は現在のファイルのモジュール名
api = Flask(__name__)
CORS(api)

# GETの実装
@api.route('/get', methods=['GET'])
def test():
    result = { "greeting": 'hello flask' }
    return make_response(jsonify(result))

# title,urlの取得
@api.route('/get_title', methods=['POST'])
def get_title():
    options = Options()
    options.binary_location = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
    options.add_argument('--headless')
        
    driver = webdriver.Chrome('./chromedriver', chrome_options=options)
    driver.get('https://scholar.google.co.jp')
    
    assert 'Google Scholar' in driver.title

    print(request.json)
    keyword = request.json
    
    input_elem = driver.find_element_by_xpath('//*[@id="gs_hdr_tsi"]')
    input_elem.send_keys(keyword)
    input_elem.send_keys(Keys.RETURN)
    
    time.sleep(1)
    
    title = []
    url = []

    for a in driver.find_elements_by_css_selector('h3 > a'):
        # URLにpatentが含まれるか 
        #if 'patent' in a.get_attribute('href'):
            title.append(a.text)
            url.append(a.get_attribute('href'))

    result = [title, url]
    return make_response(jsonify(result))

@api.route('/get_abstract', methods=['GET', 'POST'])
def get_abstract():
    options = Options()
    options.binary_location = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
    options.add_argument('--headless')
        
    driver = webdriver.Chrome('./chromedriver', chrome_options=options)
    driver.get(request.json)

    data = driver.page_source.encode('utf-8')
    soup = BeautifulSoup(data, "html.parser")

    #abstract = soup.find('div', class_='abstract')
    abstract = soup.find(class_=re.compile(".*abstract.*"))
    print(abstract)
    if abstract is None:
        print('NONE!!!!!!!!!!!!!!!!!!!!')
        return make_response(jsonify())

    driver.quit()

    subscriptionKey = KEY
    
    host = 'api.cognitive.microsofttranslator.com'
    path = '/translate?api-version=3.0'
    
    params = "&to=ja";
    
    def translate (content):
    
        headers = {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }
    
        conn = http.client.HTTPSConnection(host)
        conn.request ("POST", path + params, content, headers)
        response = conn.getresponse ()
        return response.read ()
    
    requestBody = [{
        'Text' : abstract.text,
    }]
    content = json.dumps(requestBody, ensure_ascii=False).encode('utf-8')
    result = translate (content)
    
    output = json.dumps(json.loads(result), indent=4, ensure_ascii=False)
    return make_response(result)


# エラーハンドリング
@api.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

# ファイルをスクリプトとして実行した際に
# ホスト0.0.0.0, ポート3001番でサーバーを起動
if __name__ == '__main__':
    api.run(host='0.0.0.0', port=3001)
