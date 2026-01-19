// auth.js

const API_BASE = "http://localhost:8080/api";

/* ================= LOGIN ================= */
const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data));

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome to ServeSmart!",
      confirmButtonColor: "#2563eb"
    }).then(() => {
      if (data.role === "ADMIN") {
        window.location.href = "admin-dashboard.html";
      } else if (data.role === "PROVIDER") {
        window.location.href = "provider-dashboard.html";
      } else {
        window.location.href = "user-dashboard.html";
      }
    });
  });
}

/* ================= REGISTER ================= */
const registerForm = document.querySelector("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: document.querySelector("#regName").value,
      email: document.querySelector("#regEmail").value,
      password: document.querySelector("#regPassword").value,
      role: document.querySelector("#regRole").value
    };

    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Email already exists or invalid details",
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: "You can now login to ServeSmart.",
      confirmButtonColor: "#2563eb"
    }).then(() => {
      window.location.href = "login.html";
    });
  });
}
/* ================= LOGOUT ================= */
const logoutBtn = document.querySelector("#logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been logged out.",
      confirmButtonColor: "#2563eb"
    }).then(() => {
      window.location.href = "login.html";
    });
  });
}