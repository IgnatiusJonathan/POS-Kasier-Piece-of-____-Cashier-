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
                    <p>Harga: Rp ${Number(item.harga).toLocaleString('id-ID')}</p>
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

        // 2. Simulasi proses penambahan item
        setTimeout(() => {
            const newItem = {
                nama: document.getElementById('nama').value,
                jenis: document.getElementById('jenis').value,
                harga: document.getElementById('harga').value, // 🆕 Tambah harga
                id_produk: document.getElementById('id_produk').value,
                jumlah: document.getElementById('jumlah').value,
                gambar: gambarDataUrl || '../img/placeholder.png' // placeholder default
            };

            // Simpan item ke localStorage
            const existingItems = JSON.parse(localStorage.getItem('addedItems')) || [];
            existingItems.push(newItem);
            localStorage.setItem('addedItems', JSON.stringify(existingItems));
            
            // 3. Sembunyikan loading, tampilkan notifikasi sukses
            loadingSpinner.classList.add('hidden');
            notifSukses.classList.add('show');
            
            // 4. Reset form
            addItemForm.reset();
            gambarPreview.src = '../img/placeholder.png';
            gambarDataUrl = '';
            
            // 5. Perbarui tampilan daftar item
            loadAndRenderItems();

            // 6. Hilangkan notifikasi sukses setelah 2 detik
            setTimeout(() => {
                notifSukses.classList.remove('show');
            }, 2000);

        }, 1500);
    });

    // --- Muat item yang sudah ada saat halaman dibuka ---
    loadAndRenderItems();
});
