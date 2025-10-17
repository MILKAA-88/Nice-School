// home.js
document.addEventListener("DOMContentLoaded", async () => {
    await fetchNotes();
});

async function fetchNotes() {
    const token = localStorage.getItem("ecoleDirecteToken");

    if (!token) {
        alert("Vous n'êtes pas connecté. Redirection vers la page de login.");
        window.location.href = "/Login/Login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/notes", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        // Affiche la moyenne générale
        const moyenneGeneraleElement = document.getElementById("moyenneGenerale");
        moyenneGeneraleElement.textContent = data.moyenneGenerale || "—";

        // Affiche les notes par matière
        displayNote("noteMaths", data.notes?.maths);
        displayNote("noteFrancais", data.notes?.francais);
        displayNote("noteHistoireGeo", data.notes?.histoireGeo);
        displayNote("notePhysique", data.notes?.physique);
        displayNote("noteSvt", data.notes?.svt);
        displayNote("noteTechnologie", data.notes?.technologie);
        displayNote("noteLatin", data.notes?.latin);

    } catch (err) {
        console.error("Erreur :", err);
        alert(`Erreur : ${err.message}`);
    }
}

function displayNote(elementId, note) {
    const element = document.getElementById(elementId);
    element.textContent = note !== undefined ? note : "—";
}
