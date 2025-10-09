document.addEventListener("DOMContentLoaded", () => {
  console.log("Membership page loaded successfully.");

  const addButton = document.getElementById("addMembershipBtn");
  if (addButton) {
    addButton.addEventListener("click", () => {
      window.location.href = "../Membership/daftarMembership.html";
    });
  }

  // Efek
  const rows = document.querySelectorAll("#membershipList tr");
  rows.forEach((row, i) => {
    row.style.opacity = 0;
    row.style.transform = "translateY(10px)";
    setTimeout(() => {
      row.style.transition = "all 0.5s ease";
      row.style.opacity = 1;
      row.style.transform = "translateY(0)";
    }, i * 100);
  });

  //untuk mode responsif
  const table = document.querySelector(".membership-table");
  if (table) {
    const headers = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim());
    const cells = table.querySelectorAll("tbody td");
    cells.forEach((cell, index) => {
      const colIndex = index % headers.length;
      cell.setAttribute("data-label", headers[colIndex]);
    });
  }
});