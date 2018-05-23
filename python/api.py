# 必要なモジュールの読み込み
from flask import Flask, jsonify, abort, make_response
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import http.client, urllib.parse, uuid, json

# Flaskクラスのインスタンスを作成
# __name__は現在のファイルのモジュール名
api = Flask(__name__)

# GETの実装
@api.route('/get', methods=['GET'])
def get_user():
    result = { "greeting": 'hello flask' }
    return make_response(jsonify(result))

# titleの取得
@api.route('/get_title', methods=['GET'])
def get_title():
    options = Options()
    options.binary_location = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
    options.add_argument('--headless')
        
    driver = webdriver.Chrome('./chromedriver', chrome_options=options)
    driver.get('https://scholar.google.co.jp')
    
    assert 'Google Scholar' in driver.title
    
    input_elem = driver.find_element_by_xpath('//*[@id="gs_hdr_tsi"]')
    input_elem.send_keys('web performance')
    input_elem.send_keys(Keys.RETURN)
    
    time.sleep(1)
    
    assert 'web performance' in driver.title
    
    list = []

    for a in driver.find_elements_by_css_selector('h3 > a'):
        #url = a.get_attribute('href')
        list.append(a.text)

    return make_response(jsonify(list))

# エラーハンドリング
@api.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

# ファイルをスクリプトとして実行した際に
# ホスト0.0.0.0, ポート3001番でサーバーを起動
if __name__ == '__main__':
    api.run(host='0.0.0.0', port=3001)
