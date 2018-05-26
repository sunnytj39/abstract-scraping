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
import re
from fake_useragent import UserAgent
from selenium.webdriver.support.ui import WebDriverWait

# sslを有効化
ssl._create_default_https_context = ssl._create_unverified_context

# Flaskクラスのインスタンスを作成
# __name__は現在のファイルのモジュール名
api = Flask(__name__)
CORS(api)

# title,urlの取得
@api.route('/get_title', methods=['POST'])
def get_title():
    # オプションの作成
    options = Options()
    options.binary_location = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
    options.add_argument('--headless')
    ua = UserAgent()
    user_agent = ua.random
    options.add_argument(f'user-agent={user_agent}')

        
    # ドライバーの作成
    driver = webdriver.Chrome('./chromedriver', chrome_options=options)
    driver.implicitly_wait(10)

    # google scholarに移動
    driver.get('https://scholar.google.co.jp')
    
    # google scholarにいることの確認
    assert 'Google Scholar' in driver.title

    # POSTされたキーワードを取得
    keyword = request.json
    
    # 検索を実行
    input_elem = driver.find_element_by_xpath('//*[@id="gs_hdr_tsi"]')
    input_elem.send_keys(keyword)
    input_elem.send_keys(Keys.RETURN)
    
    # 検索結果のタイトルとその遷移先URLを格納
    title = []
    url = []

    while True:
        for a in driver.find_elements_by_css_selector('h3 > a'):
            # URLにrfcが含まれていないか 
            if 'rfc' not in a.get_attribute('href'):
                title.append(a.text)
                url.append(a.get_attribute('href'))

        # タイトルを5つ以上取得できたらループを抜ける
        if len(title) > 5:
            break
        else:
            elem = driver.find_element_by_xpath('//*[@id="gs_nm"]/button[2]')
            driver.execute_script("arguments[0].click();", elem)

    driver.quit()

    result = [title, url]
    return make_response(jsonify(result))

@api.route('/get_abstract', methods=['GET', 'POST'])
def get_abstract():
    options = Options()
    options.binary_location = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
    options.add_argument('--headless')
        
    driver = webdriver.Chrome('./chromedriver', chrome_options=options)
    driver.get(request.json)

    # ページのソースを取得
    data = driver.page_source.encode('utf-8')
    soup = BeautifulSoup(data, "html.parser")

    # クラス名にabstractが入っている要素を取得
    abstract = soup.find(class_=re.compile(".*abstract.*"))

    # 要素が見つからない場合空のオブジェクトを返却
    if abstract is None:
        return make_response(jsonify())

    driver.quit()

    # 以下Azure　次のGitHubを参照：https://github.com/MicrosoftTranslator/Text-Translation-API-V3-Python

    # const.pyからkeyを取得
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
# ホスト0.0.0.0, ポート3001番でサーバーを起動 debug=Trueでデバッグモード
if __name__ == '__main__':
    api.run(host='0.0.0.0', port=3001)
