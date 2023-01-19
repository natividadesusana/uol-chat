
message = [];

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

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);
    promise.then(messagesAgain);
    promise.catch(window.location.reload());
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