# 🌤️ Live Weather App

A modern, responsive React web application that provides real-time weather information and a 7-day weekly weather forecast for any city worldwide. Built using React, Vite, Tailwind CSS, and the OpenWeatherMap API.

---

## 🔗 Live Demo
Check out the live application hosted on Vercel:  
👉 **[https://live-weather-app-gules.vercel.app/](https://live-weather-app-gules.vercel.app/)**

---

## 🚀 Features

* **Real-Time Weather Data:** View current temperatures, weather conditions, feels-like temperatures, wind speed, humidity, and atmospheric pressure.
* **Weekly Forecast Outlook:** Interactive 7-day forecast cards allowing users to select and inspect specific days.
* **Responsive Design:** Fully optimized layout for mobile phones, tablets, and desktop screens using Tailwind CSS.
* **Error Handling:** Graceful error messages for invalid city names or network issues.

---

## 🛠️ Tech Stack

* **Frontend Framework:** [React (Vite)](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **API:** [OpenWeatherMap API](https://openweathermap.org/)
* **Deployment & Hosting:** [Vercel](https://vercel.com/)
* **Version Control:** Git & GitHub

---

## 📁 Project Structure

```text
live-weather-app/
├── public/                # Public assets
├── src/
│   ├── assets/            # Images and static files
│   ├── service/           # API service files (weatherService.js)
│   ├── App.jsx            # Main application component
│   ├── App.css            # Custom styles
│   ├── index.css          # Tailwind CSS configurations
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables (Git-ignored)
├── .gitignore             # Files to ignore in Git tracking
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```
---

⚙️ Getting Started Locally
To run this project on your local machine, follow these steps:

1. Clone the repository
Bash
git clone [https://github.com/faizerumar/live-weather-app.git](https://github.com/faizerumar/live-weather-app.git)
cd live-weather-app

2. Install dependencies
Bash
npm install

3. Set up environment variables
Create a .env file in the root directory and add your OpenWeatherMap API key:

Code snippet
VITE_WEATHER_API_KEY=your_actual_api_key_here

4. Run the development server
Bash
npm run dev
Open http://localhost:5173 in your browser to view the app.


📄 License
This project is open-source and available under the MIT License.