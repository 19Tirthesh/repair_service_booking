**Repair Service Booking**

A web application to efficiently manage and book repair services, allowing users to create, track, and update service requests in a centralized system.

**Table of Contents**

1. Project Overview
2. Features
3. Technologies Used
4. Installation & Setup
5. Usage
6. Project Structure
7. CI/CD Pipeline
8. Acknowledgements
9. Contact

**1. Project Overview**

This project is a full stack web application for managing and booking repair services efficiently. Users can create, view, update, and delete service requests, allowing organized tracking of all repair tasks. The backend uses Node.js and Express, with MongoDB for data storage, ensuring reliability and scalability. Secure user authentication ensures safe access, and CI/CD integration automates testing and deployment for streamlined development.

**2. Features**

User authentication and authorization (login/signup)
Create, read, update, and delete repair service requests
View all service bookings in a dashboard
Responsive design for desktop and mobile
Integration with MongoDB for data storage
Automated CI/CD pipeline for testing and deployment

**3. Technologies Used**

Frontend: React.js (or HTML/CSS/JS if applicable)
Backend: Node.js, Express.js
Database: MongoDB (Atlas or Local)
Version Control: Git & GitHub
CI/CD: GitHub Actions (for automated testing and deployment)
Other Tools: Postman (API testing), VS Code (development)

**4. Installation & Setup**

Clone the repository:
git clone https://github.com/your-username/repair-service-booking.git
cd repair-service-booking
Install dependencies:
npm install
Create a .env file with the following variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3333
Start the backend server:
npm run dev
Start the frontend (if separate):
cd frontend
npm start
Open http://localhost:3000
 in your browser.

**5. Usage**
Sign up or log in to the application
Create a new repair service request
View all service requests in the dashboard
Update or delete requests as needed
Track progress of ongoing services

**6. Project Structure**
backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── server.js
frontend/
  ├── src/
      ├── components/
      ├── pages/
      ├── App.js
.gitignore
package.json
README.md

**7. CI/CD Pipeline**

This project uses GitHub Actions to automate the software development workflow.

The Continuous Integration and Continuous deployment  pipeline performs the following steps automatically whenever code is pushed to the repository:

1. Checkout repository code
2. Install project dependencies
3. Run automated test cases
4. Build the frontend application
5. Deploy the application to AWS EC2

The deployment process uses:
- GitHub Actions
- AWS EC2 instance
- PM2 for process management
- Nginx as a reverse proxy

**8. Acknowledgements**
Natasha Tanzila Monalisa and IFQ636 assessment guidelines
Open-source libraries (Express.js, React.js, Mongoose)
Tutorials and online references for web development

**9. Contact**
Name: Tirthesh Mehta
Email: N12556742@qut.edu.au