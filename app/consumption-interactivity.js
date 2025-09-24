 document.addEventListener('DOMContentLoaded', function() {
  // Main chart setup
  const ctx = document.getElementById('waterUsageChart').getContext('2d');
  let waterChart = new Chart(ctx, {
    type: 'bar',
    data: getChartData('day'),
    options: getChartOptions('Water Usage (liters)')
  });

  // Pie chart setup
  const pieCtx = document.getElementById('usagePieChart').getContext('2d');
  let pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: getPieChartData('day'),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  // Filter button functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const period = this.dataset.period;
      
      // Update charts
      waterChart.data = getChartData(period);
      waterChart.options = getChartOptions(period === 'day' ? 'Water Usage by Hour (liters)' : `Water Usage (liters)`);
      waterChart.update();
      
      pieChart.data = getPieChartData(period);
      pieChart.update();
      
      // Update stats
      updateStats(period);
      updatePieLegend();
    });
  });

  // Initial update
  updateStats('day');
  updatePieLegend();

  // Data functions
  function getChartData(period) {
    const dataMap = {
      day: {
        labels: Array.from({length: 24}, (_, i) => `${i}:00`),
        data: Array.from({length: 24}, () => Math.floor(Math.random() * 50) + 10)
      },
      week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 200) + 50)
      },
      month: {
        labels: Array.from({length: 30}, (_, i) => `${i+1}`),
        data: Array.from({length: 30}, () => Math.floor(Math.random() * 100) + 30)
      },
      year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 500)
      }
    };
    
    const {labels, data} = dataMap[period];
    
    return {
      labels: labels,
      datasets: [{
        label: 'Water Usage',
        data: data,
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1,
        borderRadius: 5
      }]
    };
  }

  function getChartOptions(yLabel) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: yLabel
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} liters`;
            }
          }
        }
      }
    };
  }

  function getPieChartData(period) {
    // Multipliers for different time periods
    const multiplier = {
      day: 1,
      week: 7,
      month: 30,
      year: 365
    }[period];
    
    return {
      labels: ['Shower', 'Kitchen', 'Garden', 'Other'],
      datasets: [{
        data: [
          Math.floor(Math.random() * 20 * multiplier) + 15 * multiplier, // Shower
          Math.floor(Math.random() * 15 * multiplier) + 10 * multiplier, // Kitchen
          Math.floor(Math.random() * 25 * multiplier) + 5 * multiplier,  // Garden
          Math.floor(Math.random() * 10 * multiplier) + 5 * multiplier   // Other
        ],
        backgroundColor: [
          '#3498db', // Shower - blue
          '#2ecc71', // Kitchen - green
          '#f1c40f', // Garden - yellow
          '#e74c3c'  // Other - red
        ],
        borderWidth: 1
      }]
    };
  }

  function updateStats(period) {
    const pieData = pieChart.data.datasets[0].data;
    const totalUsage = pieData.reduce((a, b) => a + b, 0);
    
    // Update total usage
    document.getElementById('total-usage').textContent = totalUsage;
    
    // Update breakdown
    document.getElementById('shower-usage').textContent = `${pieData[0]}L`;
    document.getElementById('kitchen-usage').textContent = `${pieData[1]}L`;
    document.getElementById('garden-usage').textContent = `${pieData[2]}L`;
    document.getElementById('other-usage').textContent = `${pieData[3]}L`;
    
    // Update efficiency
    const efficiency = Math.min(100, Math.max(0, 80 + Math.floor(Math.random() * 40) - 20));
    document.getElementById('efficiency-bar').style.width = `${efficiency}%`;
    document.getElementById('efficiency-value').textContent = `${efficiency}%`;
    
    // Update tip based on efficiency
    const tip = efficiency > 85 ? "Excellent! You're a water-saving champion!" :
                 efficiency > 70 ? "Good job! You're using less water than most similar households." :
                 efficiency > 50 ? "Not bad, but there's room for improvement in your water usage." :
                 "Consider implementing some water-saving practices to improve your efficiency.";
    document.getElementById('efficiency-tip').textContent = tip;
  }

  function updatePieLegend() {
    const legendContainer = document.getElementById('pieLegend');
    legendContainer.innerHTML = '';
    
    pieChart.data.labels.forEach((label, i) => {
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      
      const colorBox = document.createElement('div');
      colorBox.className = 'legend-color';
      colorBox.style.backgroundColor = pieChart.data.datasets[0].backgroundColor[i];
      
      const text = document.createElement('span');
      text.textContent = `${label}: ${pieChart.data.datasets[0].data[i]}L`;
      
      legendItem.appendChild(colorBox);
      legendItem.appendChild(text);
      legendContainer.appendChild(legendItem);
    });
  }
});