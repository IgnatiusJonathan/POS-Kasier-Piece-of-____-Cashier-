document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded successfully.");

  // Animasi muncul untuk card
  const cards = document.querySelectorAll(".employee-card, .performance-card");
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, i * 150);
  });

  // Efek hover card
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px) scale(1.02)";
      card.style.boxShadow = "0 8px 18px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    });
  });

  // Animasi progress bar
  const bars = document.querySelectorAll(".fill");
  bars.forEach((bar) => {
    const targetWidth = bar.style.width || "80%";
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.transition = "width 1.8s ease-in-out";
      bar.style.width = targetWidth;
    }, 500);
  });

  // Efek reveal on scroll
  const revealElements = document.querySelectorAll(".employee-card, .performance-card");
  const revealOnScroll = () => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // WAKTU KERJA REAL-TIME
  const workTimeElement = document.getElementById("workTime");
  if (workTimeElement) {
    const startTime = new Date(); // mulai dari waktu login

    function updateWorkTime() {
      const now = new Date();
      const elapsed = new Date(now - startTime);
      const hours = String(elapsed.getUTCHours()).padStart(2, "0");
      const minutes = String(elapsed.getUTCMinutes()).padStart(2, "0");
      const seconds = String(elapsed.getUTCSeconds()).padStart(2, "0");
      workTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateWorkTime();
    setInterval(updateWorkTime, 1000);
  }
});
