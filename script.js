// Initialize Swiper.js
const swiper = new Swiper('.swiper-container', {
    loop: true, // Enables infinite scrolling
    navigation: {
      nextEl: '.swiper-button-next', // Next button selector
      prevEl: '.swiper-button-prev', // Previous button selector
    },
    autoplay: {
      delay: 3000, // Automatically switch slides every 3 seconds
      disableOnInteraction: false, // Keep autoplay enabled even after user interaction
    },
  });
// Live Chat Button Functionality
document.querySelector('.chat-button').addEventListener('click', function () {
    alert('Live chat coming soon! Please reach out via email or phone in the meantime.');
  });
    