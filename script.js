const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxK1NPjr9SN03-xPeP3dCTlmptkAIGKIo80QYOjzyO-jwWJtPzWr9n9hT-ILEyQH-aU/exec";

const params = new URLSearchParams(window.location.search);

const invitee = params.get("invite") || "Invitée";

document.getElementById("invitee").innerHTML =
`Bonjour <strong>${invitee}</strong> ! 🎉`;

async function reply(response){

    const buttons = document.querySelectorAll("button");

    buttons.forEach(btn => btn.disabled = true);

    document.getElementById("result").innerHTML = `
        <div class="success">
            ⏳ Enregistrement de ta réponse...
        </div>
    `;

    try{

        const r = await fetch(SCRIPT_URL,{
            method:"POST",
            body:JSON.stringify({
                invitee,
                response
            })
        });

        if(!r.ok){
            throw new Error();
        }

        // Petit délai pour que l'utilisateur voie le message
        await new Promise(resolve => setTimeout(resolve, 700));

        window.location.href =
            `confirmation.html?invite=${encodeURIComponent(invitee)}&response=${encodeURIComponent(response)}`;

    }

    catch(e){

        document.getElementById("result").innerHTML = `
            <div class="error">
                😢 Une erreur est survenue.<br><br>
                Merci de réessayer dans quelques instants.
            </div>
        `;

        buttons.forEach(btn => btn.disabled = false);

    }

}
