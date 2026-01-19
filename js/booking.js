// booking.js

const API_BASE = "http://localhost:8080/api";
let selectedService = "";

document.querySelectorAll(".booking-service-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".booking-service-card")
      .forEach(c => c.classList.remove("selected"));

    card.classList.add("selected");
    selectedService = card.querySelector("h3").innerText;
  });
});

const bookingForm = document.querySelector("#bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!selectedService) {
      alert("Please select a service");
      return;
    }

    const payload = {
      service: selectedService,
      date: document.querySelector("#date").value,
      time: document.querySelector("#time").value,
      address: document.querySelector("#address").value
    };

    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      alert("Booking failed");
      return;
    }

    alert("Booking confirmed!");
    window.location.href = "user-dashboard.html";
  });
}

const user = JSON.parse(localStorage.getItem("user"));

const payload = {
  service: selectedService,
  date: document.querySelector("#date").value,
  time: document.querySelector("#time").value,
  address: document.querySelector("#address").value,
  userId: user.id
};
  
