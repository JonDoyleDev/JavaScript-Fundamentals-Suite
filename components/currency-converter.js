const apiKey = 'API-KEY';
const apiUrl = 'https://v6.exchangerate-api.com/v6/';

document.addEventListener('DOMContentLoaded', () => {
    populateCurrencyOptions();
    document.getElementById('convert-button').addEventListener('click', convertCurrency);
});

function populateCurrencyOptions() {
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'NZD']; 
    const select1 = document.getElementById('currency1-select');
    const select2 = document.getElementById('currency2-select');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;
        select1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        select2.appendChild(option2);
    });
}

async function convertCurrency() {
    const fromCurrency = document.getElementById('currency1-select').value;
    const toCurrency = document.getElementById('currency2-select').value;
    const amount = parseFloat(document.getElementById('currency1-amount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${apiKey}/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        const result = (amount * rate).toFixed(2);

        document.getElementById('currency2-result').value = `${result} ${toCurrency}`;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

function openIndexPage() {
    window.location.href = '/index.html';
}