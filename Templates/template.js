document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const profileMenu = document.getElementById("profileMenu");
  const dropdownMenu = document.getElementById("dropdownMenu");

  const userID = localStorage.getItem("loggedInUser");
  if (sidebar && userID === "0001") {
    const ul = sidebar.querySelector("ul");
    const existingWorkerMenu = ul.querySelector('[data-title="Worker Management"]');
    if (!existingWorkerMenu) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "../Worker-management/workerManagement.html";
      a.dataset.title = "Worker Management";
      a.textContent = "Worker Management";
      li.appendChild(a);
      ul.appendChild(li);
    }
  }

  // icon
  toggleBtn.style.backgroundImage = "url('../img/sidebar_arrow_left.png')";

  // Fungsi toggle sidebar
  toggleBtn.addEventListener("click", () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      sidebar.classList.toggle("show");
      toggleBtn.style.backgroundImage = sidebar.classList.contains("show")
        ? "url('../img/sidebar_arrow_left.png')"
        : "url('../img/sidebar_arrow_right.png')";
    } else {
      sidebar.classList.toggle("collapsed");
      content.classList.toggle("expanded");

      if (sidebar.classList.contains("collapsed")) {
        toggleBtn.style.left = "0px";
        toggleBtn.style.backgroundImage = "url('../img/sidebar_arrow_right.png')";
      } else {
        toggleBtn.style.left = "200px";
        toggleBtn.style.backgroundImage = "url('../img/sidebar_arrow_left.png')";
      }
    }
  });

  // Dropdown profile
  profileMenu.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  // Tutup dropdown kalau klik di luar
  window.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target)) {
      dropdownMenu.classList.remove("show");
    }
  });

  // Tutup sidebar otomatis kalau klik di luar (khusus mobile)
  window.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove("show");
    }
  });

  // Reset posisi toggleBtn saat resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("show");
      toggleBtn.style.left = sidebar.classList.contains("collapsed") ? "0px" : "200px";
    } else {
      toggleBtn.style.left = "15px";
    }
  });
});



