#!/usr/bin/python

from bs4 import BeautifulSoup
import requests
import re

# playground file to get used to using bs4 for scraping yahoo finance
def scrape_stock_page(page):
    webpage_content = requests.get(page).text
    soup = BeautifulSoup(webpage_content, 'html.parser')

    # Find ticker statistics
    stock_data = {}
    ticker = page.split("/")[5].split(':')[0]
    stock_data[ticker] = {}
    

    income_stmnt = soup.find_all('table')[0].get_text('|').split('|')
    balance_sheet = soup.find_all('table')[1].get_text('|').split('|')
    cash_flow = soup.find_all('table')[2].get_text('|').split('|')
    print(balance_sheet)

    # income_stmnt list has lots of text we don't need.
    # Once we find a column of interest (ie Revenue), the next 2 numerical values will have the figures we want for that column.
    # Adding 2 or 3 to the index lets us access the values
    rev_idx = income_stmnt.index('Revenue')
    rev_data = {}
    rev_data['value'] = income_stmnt[rev_idx+2]
    rev_data['y/y change'] = income_stmnt[rev_idx+3]
    stock_data[ticker]['Revenue'] = rev_data

    net_inc_idx = income_stmnt.index('Net income')
    net_inc_data = {}
    net_inc_data['value'] = income_stmnt[net_inc_idx+2]
    net_inc_data['y/y change'] = income_stmnt[net_inc_idx+3]
    stock_data[ticker]['Net Income'] = rev_data

    eps_idx = income_stmnt.index("Earnings per share")
    eps_data = {}
    eps_data['value'] = income_stmnt[eps_idx+2]
    eps_data['y/y change'] = income_stmnt[eps_idx+3]
    stock_data[ticker]['EPS'] = eps_data


    print(stock_data)


scrape_stock_page("https://www.google.com/finance/quote/GCT:NASDAQ?hl=en")
