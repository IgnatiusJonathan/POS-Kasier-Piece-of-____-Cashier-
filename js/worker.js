// Tunggu hingga seluruh dokumen siap
document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen teks yang diklik
    const createAccount = document.getElementById("createAccount");
    // Ambil elemen form employee yang akan ditampilkan
    const employeeInput = document.querySelector(".employee-input");

   
    createAccount.addEventListener("click", function () {
        // Tampilkan div employee input
        employeeInput.style.display = "block";

     
        employeeInput.scrollIntoView({ behavior: "smooth" });
    });

    createAccount.style.cursor = "pointer";
    createAccount.style.color = "blue";
    createAccount.style.textDecoration = "underline";
});

