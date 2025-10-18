const form = document.getElementById("loginForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === '' || password === '') {
    statusText.textContent = "Pour l'instant aucune vérification est faite.";
    window.location.href = "/home.html";
    return;
  }

  statusText.textContent = "Connexion en cours...";

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      statusText.textContent = `Bienvenue ${data.name} !`;
      localStorage.setItem("ecoleDirecteToken", data.token);
      setTimeout(() => {
        window.location.href = "/home.html";
      }, 1500);
    } else {
      statusText.textContent = data.message || "Erreur : identifiants invalides.";
    }
  } catch (err) {
    statusText.textContent = "Erreur de connexion au serveur. Veuillez réessayer.";
    console.error(err);
  }
});

