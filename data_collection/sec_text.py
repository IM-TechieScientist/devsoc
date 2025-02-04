import requests
import pandas as pd
from bs4 import BeautifulSoup
import time

SEC_BASE_URL = "https://data.sec.gov/submissions/"

#sec requiring custom user-agent is sus af
HEADERS = {"User-Agent": "Sample Company Name AdminContact@<sample company domain>.com"}
SEC_EDGAR_BASE = "https://www.sec.gov/Archives/edgar/data/"

def get_cik(company_name):
    """Fetch CIK for company name"""
    url = "https://www.sec.gov/files/company_tickers.json"
    response = requests.get(url, headers={"User-Agent": "Sample Company Name AdminContact@<sample company domain>.com"})
    
    if response.status_code == 200:
        data = response.json()
        for entry in data.values():
            if company_name.lower() in entry['title'].lower():
                return str(entry['cik_str']).zfill(10),entry['title']
    return None

def get_company_filings(cik):
    """Fetch latest 10-K (annual) filings for a company using its CIK"""
    url = f"{SEC_BASE_URL}CIK{cik}.json"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        data = response.json()
        filings = data['filings']['recent']
        df = pd.DataFrame(filings)
        df = df[df['form'] == '10-K']
        return df[['accessionNumber', 'filingDate', 'primaryDocument']]
    else:
        print("Error fetching data:", response.status_code)
        return None

def extract_esg_text(cik,filing_date,accession_number, document_name):
    """Fetch and extract ESG-relevant sections from a 10-K report"""
    
    url = f"{SEC_EDGAR_BASE}{cik}/{accession_number.replace('-', '')}/{document_name}"
    response = requests.get(url, headers={"User-Agent": "Sample Company Name AdminContact@<sample company domain>.com"})
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        
        text = soup.get_text(separator="\n")
        
        esg_keywords = ["sustainability", "climate risk", "carbon", "emissions", "social responsibility", "diversity", "ESG"]
        esg_sections = []
        
        for line in text.split("\n"):
            if any(keyword in line.lower() for keyword in esg_keywords):
                esg_sections.append(line.strip())

        return filing_date+" "+"\n".join(esg_sections)+" \n \n "
    
    else:
        print(f"Failed to fetch {url}")
        return None

def get_text(cmp):
    # cmp=input("Enter company to get CIK and extract ESG text : ")
    cik = get_cik(cmp)[0]
    filings = get_company_filings(cik)
    print(filings,type(filings))

    for i in filings[1:6].to_dict(orient='records'):
        esg_text = extract_esg_text(cik, i['filingDate'],i['accessionNumber'], i['primaryDocument'])
        with open(f"esg_text_{cik}.txt", "a") as file:
            file.write(esg_text)
        print(esg_text)
        print("-" * 50)
        print("Taking a powernap")
        time.sleep(5)
    with open(f"esg_text_{cik}.txt") as file:
        return file.read()