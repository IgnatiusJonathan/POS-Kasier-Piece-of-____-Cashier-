if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const employeeID = document.getElementById("employeeID").value;
    const password = document.getElementById("employeePassword").value;
    const msg = document.getElementById("loginMsg");

    if (!employeeID || !password) {
      msg.textContent = "How am I supposed to know if it's blank?";
      msg.style.color = "red";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.employeeID === employeeID && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", employeeID);
      msg.textContent = "Login successful, Welcome!";
      msg.style.color = "green";
      setTimeout(() => (window.location.href = "../index.html"), 1000);
    } else {
      msg.textContent =
        "Hmm that doesn't seem right, either your ID or password is incorrect";
      msg.style.color = "red";
    }
  });
}
