const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();

(async () => {
    try {
        const compte = await session.connexion(process.env.ED_USERNAME, process.env.ED_PASSWORD);
        console.log("Connexion réussie à EcoleDirecte !");

        // Récupération des notes
        const notes = await compte.fetchNotes();
        console.log("Notes récupérées");

        // Récupération de l'emploi du temps
        const emploiDuTemps = await compte.fetchEmploiDuTemps(); // Sans date spécifiée
        const dateDebut = new Date().toISOString().split('T')[0];
        const dateFin = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const emploiDuTempsSemaine = await compte.fetchEmploiDuTemps(
            dateDebut,
            dateFin
        ); // Emploi du temps sur 5 jours

    // Récupération du cahier de texte
    const cahierDeTexte = await compte.fetchCahierDeTexte();
    const cahierDeTexteJourSpecifique = await compte.fetchCahierDeTexteJour("2020-11-01");

    // Récupération des éléments de vie scolaire (retards, absences, etc...)
    const vieScolaire = await compte.fetchVieScolaire();
    console.log("Données de vie scolaire récupérées");
    } catch (error) {
        console.error("Erreur :", error.message);
    }
})();