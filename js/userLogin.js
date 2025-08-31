// userLogin.js
document.addEventListener("DOMContentLoaded", () => {
  const studentCard = document.querySelector('a[href="#User-login"]');
  const homeSection = document.querySelector(".home");
  const userLogin = document.getElementById("User-login");
  const adminLogin = document.getElementById("Admin-login");
  const loginForm = document.getElementById("user-login-form");
  const userDashboard = document.getElementById("user-dashboard");

  // ✅ Always hide dashboard on page load
  if (userDashboard) {
    userDashboard.style.display = "none";
  }

  // Predefined credentials
  const predefinedUser = {
    username: "shoaib@gmail.com",
    password: "1157",
  };

  // Show login form when student clicks
  studentCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    userLogin.style.display = "block";
    adminLogin.style.display = "none";
  });

  // Handle login form submit
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const username = formData.get("username");
      const password = formData.get("password");

      // ✅ First check predefined login
      if (
        username === predefinedUser.username &&
        password === predefinedUser.password
      ) {
        showPopupMessage("✅ Login successful (local user)!", true, () => {
          userLogin.style.display = "none";
          userDashboard.style.display = "block"; // show dashboard
        });
        return; // Stop here (don’t send to server)
      }

      // Otherwise, check with server
      try {
        const res = await fetch("php/login.php", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          showPopupMessage("✅ Login successful!", true, () => {
            userLogin.style.display = "none";
            userDashboard.style.display = "block"; // show dashboard
          });
        } else {
          showPopupMessage("❌ " + data.message, false);
        }
      } catch (error) {
        console.error(error);
        showPopupMessage("❌ Server error!", false);
      }
    });
  }
});
