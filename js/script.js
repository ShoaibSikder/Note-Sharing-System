document.addEventListener("DOMContentLoaded", () => {
  const studentCard = document.querySelector('a[href="#User-login"]');
  const adminCard = document.querySelector('a[href="#Admin-login"]');
  const adminLogin = document.getElementById("Admin-login");
  const userLogin = document.getElementById("User-login");
  const registerForm = document.getElementById("User-Register-form");
  const homeSection = document.querySelector(".home");
  const createButtons = document.querySelectorAll(".Create");
  const backButtons = document.querySelectorAll(".back-btn");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminDashboard = document.getElementById("admin-dashboard");
  const userMenu = document.querySelector(".user-menu");
  const userBtn = document.querySelector(".user-btn");

  // Hide everything except home on load
  adminLogin.style.display = "none";
  userLogin.style.display = "none";
  registerForm.style.display = "none";
  adminDashboard.style.display = "none";

  // When user clicks "Student"
  studentCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    userLogin.style.display = "block";
    adminLogin.style.display = "none";
    registerForm.style.display = "none";
    adminDashboard.style.display = "none";
  });

  // When user clicks "Admin"
  adminCard.addEventListener("click", (e) => {
    e.preventDefault();
    homeSection.style.display = "none";
    adminLogin.style.display = "block";
    userLogin.style.display = "none";
    registerForm.style.display = "none";
    adminDashboard.style.display = "none";
  });

  // When user clicks "Create Account"
  createButtons.forEach((button) => {
    button.addEventListener("click", () => {
      homeSection.style.display = "none";
      userLogin.style.display = "none";
      adminLogin.style.display = "none";
      registerForm.style.display = "block";
      adminDashboard.style.display = "none";
    });
  });

  // Back button behavior
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (registerForm.style.display === "block") {
        registerForm.style.display = "none";
        userLogin.style.display = "block";
      } else {
        homeSection.style.display = "block";
        adminLogin.style.display = "none";
        userLogin.style.display = "none";
        registerForm.style.display = "none";
        adminDashboard.style.display = "none";
      }
    });
  });

  // Registration form submission
  const registrationForm = registerForm.querySelector("form");
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const popup = document.getElementById("popup-message");
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);

    registrationForm.reset();
    registerForm.style.display = "none";
    userLogin.style.display = "block";
  });

  // Admin login form submission
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;
    const popup = document.getElementById("popup-message");

    if (email === "admin@gmail.com" && password === "123456") {
      popup.innerText = "✅ Admin login successful!";
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
        adminLogin.style.display = "none";
        adminDashboard.style.display = "flex";
      }, 2000);
    } else {
      popup.innerText = "❌ Invalid admin credentials!";
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }

    adminLoginForm.reset();
  });

  // Admin Dashboard Example Data & Logic

  // Simulated database data
  const userUploads = [
    {
      username: "shoaib",
      file: "oop_notes.pdf",
      downloads: 22,
      approved: true,
    },
    {
      username: "fatima",
      file: "db_project.docx",
      downloads: 14,
      approved: false,
    },
    { username: "rahim", file: "ai_ppt.pptx", downloads: 9, approved: true },
    { username: "salma", file: "math_quiz.pdf", downloads: 6, approved: true },
    {
      username: "karim",
      file: "chemistry_lab.pdf",
      downloads: 3,
      approved: false,
    },
  ];

  const users = [
    { id: 1, name: "Shoaib Sikder", email: "shoaib@example.com" },
    { id: 2, name: "Fatima Akter", email: "fatima@example.com" },
    { id: 3, name: "Rahim Uddin", email: "rahim@example.com" },
  ];

  // Update Admin Stats
  const totalUploads = userUploads.length;
  const totalDownloads = userUploads.reduce(
    (acc, item) => acc + item.downloads,
    0
  );
  const totalApprovals = userUploads.filter((item) => item.approved).length;

  document.getElementById("total-uploads").textContent = totalUploads;
  document.getElementById("total-downloads").textContent = totalDownloads;
  document.getElementById("total-approvals").textContent = totalApprovals;

  // Admin Logout button
  const adminLogout = document.getElementById("admin-logout");
  if (adminLogout) {
    adminLogout.addEventListener("click", () => {
      adminDashboard.style.display = "none";
      homeSection.style.display = "block";
    });
  }

  // Footer buttons logic
  document
    .querySelector(".footer-btn:nth-child(1)")
    .addEventListener("click", () => {
      let message = "📋 All Users:\n\n";
      users.forEach((user) => {
        message += `🧑 ${user.name} (${user.email})\n`;
      });
      alert(message);
    });

  document
    .querySelector(".footer-btn:nth-child(2)")
    .addEventListener("click", () => {
      const userId = prompt("Enter User ID to delete:");
      const found = users.find((user) => user.id == userId);
      if (found) {
        alert(
          `User ${found.name} (ID: ${userId}) deleted successfully! [Simulation]`
        );
      } else {
        alert("User not found.");
      }
    });

  document
    .querySelector(".footer-btn:nth-child(3)")
    .addEventListener("click", () => {
      const searchName = prompt("Enter username to search:").toLowerCase();
      const result = users.find((u) =>
        u.name.toLowerCase().includes(searchName)
      );
      if (result) {
        alert(`✅ User Found:\n\nName: ${result.name}\nEmail: ${result.email}`);
      } else {
        alert("❌ No user found with that name.");
      }
    });

  // Toggle user dropdown menu
  userBtn.addEventListener("click", () => {
    userMenu.classList.toggle("show");
  });

  // User Dashboard data (simulate current logged-in user shared files)
  const userData = {
    username: "Shoaib",
    uploads: 10,
    downloads: 25,
    savedNotes: 3,
    recentFiles: [
      {
        title: "DBMS Notes",
        subject: "Database",
        uploadedDate: "1 Aug",
        downloads: 5,
        filePath: "files/dbms.pdf",
      },
      {
        title: "Algorithms",
        subject: "Computer Science",
        uploadedDate: "28 Jul",
        downloads: 12,
        filePath: "files/algo.pdf",
      },
      {
        title: "OOP Concepts",
        subject: "Programming",
        uploadedDate: "26 Jul",
        downloads: 8,
        filePath: "files/oop.pdf",
      },
      {
        title: "Networking Basics",
        subject: "Networks",
        uploadedDate: "24 Jul",
        downloads: 9,
        filePath: "files/networking.pdf",
      },
      {
        title: "Software Testing",
        subject: "QA",
        uploadedDate: "20 Jul",
        downloads: 6,
        filePath: "files/testing.pdf",
      },
    ],
  };

  // Update User Dashboard UI
  const filesContainer = document.getElementById("recent-files-container");

  document.getElementById(
    "user-btn"
  ).textContent = `Welcome, ${userData.username} ▼`;
  document.getElementById("uploads-count").textContent = userData.uploads;
  document.getElementById("downloads-count").textContent = userData.downloads;
  document.getElementById("saved-notes-count").textContent =
    userData.savedNotes;

  filesContainer.innerHTML = ""; // Clear old content

  userData.recentFiles.forEach((file) => {
    const fileCard = document.createElement("div");
    fileCard.classList.add("file-card");
    fileCard.innerHTML = `
      <p><strong>Title:</strong> ${file.title}</p>
      <p><strong>Subject:</strong> ${file.subject}</p>
      <p><strong>Uploaded:</strong> ${file.uploadedDate} | <strong>Downloads:</strong> ${file.downloads}</p>
      <div class="file-actions">
        <button onclick="window.open('${file.filePath}', '_blank')">View</button>
        <span style="width: 8px;"></span>
        <a href="${file.filePath}" download><button>Download</button></a>
      </div>
    `;
    filesContainer.appendChild(fileCard);
  });
});
