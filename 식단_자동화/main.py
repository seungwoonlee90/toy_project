import os
import requests
from bs4 import BeautifulSoup
from slacker import Slacker
import warnings
warnings.filterwarnings('ignore')

url = 'https://uicoop.ac.kr/main.php?mkey=2&w=2&l=5'
request = requests.get(url, verify=False)

if request.status_code == 200 :
    soup = BeautifulSoup(request.content, "html.parser")
    menus = soup.select("td[class=din_lists]")
    print(menus)
    menu = menus[0].text
else :
    menu = 'request error'

token = os.environ.get("SECURE") #token test
slack = Slacker(token)
slack.chat.post_message("#ethan-bot", menu, as_user=True)