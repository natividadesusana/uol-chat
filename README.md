# Project UOL Chat 

The implemented project is a real-time chat, inspired by UOL Chat. It allows the user to enter a chat room, send and receive messages and view previous messages exchanged in the room. It is based on pure JavaScript technologies and does not use libraries or other languages that compile to JavaScript. In addition, it uses the Chat UOL API to maintain the user's connection and implement some functionalities.
 
 <img width="1440" alt="Captura de Tela 2023-01-22 às 17 53 26" src="https://user-images.githubusercontent.com/95102911/213939867-fe785c53-7785-457c-9b16-89a216145973.png">
 
 <img width="1438" alt="Captura de Tela 2023-01-22 às 17 58 28" src="https://user-images.githubusercontent.com/95102911/213940100-50159d6a-95de-40b7-bf20-abaec67c7551.png">

<img width="1440" alt="Captura de Tela 2023-01-22 às 17 59 30" src="https://user-images.githubusercontent.com/95102911/213940182-b4fa3c3d-0621-48a2-a978-a241f0bd7040.png">

<img width="1438" alt="Captura de Tela 2023-01-22 às 18 00 07" src="https://user-images.githubusercontent.com/95102911/213940185-a01f52a9-da45-45ba-abfa-df3097328dc2.png">

To test the project working, access this link:
https://projeto5-batepapouol-navy.vercel.app/

## ℹ️ About 
The project was motivated by the need to develop pure JavaScript skills and explore developing real-time chats. The project implements the following features:

- Room Entry: When the user accesses the page, they are asked to enter their name, and then the name is sent to the server to register the user. If the server responds successfully, the user can join the room. Otherwise, he must choose another name.
- Sending messages: User can send messages to the chat room. When the server responds successfully, the chat room messages are updated and the new message is displayed.
- Message View: The chat displays past messages from the chat room as well as newly sent messages. There are three types of messages: regular messages, reserved messages, and status messages (such as "Joined" or "Left" the room). Each message type has a different background and reserved messages are only displayed if the sender or recipient is the same as the user.
- Auto Update: The chat room is updated every three seconds to keep the user up to date with the latest messages.
- Keeping the connection: The server must know that the user is still online. For this, every 5 seconds the system must send a POST request to the Chat UOL API informing that the user is active.
- Message search: User can search previous messages in the chat room.

## 🛠️ Technologies
- Javascript
- UOL Chat API

## 💻 How to run the project
1. Clone the repository to your local machine.
2. Open the index.html file in a web browser.
3. Enter your name and click "Join Room".
4. Send and receive messages in the chat room.

## How to Contribute
Contributions are always welcome! If you find any bugs or have suggestions for new features, feel free to open an issue or pull request.

_____
 
### *Mobile Layout*

 <img width="449" alt="Captura de Tela 2023-01-22 às 18 03 46" src="https://user-images.githubusercontent.com/95102911/213940315-aedfbcd7-20d6-4b16-b2cc-e2cbd3a0207a.png">

<img width="451" alt="Captura de Tela 2023-01-22 às 18 05 18" src="https://user-images.githubusercontent.com/95102911/213940365-ea83572c-d44c-4a91-be70-f88f980a15fb.png">

<img width="450" alt="Captura de Tela 2023-01-22 às 18 04 33" src="https://user-images.githubusercontent.com/95102911/213940369-e5447f1c-16f3-49cb-a167-c1e61c4e3a2d.png">

<img width="447" alt="Captura de Tela 2023-01-22 às 18 04 50" src="https://user-images.githubusercontent.com/95102911/213940374-3678c840-776b-4a9c-aa57-f9ebe40b124d.png">
