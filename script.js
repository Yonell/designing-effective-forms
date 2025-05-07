let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');
const clicksInfo2 = document.getElementById('vatUE');
const invoiceContainer = document.getElementById('invoice-container');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const countryFetched = data.country;
            var countrySelect = document.getElementById("country");


            for(var i, j = 0; i = countrySelect.options[j]; j++) {
                if(i.value == countryFetched) {
                    countrySelect.selectedIndex = j;
                    break;
                }
            }
            getCountryCode(countryFetched); 
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });

}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCodeText = data[0].idd.root + data[0].idd.suffixes.join("")
        var countryCodeSelect = document.getElementById("countryCode");

        console.log("Code: " + countryCodeText)

        var found = false;

        for(var i, j = 0; i = countryCodeSelect.options[j]; j++) {
            if(i.value == countryCodeText) {
                found = true;
                countryCodeSelect.selectedIndex = j;
                break;
            }
            if(j == 5) {
                break;
            }
        }

        if(found == false){
            console.log("Code not found: " + countryCodeText)
        }

    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}


function handleClick2() {
    console.log(clicksInfo2);
    if (clicksInfo2.value)
    {
        invoiceContainer.classList.toggle('hidden');
    }
}


(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);

    fetchAndFillCountries();
    getCountryByIP();

    clicksInfo2.addEventListener('click', handleClick2);
})()