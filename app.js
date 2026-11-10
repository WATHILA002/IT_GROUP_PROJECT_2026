/* LANKA STAY / LANKA GO - MASTER JS CONTROLLER */
const sysState = {
  lang: localStorage.getItem('lankastay_lang') || 'en',
  currency: 'LKR',
  usdRate: 0.0033, // 1 LKR = 0.0033 USD
  darkMode: localStorage.getItem('lankastay_darkmode') === 'true',
  savedPlaces: [],
  bookings: [
    { id: 'BK-9982', hotel: 'Sigiriya Village Hotel', dates: '2026-11-10 to 2026-11-12', price: 17000, status: 'Confirmed' }
  ]
};

// Global Dark Mode Toggle with localStorage persistence across all pages
function toggleDarkMode() {
  sysState.darkMode = !sysState.darkMode;
  localStorage.setItem('lankastay_darkmode', sysState.darkMode);
  applyDarkMode();
}

function applyDarkMode() {
  const isDark = localStorage.getItem('lankastay_darkmode') === 'true';
  const apps = document.querySelectorAll('.app');
  apps.forEach(app => {
    if (isDark) {
      app.classList.add('dark-mode');
    } else {
      app.classList.remove('dark-mode');
    }
  });
}

// Currency Changer
function toggleCurrency() {
  sysState.currency = sysState.currency === 'LKR' ? 'USD' : 'LKR';
  document.querySelectorAll('.sys-curr-btn').forEach(btn => btn.textContent = sysState.currency);
  updateCurrencyDisplays();
}

function updateCurrencyDisplays() {
  document.querySelectorAll('[data-lkr]').forEach(el => {
    const lkrVal = parseFloat(el.getAttribute('data-lkr'));
    if (sysState.currency === 'USD') {
      el.textContent = '$' + (lkrVal * sysState.usdRate).toFixed(1);
    } else {
      el.textContent = 'LKR ' + lkrVal.toLocaleString();
    }
  });
}


// Live Weather Fetcher
async function fetchWeather() {
  const tempEl = document.getElementById('current-temp');
  const descEl = document.getElementById('weather-desc');
  if (!tempEl) return;

  try {
    const apiKey = '3ba26e744868e7c268fffe1fbeea5b93';
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Colombo&units=metric&appid=${apiKey}`);
    if (res.ok) {
      const data = await res.json();
      tempEl.innerText = `${Math.round(data.main.temp)}°C`;
      descEl.innerText = data.weather[0].description;
    } else {
      console.log('Weather status:', res.status);
      tempEl.innerText = '29°C';
      descEl.innerText = 'Sunny & Tropical';
    }
  } catch (e) {
    console.log('Weather error:' , e);
    tempEl.innerText = '29°C';
    descEl.innerText = 'Sunny & Tropical';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyDarkMode();
  fetchWeather();
  if (typeof setLanguage === 'function') {
    setLanguage(sysState.lang);
  }
});

