let daftarItem = document.getElementById("daftarItem");
let products = JSON.parse(localStorage.getItem("ProductID")) || [];

let keranjang = [];

function printInventory(){
    daftarItem.innerHTML = "";

    if(products.length === 0) { 
        daftarItem.innerHTML = '<p style="text-align: center; color: #373737; font-size: 18px; padding: 40px;">Tidak ada barang yang dijual (<a href="inventory.html" style="color: #B21011;">klik disini untuk pergi ke inventory</a>)</p>';
    }
    else {
        products.forEach(barang => {
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
    const tunai = parseFloat(nominalTunai.value) || 0;
    
    if (tunai >= totalHarga) {
        nilaiKembalian.textContent = (tunai - totalHarga).toLocaleString();
        tombolCheckout.disabled = false;
    } else {
        nilaiKembalian.textContent = '0';
        tombolCheckout.disabled = true;
    }
}

document.getElementById('nominalTunai').addEventListener('input', hitungKembalian);

document.getElementById('tombolCheckout').addEventListener('click', function(e) {
    if (keranjang.length === 0) {
        e.preventDefault();
        alert('Keranjang belanja kosong!');
        return;
    }
    
    const tunai = parseFloat(document.getElementById('nominalTunai').value) || 0;
    const totalHarga = keranjang.reduce((total, item) => total + (item.price * item.jumlah), 0);
    
    if (tunai < totalHarga) {
        e.preventDefault();
        alert('Nominal tunai tidak mencukupi!');
        return;
    }

    const transaksi = {
        items: keranjang,
        total: totalHarga,
        tunai: tunai,
        kembalian: tunai - totalHarga,
        waktu: new Date().toLocaleString()
    };
    
    localStorage.setItem('transaksiTerakhir', JSON.stringify(transaksi));
});

document.addEventListener('DOMContentLoaded', function() {
    printInventory();
    perbaruiKeranjang();
});
