// login.js
const form = document.getElementById("loginForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Envoie des identifiants au serveur
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    
    const result = await res.json();
    
    if (result.success) {
      // Connexion OK → redirection
      window.location.href = "/public/home.html";
    } else {
      // Identifiants incorrects → message
      status.textContent = "Identifiants incorrects";
      status.style.color = "white";
    }
  } catch (err) {
    status.textContent = "Erreur serveur";
    status.style.color = "white";
    console.error(err);
  }
});