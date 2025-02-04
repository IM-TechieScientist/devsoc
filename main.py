from fastapi import FastAPI
from data_collection import sec_text,news,stocks
import uvicorn
app = FastAPI()

@app.get("/sec_reports/{company}")
async def get_sec_report(company: str):
    """End point to get processed ESG report"""
    text=sec_text.get_text(company)
    return text

@app.get("/long_stocks/{company}")
async def get_long_stock_trends(company: str):
    """End point to get stock trends over time"""
    return stocks.get_long_stock_data(company)

@app.get("/short_stocks/{company}")
async def get_short_stock_trends(company: str):
    """End point to get stock trends over time"""
    return stocks.get_short_stock_data(company)

@app.get("/pos_news/{company}")
async def get_pos_news(company: str):
    """End point to get recent positive news"""
    
    return news.get_company_news(company,"p")

@app.get("/neg_news/{company}")
async def get_neg_news(company: str):
    """End point to get recent negative news"""
    return news.get_company_news(company,"n")

# @app.get("/sentiment/{ticker}")
# async def get_sentiment(ticker: str):
#     """End point to get social sentiment analysis"""
#     return {"ticker": ticker, "sentiment": "Social sentiment analysis"}

if __name__ == "__main__":
    uvicorn.run(app, host="192.168.141.150", port=6969)