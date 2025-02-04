import yfinance as yf
import requests
# import sqlite3

# DB_FILE = "stocks.db"

def get_ticker(company_name):
    """Fetch CIK for company name"""
    url = "https://www.sec.gov/files/company_tickers.json"
    response = requests.get(url, headers={"User-Agent": "Sample Company Name AdminContact@<sample company domain>.com"})
    
    if response.status_code == 200:
        data = response.json()
        for entry in data.values():
            if company_name.lower() in entry['title'].lower():
                return entry['ticker']
    return None
def get_esg_score(company):
    """Fetch ESG score and sustainability data from Yahoo Finance"""
    company=get_ticker(company)
    stock = yf.Ticker(company)
    esg_data = stock.sustainability
    
    if esg_data is not None:
        return esg_data.to_json()
    else:
        return "No ESG data available for this company."
    
def get_long_stock_data(company):
    """Fetch historical stock prices and trends"""
    company=get_ticker(company)

    stock = yf.Ticker(company)
    hist = stock.history(period="1y")  # Get 1 year of stock data
    
    #relevant data only
    hist.reset_index(inplace=True)
    hist = hist[['Date', 'Open', 'Close', 'Volume']]
    hist['Ticker'] = company
    return hist[['Open', 'Close', 'Volume']].to_csv()

def get_short_stock_data(company):
    """Fetch recent stock prices"""
    stock = yf.Ticker(company)
    hist = stock.history(period="1d")  # Get 1 year of stock data
    
    #relevant data only
    hist.reset_index(inplace=True)
    hist = hist[['Date', 'Open', 'Close', 'Volume']]
    hist['Ticker'] = company
    return hist[['Open', 'Close', 'Volume']].to_csv()

    # #dump in sqlite3
    # conn = sqlite3.connect(DB_FILE)
    # hist.to_sql("stock_data", conn, if_exists="append", index=False)
    # conn.close()

    

# esg=get_esg_score("AAPL")
# print(esg,type(esg))