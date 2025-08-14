// adminLogin.js
document.addEventListener("DOMContentLoaded", () => {
  const adminCard = document.querySelector('a[href="#Admin-login"]');
  const homeSection = document.querySelector(".home");
  const adminLogin = document.getElementById("Admin-login");
  const userLogin = document.getElementById("User-login");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminDashboard = document.getElementById("admin-dashboard");

  // Hide dashboard initially
  if (adminDashboard) adminDashboard.style.display = "none";

  // Clicking "Admin" shows admin login
  if (adminCard) {
    adminCard.addEventListener("click", (e) => {
      e.preventDefault();
      if (homeSection) homeSection.style.display = "none";
      if (adminLogin) adminLogin.style.display = "block";
      if (userLogin) userLogin.style.display = "none";
    });
  }

  // Admin login form submit
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("admin-email").value;
      const password = document.getElementById("admin-password").value;

      if (email === "admin@gmail.com" && password === "123456") {
        showPopupMessage("✅ Admin login successful!", true, () => {
          if (adminLogin) adminLogin.style.display = "none";
          if (adminDashboard) adminDashboard.style.display = "flex";
        });
      } else {
        showPopupMessage("❌ Invalid admin credentials!", false);
      }

      adminLoginForm.reset();
    });
  }
});
