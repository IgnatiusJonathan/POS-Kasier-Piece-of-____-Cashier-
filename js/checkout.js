
let daftarItem = document.getElementById("daftarItem")
let products = JSON.parse(localStorage.getItem("ProductID")) || [];

// Ini fungsi printInventory untuk menampilkan barang yang tersedia di inventory
function printInventory(){
  daftarItem.innerHTML = "";

  if(products.length === 0) {
    daftarItem.innerHTML= <p>Tidak ada barang yang dijual (<a href="inventory.html">klik disini untuk pergi ke inventory</a>)</p>
  }
  else {
    products.foreach(barang =>{

      // Nanti tambah tombol agar saat menekan kartu, barang otomatis ditambahkan ke daftar checkout yang berada di kanan

      let barangs = document.createElement("div");
      barangs.className = "checkoutSlot"
      barangs.innerHTML = `
      <img class="image" src="${barang.image}" alt="${barang.name}"><br>
      <div class="info">
        <span class="name">${barang.name}</span><br>
        <span class="ID">ID: ${barang.productID}</span><br>
        <span class="price">Harga: Rp ${barang.price},00</span><br>
      </div>
      `;

      daftarItem.appendChild(barangs);
    });
  }
}

// Mungkin nanti akan menambahkan fungsi agar harga terhitung otomatis saat menambahkan barang ke daftar checkout
// Serta untuk menghitung total harga

printInventory();
