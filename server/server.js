// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Session } = require("node-ecole-directe");
const path = require("path");

const app = express();
const PORT = 3000;
const JWT_SECRET = "ta_cle_secrete"; // À remplacer par une vraie clé secrète en production

// ⚡ Middleware
app.use(cors({ origin: "http://localhost:3000" })); // si tu changes le port, modifie ici
app.use(express.json());

// Sert tous les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, "..")));

// ⚡ Route racine : renvoie le login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Login", "login.html"), function(err) {
    if (err) {
      console.error(err);
      res.status(500).send("Impossible de charger le login.");
    }
  });
});
// Route de login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Identifiant et mot de passe requis." });
  }

  try {
    const session = new Session(username, password);
    await session.login();

    if (session.account.type !== "Élève") {
      return res.status(403).json({ success: false, message: "Seuls les comptes élèves sont autorisés." });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { username, accountType: session.account.type },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      name: `${session.account.prenom} ${session.account.nom}`,
      token,
    });
  } catch (error) {
    console.error("Erreur de connexion :", error);
    res.status(401).json({ success: false, message: "Identifiant ou mot de passe incorrect." });
  }
});

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token manquant." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token invalide ou expiré." });
    }
    req.user = user;
    next();
  });
}

// Route protégée pour récupérer les notes
app.get("/api/notes", authenticateToken, async (req, res) => {
  try {
    // ⚠️ Pour l’instant, mot de passe temporaire, à sécuriser plus tard
    const session = new Session(req.user.username, "mot_de_passe_temporaire");
    await session.login();
    const notes = await session.fetchNotes();

    res.json({
      success: true,
      notes: notes,
    });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des notes." });
  }
});

// ⚡ Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
