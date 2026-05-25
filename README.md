<div align="center">

<img src="https://weather-web-sk.vercel.app/photo/images.png" alt="Weather Forecast App" width="120px" />

# 🌦️ Weather Forecast Dashboard

**A sleek, modern weather dashboard built for clarity — city search, live conditions, hourly graphs, and weekly forecasts all in one place.**

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-0EA5E9?style=for-the-badge)](https://weather-web-sk.vercel.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Canvas API](https://img.shields.io/badge/Canvas_API-Graph_Viz-6366F1?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## 📌 Project Overview

Weather Forecast Dashboard is an interactive, **dark-themed weather web application** that lets users search any city and instantly view current conditions, hourly temperature trends, and a 7-day weekly outlook — all in a clean, card-based dashboard layout.

The app is designed around **data clarity and visual hierarchy** — every piece of weather information is surfaced at a glance, from UV index to wind speed to precipitation probability, without overwhelming the user.

> 🌍 Search any city worldwide and get a full weather snapshot in seconds.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ayushi48/weather-forecast.git

# Navigate into the project
cd weather-forecast

# Open in browser
open index.html
```

Or visit the **[Live Demo →](https://weather-web-sk.vercel.app/)**

---

## ✨ Features

### 🔍 City Search & Selection
- Search any city by name worldwide
- Dynamic city selection with instant weather updates
- Smart input handling for smooth UX

### 🌡️ Current Weather Display
- Real-time temperature display in °C
- Weather condition label (Sunny / Cloudy / Rainy / Stormy etc.)
- "Feels like" temperature for perceived comfort index
- Local time display synced to the searched city's timezone

### 📊 Hourly Temperature Graph
- Temperature trend chart rendered using **HTML Canvas API**
- Hour-by-hour breakdown across the full day
- Smooth curve visualization for easy temperature reading
- Clean axis labels and readable chart layout

### 🌬️ Wind & Atmosphere
- Wind speed in km/h
- Wind direction indicator
- Humidity percentage with visual level bar
- UV index status (Low / Moderate / High / Very High)

### 🌧️ Precipitation & Rain
- Precipitation details (mm/h)
- Chance of rain percentage per hour and per day
- Visual rain probability indicators

### 📅 7-Day Weekly Forecast
- Full weekly weather outlook
- Daily high/low temperatures
- Rain probability per day
- Weather condition icons for each day

### 🎨 UI & Design
- Modern **dark-themed dashboard** layout
- Card-based weather data panels
- Weather-themed icons for each condition
- Clean typography optimized for data readability
- Smooth transitions and hover states

---

## 🗂️ Project Structure

```
weather-forecast/
├── index.html              # App entry point & layout
├── photo/
│   └── images.png          # Weather icon assets
├── style.css               # Dark theme & dashboard styles
└── script.js               # Weather logic, Canvas graph, DOM updates
```

---

## 📊 Data Visualization

The hourly temperature graph is built entirely with the **native HTML Canvas API** — no chart libraries required:

```
Canvas Graph Features:
  ✔  Plotted hour-by-hour temperature points
  ✔  Smooth curve interpolation between data points
  ✔  Readable X-axis (time) and Y-axis (°C) labels
  ✔  Responsive sizing to fit the dashboard card
  ✔  Lightweight — zero dependencies
```

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Semantic layout and structure |
| **CSS3** | Dark theme, card grid, responsive design |
| **JavaScript (ES6+)** | Weather logic, DOM manipulation, event handling |
| **Canvas API** | Hourly temperature graph rendering |
| **Vercel** | Deployment and hosting |

---

## 🔮 Roadmap

- [ ] 🌐 **Live Weather API Integration** — OpenWeatherMap / WeatherAPI
- [ ] 📍 **Auto-detect User Location** — Geolocation API
- [ ] 🌙 **Dark / Light Mode Toggle**
- [ ] 📱 **Fully Responsive Mobile UI**
- [ ] 🔔 **Weather Alerts & Severe Weather Notifications**
- [ ] 🗺️ **Interactive Weather Map** — precipitation & wind overlays
- [ ] 💾 **Search History** — recently searched cities
- [ ] 📤 **Export Forecast** — save as image or PDF
- [ ] 🌍 **Multi-language Support**
- [ ] 📲 **PWA Support** — installable, works offline

---

## 👩‍💻 Author

<div align="center">

### Ayushi Kumari
**Frontend Developer · MERN Stack Developer · React Enthusiast**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ayushi-kumari48/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ayushi48)

</div>

---

<div align="center">

**⭐ Star this repo if it helped you or inspired your own weather project!**

*Built with pure HTML, CSS, and JavaScript — no frameworks, no fluff.*

</div>
