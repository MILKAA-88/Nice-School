router.get('/devoirs', authenticateToken, async (req, res) => {
  // 1. Récupérer l'utilisateur depuis le token
  const user = req.user;

  try {
    // 2. Récupérer les devoirs depuis École Directe
    const devoirs = await axios.get(`https://api.ecoledirecte.com/v1/devoirs?token=${user.token}`);

    // 3. Renvoyer les devoirs au frontend
    res.json(devoirs.data);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des devoirs." });
  }
});

// Middleware pour vérifier le token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: "Token manquant." });

  try {
    const decoded = jwt.verify(token, 'TA_CLE_SECRETE');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token invalide." });
  }
}
