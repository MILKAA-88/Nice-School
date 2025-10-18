document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const statusText = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username')?.value?.trim() || '';
    const password = document.getElementById('password')?.value || '';

    // Si l'un des champs est vide => redirection vers home.html
    if (!username || !password) {
      if (statusText) statusText.textContent = "Champs vides détectés. Redirection vers l'accueil...";
      setTimeout(() => {
        window.location.href = '/home.html';
      }, 1500);
      return;
    }

    if (statusText) statusText.textContent = 'Connexion en cours...';
  });
});
