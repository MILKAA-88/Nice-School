document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const statusElement = document.getElementById('status');

    statusElement.textContent = "Connexion en cours...";

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            statusElement.textContent = data.error || "Erreur de connexion.";
            return;
        }

        // Stocke le token dans localStorage
        localStorage.setItem('token', data.token);

        // Redirige vers la page d'accueil après une connexion réussie
        window.location.href = '/home.html';

    } catch (err) {
        statusElement.textContent = "Une erreur est survenue. Veuillez réessayer.";
        console.error(err);
    }
});
