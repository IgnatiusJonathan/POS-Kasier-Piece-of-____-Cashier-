const transaksiData = JSON.parse(localStorage.getItem('transaksiTerakhir'));

let customerName = 'Umum';
let cashierName = 'Kasir';

const transactionDateElement = document.getElementById('tanggalTransaksi');
const cashierNameElement = document.getElementById('namaKasir');
const customerNameElement = document.getElementById('namaPembeli');
const itemListElement = document.getElementById('itemList');
const totalAmountElement = document.getElementById('hargaTotal');
const cashAmountElement = document.getElementById('uangDibayar');
const changeAmountElement = document.getElementById('kembalian');
const printBtn = document.getElementById('printBtn');
const backBtn = document.getElementById('backBtn');

function formatCurrency(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

function formatStrukDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function saveToHistory() {
    let history = JSON.parse(localStorage.getItem("History")) || [];

    const historyEntry = {
        item: transaksiData.items.map(item => item.name).join(', '),
        amount: transaksiData.items.reduce((sum, item) => sum + item.jumlah, 0),
        price: transaksiData.total,
        date: new Date().toISOString().split('T')[0],
        costumer: customerName,
        cashier: cashierName
    };

    history.push(historyEntry);

    localStorage.setItem("History", JSON.stringify(history));

    sessionStorage.setItem("History", JSON.stringify(history));
    
    console.log('Transaksi disimpan ke history:', historyEntry);
}

function loadTransactionData() {
    if (!transaksiData) {
        alert('Tidak ada data transaksi! Kembali ke halaman checkout.');
        window.location.href = 'checkout.html';
        return;
    }

    transactionDateElement.textContent = formatStrukDate(transaksiData.waktu);
    cashierNameElement.textContent = cashierName;
    customerNameElement.textContent = customerName;

    itemListElement.innerHTML = '';
    transaksiData.items.forEach(item => {
        const itemTotal = item.price * item.jumlah;
        const itemRow = document.createElement('div');
        itemRow.className = 'item-row';
        itemRow.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.jumlah} x ${formatCurrency(item.price)}</span>
            </div>
            <div class="item-total">${formatCurrency(itemTotal)}</div>
        `;
        itemListElement.appendChild(itemRow);
    });

    totalAmountElement.textContent = formatCurrency(transaksiData.total);
    cashAmountElement.textContent = formatCurrency(transaksiData.tunai);
    changeAmountElement.textContent = formatCurrency(transaksiData.kembalian);

    saveToHistory();
}

function printStruk() {
    window.print();
}

function backToCheckout() {
    localStorage.removeItem('transaksiTerakhir');
    window.location.href = 'checkout.html';
}

printBtn.addEventListener('click', printStruk);
backBtn.addEventListener('click', backToCheckout);

document.addEventListener('DOMContentLoaded', loadTransactionData);
