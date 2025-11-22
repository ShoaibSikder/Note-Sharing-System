document.addEventListener("DOMContentLoaded", () => {
  const registerFormSection = document.getElementById("User-Register-form");
  const registrationForm = document.getElementById("registrationForm");
  const createButtons = document.querySelectorAll(".Create");
  const backButtons = document.querySelectorAll(".back-btn");
  const homeSection = document.querySelector(".home");
  const userLogin = document.getElementById("User-login");
  const adminLogin = document.getElementById("Admin-login");

  // Show registration form
  createButtons.forEach((button) => {
    button.addEventListener("click", () => {
      homeSection.style.display = "none";
      userLogin.style.display = "none";
      adminLogin.style.display = "none";
      registerFormSection.style.display = "block";
    });
  });

  // Back button behavior
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (registerFormSection.style.display === "block") {
        registerFormSection.style.display = "none";
        userLogin.style.display = "block";
      } else {
        homeSection.style.display = "block";
        adminLogin.style.display = "none";
        userLogin.style.display = "none";
        registerFormSection.style.display = "none";
      }
    });
  });

  // Registration form submission
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch("./Database/register.php", {
      // adjust path if needed
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        let data;
        try {
          data = await response.json();
        } catch {
          data = { code: response.status, message: response.statusText };
        }

        if (response.ok) {
          showPopupMessage("✅ " + data.message, true);
          this.reset();
          registerFormSection.style.display = "none";
          userLogin.style.display = "block";
        } else {
          showPopupMessage(
            `❌ Error ${data.code || response.status}: ${
              data.message || response.statusText
            }`,
            false
          );
        }
      })
      .catch((err) => {
        console.error(err);
        showPopupMessage("❌ Unexpected error!", false);
      });
  });
});
