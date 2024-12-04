# Project:  
**Role-Based Access Control (RBAC) System Using MERN Stack**  

---

## Project Description  
This project is a MERN (MongoDB, Express.js, React, Node.js) stack application designed to demonstrate **Role-Based Access Control (RBAC)**. It enables secure authentication, role-based authorization, and user management through distinct views tailored to different roles.  

The system features the following roles with specific permissions:  

- **Admin:**  
  - Can view all users (Admins, Managers, and Normal Users).  

- **Manager:**  
  - Can view **Managers** and **Normal Users** only.  

- **User:**  
  - Can view their **account details** only.  

### Key Features  
- Secure login with password hashing using **bcrypt**.  
- **JSON Web Tokens (JWT)** for session management.  
- Role-specific dashboards.  
- User interfaces designed and rendered using **EJS (Embedded JavaScript)** templates for simplicity and server-side rendering.  

This project provides an intuitive UI and ensures that users interact with the system based on their assigned roles, offering a clear demonstration of RBAC in practice.  

---

## How to Run the Project  

```bash
git clone <repository-url>   # Clone the repository  
cd <repository-folder>       # Navigate to the project directory  
npm install                  # Install required dependencies  
nodemon index.js             # Start the server  



## Access the Application
This project uses EJS (Embedded JavaScript) for rendering views. To experience the application as intended, access it through a browser for better clarity. Avoid using tools like Postman for routes that render UI pages.

## Routes  

### Register  
[http://localhost:4000/api/auth/register](http://localhost:4000/api/auth/register)  
**Note:** Copy this route into your browser to access the registration page.  

### Login  
[http://localhost:4000/api/auth/login](http://localhost:4000/api/auth/login)  
**Note:** Copy this route into your browser to access the login page.  


## Note:  
This project uses **EJS templates** to render UI views. Ensure you test the application in your **browser** for a proper experience.  

### Avoid Using Postman for UI Routes:  
Postman cannot render **EJS-based templates**. Always use the **browser** for routes that return HTML pages to avoid issues with viewing the rendered templates.  


