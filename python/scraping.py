import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import http.client, urllib.parse, uuid, json


options = Options()
options.binary_location = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
options.add_argument('--headless')

driver = webdriver.Chrome('./chromedriver', chrome_options=options)
driver.get('https://scholar.google.co.jp')

assert 'Google Scholar' in driver.title

input_elem = driver.find_element_by_xpath('//*[@id="gs_hdr_tsi"]')
input_elem.send_keys('web performance')
input_elem.send_keys(Keys.RETURN)

time.sleep(2)

assert 'web performance' in driver.title

for a in driver.find_elements_by_css_selector('h3 > a'):
    if 'patent' in a.get_attribute('href'):
        url = a.get_attribute('href')
        #print(a.text)
        break

driver.get(url)

data = driver.page_source.encode('utf-8')
soup = BeautifulSoup(data, "html.parser")

abstract = soup.find('div', class_='abstract')

driver.save_screenshot('search_results.png')

driver.quit()

import translate
translate_class = translate.Translate(abstract.string)

result = translate_class.translate_text()
output = json.dumps(json.loads(result), indent=4, ensure_ascii=False)
print (output)

