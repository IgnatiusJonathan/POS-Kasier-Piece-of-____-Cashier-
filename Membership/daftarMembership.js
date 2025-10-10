const daftarForm = document.getElementById("signupForm");
if (daftarForm) {
  daftarForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("signupName").value.trim();
    const birthday = document.getElementById("signupBirthday").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    
    let msg = document.getElementById("signupMsg");
    if (!msg) {
      msg = document.createElement("p");
      msg.id = "signupMsg";
      daftarForm.appendChild(msg);
    }

    if (!email || !fullName || !birthday || !phone) {
      msg.textContent = "Semua field harus diisi!";
      msg.style.color = "red";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      msg.textContent = "Well that doesn't sounds like an email.";
      msg.style.color = "red";
      return;
    }
    
    const nameRegex = /^[A-Za-z\s]{3,32}$/;
    if (!nameRegex.test(fullName)) {
      msg.textContent = "Nama harus terdiri dari huruf saja (3–32 karakter).";
      msg.style.color = "red";
      return;
    }

    const phoneRegex = /^08\d{8,14}$/;
    if (!phoneRegex.test(phone)) {
      msg.textContent = "Nomor telepon harus mulai dengan 08 dan panjang 10–16 digit.";
      msg.style.color = "red";
      return;
    }

    const members = JSON.parse(localStorage.getItem("members")) || [];
    if (members.some(m => m.phone === phone)) {
      msg.textContent = "Nomor ini sudah terdaftar!";
      msg.style.color = "red";
      return;
    }

    members.push({ fullName, birthday, phone });
    localStorage.setItem("members", JSON.stringify(members));

    msg.textContent = "Pendaftaran berhasil!";
    msg.style.color = "green";

    setTimeout(() => (window.location.href = "../Membership/membership.html"), 1500);
  });
}
