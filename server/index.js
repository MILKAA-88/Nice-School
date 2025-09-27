const express = require('express');
const { EcoleDirecte } = require('ecole-directe-node');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Clé secrète pour les tokens JWT (à remplacer par une clé sécurisée)
const JWT_SECRET = 'TA_CLE_SECRETE';

// Route pour la connexion
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Initialise la connexion avec École Directe
        const ed = new EcoleDirecte(username, password);

        // 2. Tente de récupérer les informations de l'utilisateur
        const userData = await ed.login();

        // 3. Vérifie que l'utilisateur est bien de La Salle Saint Jean
        if (userData.etablissement.nom !== "La Salle Saint Jean Perpignan") {
            return res.status(403).json({ error: "Vous n'êtes pas inscrit au collège La Salle Saint Jean." });
        }

        // 4. Génère un token JWT valide 1h
        const token = jwt.sign(
            { userId: userData.id, etablissement: userData.etablissement.nom },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 5. Renvoie le token au frontend
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Identifiants incorrects ou erreur de connexion." });
    }
});

// Route pour récupérer les devoirs (exemple)
app.get('/api/devoirs', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Token manquant." });
    }

    try {
        // 1. Décode le token pour récupérer l'ID utilisateur
        const decoded = jwt.verify(token, JWT_SECRET);

        // 2. Initialise la connexion avec École Directe (à adapter)
        const ed = new EcoleDirecte(decoded.userId, 'MOT_DE_PASSE_TEMPORAIRE'); // À améliorer

        // 3. Récupère les devoirs
        const devoirs = await ed.getHomework();

        // 4. Renvoie les devoirs
        res.json(devoirs);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des devoirs." });
    }
});

// Démarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
