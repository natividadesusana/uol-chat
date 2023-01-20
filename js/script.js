
let message = [];

let userName = {name: prompt(`🧡 Bem Vindo ao Chat UOL! 
Digite seu nome:`)}

function userNameLogin() {

    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    promisePOST.then(onlineUser);
    promisePOST.catch(errorUsername);
   

function errorUsername(error) {
    console.log(error.response);
    if(error.response.status === 400) {
        alert(`🥴 OPS...
Digite outro nome, pois este já está em uso!`);
    window.location.reload()
    }
    if(error.response.status === 404) {
        alert(`🥴 Erro 404 Not Found...
    Tente novamente mais tarde!`);
    window.location.reload()
    }
    
}

function sendStatus() {
    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);
    promisePOST.catch(() => window.location.reload())
 
}

function onlineUser() {
   sendStatus;
   setInterval(sendStatus, 5000);

   searchMessage();
   setInterval(searchMessage, 3000);

   loadParticipants();
   setInterval(loadParticipants, 1000); 
}

function searchMessage() {
    const promiseGET = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promiseGET.then(displayMessage);
    promiseGET.catch(() => window.location.reload());
}
searchMessage();

// Busca de participantes na sala
function loadParticipants() {
    const promiseGET = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promiseGET.then(participantsFound);
    promiseGET.catch(participantsNotFound);
}

function participantsFound(response) {
    alert('Participantes Encontrados!');
    participants = response.data;
}

function participantsNotFound(error) {
    alert('Erro ao buscar participantes! Atualizando página...')
    console.log(error);
    window.location.reload();
}
//

function displayMessage(response) {
    const message = response.data;
    console.log(message)
    let messageContainer = document.querySelector('.message-container');

    messageContainer.innerHTML = '';

    for (let i = 0; i < message.length; i++) {

        switch(message[i].type) {

            case 'status':
                messageContainer.innerHTML += `
                <div data-test="message" class='statusMessage scrollMessage'>
                    <p>
                        <span class='time'>(${message[i].time})</span>
                        <strong class='name'>${message[i].from}</strong>
                        <span class='text'>${message[i].text}</span> 
                    </p>
                </div>`;
                    break;

            case 'message':
                messageContainer.innerHTML += `
                <div class='regularMessage scrollMessage'>
                    <p>
                        <span class='time'>(${message[i].time})</span>
                        <strong class='name'>${message[i].from}</strong>
                        <span class='text'>para</span>
                        <strong class='name'>${message[i].to}</strong>
                        <span class='text'>${message[i].text}</span> 
                    </p>
                </div>`;
                break;

            case 'private_message':
                messageContainer.innerHTML += `
                <div class='privateMessage scrollMessage'>
                    <p>
                        <span class='time'>(${message[i].time})</span>
                        <strong class='name'>${message[i].from}</strong>
                        <span class='text'>reservadamente para</span>
                        <strong class='name'>${message[i].to}</strong>
                        <span class='text'>${message[i].text}</span> 
                    </p>
                </div>`;
                break;
        }
    }

    let elementAppears = messageContainer.querySelectorAll('.scrollMessage').lastElementChild();
    elementAppears[elementAppears.length-1].scrollIntoView();

}
// displayMessage(searchMessage);

function sendMessage() {
    const messageSent = document.querySelector('.text-input').value;
    document.querySelector('.text-input').value = '';
    if (messageSent === '') {
        return messageSent;
    };

    const newMessage = {
       from: userName.name,
       to: 'Todos',
       text: messageSent.value,
       type: 'message'
    };

    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);
    promisePOST.then(searchMessage);
    promisePOST.catch(() => window.location.reload());
};

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        let btn = document.querySelector("#submit");
        btn.click();
        document.querySelector('.text-input').value = '';
        if (btn === '') {
            return document.querySelector('.text-input').value = '';
        }
    }
});

}
