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


// Live Weather Fetcher  Modal Functionality //
const modal = document.getElementById('weatherModal');
const showMoreBtn = document.getElementById('showMoreBtn');
const closeModal = document.getElementById('closeModal');

if (showMoreBtn && modal && closeModal) {
  showMoreBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Helper to convert WMO Weather Codes to text & icons
function getWeatherDetails(code) {
  // WMO Weather interpretation codes (Open-Meteo standard)
  if (code === 0) return { text: 'Clear Sky', icon: 'fa-solid fa-sun' };
  if ([1, 2, 3].includes(code)) return { text: 'Partly Cloudy', icon: 'fa-solid fa-cloud-sun' };
  if ([45, 48].includes(code)) return { text: 'Foggy', icon: 'fa-solid fa-smog' };
  if ([51, 53, 55, 56, 57].includes(code)) return { text: 'Drizzle', icon: 'fa-solid fa-cloud-rain' };
  if ([61, 63, 65, 66, 67].includes(code)) return { text: 'Rain Showers', icon: 'fa-solid fa-cloud-showers-heavy' };
  if ([71, 73, 75, 77].includes(code)) return { text: 'Snow', icon: 'fa-solid fa-snowflake' };
  if ([95, 96, 99].includes(code)) return { text: 'Thunderstorm', icon: 'fa-solid fa-cloud-bolt' };
  return { text: 'Season Active', icon: 'fa-solid fa-cloud-sun' };
}

// Format short weekday name (e.g., Wed, Thu)
function getDayName(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

// Fetch Live Weather from Open-Meteo API for Colombo 
async function fetchLiveWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=6.9271&longitude=79.8612&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto');
    const data = await response.json();

    // 1. Current Weather Update
    const currentTemp = Math.round(data.current.temperature_2m);
    const currentWeatherCode = data.current.weather_code;
    const weatherInfo = getWeatherDetails(currentWeatherCode);

    document.getElementById('current-temp').innerText = `${currentTemp}°C`;
    document.getElementById('weather-desc').innerText = weatherInfo.text;
    document.getElementById('weather-main-icon').className = `${weatherInfo.icon} weather-mini-icon`;

    // 2. Daily Forecast Updates (Day 1 = Tomorrow, Day 2 = In 2 Days)
    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;
    const codes = data.daily.weather_code;

    // Tomorrow (Index 1)
    const day1Name = getDayName(dates[1]);
    const day1Max = Math.round(maxTemps[1]);
    const day1Min = Math.round(minTemps[1]);
    const day1Info = getWeatherDetails(codes[1]);

    // In 2 Days (Index 2)
    const day2Name = getDayName(dates[2]);
    const day2Max = Math.round(maxTemps[2]);
    const day2Min = Math.round(minTemps[2]);
    const day2Info = getWeatherDetails(codes[2]);

    // Update Widget Pills
    document.getElementById('pill-day-1').innerHTML = `Tomorrow: <strong>${day1Max}°C / ${day1Min}°C</strong> <i class="${day1Info.icon}" style="color: #3498db; margin-left: 3px;"></i>`;
    document.getElementById('pill-day-2').innerHTML = `In 2 Days: <strong>${day2Max}°C / ${day2Min}°C</strong> <i class="${day2Info.icon}" style="color: #f1c40f; margin-left: 3px;"></i>`;

    // Update Modal List
    document.getElementById('modal-day-1-name').innerText = `Tomorrow (${day1Name})`;
    document.getElementById('modal-day-1-val').innerText = `${day1Info.text} • ${day1Max}°C / ${day1Min}°C`;

    document.getElementById('modal-day-2-name').innerText = `In 2 Days (${day2Name})`;
    document.getElementById('modal-day-2-val').innerText = `${day2Info.text} • ${day2Max}°C / ${day2Min}°C`;

    // Update Graph labels and heights dynamically
    document.getElementById('label-day-1').innerText = day1Name;
    document.getElementById('label-day-2').innerText = day2Name;

    document.getElementById('graph-val-0').innerText = `${currentTemp}°`;
    document.getElementById('graph-val-1').innerText = `${day1Max}°`;
    document.getElementById('graph-val-2').innerText = `${day2Max}°`;

    // Calculate dynamic bar heights relative to a 40°C max scale
    document.getElementById('bar-0').style.height = `${(currentTemp / 40) * 100}%`;
    document.getElementById('bar-1').style.height = `${(day1Max / 40) * 100}%`;
    document.getElementById('bar-2').style.height = `${(day2Max / 40) * 100}%`;

  } catch (error) {
    console.error('Error fetching live weather data:', error);
    document.getElementById('weather-desc').innerText = 'Weather update failed';
  }
}

// Run on page load
fetchLiveWeather();
