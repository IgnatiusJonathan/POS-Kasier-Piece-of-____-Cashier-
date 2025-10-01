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
      <span class="name">${p.name}</span>
      <img class="image" src="${p.image}" alt="${p.name}">
      <span class="ID">${p.productID}</span>
      <span class="price">${p.price}</span>
      <span class="amount">${p.amount}</span>
      `;
      inventory.appendChild(pro);
    });
}

renderInventory();
