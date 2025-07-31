A simple full-stack web application that allows users to register/login and manage a list of todos. Built with React frontend, Node.js + Express backend
**Project Structure**
todo-app/
├── client/        # React frontend
├── server/        # Node.js backend API
└── README.md
**Setup Instructions**
1. Clone the repository
-- git clone https://github.com/your-username/todo-app.git
-- cd todo-app
2. Install dependencies
Backend (Server)
-- cd server
-- npm install
-- npm start
Server will run on http://localhost:5000

Frontend (Client)
-- cd ../client
-- npm install
-- npm start
Frontend will run on http://localhost:3000

**Automated Tests**
1. UI Functional Tests – Selenium
Scenarios covered:
* Login with valid credentials
*Login with invalid credentials
*Create a new todo
*Edit an existing todo
*Delete a todo
*Assert data appears correctly

➡ Run from your Selenium-supported IDE (Eclipse, IntelliJ, etc.)
➡Chromedriver required in system PATH

2. API Tests – Postman
Collection: postman_collection.json
Environment: postman_environment.json

Scenarios covered:

* POST /login (valid + invalid)
* GET /items
* POST /items
* PUT /items/:id
* DELETE /items/:id

To Run API Tests:
newman run postman_collection.json -e postman_environment.json

📄 **Test Strategy Summary**
What is Being Tested
End-to-end flow: login → create/edit/delete todos
Functional correctness of both UI and API
Input validation and error handling

**Test Coverage Areas**
Area	Type	Tool
UI Functional	Selenium	Java + TestNG
API Functional	Postman

**Tools Used and Why**
Tool	Purpose
React	Frontend : UI
Node.js + Express	: Backend API
Selenium :	UI test automation
Postman :	Manual API testing

** Assumptions / Limitations**
Data is in-memory (no DB persistence)
Basic auth (not production-grade)
Tests assume server runs locally on ports 3000 (UI) and 5000 (API)
