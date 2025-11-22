document.addEventListener("DOMContentLoaded", () => {
  const studentCard = document.querySelector('a[href="#User-login"]');
  const homeSection = document.querySelector(".home");
  const userLogin = document.getElementById("User-login");
  const adminLogin = document.getElementById("Admin-login");
  const loginForm = document.getElementById("user-login-form");
  const userDashboard = document.getElementById("user-dashboard");

  // Hide dashboard initially
  if (userDashboard) userDashboard.style.display = "none";

  // Show login page when student card clicked
  if (studentCard) {
    studentCard.addEventListener("click", (e) => {
      e.preventDefault();
      if (homeSection) homeSection.style.display = "none";
      if (userLogin) userLogin.style.display = "block";
      if (adminLogin) adminLogin.style.display = "none";
    });
  }

  // Handle login form submit
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
        const url = `./Database/login.php?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`;

        // ✅ Include credentials so PHP session is sent
        const res = await fetch(url, {
          method: "GET",
          credentials: "same-origin",
        });

        const data = await res.json();

        if (data.success) {
          // Optional: store user info in localStorage for dashboard use
          if (data.user_id) localStorage.setItem("user_id", data.user_id);
          if (data.fullname) localStorage.setItem("user_name", data.fullname);

          showPopupMessage("✅ Login successful", true, () => {
            if (userLogin) userLogin.style.display = "none";
            if (userDashboard) userDashboard.style.display = "block";
          });
        } else {
          showPopupMessage("❌ " + data.message, false);
        }
      } catch (error) {
        console.error(error);
        showPopupMessage("❌ Server or database error!", false);
      }
    });
  }
});
