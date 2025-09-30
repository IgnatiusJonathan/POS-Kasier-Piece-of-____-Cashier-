let inventory = document.getElementById("inventory")
let products = JSON.parse(localStorage.getItem("ProductID")) || [];

function renderInventory(){
  inventory.innerHTML = "";
  
  if(products.length ===0) inventory.innerHTML= `<p>Inventory kosong<p>`
  else{
    let productPreview = document.createElement("div");
    productPreview.className = "productPreview";
    
    products.forEach(p =>{
      let pro = document.createElement("div");
      pro.classname = "inventorySlot"
      pro.innerHTML = `
      <span class="name">${p.name}</span>
      <img class="image" src="${p.image}" alt="${p.name}">
      <span class="ID">${p.productID}</span>
      <span class="price">${p.price}</span>
      <span class="amount">${p.amount}</span>
      `;
      productPreview.appendChild(pro);
    });
    inventory.appendChild(productPreview);
}

renderInventory();
