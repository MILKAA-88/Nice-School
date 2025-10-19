const express = require("express");
const { Session } = require("node-ecole-directe");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); // dossier contenant login.html et home.html

app.post("/Login", async (req, res) => {
    const { username, password } = req.body;
    const session = new Session();

    try {
        const compte = await session.connexion(username, password);
        // Connexion réussie
        res.json({ success: true, user: compte });
    } catch (err) {
        // Identifiants incorrects
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
