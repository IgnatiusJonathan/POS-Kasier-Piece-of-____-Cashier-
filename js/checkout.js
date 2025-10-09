let daftarItem = document.getElementById("daftarItem");
let products = JSON.parse(localStorage.getItem("ProductID")) || [];
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let paymentMethod = document.getElementById("paymentMethod");
let tunaiSection = document.getElementById("tunaiSection");
let kartuSection = document.getElementById("kartuSection");
let tombolCheckout = document.getElementById("tombolCheckout");
let loadingOverlay = document.getElementById("loadingOverlay");
let loadingDesc = document.getElementById("loadingDesc");
let namaPembeliInput = document.getElementById("namaPembeli");
let cashierNameElement = document.querySelector(".cashier-name");

let keranjang = [];
let currentCashier = "Kasir";

function getCashierData() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    
    if (loggedInUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.employeeID === loggedInUser);
        
        if (user) {
            currentCashier = user.name || user.employeeID || "Kasir";
        }
    }

    if (cashierNameElement) {
        cashierNameElement.textContent = currentCashier + " ▼";
    }
    
    return currentCashier;
}

function updatePaymentMethod() {
    const selectedMethod = paymentMethod.value;
    
    if (selectedMethod === 'tunai') {
        tunaiSection.style.display = 'block';
        kartuSection.style.display = 'none';
        hitungKembalian();
    } else {
        tunaiSection.style.display = 'none';
        kartuSection.style.display = 'block';
        document.getElementById('nilaiKembalian').textContent = '0';
        tombolCheckout.disabled = false;
    }
}

paymentMethod.addEventListener('change', updatePaymentMethod);

function printInventory(filteredProducts = null) {
    daftarItem.innerHTML = "";

    const productsToShow = filteredProducts || products;

    if(productsToShow.length === 0) { 
        if (filteredProducts) {
            daftarItem.innerHTML = '<p class="no-results">Tidak ada barang yang sesuai dengan pencarian "' + searchInput.value + '"</p>';
        } else {
            daftarItem.innerHTML = '<p style="text-align: center; color: #666; font-size: 16px; padding: 40px; background: white; border-radius: 8px; margin: 20px;">Tidak ada barang yang dijual (<a href="inventory.html" style="color: var(--maroon);">klik disini untuk pergi ke inventory</a>)</p>';
        }
    }
    else {
        productsToShow.forEach(barang => {
            let barangs = document.createElement("div");
            barangs.className = "checkoutSlot";
            barangs.innerHTML = `
            <img class="image" src="${barang.image}" alt="${barang.name}">
            <div class="info">
                <span class="name">${barang.name}</span><br>
                <span class="ID">ID: ${barang.productID}</span><br>
                <span class="price">Harga: Rp ${barang.price.toLocaleString()},00</span><br>
            </div>
            `;

            barangs.addEventListener('click', () => {
                tambahKeKeranjang(barang);
            });

            daftarItem.appendChild(barangs);
        });
    }
}

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        printInventory();
        return;
    }

    const filteredProducts = products.filter(barang => 
        barang.name.toLowerCase().includes(searchTerm)
    );

    printInventory(filteredProducts);
}

searchButton.addEventListener('click', searchProducts);

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

function tambahKeKeranjang(barang) {
    const itemIndex = keranjang.findIndex(item => item.productID === barang.productID);
    
    if (itemIndex !== -1) {
        keranjang[itemIndex].jumlah += 1;
    } else {
        keranjang.push({
            productID: barang.productID,
            name: barang.name,
            price: barang.price,
            image: barang.image,
            jumlah: 1
        });
    }

    perbaruiKeranjang();
}

function perbaruiKeranjang() {
    const daftarPembelian = document.getElementById('daftarPembelian');
    daftarPembelian.innerHTML = '';
    
    keranjang.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-pembelian';
        itemElement.innerHTML = `
            <div class="info-item">
                <p>${item.name}</p>
                <p>Rp ${item.price.toLocaleString()} x ${item.jumlah}</p>
            </div>
            <div class="kontrol-jumlah">
                <button class="kurang" data-id="${item.productID}">-</button>
                <span>${item.jumlah}</span>
                <button class="tambah" data-id="${item.productID}">+</button>
                <button class="hapus" data-id="${item.productID}">🗑️</button>
            </div>
        `;
        
        daftarPembelian.appendChild(itemElement);
    });

    tambahEventListenersKontrol();

    perbaruiTotal();
}

function tambahEventListenersKontrol() {
    document.querySelectorAll('.tambah').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            tambahJumlah(id);
        });
    });

    document.querySelectorAll('.kurang').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            kurangiJumlah(id);
        });
    });

    document.querySelectorAll('.hapus').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            hapusItem(id);
        });
    });
}

function tambahJumlah(id) {
    const itemIndex = keranjang.findIndex(item => item.productID === id);
    
    if (itemIndex !== -1) {
        keranjang[itemIndex].jumlah += 1;
        perbaruiKeranjang();
    }
}

function kurangiJumlah(id) {
    const itemIndex = keranjang.findIndex(item => item.productID === id);
    
    if (itemIndex !== -1) {
        if (keranjang[itemIndex].jumlah > 1) {
            keranjang[itemIndex].jumlah -= 1;
        } else {
            keranjang.splice(itemIndex, 1);
        }
        perbaruiKeranjang();
    }
}

function hapusItem(id) {
    const itemIndex = keranjang.findIndex(item => item.productID === id);
    
    if (itemIndex !== -1) {
        keranjang.splice(itemIndex, 1);
        perbaruiKeranjang();
    }
}

function perbaruiTotal() {
    const totalJumlah = document.getElementById('totalJumlah');
    const totalHarga = document.getElementById('totalHarga');
    
    let jumlah = 0;
    let harga = 0;
    
    keranjang.forEach(item => {
        jumlah += item.jumlah;
        harga += item.price * item.jumlah;
    });
    
    totalJumlah.textContent = jumlah;
    totalHarga.textContent = harga.toLocaleString();

    hitungKembalian();
}

function hitungKembalian() {
    const nominalTunai = document.getElementById('nominalTunai');
    const nilaiKembalian = document.getElementById('nilaiKembalian');
    const tombolCheckout = document.getElementById('tombolCheckout');
    
    const totalHarga = keranjang.reduce((total, item) => total + (item.price * item.jumlah), 0);
    const selectedMethod = paymentMethod.value;
    
    if (selectedMethod === 'tunai') {
        const tunai = parseFloat(nominalTunai.value) || 0;
        
        if (tunai >= totalHarga) {
            nilaiKembalian.textContent = (tunai - totalHarga).toLocaleString();
            tombolCheckout.disabled = false;
        } else {
            nilaiKembalian.textContent = '0';
            tombolCheckout.disabled = true;
        }
    } else {
        nilaiKembalian.textContent = '0';
        tombolCheckout.disabled = false;
    }
}

document.getElementById('nominalTunai').addEventListener('input', hitungKembalian);

function processCheckout() {
    if (keranjang.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }
    
    const selectedMethod = paymentMethod.value;
    const totalHarga = keranjang.reduce((total, item) => total + (item.price * item.jumlah), 0);
    
    if (selectedMethod === 'tunai') {
        const tunai = parseFloat(document.getElementById('nominalTunai').value) || 0;
        
        if (tunai < totalHarga) {
            alert('Nominal tunai tidak mencukupi!');
            return;
        }
    }

    loadingOverlay.style.display = 'flex';
    
    if (selectedMethod === 'kartu') {
        loadingDesc.textContent = 'Memproses pembayaran kartu...';
        setTimeout(() => {
            simpanTransaksiDanRedirect();
        }, 1500);
    } else {
        loadingDesc.textContent = 'Memproses pembayaran tunai...';
        setTimeout(() => {
            simpanTransaksiDanRedirect();
        }, 1000);
    }
}

function simpanTransaksiDanRedirect() {
    const totalHarga = keranjang.reduce((total, item) => total + (item.price * item.jumlah), 0);
    const tunai = parseFloat(document.getElementById('nominalTunai').value) || 0;
    const selectedMethod = paymentMethod.value;
    const namaPembeli = namaPembeliInput.value.trim() || "Umum";
    
    const transaksi = {
        items: keranjang.map(item => ({
            productID: item.productID,
            name: item.name,
            price: item.price,
            jumlah: item.jumlah
        })),
        total: totalHarga,
        tunai: selectedMethod === 'tunai' ? tunai : totalHarga,
        kembalian: selectedMethod === 'tunai' ? (tunai - totalHarga) : 0,
        metodePembayaran: selectedMethod,
        namaPembeli: namaPembeli,
        namaKasir: currentCashier,
        waktu: new Date().toLocaleString()
    };
    
    try {
        localStorage.setItem('transaksiTerakhir', JSON.stringify(transaksi));
        window.location.href = 'printStruk.html';
    } catch (error) {
        console.error('Error menyimpan transaksi:', error);
        alert('Terjadi kesalahan saat menyimpan transaksi. Silahkan coba lagi.');
        loadingOverlay.style.display = 'none';
    }
}

tombolCheckout.addEventListener('click', processCheckout);

document.addEventListener('DOMContentLoaded', function() {
    getCashierData();
    
    printInventory();
    perbaruiKeranjang();
    updatePaymentMethod();
});
