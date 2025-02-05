#!/usr/bin/python

from bs4 import BeautifulSoup
import requests
from datetime import datetime as dt, timedelta


# Create class that initialises async session
# Add method to check different markets if stock doesn't exist on NASDAQ/NYSE/Etc?

# playground file to get used to using bs4 for scraping Google Finance


async def scrape_stock_page(ticker):

    """
        Scrape a Google finance page for a given stock

        ** Currently only works with stocks on the NASDAQ **
    """

    # TODO - Error handling!
    # TODO - Make async? (Does it need to be??)
    # Could be a bottleneck if multiple users request stock data simultaneously (unlikely)
        
    response = requests.get(f"https://www.google.com/finance/quote/{ticker}:NASDAQ?hl=en")
    webpage_html = response.text
    date_fetched = response.headers['Date']

    # Parse date
    date = dt.now()
    expires = (date + timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")

    soup = BeautifulSoup(webpage_html, 'html.parser')

    # Find ticker statistics
    stock_data = {}
    stock_data[ticker] = {}
    stock_data[ticker]['fetched_at'] = {'date': date.strftime("%Y-%m-%d %H:%M:%S"), 'expires': expires}
    
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
    rev_data['yy_change'] = income_stmnt[rev_idx+3]
    rev_data['display_name'] = 'Revenue'
    stock_data[ticker]['revenue'] = rev_data

    net_inc_idx = income_stmnt.index('Net income')
    net_inc_data = {}
    net_inc_data['value'] = income_stmnt[net_inc_idx+2]
    net_inc_data['yy_change'] = income_stmnt[net_inc_idx+3]
    net_inc_data['display_name'] = "Net Income"
    stock_data[ticker]['net_income'] = net_inc_data

    eps_idx = income_stmnt.index("Earnings per share")
    eps_data = {}
    eps_data['value'] = income_stmnt[eps_idx+2]
    eps_data['yy_change'] = income_stmnt[eps_idx+3]
    eps_data['display_name'] = "EPS"
    stock_data[ticker]['eps'] = eps_data

    # Balance sheet data
    total_assets_idx = balance_sht.index("Total assets")
    total_assets_data = {}
    total_assets_data['value'] = balance_sht[total_assets_idx+2]
    total_assets_data['yy_change'] = balance_sht[total_assets_idx+3]
    total_assets_data['display_name'] = "Total Assets"
    stock_data[ticker]['total_assets'] = total_assets_data

    total_lia_idx = balance_sht.index("Total liabilities")
    total_lia_data = {}
    total_lia_data['value'] = balance_sht[total_lia_idx+2]
    total_lia_data['yy_change'] = balance_sht[total_lia_idx+3]
    total_lia_data['display_name'] = "Total liabilities"
    stock_data[ticker]['total_liabilities'] = total_lia_data

    # Cash flow data
    op_cash_idx = cash_flow.index("Cash from operations")
    op_cash_data = {}
    op_cash_data['value'] = cash_flow[op_cash_idx+2]
    op_cash_data['yy_change'] = cash_flow[op_cash_idx+3]
    op_cash_data['display_name'] = 'Cash From Operations'
    stock_data[ticker]['cash_from_operations'] = op_cash_data

    finance_cash_idx = cash_flow.index("Cash from financing")
    finance_cash_data = {}
    finance_cash_data['value'] = cash_flow[finance_cash_idx+2]
    finance_cash_data['yy_change'] = cash_flow[finance_cash_idx+3]
    finance_cash_data['display_name'] = "Cash From Financing"
    stock_data[ticker]['cash_from_financing'] = finance_cash_data

    # TODO - improve structure of data
    # stock_data[ticker] = {
    #     'revenue': income_stmnt[rev_idx+2],
    #     'revenue_yy': income_stmnt[rev_idx+3],
    #     'net_income': income_stmnt[net_inc_idx+2],
    #     'net_income_yy' : income_stmnt[net_inc_idx+3],
    #     'eps': income_stmnt[eps_idx+2],
    #     'eps_yy': income_stmnt[eps_idx+3],
    #     'total_assets': balance_sht[total_assets_idx+2],
    #     'total_assets_yy': balance_sht[total_assets_idx+3],
    #     'total_liabilities': balance_sht[total_lia_idx+2],
    #     'total_liabilities_yy': balance_sht[total_lia_idx+3],
    #     'cash_from_operations': cash_flow[op_cash_idx+2],
    #     'cash_from_operations_yy': cash_flow[op_cash_idx+3],
    #     'cash_from_financing': cash_flow[finance_cash_idx+2],
    #     'cash_from_financing_yy': cash_flow[finance_cash_idx+3],
    #     'fetched_at': date.strftime("%Y-%m-%d %H:%M:%S"),
    #     'expires': expires,
    # }

    return stock_data
