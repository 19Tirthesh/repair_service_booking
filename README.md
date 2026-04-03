# 🔧 **Repair Service Booking System**

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Framework-Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
</p>

---

## Project Overview

The **Repair Service Booking System** is a full-stack web application that simplifies the process of managing repair requests.

It allows users to:
- Create service requests  
- Track repair progress  
- Manage and update bookings  

Designed with scalability and usability in mind, this app integrates **secure authentication**, a **responsive UI**, and an **automated deployment pipeline**.

---

## Features

- 🔐 **User Authentication** (Login & Signup with JWT)
- 🧾 **CRUD Operations** for service requests  
- 📊 **Dashboard View** to manage all bookings  
- 🔄 **Real-Time Updates** for request tracking  
- 📱 **Responsive Design** (Mobile + Desktop)  
- ⚙️ **CI/CD Pipeline** with automated testing & deployment  

---

## Tools & Technologies

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Version Control**: Git & GitHub  
- **API Testing**: Postman  
- **Deployment**: AWS EC2  
- **Process Manager**: PM2  
- **Reverse Proxy**: Nginx  

---

## Architecture & Workflow

1. **User Authentication**  
   - Secure login/signup using JWT  

2. **Service Request Creation**  
   - Users submit repair issues  

3. **Dashboard Management**  
   - View, edit, or delete requests  

4. **Backend Processing**  
   - Express API handles logic & database operations  

5. **Deployment Pipeline**  
   - GitHub Actions → Build → Deploy to AWS EC2  

---

## How to Run the Application

### Clone the Repository
```bash
git clone https://github.com/your-username/repair-service-booking.git
cd repair-service-booking
```

### Install Dependencies
```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3333
```

### Run the Application

**Start Backend**
```bash
npm run dev
```

**Start Frontend**
```bash
cd frontend
npm start
```

### Open in Browser
```
http://localhost:3333
```

---

## Project Structure

```
repair_service_booking/
│
├── backend/
│   ├── config/            # Database & environment configuration
│   ├── controllers/       # Request handling logic
│   ├── middleware/        # Authentication & error handling middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route definitions
│   ├── utils/             # Helper functions (if any)
│   └── server.js          # Entry point for backend
│
├── frontend/
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # API calls
│   │   ├── context/       # State management (if used)
│   │   ├── App.js         # Main React component
│   │   └── index.js       # React entry point
│
├── .github/
│   └── workflows/         # GitHub Actions CI/CD pipelines
│
├── .env                   # Environment variables
├── .gitignore             # Ignored files
├── package.json           # Dependencies & scripts
├── README.md              # Project documentation
```
---

## CI/CD Pipeline

This project uses **GitHub Actions** for automation:

### Continuous Integration
- Install dependencies  
- Run tests  
- Build application  

### Continuous Deployment
- Deploy to AWS EC2  
- Manage processes using PM2  
- Serve via Nginx  

---


## Contact

**Tirthesh Mehta**  
**N12556742@qut.edu.au**  
