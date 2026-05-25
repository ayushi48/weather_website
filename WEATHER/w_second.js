window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('weatherData'));

  if (!data) {
    // Redirect back if no data found
    window.location.href = './weather[1].html';
    return;
  }
  // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Populate data
  // let today = new Date();
  // let hours = today.getHours().toString().padStart(2, '0');
  // let minutes = today.getMinutes().toString().padStart(2, '0');
  // let day = today.getDate();
  // let month = today.toLocaleString('en-US', { month: 'short' }); // "Jan", "Feb", etc.
  // let year = today.getFullYear().toString().slice(-2); // last two digits
  // let formattedDate = `${day} ${month} ${year}`; // e.g., "27 May 25"
  // setInterval(() => {

  //   document.getElementById('day').innerHTML = `${days[today.getDay()]}, ${hours}:${minutes}`;
  // }, 1000);
  // document.getElementById('weatherIcon').src = "https:" + data.current.condition.icon;
  // document.getElementById('Temperature').innerHTML = `${data.current.temp_c}<sup>°C</sup>`;
  // document.getElementById('date').innerText = formattedDate;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Update time every second with hours, minutes, and seconds
  setInterval(() => {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('day').innerHTML = `${days[now.getDay()]}, ${hours}:${minutes}:${seconds}`;
  }, 1000);

  // Format and set the date once
  let today = new Date();
  let day = today.getDate();
  let month = today.toLocaleString('en-US', { month: 'short' }); // e.g., "Jun"
  let year = today.getFullYear().toString().slice(-2); // e.g., "25"
  let formattedDate = `${day} ${month} ${year}`;
  document.getElementById('date').innerText = formattedDate;

  // Assume `data` is a valid object from your weather API response
  document.getElementById('weatherIcon').src = "https:" + data.current.condition.icon;
  document.getElementById('Temperature').innerHTML = `${data.current.temp_c}<sup>°C</sup>`;

  // ============================================================================================

  // ============================================================================================



  // Graph for the temp at every hour
  if (
    data.forecast &&
    data.forecast.forecastday &&
    data.forecast.forecastday[0] &&
    data.forecast.forecastday[0].hour
  ) {
    const hourly = data.forecast.forecastday[0].hour;
    const labels = hourly.map(hour => hour.time.split(' ')[1]); // HH:MM
    const temps = hourly.map(hour => hour.temp_c);

    const ctx = document.getElementById('tempChart').getContext('2d');

    // Create vertical linear gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 255, 221, 0.5)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temps,
          backgroundColor: gradient,
          borderColor: 'rgba(255, 255, 255, 0.9)',
          borderWidth: 2,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: 'white',
          pointBorderColor: 'yellow',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hour of Day',
              color: 'white',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            ticks: {
              color: 'white'
            },
            grid: {
              display: true,
              color: (context) => context.tick.value === 0 ? "white" : ""
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
              color: 'white',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              color: 'white'
            },
            grid: {
              display: true,
              color: (context) => context.tick.value === 0 ? "white" : ""
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          },
          tooltip: {
            bodyColor: 'black',
            backgroundColor: 'rgba(149, 8, 8, 0.7)'
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuad'
        }
      }
    });
  } else {
    console.error("Hourly forecast data is missing.");
  }

  // ===============================================================================

  // Wind Gauge chart code below (inside DOMContentLoaded for guaranteed data access)
  const ctx2 = document.getElementById('windGauge').getContext('2d');

  const windSpeed = data.current.wind_kph;
  // document.getElementById('windValueText').innerText = `${windSpeed} km/h`;
  const maxSpeed = 40;

  // Plugin to draw wind speed text inside the chart
  const centerTextPlugin = {
    id: 'centerTextPlugin',
    afterDraw(chart) {
      const { ctx, chartArea } = chart;
      ctx.save();
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#4b9bff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // ctx.color='black';
      ctx.fillText(`${windSpeed} km/h ${data.current.wind_dir}`, (chartArea.left + chartArea.right) / 2, chartArea.bottom - 10);
      ctx.restore();
    }
  };

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Wind', 'Remaining'],
      datasets: [{
        data: [windSpeed, maxSpeed - windSpeed],
        backgroundColor: ['#4b9bff', '#e0e0e0'],
        borderWidth: 0,
        cutout: '75%',
        rotation: -90,
        circumference: 180
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    },
    plugins: [centerTextPlugin]
  });


  // =======================================================================

  const rainvalue = data.forecast.forecastday[0].day.daily_chance_of_rain
  // const rainvalue = 30
  const max_rain = 100
  const percent_rain = (rainvalue / max_rain) * 100;

  document.getElementById("rainValue").textContent = `${rainvalue}%`;
  // setTimeout(() => {
  //   // document.getElementById("fill_bar_feel_like").style.width = percent_temp + "%";
  // }, 100);
  document.getElementById("fill_bar_rain").style.width = percent_rain + "%";

  // ==========================================================================
  const feel_like = data.current.feelslike_c
  const max_temp = 50;
  const percent_temp = (feel_like / max_temp) * 100;
  document.getElementById("feels_like").textContent = `${feel_like}°`;
  document.getElementById("fill_bar_feel_like").style.width = percent_temp + "%";



  // setTimeout(() => {
  //   // document.getElementById("fill_bar_rain").style.width = percent_rain + "%";
  // }, 100);

  // ===================================================================================
  // ================================== UV =================================
  const uv_value = data.current.uv
  // const uv_value = 3

  document.getElementById('uv_like').textContent = `${uv_value} medium`
  const uv_fill1 = document.getElementById('uv_fill1')
  const uv_fill2 = document.getElementById('uv_fill2')
  const uv_fill3 = document.getElementById('uv_fill3')
  const uv_fill4 = document.getElementById('uv_fill4')
  const uv_fill5 = document.getElementById('uv_fill5')

  if (uv_value <= 2) {
    uv_fill1.style.width = (uv_value / .02) + '%'
  }
  else if (uv_value <= 4) {
    uv_fill1.style.width = '100%'
    uv_fill2.style.width = ((uv_value - 2) / .02) + '%'
  }
  else if (uv_value <= 7) {
    uv_fill1.style.width = '100%'
    uv_fill2.style.width = '100%'
    uv_fill3.style.width = ((uv_value - 4) / .03) + '%'
  }
  else if (uv_value <= 10) {
    uv_fill1.style.width = '100%'
    uv_fill2.style.width = '100%'
    uv_fill3.style.width = '100%'
    uv_fill4.style.width = ((uv_value - 7) / .03) + '%'
  }
  else {
    uv_fill1.style.width = '100%'
    uv_fill2.style.width = '100%'
    uv_fill3.style.width = '100%'
    uv_fill4.style.width = '100%'
    uv_fill5.style.width = '100%'

  }

  //============================ humidity ================================================

  const humidity_value = data.current.humidity
  // const humidity_value = 55

  const humidity_fill1 = document.getElementById('fill_bar_humidity_value1')
  const humidity_fill2 = document.getElementById('fill_bar_humidity_value2')
  const humidity_fill3 = document.getElementById('fill_bar_humidity_value3')

  if (humidity_value <= 30) {
    humidity_fill1.style.width = (humidity_value / .3) + '%'
    document.getElementById('humidity_value').textContent = `${humidity_value}% good`
  }
  else if (humidity_value <= 60) {
    humidity_fill1.style.width = '100%'
    humidity_fill2.style.width = ((humidity_value - 30) / .3) + '%'
    document.getElementById('humidity_value').textContent = `${humidity_value}% normal`
  }
  else if (humidity_value <= 100) {
    humidity_fill1.style.width = '100%'
    humidity_fill2.style.width = '100%'
    humidity_fill3.style.width = ((humidity_value - 60) / .4) + '%'
    document.getElementById('humidity_value').textContent = `${humidity_value}% bad`

  }



  for (let i = 0; i < 7; i++) {
    const bar3_day = document.getElementById('bar3_day');

    const bar3_day_info_box = document.createElement('div');
    bar3_day_info_box.className = 'bar3_day_info_box';

    const bar3_day_img = document.createElement('div');
    bar3_day_img.className = 'bar3_day_img';

    const day1 = document.createElement('p');
    day1.id = `day${i + 1}`;

    const imgday1 = document.createElement('div');
    imgday1.className = 'imgday1';

    const day1_img = document.createElement('img');
    day1_img.id = `day${i + 1}_img`;

    const rain_perc_day1 = document.createElement('p');
    rain_perc_day1.id = `rain_perc_day${i + 1}`;

    imgday1.appendChild(day1_img);
    imgday1.appendChild(rain_perc_day1);

    bar3_day_img.appendChild(day1);
    bar3_day_img.appendChild(imgday1);

    bar3_day_info_box.appendChild(bar3_day_img);

    // ================================================

    const bar3_day_bar = document.createElement('div');
    bar3_day_bar.className = 'bar3_day_bar';

    const min_tem_day1 = document.createElement('p');
    min_tem_day1.id = `min_tem_day${i + 1}`;

    const bar3_temp = document.createElement('div');
    bar3_temp.className = 'bar3_temp';

    const bar3_temp_fill1 = document.createElement('div');
    bar3_temp_fill1.id = `bar3_temp_fill${i + 1}`;

    bar3_temp.appendChild(bar3_temp_fill1);

    const max_tem_day1 = document.createElement('p');
    max_tem_day1.id = `max_tem_day${i + 1}`;

    bar3_day_bar.appendChild(min_tem_day1);
    bar3_day_bar.appendChild(bar3_temp);
    bar3_day_bar.appendChild(max_tem_day1);

    bar3_day_info_box.appendChild(bar3_day_bar);

    bar3_day.appendChild(bar3_day_info_box);

    // Fill the content with forecast data:
    document.getElementById(`day${i + 1}`).textContent = days[(today.getDay() + i) % 7].slice(0, 3);
    document.getElementById(`rain_perc_day${i + 1}`).innerHTML = `Precipitation ${data.forecast.forecastday[i].day.daily_chance_of_rain} %`;
    document.getElementById(`day${i + 1}_img`).src = "https:" + data.forecast.forecastday[i].day.condition.icon;
    document.getElementById(`min_tem_day${i + 1}`).textContent = `${data.forecast.forecastday[i].day.mintemp_c}°C`;
    document.getElementById(`max_tem_day${i + 1}`).textContent = `${data.forecast.forecastday[i].day.maxtemp_c}°C`;
    document.getElementById(`bar3_temp_fill${i + 1}`).style.width = (data.forecast.forecastday[i].day.maxtemp_c / 0.5) + '%';
  }



  // =========================  air quality  ===================================================================


  // const air_quality_value = 7
  const air_quality_value = data.current.air_quality["us-epa-index"]
  document.getElementById('bar1_air_quality_value_num').innerHTML = air_quality_value;
  const AQI_COLORS = [
    "#7A7A7A",  // Unknown/Gray
    "#009900",  // Good
    "#CCCC00",  // Moderate
    "#CC6600",  // Unhealthy for Sensitive Groups
    "#CC0000",  // Unhealthy
    "#663399",  // Very Unhealthy
    "#660000"   // Hazardous
  ];
  const bar1_air_quality_value = ["------", "Good", "Normal", "Bad"]
  document.getElementById('bar1_air_quality_value').innerHTML = bar1_air_quality_value[Math.floor((air_quality_value + 1) / 2)]
  document.getElementById('bar1_air_quality_indicator').style.backgroundColor = AQI_COLORS[air_quality_value]



  // ===================================  Precipitation_value  ======================================


  const Precipitation_value = data.current.precip_mm
  // const Precipitation_value = 66
  const loop1 = Math.floor(Precipitation_value / 10);
  const remainder = Precipitation_value % 10;

  // Update text
  document.getElementById('Precipitation_value').textContent = `${Precipitation_value}mm`;

  // Fill full bars
  for (let i = 1; i <= loop1; i++) {
    document.getElementById(`fill_bar_Precipitation_value${i}`).style.width = '100%';
  }

  // Fill partial bar if needed
  if (remainder > 0 && loop1 < 10) {
    document.getElementById(`fill_bar_Precipitation_value${loop1 + 1}`).style.width = `${remainder * 10}%`;
  }

  // ==================================  sun timing ==================================

  document.getElementById('sun_rise_label').textContent = data.forecast.forecastday[0].astro.sunrise
  document.getElementById('sun_set_label').textContent = data.forecast.forecastday[0].astro.sunset

  // =============================presure================================
  document.getElementById('presure_value').textContent = `${data.current.pressure_mb} mb`


  // ================================ moon phase ======================================


  document.getElementById('moon_value').textContent = data.forecast.forecastday[0].astro.moon_phase

  // =====================================================================

  const nighr_img = ['N1.jpg', 'N2.jpg', 'N3.webp', 'N4.jpg', "N5.jpg"]
  const Morning_img = ['M1.jpg', 'M2.jpg', 'M5.webp', 'M4.jpg', "M3.jpg"]
  const evening_img = ['E1.jpg', 'E2.jpg', 'E5.jpg', 'E4.jpg', "E3.jpg"]
  const afternoon_img = ['A1.jpg', 'A2.jpg', 'A5.jpg', 'A4.jpg', "A3.jpg"]
  let background_img;

  // ===============================  greeding  ===========================================

  const container = document.getElementById('bar3_location');
  let greeting = 'Good Day';

  if (hours >= 5 && hours < 12) {
    greeting = "Good Morning";
    background_img = Morning_img
    // document.getElementById('message_bar3').textContent='faefe'
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
    background_img = afternoon_img
  } else if (hours >= 17 && hours < 21) {
    greeting = "Good Evening";
    background_img = evening_img
  } else {
    greeting = "Good Night";
    background_img = nighr_img;
  }

  document.getElementById('weather_text_greeding').textContent = `${greeting},`
  document.getElementById('weather_text').textContent = `The weather today is ${data.current.condition.text}.`

  // ========================================================================

  function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * background_img.length);
    container.style.backgroundImage = `url(${background_img[randomIndex]})`;
  }

  setRandomBackground();
  // Call once on load

  // ======================================================================

  document.getElementById('bar3_location').textContent = `${data.location.name},${data.location.country}`

  // ======================================================================


});













// ===========================================================================================
//  =========================== 7 day ===================================

// document.getElementById('day1').textContent = days[(today.getDay()) % 7].slice(0, 3)
// document.getElementById('rain_perc_day1').innerHTML = `Precipitation ${data.forecast.forecastday[0].day.daily_chance_of_rain} %`
// document.getElementById('day1_img').src = "https:" + data.forecast.forecastday[0].day.condition.icon;
// document.getElementById('min_tem_day1').textContent=data.forecast.forecastday[0].day.mintemp_c
// document.getElementById('max_tem_day1').textContent=data.forecast.forecastday[0].day.maxtemp_c
// document.getElementById('bar3_temp_fill1').style.width=(data.forecast.forecastday[0].day.maxtemp_c/.5)+'%'


// document.getElementById('day2').textContent = days[(today.getDay() + 1) % 7].slice(0, 3)
// document.getElementById('rain_perc_day2').innerHTML = `Precipitation ${data.forecast.forecastday[1].day.daily_chance_of_rain} %`
// document.getElementById('day2_img').src = "https:" + data.forecast.forecastday[1].day.condition.icon;
// document.getElementById('min_tem_day2').textContent=data.forecast.forecastday[1].day.mintemp_c
// document.getElementById('max_tem_day2').textContent=data.forecast.forecastday[1].day.maxtemp_c
// document.getElementById('bar3_temp_fill2').style.width=(data.forecast.forecastday[1].day.maxtemp_c/.5)+'%'


// document.getElementById('day3').textContent = days[(today.getDay() + 2) % 7].slice(0, 3)
// document.getElementById('rain_perc_day3').innerHTML = `Precipitation ${data.forecast.forecastday[2].day.daily_chance_of_rain} %`
// document.getElementById('day3_img').src = "https:" + data.forecast.forecastday[2].day.condition.icon;
// document.getElementById('min_tem_day3').textContent=data.forecast.forecastday[2].day.mintemp_c
// document.getElementById('max_tem_day3').textContent=data.forecast.forecastday[2].day.maxtemp_c
// document.getElementById('bar3_temp_fill3').style.width=(data.forecast.forecastday[2].day.maxtemp_c/.5)+'%'


// document.getElementById('day4').textContent = days[(today.getDay() + 3) % 7].slice(0, 3)
// document.getElementById('rain_perc_day4').innerHTML = `Precipitation ${data.forecast.forecastday[3].day.daily_chance_of_rain} %`
// document.getElementById('day4_img').src = "https:" + data.forecast.forecastday[3].day.condition.icon;
// document.getElementById('min_tem_day4').textContent=data.forecast.forecastday[3].day.mintemp_c
// document.getElementById('max_tem_day4').textContent=data.forecast.forecastday[3].day.maxtemp_c
// document.getElementById('bar3_temp_fill4').style.width=(data.forecast.forecastday[3].day.maxtemp_c/.5)+'%'


// document.getElementById('day5').textContent = days[(today.getDay() + 4) % 7].slice(0, 3)
// document.getElementById('rain_perc_day5').innerHTML = `Precipitation ${data.forecast.forecastday[4].day.daily_chance_of_rain} %`
// document.getElementById('day5_img').src = "https:" + data.forecast.forecastday[4].day.condition.icon;
// document.getElementById('min_tem_day5').textContent=data.forecast.forecastday[4].day.mintemp_c
// document.getElementById('max_tem_day5').textContent=data.forecast.forecastday[4].day.maxtemp_c
// document.getElementById('bar3_temp_fill5').style.width=(data.forecast.forecastday[4].day.maxtemp_c/.5)+'%'


// document.getElementById('day6').textContent = days[(today.getDay() + 5) % 7].slice(0, 3)
// document.getElementById('rain_perc_day6').innerHTML = `Precipitation ${data.forecast.forecastday[5].day.daily_chance_of_rain} %`
// document.getElementById('day6_img').src = "https:" + data.forecast.forecastday[5].day.condition.icon;
// document.getElementById('min_tem_day6').textContent=data.forecast.forecastday[5].day.mintemp_c
// document.getElementById('max_tem_day6').textContent=data.forecast.forecastday[5].day.maxtemp_c
// document.getElementById('bar3_temp_fill6').style.width=(data.forecast.forecastday[5].day.maxtemp_c/.5)+'%'


// ===========================    ==============================================================












//==========================================
//  let tem_grp = data.forecast.forecastday[0]
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     // labels: [
//     //   '0000', '0100', '0200', '0300', '0400', '0500',
//     //   '0600', '0700', '0800', '0900', '1000', '1100',
//     //   '1200', '1300', '1400', '1500', '1600', '1700',
//     //   '1800', '1900', '2000', '2100', '2200', '2300'
//     // ],
//     labels: tem_grp.hour.map((_, index) => index.toString().padStart(2, '0') + ':00'),
//     // labels: ['0000', '0100', '0200', '0300', '0400', '0500','0600','0700'],
//     datasets: [{
//       label: 'Hourly Temperature (°C)',
//       data: tem_grp.hour.map(hourData => hourData.temp_c),
//       // data: [data.forecast.forecastday[0].hour[0].temp_c, data.forecast.forecastday[0].hour[1].temp_c,
//       // data.forecast.forecastday[0].hour[2].temp_c, data.forecast.forecastday[0].hour[3].temp_c,
//       // data.forecast.forecastday[0].hour[4].temp_c, data.forecast.forecastday[0].hour[5].temp_c,
//       // data.forecast.forecastday[0].hour[6].temp_c, data.forecast.forecastday[0].hour[7].temp_c,
//       // data.forecast.forecastday[0].hour[8].temp_c, data.forecast.forecastday[0].hour[9].temp_c,
//       // data.forecast.forecastday[0].hour[10].temp_c, data.forecast.forecastday[0].hour[11].temp_c,
//       // data.forecast.forecastday[0].hour[12].temp_c, data.forecast.forecastday[0].hour[13].temp_c,
//       // data.forecast.forecastday[0].hour[14].temp_c, data.forecast.forecastday[0].hour[15].temp_c,
//       // data.forecast.forecastday[0].hour[16].temp_c, data.forecast.forecastday[0].hour[17].temp_c,
//       // data.forecast.forecastday[0].hour[18].temp_c, data.forecast.forecastday[0].hour[19].temp_c,
//       // data.forecast.forecastday[0].hour[20].temp_c, data.forecast.forecastday[0].hour[21].temp_c,
//       // data.forecast.forecastday[0].hour[22].temp_c, data.forecast.forecastday[0].hour[23].temp_c,],
//       backgroundColor: Array(24).fill('rgba(234, 234, 155, 0.5)'),
//       borderColor: Array(24).fill('rgb(74, 64, 64)'),
//       fill: true,
//       tension: 0.3,
//       pointRadius: 3,
//       pointHoverRadius: 6,

//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: false,
//         title: {
//           display: true,
//           text: 'Temperature (°C)',
//           color: 'white', // change the colour of the text temp
//           font:{
//             size:18,
//             weight:'bold'
//           }
//         }
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Hour of Day',
//           color:'white',
//           font:{
//             size:16,
//             weight:'bold'
//           }
//         }
//       }
//     },
//     animation: {
//       duration: 1500,
//       easing: 'easeInOutQuad'
//     }

//   }

// });
