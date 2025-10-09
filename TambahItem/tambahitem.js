document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const gambarInput = document.getElementById('gambar');
    const gambarPreview = document.getElementById('gambar-preview');
    const loadingSpinner = document.getElementById('loading-spinner');
    const listItemContainer = document.getElementById('list-item-baru');
    let gambarDataUrl = '';

    // --- Fungsi untuk memuat dan menampilkan item dari localStorage ---
    const loadAndRenderItems = () => {
        const items = JSON.parse(localStorage.getItem('ProductID')) || [];
        listItemContainer.innerHTML = '';

        items.forEach(item => {
            const itemCard = `
                <div class="item-card">
                    <img src="${item.image}" alt="${item.nama}">
                    <h4>${item.nama}</h4>
                    <p>ID: ${item.productID}</p>
                    <p>Jenis: ${item.jenis}</p>
                    <p>Harga: Rp ${Number(item.price).toLocaleString('id-ID')}</p>
                    <p>Jumlah: ${item.amount}</p>
                </div>
            `;
            listItemContainer.innerHTML += itemCard;
        });
    };

    
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


    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        loadingSpinner.classList.remove('hidden'); // tampilkan spinner

        setTimeout(() => {
            const newItem = {
                nama: document.getElementById('name').value,
                jenis: document.getElementById('jenis').value,
                price: document.getElementById('price').value,
                productID: document.getElementById('productID').value,
                amount: document.getElementById('amount').value,
                image: gambarDataUrl || '../img/placeholder.png'
            };

            // Ambil data lama dari localStorage (key: ProductID)
            const existingItems = JSON.parse(localStorage.getItem('ProductID')) || [];
            existingItems.push(newItem);

            // Simpan lagi ke localStorage
            localStorage.setItem('ProductID', JSON.stringify(existingItems));

            // Sembunyikan loading & reset form
            loadingSpinner.classList.add('hidden');
            addItemForm.reset();
            gambarPreview.src = '../img/placeholder.png';
            gambarDataUrl = '';

            alert('Item berhasil ditambahkan!');
            loadAndRenderItems();
        }, 1500);
    });

    // --- Saat halaman dimuat ---
    loadAndRenderItems();
});

