const express = require('express');
const router = express.Router();

// Exemple de données mockées
const notes = [
  { id: 1, matiere: "Mathématiques", note: 15, coefficient: 2 },
  { id: 2, matiere: "Français", note: 12, coefficient: 1 },
];

// Récupérer toutes les notes
router.get('/', (req, res) => {
  res.json(notes);
});

module.exports = router;
