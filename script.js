const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxK1NPjr9SN03-xPeP3dCTlmptkAIGKIo80QYOjzyO-jwWJtPzWr9n9hT-ILEyQH-aU/exec";

const params = new URLSearchParams(window.location.search);

const invitee = params.get("invite") || "Invitée";

document.getElementById("invitee").innerHTML =
`Bonjour <strong>${invitee}</strong> ! 🎉`;

async function reply(response){

    document.querySelectorAll("button")
        .forEach(btn => btn.disabled = true);

    document.getElementById("result").innerHTML =
        "⏳ Enregistrement...";

    try{

        await fetch(SCRIPT_URL,{
            method:"POST",
            body:JSON.stringify({
                invitee,
                response
            })
        });

        document.getElementById("result").innerHTML = `
            <div class="success">

                <h3>🎉 Merci ${invitee} !</h3>

                <p>
                    Ta réponse a bien été enregistrée.
                </p>

                <p>
                    Julia a hâte de partager cette journée avec toi ❤️
                </p>

            </div>
        `;

    }
    catch{

        document.getElementById("result").innerHTML = `
            <div class="error">
                Une erreur est survenue.
                Merci de réessayer.
            </div>
        `;

        document.querySelectorAll("button")
            .forEach(btn => btn.disabled = false);

    }

}
