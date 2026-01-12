# Doctor Appointment Booking System

*Backend* 
![Backend Architecture](<doctor appointment booking system project.drawio.svg>)

A Doctor Appointment Booking System built with **NodeJS (Javascript)**, **REACT**, and **MongoDB**. This project was developed as part of a backend engineering assignment to handle live student attendance updates and class management via a persistent connection. ([Project Google Doc Link](https://docs.google.com/document/d/1Ms17kSCexnSxKnXEZPM18r93QIKzy8uvIeArr3oOKXk/edit?usp=sharing))

*DataBase Schema V1.1*
![alt text](<Screenshot 2025-04-29 163235.png>)

## Features

### 1. Patient Panel
* **Secure Authentication:** User registration and login with encrypted passwords using JWT.
* **Doctor Search & Filter:** Browse doctors based on specialization, fees, or experience.
* **Real-time Booking:** View available time slots and book appointments instantly.
* **Personal Dashboard:** View appointment history, track current status (Pending/Approved), and manage profile details.
* **Notifications:** Receive real-time updates regarding appointment confirmations or cancellations.

### 2. Doctor Panel
* **Profile Management:** Update professional details, experience, and consultation fees.
* **Appointment Handling:** A dedicated dashboard to view, approve, or reject incoming appointment requests.
* **Schedule Management:** Define and manage availability slots for patient consultations.
* **Patient Records:** Access brief details of patients who have booked appointments.

### 3. Admin Panel
* **User Management:** Overview of all registered users and doctors in the system.
* **Doctor Verification:** Approve or remove doctor accounts to maintain platform quality.
* **System Analytics:** Track total appointments, active doctors, and registered patients.
* **Booking Oversight:** Ability to monitor and manage all appointments across the platform.

---

## Project Structure

```text
.
├── client/                 # React.js Frontend
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Main application screens (Home, Login, etc.)
│       ├── redux/          # State management logic
│       └── App.js          # Main application entry point
├── server/                 # Node.js/Express Backend
│   ├── config/             # Database connection (MongoDB)
│   ├── controllers/        # Business logic for routes
│   ├── middlewares/        # Auth and error handling
│   ├── models/             # Mongoose schemas (User, Doctor, Appointment)
│   ├── routes/             # API endpoints definitions
│   └── server.js           # Server entry point
├── .env                    # Environment variables (Sensitive)
├── .gitignore              # Files to ignore in git
├── package.json            # Root dependencies and scripts
└── README.md               # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites

* **Node**: Version 24.12(LTS) or higher installed.
* **MongoDB**: A running MongoDB instance (local or Atlas).

### 1. Clone the Repository

```bash
git clone https://github.com/MeRohit0/Doctor-Appointment-Booking-System.git
cd Doctor-Appointment-Booking-System

```

### 2. Configure Environment

Ensure your MongoDB URI is correctly configured in `data/data.go` or via environment variables (depending on your implementation).

### 3. Install Dependencies

```bash
npm install 

```

### 4. Run the Server

```bash
npm run dev

```

The server will start on `http://localhost:8080`.

## Assignment Requirements Implemented

* **Connection Management**: Multi-client support via `https server`.
* **Data Persistence**: All records saved to MongoDB.
* **Concurrency**: Efficient use of Goroutines for handling WebSocket messages.
* **Error Handling**: try-catch block error responses using the `util` package.

## 🛠 Tech Stack

* **Language**: NodeJs (JavaScript)
* **Database**: MongoDB
* **Protocol**: REST API via ExpressJS
* **Auth**: JWT (JSON Web Tokens)
* **FontEnd**: React and Tailwindcss


---

*Developed as a both Backend and Frontend Assignment.*