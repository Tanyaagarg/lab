// =================== PACKAGE DATA ===================
const packages = [
  { id: 1, destination: "Paris, France", durationDays: 5, basePrice: 120000, season: "peak" },
  { id: 2, destination: "Tokyo, Japan", durationDays: 7, basePrice: 150000, season: "off" },
  { id: 3, destination: "New York, USA", durationDays: 6, basePrice: 130000, season: "normal" }
];

// Function to calculate final price
function calculateFinalPrice(pkg) {
  let price = pkg.basePrice;

  // Seasonal multiplier
  if (pkg.season === "peak") price *= 1.2;
  else if (pkg.season === "off") price *= 0.9;

  // Weekend surcharge (just for demo)
  if (pkg.durationDays >= 6) price += 5000;

  return Math.round(price);
}

// Render packages table
function renderPackages() {
  const tableBody = document.getElementById("packages-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  packages.forEach(pkg => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>Rs ${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>Rs ${calculateFinalPrice(pkg)}</td>
    `;
    tableBody.appendChild(row);
  });
}

// =================== BOOKING FORM ===================
function calculateBookingPrice() {
  const dest = document.getElementById("destination").value;
  const checkIn = document.getElementById("checkin").value;
  const checkOut = document.getElementById("checkout").value;
  const guests = parseInt(document.getElementById("guests").value) || 1;
  const promo = document.getElementById("promo").value.trim();

  if (!dest || !checkIn || !checkOut) {
    document.getElementById("total").innerText = "Please fill all fields.";
    return;
  }

  const pkg = packages.find(p => dest.toLowerCase().includes(p.destination.toLowerCase().split(",")[0]));
  if (!pkg) return;

  // Nights calculation
  const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  let price = pkg.basePrice * nights / pkg.durationDays;

  // Guest multiplier
  if (guests > 2) price *= 1.2;

  // Promo code
  switch (promo.toUpperCase()) {
    case "EARLYBIRD":
      price *= 0.9;
      break;
    case "WELCOME":
      price -= 5000;
      break;
  }

  document.getElementById("total").innerText = "Estimated Price: Rs " + Math.round(price);
}

// =================== GALLERY MODAL ===================
function setupGallery() {
  const thumbnails = document.querySelectorAll(".gallery-img");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");

  if (!modal) return;

  thumbnails.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.dataset.large;
      modalCaption.innerText = img.alt;
    });
  });

  document.getElementById("modal-close").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// =================== NAV ACTIVE ===================
function setActiveNav() {
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = location.pathname.split("/").pop();
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// =================== INIT ===================
document.addEventListener("DOMContentLoaded", () => {
  renderPackages();
  setupGallery();
  setActiveNav();

  // Booking form listener
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("input", calculateBookingPrice);
  }
});
