const hideLoading = document.querySelector('.loading');
hideLoading.classList.add('hidden')
const hideMainContainer = document.querySelector('.container');
hideMainContainer.classList.add('hidden');


let message = [];

let userName = {
    name: ''
};

let loginPage = '';

function login() {

    loginPage = document.querySelector('.login-input').value;

    if (loginPage === '') {
        alert('😅 Digite seu nome!');
    } else {
        userName = { name: loginPage };
        const removeHomeLayout = document.querySelector('.container-login-page');
        removeHomeLayout.classList.add('hidden');
        hideLoading.classList.remove('hidden');
        userNameLogin()
    };
}

function userNameLogin() {
    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    promisePOST.then(onlineUser);
    promisePOST.catch(errorUsername);
};

function onlineUser() {
    const removeLoginPage = document.querySelector('.login-page');
    removeLoginPage.classList.add('hidden');
    const addInitialLayout = document.querySelector('.container');
    addInitialLayout.classList.remove('hidden');

    sendStatus();
    setInterval(sendStatus, 5000);

    searchMessage();
    setInterval(searchMessage, 3000);

    loadParticipants();
    setInterval(loadParticipants, 10000);
};

function errorUsername(error) {
    console.log(error.response);
    if (error.response.status === 400) {
        alert(`🥴 OPS...
Digite outro nome, pois este já está em uso!`);
        window.location.reload()
    };
    if (error.response.status === 404) {
        alert(`🥴 Erro 404 Not Found...
    Tente novamente mais tarde!`);
        window.location.reload()
    };
};

function sendStatus() {
    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);
    promisePOST.then(activeConnection);
    promisePOST.catch(connectionError);
};

function activeConnection() {
    console.log('Usuário Conectado!');
};

function connectionError() {
    console.log('Erro na conexão!');
};

function searchMessage() {
    const promiseGET = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promiseGET.then(displayMessage);
    promiseGET.catch(() => window.location.reload());
};

function loadParticipants() {
    const promiseGET = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promiseGET.then(participantsFound);
    promiseGET.catch(participantsNotFound);
};

function participantsFound(response) {
    participants = response.data;
};

function participantsNotFound(error) {
    alert('Erro ao buscar participantes! Atualizando página...')
    console.log(error);
    window.location.reload();
};

function displayMessage(response) {
    const message = response.data;

    let messageContainer = document.querySelector('.message-container');

    messageContainer.innerHTML = '';

    for (let i = 0; i < message.length; i++) {

        switch (message[i].type) {

            case 'status':
                messageContainer.innerHTML += `
                <div data-test="message" class='statusMessage'>
                    <p>
                        <span class='time'>(${message[i].time})</span>
                        <strong class='name'>${message[i].from}</strong>
                        <span class='text'>${message[i].text}</span> 
                    </p>
                </div>`;
                break;

            case 'message':
                messageContainer.innerHTML += `
                <div data-test="message" class='regularMessage'>
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
                if (message[i].from === userName.name || message[i].to === userName.name || message[i].to === 'Todos') {
                    messageContainer.innerHTML += `
                <div data-test="message" class='privateMessage'>
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

        };
    };
    messageContainer.lastChild.scrollIntoView();
};

function sendMessage() {
    const messageSent = document.querySelector('.text-input').value;
    document.querySelector('.text-input').value = '';
    if (messageSent === '') {
        return messageSent;
    };

    const newMessage = {
        from: userName.name,
        to: 'Todos',
        text: messageSent,
        type: 'message'
    };

    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);
    promisePOST.then(searchMessage);
    promisePOST.catch(() => window.location.reload());
};

function exit() {
    const hideMainContainer = document.querySelector('.container');
    hideMainContainer.classList.add('hidden');
    const removeHomeLayout = document.querySelector('.login-page');
    removeHomeLayout.classList.toggle('hidden');
    const alteranome = document.querySelector('.paragraph');
    alteranome.innerHTML = 'Saindo...'
    setInterval(() => { window.location.reload() }, 2000)
}

// ------ click Enter -----

const userNameInput = document.querySelector('.login-input');
userNameInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const sendMessageButton = document.querySelector('#send');
        sendMessageButton.click();
    }
});

const sendMessageInput = document.querySelector('.text-input');
sendMessageInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const sendMessageButton = document.querySelector('#submit');
        sendMessageButton.click();
    }
});