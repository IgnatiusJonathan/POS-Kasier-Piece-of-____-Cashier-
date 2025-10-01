let inventory = document.getElementById("inventory")
let products = JSON.parse(localStorage.getItem("ProductID")) || [];

function renderInventory(){
  inventory.innerHTML = "";
  
  if(products.length ===0) inventory.innerHTML= `<p>Inventory kosong<p>`
  else{
    products.forEach(p =>{
      let pro = document.createElement("div");
      pro.className = "inventorySlot"
      pro.innerHTML = `
      <span class="name">${p.name}</span><br>
      <img class="image" src="${p.image}" alt="${p.name}"><br>
      <span class="ID">ID: ${p.productID}</span><br>
      <span class="price">Harga: Rp ${p.price},00</span><br>
      <span class="amount">Stok: ${p.amount}</span>
      `;
      inventory.appendChild(pro);
    });
}

renderInventory();
