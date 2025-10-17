const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
(async () => {
    const compte = await session.connexion("identifiant", "mot-de-passe");
    // Vous êtes maintenant connecté à école directe !

    // Récupération des notes
    const notes = await compte.fetchNotes();

    // Récupération de l'emploi du temps
    const emploiDuTemps = await compte.fetchEmploiDuTemps(); // Sans date spécifiée
    const emploiDuTempsDu18Au22 = await compte.fetchEmploiDuTemps(
    "2020-03-18",
    "2020-03-22"
    ); // Avec une date de début et une date de fin

    // Récupération du cahier de texte
    const cahierDeTexte = await compte.fetchCahierDeTexte();
    const cahierDeTexteJourSpecifique = await compte.fetchCahierDeTexteJour("2020-11-01");

    // Récupération des éléments de vie scolaire (retards, absences, etc...)
    const vieScolaire = await compte.fetchVieScolaire();
})();