if (!localStorage.getItem("users")) {
  const defaultUser = [
    {
      employeeID: "0001",
      password: "12345",
      name: "Admin",
    }
  ];
  localStorage.setItem("users", JSON.stringify(defaultUser));
}

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
      msg.textContent = "Please fill the required content";
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
        "ID or password is incorrect";
      msg.style.color = "red";
    }
  });
}
