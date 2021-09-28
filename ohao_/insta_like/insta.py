import sys
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5 import uic
import os
import time

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import random

form_class = uic.loadUiType("jjin.ui")[0]

class WindowClass(QMainWindow, form_class) :
    def __init__(self) :
        super().__init__()
        self.setupUi(self)
        self.pushButton.clicked.connect(self.start)
        
    def start(self) :
        instaId = self.textEdit.toPlainText()
        instaPw = self.textEdit_2.toPlainText()
        tag = self.textEdit_3.toPlainText()
        count = self.spinBox.value()
        
        baseUrl = "https://www.instagram.com/"
        url = baseUrl

        driver = webdriver.Chrome(executable_path= os.getcwd() + "/chromedriver")
        driver.get(url)
        time.sleep(3)

        elem_id = driver.find_element_by_name("username")
        elem_id.send_keys(instaId)

        elem_pw = driver.find_element_by_name('password')
        elem_pw.send_keys(instaPw)
        elem_pw.submit()
        time.sleep(5)

        insta_tag_url = baseUrl + 'explore/tags/'+ tag
        driver.get(insta_tag_url)
        time.sleep(5)

        content = driver.find_element_by_xpath("//article/div[2]/div/div[1]/div[1]/a")
        content.send_keys(Keys.ENTER)
        time.sleep(3)

        like_btn = driver.find_element_by_xpath("//span[@class='fr66n']/button[@class='wpO6b  ']")
        btn_svg = like_btn.find_element_by_tag_name('svg')
        svg_txt = btn_svg.get_attribute('aria-label')
        print(svg_txt)
        ac = ActionChains(driver)

        if svg_txt == '좋아요 취소' :
            next_content = driver.find_element_by_link_text("다음")
            next_content.click()
        else :
            like_btn.send_keys(Keys.ENTER)
            ac.perform()
            next_content = driver.find_element_by_link_text("다음")
            next_content.click()
            time.sleep(3)

        for i in range(count):
            like_btn = driver.find_element_by_xpath("//span[@class='fr66n']/button[@class='wpO6b  ']")
            btn_svg = like_btn.find_element_by_tag_name('svg')
            svg_txt = btn_svg.get_attribute('aria-label')
            print(svg_txt)
            ac = ActionChains(driver)

            if svg_txt == '좋아요 취소' :
                next_content = driver.find_element_by_link_text("다음")
                next_content.click()

            else :
                like_btn.send_keys(Keys.ENTER)
                ac.perform()
                next_content = driver.find_element_by_link_text("다음")
                next_content.click()
                time.sleep(random.randrange(3,6,1))

        driver.close()
        
        
if __name__ == "__main__" :

    app = QApplication(sys.argv) 
    myWindow = WindowClass() 
    myWindow.show()
    app.exec_()