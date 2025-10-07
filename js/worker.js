const images = [
  "../img/account.jpg",
  "../img/account2.jpg",
  "../img/account3.jpg"
];

let currentIndex = 0;
const imgElement = document.getElementById("accountImage");

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  imgElement.src = images[currentIndex];
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  imgElement.src = images[currentIndex];
}
let employees = [
      { id: 1, name: "Andi", position: "Developer", status: "active", age: 28 },
      { id: 2, name: "Budi", position: "Designer", status: "inactive", age: 32 },
      { id: 3, name: "Citra", position: "Manager", status: "active", age: 40 },
      { id: 4, name: "Dewi", position: "QA Tester", status: "active", age: 25 }
    ];

    // Tampilkan semua karyawan
    function displayEmployees(list) {
      const container = document.getElementById("employee-data");
      container.innerHTML = "";

      if (list.length === 0) {
        container.innerHTML = "<p>Tidak ada karyawan ditemukan.</p>";
        return;
      }

      list.forEach(emp => {
        const section = document.createElement("section");
        section.className = "employee-section";

        section.innerHTML = `
          <h3>${emp.name}</h3>
          <p>Posisi: ${emp.position}</p>
          <p>Usia: ${emp.age}</p>
          <p>Status: <strong>${emp.status === "active" ? "Aktif" : "Nonaktif"}</strong></p>
          <button class="btn ${emp.status === "active" ? "btn-fire" : "btn-hire"}"
            onclick="toggleStatus(${emp.id})">
            ${emp.status === "active" ? "Pecat" : "Pekerjakan"}
          </button>
        `;

        container.appendChild(section);
      });
    }

    // Ubah status karyawan (aktif/nonaktif)
    function toggleStatus(id) {
      employees = employees.map(emp => {
        if (emp.id === id) {
          emp.status = emp.status === "active" ? "inactive" : "active";
        }
        return emp;
      });
      displayEmployees(employees);
    }

    // Cari karyawan berdasarkan nama
    function searchEmployee() {
      const keyword = document.getElementById("searchInput").value.toLowerCase();
      const filtered = employees.filter(emp => emp.name.toLowerCase().includes(keyword));
      displayEmployees(filtered);
    }

    // Tampilkan semua data lagi
    function showAll() {
      document.getElementById("searchInput").value = "";
      displayEmployees(employees);
    }

    // Tampilkan data saat pertama kali
    displayEmployees(employees);
