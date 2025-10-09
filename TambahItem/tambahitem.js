document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const gambarInput = document.getElementById('gambar');
    const gambarPreview = document.getElementById('gambar-preview');
    const loadingSpinner = document.getElementById('loading-spinner');
    const notifSukses = document.getElementById('notif-sukses');
    const listItemContainer = document.getElementById('list-item-baru');

    let gambarDataUrl = '';

    // --- Fungsi untuk memuat dan menampilkan item dari Local Storage ---
    const loadAndRenderItems = () => {
        const items = JSON.parse(localStorage.getItem('addedItems')) || [];
        listItemContainer.innerHTML = '';
        items.forEach(item => {
            const itemCard = `
                <div class="item-card">
                    <img src="${item.gambar}" alt="${item.nama}">
                    <h4>${item.nama}</h4>
                    <p>ID: ${item.id_produk}</p>
                    <p>Jenis: ${item.jenis}</p>
                    <p>Jumlah: ${item.jumlah}</p>
                </div>
            `;
            listItemContainer.innerHTML += itemCard;
        });
    };

    // --- Logika untuk Preview Gambar ---
    gambarInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                gambarPreview.src = e.target.result;
                gambarDataUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Logika saat Form di-Submit ---
    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // 1. Tampilkan animasi loading
        loadingSpinner.classList.remove('hidden');

        // 2. Simulasi proses
        setTimeout(() => {
            const newItem = {
                nama: document.getElementById('nama').value,
                jenis: document.getElementById('jenis').value,
                id_produk: document.getElementById('id_produk').value,
                jumlah: document.getElementById('jumlah').value,
                gambar: gambarDataUrl || '../img/placeholder.png' // Gunakan placeholder jika tidak ada gambar
            };

            const existingItems = JSON.parse(localStorage.getItem('addedItems')) || [];
            existingItems.push(newItem);
            localStorage.setItem('addedItems', JSON.stringify(existingItems));
            
            loadingSpinner.classList.add('hidden');
            notifSukses.classList.add('show');
            
            addItemForm.reset();
            gambarPreview.src = '../img/placeholder.png';
            gambarDataUrl = '';
            
            // Perbarui tampilan daftar item di bawah
            loadAndRenderItems();

            // 3. Redirect setelah 2 detik
            setTimeout(() => {
                // Ganti 'inventory.html' dengan halaman tujuan Anda
                window.location.href = 'inventory.html'; 
            }, 2000);

        }, 1500);
    });

    // Muat item yang sudah ada saat halaman pertama kali dibuka
    loadAndRenderItems();
});