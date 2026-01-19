// dashboard.js

const API_BASE = "http://localhost:8080/api";
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

/* ================= LOGOUT ================= */
document.querySelectorAll(".logout-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
});

/* ================= LOAD USER BOOKINGS ================= */
async function loadBookings() {
  const res = await fetch(`${API_BASE}/bookings/user/${user.id}`);
  if (!res.ok) return;

  const bookings = await res.json();
  console.log(bookings); // render later
}

loadBookings();
