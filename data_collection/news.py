from newspaper import Article
import requests
from bs4 import BeautifulSoup

def get_cik(company_name):
    """Fetch CIK for company name"""
    url = "https://www.sec.gov/files/company_tickers.json"
    response = requests.get(url, headers={"User-Agent": "Sample Company Name AdminContact@<sample company domain>.com"})
    
    if response.status_code == 200:
        data = response.json()
        for entry in data.values():
            if company_name.lower() in entry['title'].lower():
                return entry['title']
    return None

def get_company_news(company_name,pn):
    """Fetch recent news articles related to a company"""
    company_name=get_cik(company_name)+" positive" if pn=="p" else get_cik(company_name)+" negative"
    search_url = f"https://www.google.com/search?q={company_name}+news&tbm=nws"
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    titles = []
    for result in soup.find_all("div", class_="BNeawe vvjwJb AP7Wnd"):
        title = result.get_text()
        titles.append(title)

    return titles

# Example usage
# news = get_company_news("Oracle negative")
# print(news)
