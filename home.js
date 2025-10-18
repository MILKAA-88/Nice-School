function displayNote(elementId, note) {
    const element = document.getElementById(elementId);
    element.textContent = note !== undefined ? note : "—";
}

function updateMoyenneColor(moyenne) {
    const moyenneElement = document.getElementById("moyenneGenerale");
    if (!moyenne || moyenne === "—") return;

    const moyenneNum = parseFloat(moyenne);
    
    if (moyenneNum >= 15) {
        moyenneElement.style.backgroundColor = "#4CAF50"; 
    } else if (moyenneNum >= 10) {
        moyenneElement.style.backgroundColor = "#2196F3"; 
    } else {
        moyenneElement.style.backgroundColor = "#F44336"; 
    }
}