# EmployWise React App

## Overview
EmployWise is a React application that integrates with the Reqres API to perform basic user management functions, including authentication, user listing, editing, updating, and deletion.

## Features

### Level 1: Authentication Screen
- Created a basic authentication screen where users can log in using credentials.
- API Endpoint: `POST /api/login` with email and password in the body.
- Credentials:
  - **Email**: eve.holt@reqres.in
  - **Password**: cityslicka
- On successful login, the token is stored in local storage, and the user is navigated to the Users List page.

### Level 2: List All Users
- After logging in, a paginated list of users is displayed.
- API Endpoint: `GET /api/users?page=1`
- Users' first name, last name, and avatar are displayed in a structured layout.
- Implemented pagination to navigate through different pages of users.

### Level 3: Edit, Delete, and Update Users
- Each user in the list has options to **Edit** or **Delete** their details.
- **Edit:**
  - Clicking Edit opens a form pre-filled with the user's data.
  - Allows updating the user's first name, last name, and email.
  - API Endpoint: `PUT /api/users/{id}`
- **Delete:**
  - Clicking Delete removes the user from the list.
  - API Endpoint: `DELETE /api/users/{id}`
- Appropriate success or error messages are displayed based on the outcome of each operation.

## Technologies Used
- **React** (Frontend framework)
- **Redux** (State management)
- **React Router** (Navigation between pages)
- **Tailwind CSS** (Styling)
- **Fetch API** (API requests)

## Persistence
- The login token is stored in **local storage** or **session storage**.
- The user is redirected to the login page if the token is missing or expired.

## Setup Instructions
### Clone the Repository
```sh
git clone https://github.com/neeraj-bn/EmployWise-React-App.git
cd EmployWise-React-App
```

### Install Dependencies
```sh
npm install
```

### Run the Project
```sh
npm run dev
```

## Deployment
- **GitHub Repository**: [EmployWise-React-App](https://github.com/neeraj-bn/EmployWise-React-App.git)
- **Live Demo**: [EmployWise React App](https://employwise-react.netlify.app/)

## Additional Enhancements
- Implemented **client-side search and filtering** on the user list.
- **React Router** is used for seamless navigation between pages.
- Hosted on **Netlify** for easy access.

---

⭐ Happy Coding! 🚀
