#!/usr/bin/python

from bs4 import BeautifulSoup
import httpx
import requests

# playground file to get used to using bs4 for scraping Google Finance
async def scrape_stock_page_async(ticker):

    """
        Scrape a Google finance page for a given stock

        ** Currently only works with stocks on the NASDAQ **
    """

    # TODO - Error handling!

    # async with httpx.AsyncClient() as client:
    #     response = await client.get(f"https://www.google.com/finance/quote/{ticker}:NASDAQ?hl=en")
        
    webpage_html = requests.get(f"https://www.google.com/finance/quote/{ticker}:NASDAQ?hl=en").text
    soup = BeautifulSoup(webpage_html, 'html.parser')

    # Find ticker statistics
    stock_data = {}
    stock_data[ticker] = {}
    
    print("CHECK")

    income_stmnt = soup.find_all('table')[0].get_text('|').split('|')
    balance_sht = soup.find_all('table')[1].get_text('|').split('|')
    cash_flow = soup.find_all('table')[2].get_text('|').split('|')


    # Income statement data

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

    # Balance sheet data
    total_assets_idx = balance_sht.index("Total assets")
    total_assets_data = {}
    total_assets_data['value'] = balance_sht[total_assets_idx+2]
    total_assets_data['y/y change'] = balance_sht[total_assets_idx+3]
    stock_data[ticker]['Total Assets'] = total_assets_data

    total_lia_idx = balance_sht.index("Total liabilities")
    total_lia_data = {}
    total_lia_data['value'] = balance_sht[total_lia_idx+2]
    total_lia_data['y/y change'] = balance_sht[total_lia_idx+3]
    stock_data[ticker]['Total Liabilities'] = total_lia_data

    # Cash flow data
    op_cash_idx = cash_flow.index("Cash from operations")
    op_cash_data = {}
    op_cash_data['value'] = cash_flow[op_cash_idx+2]
    op_cash_data['y/y change'] = cash_flow[op_cash_idx+3]
    stock_data[ticker]['Cash from Operations'] = op_cash_data

    finance_cash_idx = cash_flow.index("Cash from financing")
    finance_cash_data = {}
    finance_cash_data['value'] = cash_flow[finance_cash_idx+2]
    finance_cash_data['y/y change'] = cash_flow[finance_cash_idx+3]
    stock_data[ticker]['Cash from Financing'] = finance_cash_data

    return stock_data
