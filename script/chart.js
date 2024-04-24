function renderChart(i) {
  let card = document.getElementById(`bigcontent${i}`);
  card.innerHTML = '';
  card.innerHTML = `<div class="chartbox"><canvas id="myChart" class="chart"></canvas></div>`;
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    label: 'Base Stats',
    data: {
      labels: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'],
      datasets: [
        {
          data: [
            currentPokemon['stats'][0]['base_stat'],
            currentPokemon['stats'][1]['base_stat'],
            currentPokemon['stats'][2]['base_stat'],
            currentPokemon['stats'][3]['base_stat'],
            currentPokemon['stats'][4]['base_stat'],
            currentPokemon['stats'][5]['base_stat'],
          ],

          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(255, 205, 86, 0.9)',
            'rgba(95, 192, 192, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(201, 203, 207, 0.9)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          position: 'average',
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.formattedValue;
            },
            title: function (tooltipItems, data) {
              return null;
            },
          },
          displayColors: false,
          labels: {
            color: 'white',
          },
          position: 'average',
          caretPadding: 10,
        },
      },
      options: {
        scales: {
          y: {
            display: true, // Stellt sicher, dass die y-Achse (Label-Achse) angezeigt wird.
            title: {
              display: true,
              text: 'Stats',
              color: 'white',
            },
            ticks: {
              color: 'white',
            },
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            ticks: {
              color: 'white',
            },
            max: 120,
            grid: {
              display: false,
            },
          },
        },
      },
    },
  });
}
