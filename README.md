# Project #05 - Bate-Papo UOL

## ✅ Requirements

- General
     - [ ] Do not use any library to implement this project (jquery, lodash, react, etc), nor other languages that compile to JavaScript (TypeScript, Clojure, ELM, etc), only pure JavaScript.
     - [ ] Your project must be developed using Git and GitHub, in a public repository.
     - [ ] For each implemented requirement make a *commit* with a descriptive message of what you have evolved.
- *Layout*
     - [ ] Apply *layout* for mobile, following Figma. It is not necessary to implement a *desktop* version.
- *Chat*
     - [ ] When entering the room, it must load the messages from the server when the user is logged in and display them according to the *layout* provided.
     - [ ] There are three message types:
         - Status messages (**Entered** or **Left** the room): must have a gray background;
         - Reserved messages (**Reservedly**): must have a pink background;
         - Normal messages: must have a white background.
     - [ ] Every three seconds the site must reload messages from the server to keep it always up to date.
     - [ ] The *chat* should have automatic scrolling by default, that is, whenever new messages are added to the end of the *chat* it should *scroll* to the end.
     - [ ] Messages with Reservedly should only be displayed if the name of the recipient or sender is the same as the name of the user using the chat (or else he could see messages reserved for other people)
 - Entrance to the room
     - [ ] When entering the site, the user should be asked with a `prompt` ****your beautiful name.
     - [ ] After inserting the name, it must be sent to the server to register the user:
         - If the server responds successfully, the user will be able to enter the room;
         - If the server responds with an error, the user must be asked to enter another name, as this is already in use;
     - [ ] While the user is in the room, every 5 seconds the site must notify the server that the user is still present, otherwise it will be considered that "Left the room".
- Message sending
     - [ ] When sending a message, it must be sent to the server:
         - If the server responds successfully, you should get the messages from the server again and update the *chat;*
         - If the server responds with an error, it means that that user is no longer in the room and the page must be updated (and with that going back to the stage of asking for the name).
     - [ ] In this transmission, the sender, the recipient and whether the message is reserved or not must be informed.

## 🛠️ Features

- 📂 Chat UOL - API
     - Enter the room
         - To enter the room, you must send the username to the server. To do so, send a `POST` request to the URL:
         ``` https://mock-api.driven.com.br/api/v6/uol/participants ```
         - Sending an object in the format:
           ``` jsx
             {
               name: "João"
             }
             ```
         - The server may respond with status 400 if there is already a user online with that name. If so, the application must request a new name until the server responds with status 200.
     - Keep connection
       - The server needs to know that the user is still online. If the user does not send any messages, how can he infer whether or not the user remains on the page?
       - To resolve this, the server expects its system to continually notify that the user remains using the chat. For this, the system must send a `POST` request to the URL:

           ``` jsx
           https://mock-api.driven.com.br/api/v6/uol/status
           ```

       - Sending an object in the format sending the username that was requested when entering the page.

           ``` jsx
           {
             name: "John"
           }
           ```

       - This request must be made every five seconds.

  - Search messages
     - To fetch messages from the server, send a `GET` request to the URL:
        
         ``` jsx
         https://mock-api.driven.com.br/api/v6/uol/messages
         ```
        
     - The response will be an array of objects, like the following:
        
         ``` jsx
         [
         {
         from: "John",
         to: "All",
         text: "enter the room...",
         type: "status",
         time: "08:01:17"
         },
         {
         from: "John",
         to: "All",
         text: "Good morning",
         type: "message",
         time: "08:02:50"
         },
         ]
         ```
        
     - In objects, the `type` field identifies the message type. There are the following values:
         - `status`: status message, how you entered or left the room;
         - `message`: public message;
         - `private_message`: private message.

  - Send messages
     - To send messages, you must make a `POST` request to the URL:
        
         ``` jsx
         https://mock-api.driven.com.br/api/v6/uol/messages
         ```
        
     - In this request, you must send an object like the following:
     
        ``` jsx
       {
       from: "username",
       to: "recipient's name (All if not a specific one)",
       text: "typed message",
       type: "message" // or "private_message" for bonus
       }
         ```
         
   - **BONUS**: Search participants
    
     To fetch the list of participants, send a `GET` request to the URL:
    
     ``` jsx
     https://mock-api.driven.com.br/api/v6/uol/participants
     ```
    
     This request will return an array of objects in the format:
     
      ``` jsx
      [
        {
          name: "João"
        },
        {
          name: "Maria"
        }
      ]
      ```
      
______
 
## Desktop Layout
 
 <img width="1440" alt="Captura de Tela 2023-01-22 às 17 53 26" src="https://user-images.githubusercontent.com/95102911/213939867-fe785c53-7785-457c-9b16-89a216145973.png">
 
 <img width="1438" alt="Captura de Tela 2023-01-22 às 17 58 28" src="https://user-images.githubusercontent.com/95102911/213940100-50159d6a-95de-40b7-bf20-abaec67c7551.png">

<img width="1440" alt="Captura de Tela 2023-01-22 às 17 59 30" src="https://user-images.githubusercontent.com/95102911/213940182-b4fa3c3d-0621-48a2-a978-a241f0bd7040.png">

<img width="1438" alt="Captura de Tela 2023-01-22 às 18 00 07" src="https://user-images.githubusercontent.com/95102911/213940185-a01f52a9-da45-45ba-abfa-df3097328dc2.png">

_____
      
 ## ☑️ Bonus (optional)

- Active participants
     - [ ] When clicking on the participants' top right icon, the side menu should open above the chat according to *layout*. A semi-transparent dark background should go over the *chat*.
     - [ ] When clicking on the dark background, the side menu should be hidden again.
     - [ ] The site should get the list of participants as soon as it enters the chat and should update the list every ten seconds.
     - [ ] When clicking on a person or in public/privately, the option clicked must be marked with a *check* and the others unmarked.
     - [ ] In addition to the check above, when changing these parameters, the phrase that informs the recipient, which is below the message input, must also be changed.
- Input screen
     - [ ] Instead of a *prompt*, make a splash screen, following figma's *layout*.
- Send with enter
     - [ ] Make sure that, if the user presses Enter in the message field, it is sent (that is, it should have the same behavior if the user clicks on the send button).

______
 
## Mobile Layout

 <img width="449" alt="Captura de Tela 2023-01-22 às 18 03 46" src="https://user-images.githubusercontent.com/95102911/213940315-aedfbcd7-20d6-4b16-b2cc-e2cbd3a0207a.png">

<img width="451" alt="Captura de Tela 2023-01-22 às 18 05 18" src="https://user-images.githubusercontent.com/95102911/213940365-ea83572c-d44c-4a91-be70-f88f980a15fb.png">

<img width="450" alt="Captura de Tela 2023-01-22 às 18 04 33" src="https://user-images.githubusercontent.com/95102911/213940369-e5447f1c-16f3-49cb-a167-c1e61c4e3a2d.png">

<img width="447" alt="Captura de Tela 2023-01-22 às 18 04 50" src="https://user-images.githubusercontent.com/95102911/213940374-3678c840-776b-4a9c-aa57-f9ebe40b124d.png">
