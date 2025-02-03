import yfinance as yf
import sqlite3

DB_FILE = "stocks.db"

def get_esg_score(ticker):
    """Fetch ESG score and sustainability data from Yahoo Finance"""
    stock = yf.Ticker(ticker)
    esg_data = stock.sustainability
    
    if esg_data is not None:
        return esg_data.to_json()
    else:
        return "No ESG data available for this company."
    
def get_stock_data(ticker):
    """Fetch historical stock prices and trends"""
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1y")  # Get 1 year of stock data
    
    #relevant data only
    hist.reset_index(inplace=True)
    hist = hist[['Date', 'Open', 'Close', 'Volume']]
    hist['Ticker'] = ticker

    #dump in sqlite3
    conn = sqlite3.connect(DB_FILE)
    hist.to_sql("stock_data", conn, if_exists="append", index=False)
    conn.close()

    return hist[['Open', 'Close', 'Volume']]

# esg=get_esg_score("AAPL")
# print(esg,type(esg))