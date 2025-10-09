let inventory = document.getElementById("inventory")
let products = JSON.parse(localStorage.getItem("ProductID")) || [];
let filter = document.getElementById("jenis");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function saveProducts() {
  localStorage.setItem("ProductID", JSON.stringify(products));
}

function renderInventory(list = products){
  inventory.innerHTML = "";
  
  if (list.length === 0) inventory.innerHTML= `<p>Inventory kosong</p>`
  else {
    list.forEach((p, index) => {
      let pro = document.createElement("div");
      pro.className = "inventorySlot"
      pro.innerHTML = `
      <img class="image" src="${p.image}" alt="${p.name}"><br>
      <div class="info">
        <span class="name">${p.name}</span><br>
        <span class="jenis">${p.jenis}</span><br>
        <span class="ID">ID: ${p.productID}</span><br>
        <span class="price">Harga: Rp ${p.price},00</span><br>
        <div class="stock-control">
          <span class="amount">Stok: <span class="stock-value">${p.amount}</span></span>
          <button class="decrease">−</button>
          <button class="increase">+</button>
        </div>
      </div>
      `;

      const decreaseBtn = pro.querySelector(".decrease");
      const increaseBtn = pro.querySelector(".increase");
      const stockValue = pro.querySelector(".stock-value");

      decreaseBtn.addEventListener("click", () => {
        if (products[index].amount > 0) {
          products[index].amount--;
          stockValue.textContent = products[index].amount;
          saveProducts();
        }
      });

      increaseBtn.addEventListener("click", () => {
        products[index].amount++;
        stockValue.textContent = products[index].amount;
        saveProducts();
      });

      inventory.appendChild(pro);
    });
    }
}

function searchProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const select = filter.value.toLowerCase();

  if (query === "") {
    renderInventory(products);
    return;
  }

  const results = products.filter(p => {
    const nameMatch = query === "" || p.name.toLowerCase().includes(query);
    const SelectMatch = select === "" || p.jenis.toLowerCase() === select;
    return nameMatch && SelectMatch;
  });

  renderInventory(results);
}

searchBtn.addEventListener("click", searchProducts);
searchInput.addEventListener("input", searchProducts);
filter.addEventListener("change", searchProducts);

renderInventory();
