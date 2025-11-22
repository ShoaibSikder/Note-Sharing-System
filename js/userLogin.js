document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("user-login-form");
  const userLogin = document.getElementById("User-login");
  const userDashboard = document.getElementById("user-dashboard");

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
        // Use GET parameters since your PHP expects $_GET
        const url = `./Database/login.php?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`;
        const res = await fetch(url);

        const text = await res.text();
        console.log("Server response:", text); // Debug
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Invalid server response");
        }

        if (data.success) {
          showPopupMessage("✅ " + data.message, true, () => {
            userLogin.style.display = "none";
            userDashboard.style.display = "block";
          });
        } else {
          showPopupMessage("❌ " + data.message, false);
        }
      } catch (err) {
        console.error(err);
        showPopupMessage("❌ Database connection or server error", false);
      }
    });
  }
});
