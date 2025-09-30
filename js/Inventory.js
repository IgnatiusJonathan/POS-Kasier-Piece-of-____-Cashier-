let inventory = document.getElementById("inventory")
let products = JSON.parse(localStorage.getItem("ProductID")) || [];
function renderInventory(){
  if(products.length ===0) inventory.innerHTML= "<p>Inventory kosong<p>"
}
