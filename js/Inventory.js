let inventory = document.getElementById("inventory")
let products = JSON.parse(localStorage.getItem("ProductID")) || [];
function renderInventory(){
  if(products.length ===0) inventory.innerHTML= `<p>Inventory kosong<p>`
  else{
    let productPreview = document.createElement("productPreview");
    products.forEach(p =>{
      let pro = document.createElement("pro");
      pro.classname = "inventorySlot"
      pro.innerHTML = `
      <span class="name">${p.name}</span>
      <span class="image">${p.image}</span>
      <span class="ID">${p.productID}</span>
      <span class="price">${p.price}</span>
      <span class="amount">${p.amount}</span>
      `;
      productPreview.appendChild(pro);
    });
    inventory.appendChild(productPreview);
}
