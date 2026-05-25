const button = document.getElementById('first_page_button');

button.addEventListener('click', (event) => {
  // event.preventDefault();

  const input = document.getElementById('cityInput').value.trim();
  console.log(input);
  
  const errorDiv = document.getElementById('error');

  errorDiv.innerText = '';

  if (!input) {
    errorDiv.innerText = 'Please enter a city name.';
    return;
  }

  fetch(`http://api.weatherapi.com/v1/forecast.json?key=5fa766cde44043a2aa6180948252605&q=${input}&days=7&aqi=yes&alerts=no`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found or network error");
      }
      return response.json(); 
    })
    .then(data => {
      // Saveconst button = document.getElementById('first_page_button');

button.addEventListener('click', (event) => {
  // event.preventDefault();

  const input = document.getElementById('cityInput').value.trim();
  console.log(input);
  
  const errorDiv = document.getElementById('error');

  errorDiv.innerText = '';

  if (!input) {
    errorDiv.innerText = 'Please enter a city name.';
    return;
  }

  fetch(`http://api.weatherapi.com/v1/forecast.json?key=5fa766cde44043a2aa6180948252605&q=${input}&days=7&aqi=yes&alerts=no`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found or network error");
      }
      return response.json(); 
    })
    .then(data => {
      // Save weather data to localStorage before going to second page
      localStorage.setItem('weatherData', JSON.stringify(data));
      window.location.href = "./w_second.html";
    })
    .catch(error => {
      errorDiv.innerText = `Error: ${error.message}`;
    });
});

//  weather data to localStorage before going to second page
      localStorage.setItem('weatherData', JSON.stringify(data));
      window.location.href = "./w_second.html";
    })
    .catch(error => {
      errorDiv.innerText = `Error: ${error.message}`;
    });
});

