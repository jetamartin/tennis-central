# Tennis-Central 🎾 <sub>(version .9)</sub>


## So what is Tennis-Central?  🤷‍♀️
   In a nut shell Tennis-Central is web based application that helps match tennis players with other players of similar skills for either match play and/or practice sessions. 

### The Problem  😕
   It can be challenging to find new tennis partners with similar skill levels, availability and interests beyond your existing circles of tennis friends/partners.
Tennis players typically show up to the court to play their match and then leave immediately after their match. So there isn't a easy and convenient way to meet other
tennis players unless you belong to a tennis club or a tennis league (aka "social club") or you just happen to the social butterfly type. And frankly most players don't
want to pay expensive dues to join a private tennis club or pay the fees for joining a formal tennis league and then be "fixed" to play at that leagues match times. 
They just want to play/practice with other players of similar skill level when they want to play. 

### The Solution  ✅
   Tennis-Central is designed to address these challenges by leveraging the power of the web in combination with a web based application that is specifically targeted and designed to connect Tennis Players of similar skills, interest and availability. 

Here are some of the key features of the Tennis-Central web based application that make it an ideal solution for many players: 

### Key Features 🔔
  * **Find-A-Partner search** 🔍
  
     Is a powerful search feature that allows a user to find a partner based amongst other Tennis-Central users on a number of key criteria including: Skill level (based on NTRP rating), availability, proximity from your location, gender, 
  type of match (single, doubles, mixed doubles), gender preference and session goals/interest (e.g., match play, just practice/drills, both). 
  * **Partner List** 📃
  
     Provides a simple but effect way to create and manage a list of your Tennis-Central partners. Partner contact information can be added to each partner entry making it easy
  to contact the partner. 
  * **Player Messaging** 📩
  
     Gives you a quick and easy way to send a prospectiveor an existing partner an email message. This makes it easy to schedule matches. 
  * **Player Profile** 🧑🎾
  
     Allows the user to enter and retain key information that they might typically use in their Find-A-Partner searches so that they don't have to repeated have to 
  re-enter search criteria on each Find-A-Partner search. A good example would be your availability to play. It's likely that your availability doesn't change very 
  often. Rather than re-entering your availability each time you submit a Find-A-Partner search you can just select the "Load from Profile" option and your profile
  information will automatically be entered into the Find-A-Partner search form. 
  
  ### Getting started 🏃‍♂️
  1. Click [here](https://agonizing-motion.surge.sh/) to access the Tennis Central website 
  2. Use the "join" link on the website to join the Tennis-Central community (on subsequent visits you'll simply login)
  3. Fill out your profile information 
  4. Use the Find-A-Partner search to find potential partners
  5. Send the prospective partner(s) a message to schedule a match/session
  6. Play your match
  7. If the match went well add that player to your Tennis-Central Partner List with a click of a button add their contact information into the app.
  
    **NOTE**  You'll need to add your email address and your NTRP rating (at minimum) to your 
               Profile in order for others to contact you and to get Find-A-Partner search results.
<hr>

## Technology Platform for Tennis-Central 👨‍💻

### Overview 👓
   Tennis-Central is a full stack web based application that uses **Nodejs** as the "backend" server, **PostgreSQL** as the relational database and **Reactjs** as the "frontend" UI framework. The "frontend" component communicates with the "backend" server via a **REST based API**.
   
### ___Key Backend Technologies:___ 🌚
   **Nodejs** - as the underlying server component
   
   **Express** - as the web application framework for handling and managing http requests, routing, middleware, etc.
   
   **Sequelize** - as the ORM to PostgreSQL
   
   **REST API**  - REST based API for communication between the client and the server
   
   **PostgreSQL** - as the relational database
   

### ___Key Frontend Technologies:___ 🌞
   **Reactjs** - as the frontend UI framework
   
   **Formik**  - to manage Reactjs Forms
   
   **Yup** - for client side form field validation
   
   **React-Hot-Toast** - to handle toast messages
   
### Local Installation of Tennis-Central for development: ⚙ 
   If you are interested in contributing to this project please contact me @ so that I can help you get set up. Here are the basic steps you will
   need to follow:

   1. Download Nodejs and PostgreSQL onto your development system if you don't already have them installed.
 
      a. Node can be downloaded for your development system from the Nodejs [website](https://nodejs.org/en/download/)

      b. PostgresQL can be downloaded for your development system from the PostgreSQL [website](https://www.postgresql.org/download/)
      
   2. Clone the Tennis-Central Git repository onto your local system

      a. Open you terminal window and issue the following Git command:

    $ git clone https://github.com/jetamartin/tennis-central
         
   3. In the terminal window navigate into the "backend" directory of the code you just cloned and enter the following command:

    "npm install"
    
   This will install all of the packages that you will need to run the server component

   4. Now lets start the backend server by entering the following command into the terminal window:

    "node app.js"

      This will start your node server

   5. Now let's install the additional packages we will need for the React frontend component. 
    
   You'll need to open a separate terminal window for the frontend installation.
       
   In this new terminal window navigate to the Tennis-Central folder called "frontend". Now run the following terminal
       command:
       
    "npm install" 

   This will install React and any additional React packages that are necessry to run the application.

   6. Now your are ready to start your React application by entering the following command in the terminal window:

          "npm start"
 
   This will automatically start the app and open a browser with the app running it that browser window.
   
### Other key deliverables:
#### Entity Requirements Document:
   [Tennis-Central ERD]() 

#### Wireframe of Full UI:
   [Full Tennis-Central UI WireFrame]()

### ⚡Licensing: 
 Tennis-Central is free and open-source software licensed under the Apache 2.0 License. 
