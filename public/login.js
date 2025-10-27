document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Redirige vers la page d'accueil après une connexion réussie
            window.location.href = "/pubic/home.html";
        } else {
            // Affiche un message d'erreur
            document.getElementById("status").textContent = data.detail || "Erreur de connexion";
        }
    } catch (error) {
        document.getElementById("status").textContent = "Erreur réseau";
    }
});
