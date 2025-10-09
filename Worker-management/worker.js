const images = [
  "../img/byebye.jpg",
  "../img/peter.jpg",
  "../img/salim.jpg"
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

document.addEventListener('DOMContentLoaded', () => {

    const saveData = (data) => {
        localStorage.setItem('users', JSON.stringify(data));
    };

    const loadData = () => {
        const savedData = localStorage.getItem('users');
        if (savedData) {
            return JSON.parse(savedData);
        } else {
            return [
                { id: 'KSR-01', nama: 'Chika Yumayu', produkTerjual: 173, absensi: '27/30', img: "../img/mygurl.jpg", jamKerja: 40, gaji: 5500000, performa: 4.8 },
                { id: 'KSR-02', nama: 'Ji-An', produkTerjual: 121, absensi: '29/30', img: "../img/wonjian.jpg", jamKerja: 38, gaji: 4800000, performa: 4.5 },
                { id: 'KSR-03', nama: 'Lisa ', produkTerjual: 155, absensi: '25/30', img: "../img/lisa.jpg", jamKerja: 40, gaji: 4800000, performa: 3.2 },
                { id: 'KSR-04', nama: 'Vanesa', produkTerjual: 198, absensi: '30/30', img: "../img/Vanesa.jpg", jamKerja: 42, gaji: 5200000, performa: 5.0 },
                { id: 'KSR-05', nama: 'Yunita Feriana', produkTerjual: 98, absensi: '28/30', img: "../img/kasir1.jpg", jamKerja: 35, gaji: 4500000, performa: 3.9 }
            ];
        }
    };

    let employeesData = loadData();

    // Mengambil elemen HTML
    const employeeListContainer = document.getElementById('employeeListContainer');
    const searchInput = document.getElementById('employeeSearch');
    const addEmployeeForm = document.querySelector('.employee-form');

    const generateStars = (rating) => {
        if (!rating || rating === 0) return 'N/A';
        const halfStar = '⭐', fullStar = '🌟', emptyStar = '☆';
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        stars += fullStar.repeat(fullStars);
        if (hasHalfStar) { stars += halfStar; }
        const remaining = 5 - Math.ceil(rating);
        stars += emptyStar.repeat(remaining);
        return `${stars} (${rating})`;
    };

    // Menghitung Persentase Absensi
    const calculateAttendancePercentage = (absensiString) => {
        if (!absensiString || typeof absensiString !== 'string') return 'N/A';
        const parts = absensiString.split('/');
        if (parts.length !== 2) return 'N/A';
        const attended = parseFloat(parts[0]);
        const total = parseFloat(parts[1]);
        if (isNaN(attended) || isNaN(total) || total === 0) return 'N/A';
        const percentage = Math.round((attended / total) * 100);
        return `${percentage}%`;
    };

   const renderEmployees = (employees) => {
    employeeListContainer.innerHTML = '';
    if (employees.length === 0) {
        employeeListContainer.innerHTML = '<p style="text-align:center;">Karyawan tidak ditemukan.</p>';
        return;
    }
    employees.forEach(employee => {
        const itemHTML = `
            <div class="employee-list-item">
                <div class="employee-icon">
                    <img src="${employee.img || '..img/account.jpg'}" alt="employee">
                </div>
                <div class="employee-details">
                    <div class="detail-item">
                        <strong>Nama</strong>
                        <span>${employee.nama || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <strong>ID</strong>
                        <span>${employee.id || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Produk Terjual</strong>
                        <span>${employee.produkTerjual || 'N/A'}</span>
                    </div>

                    <div class="detail-item">
                        <strong>Jam Kerja / Minggu</strong> 
                        <span>${employee.jamKerja ? `${employee.jamKerja} jam` : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Absensi</strong>
                        <span>${calculateAttendancePercentage(employee.absensi)}</span>
                    </div>
                     <div class="detail-item">
                        <strong>Gaji</strong>
                        <span>${employee.gaji ? `Rp ${employee.gaji.toLocaleString('id-ID')}` : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Performa</strong>
                        <span>${generateStars(employee.performa)}</span>
                    </div>
                </div>
                <div class="employee-actions">
                    <button class="remove-btn" onclick="removeEmployee('${employee.id}')">Remove</button>
                </div>
            </div>
        `;
        employeeListContainer.innerHTML += itemHTML;
    });
};

    window.removeEmployee = (employeeId) => {
        if (confirm(`Apakah Anda yakin ingin menghapus karyawan dengan ID ${employeeId}?`)) {
            employeesData = employeesData.filter(emp => emp.id !== employeeId);
            saveData(employeesData);
            renderEmployees(employeesData);
        }
    };

    addEmployeeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newEmployee = {
            id: document.getElementById('employee-id').value,
            nama: document.getElementById('employee-name').value,
            produkTerjual: null, absensi: null, jamKerja: null, gaji: null, performa: null,
            img: '../img/account.jpg'
        };
        employeesData.push(newEmployee);
        saveData(employeesData);
        renderEmployees(employeesData);
        alert('Akun berhasil dibuat!');
        addEmployeeForm.reset();
    });

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEmployees = employeesData.filter(emp =>
            emp.nama.toLowerCase().includes(searchTerm) || emp.id.toLowerCase().includes(searchTerm)
        );
        renderEmployees(filteredEmployees);
    });
    
    renderEmployees(employeesData);
});
