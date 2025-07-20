# 🔐 Complete MERN Authentication System

A full-featured **MERN stack** authentication system with:
- Email OTP verification
- Password reset via OTP
- Secure JWT authentication
- Cookie-based login session
- Responsive UI

Live Demo (if deployed): _Coming Soon_

---

## 🚀 Features

- ✅ Email & Password Signup/Login
- 🔐 JWT-based Auth with HTTPOnly Cookies
- ✉️ Email Verification via OTP (Nodemailer)
- 🔁 Password Reset via OTP
- 🛡️ Protected Routes using Middleware
- ⚙️ Responsive & Clean UI using React + TailwindCSS

---

## 📸 Screenshots

### 🔐 Signup & Login
![Signup](./client/public/screenshots/signup.png)
![Login](./client/public/screenshots/login.png)

---

### ✉️ Email Verification
![Email Verify OTP Form](./client/public/screenshots/emailVerifyOtpForm.png)

---

### 📥 OTP Insertion Pages
![OTP Insertion](./client/public/screenshots/otpInsertionPage.png)
![Reset OTP Form](./client/public/screenshots/resetOtpInsertionForm.png)

---

### 🔃 Reset Password
![Reset Password](./client/public/screenshots/resetPassword.png)

---

### ✅ Alerts / Notifications
![Alerts](./client/public/screenshots/alerts.png)

---

### 🏠 Post-Login UI
![Home Page After Login](./client/public/screenshots/homePageAfterLogin.png)
![Dropdown](./client/public/screenshots/homeDropDown.png)

---

## 📁 Folder Structure (Brief)

email-otp-auth/
├── client/ # Frontend (React)
│ └── public/screenshots
├── server/ # Backend (Node, Express, MongoDB)
└── README.md


---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + HTTPOnly Cookies
- **Email Service**: Nodemailer (Gmail SMTP)

---

## 🧑‍💻 Getting Started

### 🔧 Setup Instructions:

#### 1. Clone the Repo

git clone https://github.com/shivanipandey5678/email-otp-auth.git
cd email-otp-auth

####2. 2. Backend Setup

cd server
npm install
npm run dev

Create a .env file and configure:
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_ACCESS_TOKEN=your_jwt_secret
SENDER_EMAIL=youremail@gmail.com
SENDER_PASS=your_app_password

####3. Frontend Setup

cd client
npm install
npm run dev

Frontend will run on http://localhost:5173

🙌 Author
Made with ❤️ by Shivani Pandey

⭐️ Support
If you like this project, consider giving it a ⭐️ on GitHub — it helps!
