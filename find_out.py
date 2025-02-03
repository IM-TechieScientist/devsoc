# import yfinance as yf
# import pandas as pd

# def fetch_esg_score(ticker):
#     """Fetch ESG score from Yahoo Finance"""
#     stock = yf.Ticker(ticker)
#     esg_data = stock.sustainability
#     return esg_data

# def fetch_stock_data(ticker):
#     """Fetch historical stock prices from Yahoo Finance"""
#     stock = yf.Ticker(ticker)
#     hist = stock.history(period="1y")  # Get 1 year of stock data
#     hist.reset_index(inplace=True)
#     hist = hist[['Date', 'Open', 'Close', 'Volume']]
#     return hist

# def merge_data(ticker):
#     """Merge ESG score with stock data"""
#     # Fetch ESG score and stock data
#     esg_data = fetch_esg_score(ticker)
#     stock_data = fetch_stock_data(ticker)

#     # Convert ESG data into DataFrame (assuming we can get a date and ESG score)
#     esg_df = pd.DataFrame([esg_data], columns=['Date', 'ESG_Score'])
#     esg_df['Date'] = pd.to_datetime(esg_df['Date'])

#     # Merge ESG and stock data on Date
#     merged_data = pd.merge(stock_data, esg_df, on='Date', how='inner')

#     return merged_data

# # Example: Merge stock and ESG data for Tesla
# merged_data = merge_data("TSLA")
# print(merged_data.head())

# import requests
# from bs4 import BeautifulSoup

# def fetch_glassdoor_reviews(company_name):
#     """Scrape basic Glassdoor reviews for a given company"""
#     search_url = f"https://www.glassdoor.co.in/Reviews/Tesla-Reviews-E43129.htm"
    
#     headers = {"User-Agent": "Mozilla/5.0"}
#     response = requests.get(search_url, headers=headers)

#     if response.status_code == 200:
#         soup = BeautifulSoup(response.text, 'html.parser')
#         reviews = soup.find_all('span', class_='review-text')

#         review_list = [review.text for review in reviews]
#         return review_list
#     else:
#         return "Failed to fetch data."

# # Example: Get Tesla employee reviews
# reviews = fetch_glassdoor_reviews("Tesla")
# print(reviews[:5])  # Show first 5 reviews

import tweepy

# Twitter API credentials (replace with actual keys)
API_KEY = "ND8Ast9llps88XyGF7hUKRowM"
API_SECRET = "kMd6wLU3pgsygJ3iDzwjmddBQrJOxLJu6HB0hIvpgzkuYCYENr"
ACCESS_TOKEN = "1886442087547363328-w9YOOanVbUznESTO3dtwYQIWVhlsUo"
ACCESS_SECRET = "7Gp16W6OFHwLlUUNhhPd07anxRpT8989fUdhSctd4fY9a"

# Authenticate with Twitter API
auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
api = tweepy.API(auth)

def fetch_tweets(company):
    """Fetch latest tweets mentioning a company"""
    tweets = api.search_tweets(q=company, lang="en", count=100)
    return [tweet.text for tweet in tweets]

# Example: Get Tesla tweets
tweets = fetch_tweets("Glassdoor")
print(tweets[:5])  # Show first 5 tweets
