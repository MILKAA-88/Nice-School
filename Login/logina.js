document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Connexion à l’API EcoleDirecte
    const response = await fetch("https://api.ecoledirecte.com/v3/login.awp?v=4.32.1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `data={"identifiant":"${username}","motdepasse":"${password}"}`
    });

    const data = await response.json();

    if (data.code === 200) {
      const userInfo = data.data.accounts[0]; 
      const etablissement = userInfo.nomEtablissement; // Exemple: "Collège Saint Jean La Salle - Perpignan"

      if (etablissement.includes("Saint Jean La Salle")) {
        document.getElementById("status").innerText = "✅ Connexion réussie ! Bienvenue à Nice-School.";

        // Sauvegarde du token en mémoire de session
        sessionStorage.setItem("token", data.token);

        // On peut aussi sauvegarder le prénom/nom pour le dashboard
        sessionStorage.setItem("prenom", userInfo.prenom);
        sessionStorage.setItem("nom", userInfo.nom);

        // Redirection vers le tableau de bord
        window.location.href = "/home.html";
      } else {
        document.getElementById("status").innerText = "❌ Désolé, Nice-School est réservé aux élèves de Saint Jean La Salle.";
      }
    } else {
      document.getElementById("status").innerText = "⚠️ Identifiants incorrects.";
    }

  } catch (error) {
    console.error("Erreur :", error);
    document.getElementById("status").innerText = "Erreur de connexion au serveur.";
  }
});
