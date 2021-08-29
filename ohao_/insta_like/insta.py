from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
import time
import os
from selenium.webdriver.common.keys import Keys
import random

baseUrl = "https://www.instagram.com/"
url = baseUrl

print("Chrome Driver를 실행합니다.")

# webdriver_options = webdriver.ChromeOptions()
# webdriver_options.add_argument('headless')

driver = webdriver.Chrome(executable_path= os.getcwd() + "/chromedriver")
driver.get(url)
time.sleep(3)