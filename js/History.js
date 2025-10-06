let history = JSON.parse(sessionStorage.getItem("History")) || [];
    let historyList = document.getElementById("history");

    if (history.length === 0) {
            historyList.innerHTML = "<p>No purchases yet.</p>";
    } else {
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
            history.forEach(h => {
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
