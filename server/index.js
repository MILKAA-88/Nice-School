const express = require("express");
const cors = require("cors");
const path = require("path");
const { Session } = require("api-ecoledirecte");

const app = express();
app.use(cors());
app.use(express.json());

// Servir ton frontend
app.use(express.static(path.join(__dirname, "../"))); // sert tous les fichiers statiques (HTML, CSS, JS)

// Route login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const session = new Session();

  try {
    await session.login(username, password);

    if (!session.accounts || session.accounts.length === 0) {
      return res.status(400).json({ error: "Compte introuvable" });
    }

    const userInfo = session.accounts[0];
    const etablissement = userInfo.nomEtablissement;

    if (!etablissement.includes("Saint Jean La Salle")) {
      return res.status(403).json({ error: "Accès interdit" });
    }

    const notes = await userInfo.fetchNotes();
    const devoirs = await userInfo.fetchHomework();

    res.json({ userInfo, notes, devoirs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de se connecter à École Directe" });
  }
});

// GET / → Login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Login/Login.html"));
});

app.listen(3000, () => console.log("Serveur lancé sur http://localhost:3000"));
