 document.addEventListener('DOMContentLoaded', function() {
  // Personalize the tip based on user's actual usage (simulated here)
  function personalizeTip() {
    const tips = [
      {
        text: "Based on your usage, we recommend fixing leaky faucets. A single drip per second wastes <strong>11,000 liters annually</strong>!",
        savings: "18%"
      },
      {
        text: "Your garden watering times could be optimized. Watering in early morning instead of midday could save <strong>9,000 liters annually</strong>!",
        savings: "15%"
      },
      {
        text: "Consider installing low-flow showerheads. This simple change could save <strong>11,000 liters annually</strong> with no noticeable difference in water pressure!",
        savings: "22%"
      }
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('personalized-tip').innerHTML = randomTip.text;
    document.getElementById('savings-potential').textContent = `Potential Savings: ${randomTip.savings}`;
  }
  
  // Show emergency alert if usage is high (simulated with 30% chance)
  function checkForAlerts() {
    if (Math.random() < 0.3) { // 30% chance of showing alert
      const alert = document.getElementById('emergency-alert');
      alert.style.display = 'block';
      
      // Close button functionality
      alert.querySelector('.alert-close').addEventListener('click', function() {
        alert.style.display = 'none';
      });
      
      // Random alert messages
      const alerts = [
        "Your water usage is <strong>35% higher</strong> than similar households this week. Your shower duration increased by 8 minutes daily.",
        "Unusually high garden water usage detected! <strong>45% increase</strong> compared to your average.",
        "Kitchen water usage spiked yesterday - <strong>28 liters above</strong> your typical usage. Check for running taps or leaks."
      ];
      
      alert.querySelector('.alert-content p').innerHTML = 
        alerts[Math.floor(Math.random() * alerts.length)];
    }
  }
  
  // Initialize
  personalizeTip();
  checkForAlerts();
  
  // Auto-scroll facts carousel
  const carousel = document.querySelector('.water-facts-carousel');
  if (carousel) {
    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per interval
    
    function autoScroll() {
      carousel.scrollLeft += scrollSpeed;
      scrollAmount += scrollSpeed;
      
      // Reset to start when reaching end
      if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
        scrollAmount = 0;
      }
    }
    
    // Start auto-scroll
    let scrollInterval = setInterval(autoScroll, 50);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(autoScroll, 50);
    });
  }
});