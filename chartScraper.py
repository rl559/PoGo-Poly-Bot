from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
import json
import re

def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None.
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None

    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns True if the response seems to be HTML, False otherwise.
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


def log_error(e):
    """
    It is always a good idea to log errors.
    This function just prints them, but you can
    make it do anything.
    """
    print(e)

raw_html = simple_get('https://pokemongo.gamepress.gg/pokemon-type-chart-strengths-weakness');
html = BeautifulSoup(raw_html, 'html.parser');
while True:
    toSearch = input("Enter your input:")
    results = html.find("span", text=toSearch).parent.parent.find_all("div", {"class":"views-field views-field-field-type-chart"})[0].find("div").find("table").find_all("td")

    toJSON = {
        toSearch.lower():{
        "weak":{},
        "resist":{}
        }
    };
    #print results

    twoStep = 0
    nameHolder = ""
    for i in range(len(results)):
        if twoStep == 0:
            type = re.search('#[a-z]*',str(results[i])).group(0).replace("#","")
            if type == "electr":
                type = "electric"
            nameHolder = type
            twoStep = twoStep + 1
        elif twoStep == 1:
            value = float(re.sub(r'(x|-)+', "0", results[i].renderContents()))
            #print value
            if value < 1.0 and value > 0.0:
                toJSON[toSearch.lower()]["resist"][nameHolder] = value
            elif value > 1.0:
                toJSON[toSearch.lower()]["weak"][nameHolder] = value
            twoStep = 0
            nameHolder = ""
    jsonResult = json.dumps(toJSON)
    jsonResult = jsonResult[1:-1]
    print (jsonResult + ",")
