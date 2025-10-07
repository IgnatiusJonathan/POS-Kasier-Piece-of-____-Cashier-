let history = JSON.parse(sessionStorage.getItem("History")) || [];
let historyList = document.getElementById("history");
let filterDate = document.getElementById("filterDate");
const filterBtn = document.getElementById("filterBtn");
const resetBtn = document.getElementById("resetBtn");

function renderHistory(list = history) {
    historyList.innerHTML = "";

    if (list.length === 0) {
        historyList.innerHTML = "<p>No purchases yet.</p>";
        return;
      }
  
      let ul = document.createElement("ul");
  
      let headerLi = document.createElement("li");
      headerLi.className = "head";
      headerLi.innerHTML = `
        <span class="item">Product</span>
        <span class="amount">Jumlah</span>
        <span class="price">Harga</span>
        <span class="date">Tanggal Pembelian</span>
        <span class="costumer">Pembeli</span>
        <span class="cashier">Kasier</span>
      `;
      ul.appendChild(headerLi);
  
      list.forEach(h => {
        let li = document.createElement("li");
        li.className = "historyBox";
        li.innerHTML = `
          <span class="item">${h.item}</span>
          <span class="amount">${h.amount}</span>
          <span class="price">Rp ${h.price}</span>
          <span class="date">${h.date}</span>
          <span class="costumer">${h.costumer}</span>
          <span class="cashier">${h.cashier}</span>
        `;
        ul.appendChild(li);
      });
  
      historyList.appendChild(ul);
    }

function filterHistory() {
    const selectedDate = filterDate.value;
    if (!selectedDate) {
        renderHistory(history);
        return;
    }
      
    const filtered = history.filter(h => h.date === selectedDate);
    renderHistory(filtered);
}

filterBtn.addEventListener("click", filterHistory);
  resetBtn.addEventListener("click", () => {
    filterDate.value = "";
    renderHistory(history);
});

renderHistory();
