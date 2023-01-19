
message = [];

let userName = {name: prompt(`🧡 Bem Vindo ao Chat UOL! 
Digite seu nome:`)}

function userNameLogin() {
    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    promisePOST.then(searchMessage);
    promisePOST.catch(errorUsername);
}
searchMessage()

function searchMessage() {
    const promiseGET = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promiseGET.then(displayMessage);
    promiseGET.catch(errorUsername);
}

function errorUsername() {
    alert(`🥴 OPS...
    Digite outro nome, pois este já está em uso!`);
    window.location.reload()
}

function displayMessage(response) {

    const message = response.data;

    const messageContainer = document.querySelector('.message-container');

    messageContainer.innerHTML = '';

    for (let i = 0; i < message.length; i++) {

        messageContainer.innerHTML += `
            <div class='message ${message[i].type}'>
                <p>
                    <span class='time'>(${message[i].time})</span>
                    <strong class='name'>${message[i].from}</strong>
                    para <span class='text'>${message[i].to}</span>
                    <span class='text'>${message[i].text}</span> 
                </p>
            </div>
        `

        const lastMessage = document.querySelector('messageContainer');

        lastMessage.scrollIntoView();
    }

    setInterval(displayMessage, 3000)
}


function sendMessage() {

    const messageSent = document.querySelector('.text-input').value;
    document.querySelector('.text-input').value = '';
    if (messageSent === '') {
        return messageSent;
    };

    const newMessage = {
       from: userName,
       to: 'Todos',
       text: messageText,
       type: messageType
    };

    const promisePOST = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);
    promisePOST.then(messagesAgain);
    promisePOST.catch(window.location.reload());
    console.log(promisePOST)
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


displayMessage()