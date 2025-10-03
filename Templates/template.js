document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const profileMenu = document.getElementById("profileMenu");
  const dropdownMenu = document.getElementById("dropdownMenu");

  // default icon saat buka pertama kali
  toggleBtn.style.backgroundImage = "url('../img/sidebar_arrow_left.png')";

  // sidebar
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("expanded");

    if (sidebar.classList.contains("collapsed")) {
      toggleBtn.style.left = "0px";
      toggleBtn.style.backgroundImage = "url('../img/sidebar_arrow_right.png')";
    } else {
      toggleBtn.style.left = "200px";
      toggleBtn.style.backgroundImage = "url('../img/sidebar_arrow_left.png')";
    }
  });

  profileMenu.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  window.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target)) {
      dropdownMenu.classList.remove("show");
    }
  });
});

