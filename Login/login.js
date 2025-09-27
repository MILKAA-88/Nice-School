const { Session } = require("api-ecoledirecte");

const session = new Session();

(async () => {
  try {
    // Connexion
    await session.login("identifiant", "motdepasse");
    console.log("✅ Connexion réussie");

    // Vérifier qu’un compte existe
    if (!session.accounts || session.accounts.length === 0) {
      console.log("⚠️ Aucun compte trouvé pour cet utilisateur");
      return;
    }

    // Récupérer les notes
    const notes = await session.accounts[0].fetchNotes();
    console.log("📘 Notes :", notes);
  } catch (err) {
    console.error("❌ Impossible de se connecter :", err.message || err);
  }
})();
