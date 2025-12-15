/* eslint-env browser */
// Hardcoded users database (no backend needed)
const USERS = [
  { username: "admin", password: "Admin123!" },
  { username: "testuser", password: "Test123!" },
  { username: "demo", password: "Demo123!" },
];

// DOM Elements
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const buttonText = document.getElementById("buttonText");
const buttonLoader = document.getElementById("buttonLoader");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  successMessage.classList.add("hidden");
}

// Show success message
function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

// Hide all messages
function hideMessages() {
  errorMessage.classList.add("hidden");
  successMessage.classList.add("hidden");
}

// Validate credentials
function validateCredentials(username, password) {
  return USERS.find(
    (user) => user.username === username && user.password === password
  );
}

// Set loading state
function setLoading(isLoading) {
  loginButton.disabled = isLoading;
  if (isLoading) {
    buttonText.classList.add("hidden");
    buttonLoader.classList.remove("hidden");
  } else {
    buttonText.classList.remove("hidden");
    buttonLoader.classList.add("hidden");
  }
}

// Handle login submission
async function handleLogin(event) {
  event.preventDefault();
  event.stopPropagation();
  hideMessages();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation
  if (!username || !password) {
    showError("Please enter both username and password");
    return;
  }

  setLoading(true);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validate credentials
  const user = validateCredentials(username, password);

  if (user) {
    showSuccess(`Welcome back, ${user.username}! Login successful.`);

    // Store login state
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("loginTime", new Date().toISOString());

    // Redirect to dashboard after 1.5 seconds
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } else {
    showError("Invalid username or password. Please try again.");
    passwordInput.value = "";
    passwordInput.focus();
  }

  setLoading(false);
}

// Event listeners
loginForm.addEventListener("submit", handleLogin);

// Clear error message when user starts typing
usernameInput.addEventListener("input", hideMessages);
passwordInput.addEventListener("input", hideMessages);

// Check if user is already logged in
window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  if (isLoggedIn === "true") {
    const username = sessionStorage.getItem("username");
    showSuccess(`You are already logged in as ${username}`);
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
