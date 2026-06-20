# 🛡️ NTI Social Authentication Backend

A secure backend system implementing OAuth 2.0 social logins, built during the NTI (National Telecommunication Institute) training program.

---

## 📌 Overview
Nti-Social-Auth-Backend provides a boilerplate for user sign-up, login, and social integrations (Google / Facebook / GitHub login) using Node.js and Passport.js. The backend validates users and issues secure JSON Web Tokens (JWT) for route authorization.

---

## ⚙️ Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| Node.js    | Runtime engine |
| Express.js | REST API routing |
| Passport.js| Social authentication strategies |
| MongoDB    | User profiles storage |
| JWT        | Authorized session tokens |

---

## 🚀 Core Features
* 🌐 **Social Providers:** Support for Google & Facebook authorization flows.
* 🔑 **Token-Based Auth:** Issuing stateless JWTs for secure REST routes.
* 🛡️ **Role Protection:** Secure middleware checks restricting unauthorized routes.
* 📂 **Clean Architecture:** Separation of routers, configurations, and user models.

---

## ⚙️ Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sayed-Herzallah/Nti-Social-Auth-Backend.git
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create `.env` file):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. Run server locally:
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Author
**Sayed Herzallah**  
Full Stack Developer
