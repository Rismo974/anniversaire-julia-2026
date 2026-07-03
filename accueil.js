const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxK1NPjr9SN03-xPeP3dCTlmptkAIGKIo80QYOjzyO-jwWJtPzWr9n9hT-ILEyQH-aU/exec";

async function chargerInvites() {

    try {

        const response = await fetch(
            SCRIPT_URL + "?action=list"
        );

        const invites = await response.json();

        const presentes = [];
        const attente = [];

        invites.forEach(invite => {

            if (invite.response === "Présente") {

                presentes.push(invite.invitee);

            } else if (
                invite.response === "" ||
                invite.response == null
            ) {

                attente.push(invite.invitee);

            }

        });

        afficherListe(
            "presentes",
            presentes,
            "invitées confirmées"
        );

        afficherListe(
            "attente",
            attente,
            "réponses en attente"
        );

    }

    catch (e) {

        console.error(e);

    }

}

function afficherListe(id, liste, texte) {

    const ul = document.getElementById(id);

    ul.innerHTML = "";

    liste.forEach(personne => {

        const li = document.createElement("li");

        li.textContent = personne;

        ul.appendChild(li);

    });

    const titre = ul.previousElementSibling;

    titre.innerHTML = `
        ${titre.dataset.icon}
        ${liste.length} ${texte}
    `;

}

chargerInvites();
