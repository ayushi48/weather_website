const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [
            '0000', '0100', '0200', '0300', '0400', '0500',
            '0600', '0700', '0800', '0900', '1000', '1100',
            '1200', '1300', '1400', '1500', '1600', '1700',
            '1800', '1900', '2000', '2100', '2200', '2300'
        ],

        // labels: ['0000', '0100', '0200', '0300', '0400', '0500','0600','0700'],
        datasets: [{
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 23,43,54,32,23,43,34,34,23,12,56,34,12,67,32,54,76,32,23],
            backgroundColor: [
                'rgba(222, 56, 56, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// console.log(isNaN('6453'));


// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['11 pm', '2 am', '5 am', '8 am', '11 am', '2 pm', '5 pm', '8 pm'],
//     datasets: [{
//       label: 'Temperature',
//       data: [32, 31, 29, 30, 32, 33, 32, 31],
//       fill: true, // this makes it an area chart
//       borderColor: 'yellow',
//       backgroundColor: 'rgba(255, 255, 0, 0.2)',
//       tension: 0.4,
//       pointRadius: 0
//     }]
//   },
//   options: {
//     scales: {
//       x: {
//         ticks: { color: '#ccc' }
//       },
//       y: {
//         ticks: { color: '#ccc' }
//       }
//     },
//     plugins: {
//       legend: { display: false }
//     }
//   }
// });
