document.addEventListener("DOMContentLoaded", () => {
  const adminDashboard = document.getElementById("admin-dashboard");
  const adminLogin = document.getElementById("Admin-login");

  // Admin dropdown
  const adminBtn = document.getElementById("admin-btn");
  const adminDropdown = document.querySelector(".admin-dropdown");
  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      adminDropdown.classList.toggle("show");
    });
  }

  // Sample users with full details
  const users = [
    {
      id: 1,
      name: "Shoaib Sikder",
      username: "shoaib123",
      email: "shoaib@example.com",
      uploads: 10,
      downloads: 25,
    },
    {
      id: 2,
      name: "Fatima Akter",
      username: "fatimaA",
      email: "fatima@example.com",
      uploads: 5,
      downloads: 14,
    },
    {
      id: 3,
      name: "Ali Hasan",
      username: "aliH",
      email: "ali@example.com",
      uploads: 7,
      downloads: 9,
    },
    {
      id: 4,
      name: "Nadia Khan",
      username: "nadiaK",
      email: "nadia@example.com",
      uploads: 3,
      downloads: 4,
    },
  ];

  // Populate dashboard stats
  const totalUploadsEl = document.getElementById("total-uploads");
  const totalDownloadsEl = document.getElementById("total-downloads");
  const updateStats = () => {
    totalUploadsEl.textContent = users.reduce((acc, u) => acc + u.uploads, 0);
    totalDownloadsEl.textContent = users.reduce(
      (acc, u) => acc + u.downloads,
      0
    );
  };
  updateStats();

  // Modal elements
  const viewModal = document.getElementById("viewUsersModal");
  const deleteModal = document.getElementById("deleteUserModal");
  const searchModal = document.getElementById("searchUserModal");

  const closeViewBtn = document.getElementById("closeViewUsers");
  const closeDeleteBtn = document.getElementById("closeDeleteUser");
  const closeSearchBtn = document.getElementById("closeSearchUser");

  const viewUsersBtn = document.getElementById("view-users-btn");
  const deleteUserBtn = document.getElementById("delete-user-btn");
  const searchUserBtn = document.getElementById("search-user-btn");

  const renderUsers = () => {
    const container = document.getElementById("users-container");
    container.innerHTML = users
      .map(
        (u) => `
      <div class="file-card">
        <p><strong>ID:</strong> ${u.id}</p>
        <p><strong>Name:</strong> ${u.name}</p>
        <p><strong>Username:</strong> ${u.username}</p>
        <p><strong>Email:</strong> ${u.email}</p>
        <p><strong>Uploads:</strong> ${u.uploads} | <strong>Downloads:</strong> ${u.downloads}</p>
      </div>`
      )
      .join("");
  };

  // ===== View All Users =====
  viewUsersBtn.addEventListener("click", () => {
    renderUsers();
    viewModal.classList.add("active");
    adminDashboard.classList.add("blur");
  });
  closeViewBtn.addEventListener("click", () => {
    viewModal.classList.remove("active");
    adminDashboard.classList.remove("blur");
  });

  // ===== Delete User =====
  deleteUserBtn.addEventListener("click", () => {
    document.getElementById("deleteUserName").value = "";
    document.getElementById("deleteUserMsg").textContent = "";
    deleteModal.classList.add("active");
    adminDashboard.classList.add("blur");
  });
  closeDeleteBtn.addEventListener("click", () => {
    deleteModal.classList.remove("active");
    adminDashboard.classList.remove("blur");
  });
  document.getElementById("deleteUserConfirm").addEventListener("click", () => {
    const input = document
      .getElementById("deleteUserName")
      .value.trim()
      .toLowerCase();
    const msg = document.getElementById("deleteUserMsg");

    let index = users.findIndex(
      (u) =>
        u.id.toString() === input ||
        u.name.toLowerCase() === input ||
        u.username.toLowerCase() === input
    );
    if (index !== -1) {
      msg.textContent = `✅ User "${users[index].name}" deleted successfully!`;
      users.splice(index, 1);
      updateStats();
      renderUsers(); // Update view modal immediately
    } else {
      msg.textContent = "❌ User not found.";
    }
  });

  // ===== Search User =====
  searchUserBtn.addEventListener("click", () => {
    document.getElementById("searchUserName").value = "";
    const searchMsg = document.getElementById("searchUserMsg");
    searchMsg.textContent = "";
    searchModal.classList.add("active");
    adminDashboard.classList.add("blur");
  });

  closeSearchBtn.addEventListener("click", () => {
    searchModal.classList.remove("active");
    adminDashboard.classList.remove("blur");
  });

  document.getElementById("searchUserConfirm").addEventListener("click", () => {
    const search = document
      .getElementById("searchUserName")
      .value.trim()
      .toLowerCase();
    const searchMsg = document.getElementById("searchUserMsg");

    const result = users.find(
      (u) =>
        u.id.toString() === search ||
        u.name.toLowerCase() === search ||
        u.username.toLowerCase() === search
    );

    if (result) {
      // Show full user info in a card (like View All Users)
      searchMsg.innerHTML = `
      <div class="file-card">
        <p><strong>ID:</strong> ${result.id}</p>
        <p><strong>Name:</strong> ${result.name}</p>
        <p><strong>Username:</strong> ${result.username}</p>
        <p><strong>Email:</strong> ${result.email}</p>
        <p><strong>Uploads:</strong> ${result.uploads} | <strong>Downloads:</strong> ${result.downloads}</p>
      </div>
      `;
    } else {
      searchMsg.textContent = "❌ No user found.";
    }
  });

  // ===== Logout =====
  document.getElementById("admin-logout").addEventListener("click", () => {
    // Hide dashboard
    adminDashboard.style.display = "none";
    adminLogin.style.display = "block";
  });
});
