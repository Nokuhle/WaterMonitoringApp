document.addEventListener('DOMContentLoaded', function() {
      // Weekly Usage Chart
      const weeklyCtx = document.getElementById('weeklyUsageChart').getContext('2d');
      const weeklyChart = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Shower',
              data: [45, 52, 48, 55, 50, 60, 65],
              backgroundColor: 'rgba(52, 152, 219, 0.8)',
              borderRadius: 5
            },
            {
              label: 'Kitchen',
              data: [30, 28, 32, 35, 30, 25, 20],
              backgroundColor: 'rgba(46, 204, 113, 0.8)',
              borderRadius: 5
            },
            {
              label: 'Laundry',
              data: [25, 20, 22, 25, 30, 35, 30],
              backgroundColor: 'rgba(241, 196, 15, 0.8)',
              borderRadius: 5
            },
            {
              label: 'Other',
              data: [15, 12, 18, 15, 20, 10, 15],
              backgroundColor: 'rgba(231, 76, 60, 0.8)',
              borderRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false
              }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Water Usage (Liters)'
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw} liters`;
                },
                footer: function(context) {
                  const total = context[0].dataset.data.reduce((a, b) => a + b, 0);
                  return `Total: ${total} liters`;
                }
              }
            }
          }
        }
      });

      // View options functionality
      const viewOptions = document.querySelectorAll('.view-option');
      viewOptions.forEach(option => {
        option.addEventListener('click', function() {
          viewOptions.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');
          
          // In a real app, you would update the chart data here
          // For demo purposes, we'll just change the Y-axis label
          const viewType = this.dataset.view;
          let yLabel = 'Water Usage (Liters)';
          
          if (viewType === 'cost') {
            yLabel = 'Estimated Cost (R)';
          } else if (viewType === 'comparison') {
            yLabel = 'Usage vs Average (%)';
          }
          
          weeklyChart.options.scales.y.title.text = yLabel;
          weeklyChart.update();
        });
      });

      // Progress circle animation
      const progressCircle = document.querySelector('.progress-ring-circle.progress-ring-complete');
      const radius = progressCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const progress = document.querySelector('.progress-circle').getAttribute('data-progress');
      
      progressCircle.style.strokeDasharray = circumference;
      progressCircle.style.strokeDashoffset = circumference - (progress / 100) * circumference;
    });