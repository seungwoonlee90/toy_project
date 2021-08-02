import requests
from bs4 import BeautifulSoup
from slacker import Slacker

url = 'https://uicoop.ac.kr/main.php?mkey=2&w=2&l=5'
request = requests.get(url)
soup = BeautifulSoup(request.content, "html.parser")

menus = soup.select("td[class=din_lists]")

for i in menus :
    menu = i.text
    print(menu)

token = "PRESONAL_TOKEN"
slack = Slacker(token)
slack.chat.post_message("#ethan-bot", menu, as_user=True)