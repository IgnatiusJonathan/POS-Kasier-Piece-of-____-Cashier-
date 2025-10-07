document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded successfully.");

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

  const clockContainer = document.createElement("div");
  clockContainer.id = "realtimeClock";
  clockContainer.style.position = "fixed";
  clockContainer.style.top = "15px";
  clockContainer.style.right = "25px";
  clockContainer.style.background = "rgba(0,0,0,0.7)";
  clockContainer.style.color = "white";
  clockContainer.style.padding = "6px 12px";
  clockContainer.style.borderRadius = "8px";
  clockContainer.style.fontFamily = "monospace";
  clockContainer.style.fontSize = "14px";
  clockContainer.style.zIndex = "1000";
  clockContainer.style.backdropFilter = "blur(4px)";
  document.body.appendChild(clockContainer);

  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    clockContainer.textContent = `🕒 ${timeString}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  showToast("Selamat datang di Dashboard Tarumart!");

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#800000";
    toast.style.color = "white";
    toast.style.padding = "10px 18px";
    toast.style.borderRadius = "10px";
    toast.style.fontSize = "14px";
    toast.style.opacity = "0";
    toast.style.transition = "all 0.5s ease";
    toast.style.zIndex = "9999";
    document.body.appendChild(toast);

    setTimeout(() => (toast.style.opacity = "1"), 100);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 600);
    }, 3500);
  }

  const bars = document.querySelectorAll(".fill");
  bars.forEach((bar) => {
    const targetWidth = bar.style.width || "80%";
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.transition = "width 1.8s ease-in-out";
      bar.style.width = targetWidth;
    }, 500);
  });

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
});