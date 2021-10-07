import os
import pandas as pd
import requests
from bs4 import BeautifulSoup
from datetime import datetime

service_key = ''
today = datetime.today().strftime("%Y-%m-%d")

area_code = f'http://www.opinet.co.kr/api/areaCode.do?out=xml&code={service_key}&area=01'
res = requests.get(area_code)
soup = BeautifulSoup(res.content, 'html.parser')

area = []
for i in range(25) :
    area_cd = soup.find_all('area_cd')[i].get_text()
    area_nm = soup.find_all('area_nm')[i].get_text()
    area.append([area_cd, area_nm])

area = pd.DataFrame(area, columns = ['area_cd', 'area_nm'])
area_cds = area['area_cd'].to_list()
area_nms = area['area_nm'].to_list()


df = []

for area_cd, area_nm in zip(area_cds, area_nms) :
    url = f'http://www.opinet.co.kr/api/lowTop10.do?out=xml&code={service_key}&prodcd=B027&area={area_cd}'
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')

    for i in range(10) :
        try :
            price = soup.find_all('price')[i].get_text()
            os_nm = soup.find_all('os_nm')[i].get_text()
            van_adr = soup.find_all('van_adr')[i].get_text()
            new_adr = soup.find_all('new_adr')[i].get_text()
            xcoor = soup.find_all('gis_x_coor')[i].get_text()
            ycoor = soup.find_all('gis_y_coor')[i].get_text()
            df.append([today, area_cd, area_nm, os_nm, van_adr, new_adr, xcoor, ycoor, price])
        
        except :
            pass

df = pd.DataFrame(df, columns = ['date', 'area_cd', 'area_nm', 'os_nm', 'van_adr', 'new_adr', 'x', 'y', 'price'])

with open('./oil_price_seoul.json', 'w', encoding='utf-8') as file:
    df.to_json(file, force_ascii=False, orient='records')