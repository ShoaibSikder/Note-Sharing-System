document.addEventListener("DOMContentLoaded", () => {
  const studentCard = document.querySelector('a[href="#User-login"]');
  const homeSection = document.querySelector(".home");
  const userLogin = document.getElementById("User-login");
  const adminLogin = document.getElementById("Admin-login");
  const loginForm = document.getElementById("user-login-form");
  const userDashboard = document.getElementById("user-dashboard");

  // 1. Hide dashboard initially
  if (userDashboard) userDashboard.style.display = "none";

  // 2. When student card is clicked → show login page
  if (studentCard) {
    studentCard.addEventListener("click", (e) => {
      e.preventDefault();
      homeSection.style.display = "none";
      userLogin.style.display = "block";
      adminLogin.style.display = "none";
    });
  }

  // 3. Handle login form submit
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email1").value.trim();
      const password = document.getElementById("password2").value.trim();

      if (!email || !password) {
        showPopupMessage("❌ Please enter email and password", false);
        return;
      }

      try {
        // Send GET request because your PHP uses $_GET
        const url = `./Database/login.php?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`;

        const res = await fetch(url);
        const data = await res.json();

        // 4. If login success
        if (data.success) {
          showPopupMessage("✅ Login successful", true, () => {
            userLogin.style.display = "none";
            userDashboard.style.display = "block";
          });
        } else {
          // Invalid email or pass
          showPopupMessage("❌ " + data.message, false);
        }
      } catch (error) {
        // Database or server down
        console.error(error);
        showPopupMessage("❌ Server or database error!", false);
      }
    });
  }
});
