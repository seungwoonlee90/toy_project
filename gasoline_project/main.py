import os
import pandas as pd
import requests
from bs4 import BeautifulSoup

service_key = ''
url = f'http://www.opinet.co.kr/api/lowTop10.do?out=xml&code={service_key}&prodcd=B027&area=0102'
res = requests.get(url)
soup = BeautifulSoup(res.content, 'html.parser')


df = []

for i in range(10) :
    price = soup.find_all('price')[i].get_text()
    os_nm = soup.find_all('os_nm')[i].get_text()
    van_adr = soup.find_all('van_adr')[i].get_text()
    new_adr = soup.find_all('new_adr')[i].get_text()
    xcoor = soup.find_all('gis_x_coor')[i].get_text()
    ycoor = soup.find_all('gis_y_coor')[i].get_text()
    df.append([os_nm, van_adr, new_adr, xcoor, ycoor, price])

df = pd.DataFrame(df, columns = ['os_nm', 'van_adr', 'new_adr', 'x', 'y', 'price'])
with open('./oil_price.json', 'w', encoding='utf-8') as file:
    df.to_json(file, force_ascii=False, orient='records')