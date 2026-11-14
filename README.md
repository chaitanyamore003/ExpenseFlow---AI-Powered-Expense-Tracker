#  ExpenseFlow — AI Integrated Expense Tracker

<p align="center">
  <img src="https://res.cloudinary.com/ddivlvrkv/image/upload/v1793869062/expenseflow-logo-1024_tw0ubu.png" alt="ExpenseFlow Logo" width="120" style="border-radius: 20px;" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Aiven-Cloud_DB-FF6A00?style=for-the-badge&logo=aiven&logoColor=white" alt="Aiven" />
  <img src="https://img.shields.io/badge/Cashfree-Payments-2B3A55?style=for-the-badge" alt="Cashfree" />
  <img src="https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

**ExpenseFlow** is a full-stack, AI-powered personal finance application. It moves beyond simple expense tracking by automatically categorizing transactions (both Income and Expenses) using AI, providing deep financial insights through dynamic reporting, and offering a gamified Premium experience with a live spending leaderboard.

🌐 **Live Demo:** [Expense Flow Live](https://frontend-seven-dusky-4x47zr7zuo.vercel.app/)

---

## 📸 Screenshots

### 🎨 Landing Page & Authentication
*Experience the unique neo-brutalist "Positivus" UI, featuring high-contrast dark mode and neon green accents.*

**Landing Page**
<img width="1218" height="770" alt="image" src="https://github.com/user-attachments/assets/10d71aa8-7ab3-40d0-bf02-07972d07789e" />


**Login & Signup**
<img width="1436" height="781" alt="image" src="https://github.com/user-attachments/assets/4de94e0c-692c-4558-9288-f15c0b4bce80" />


---

### 📊 Core Experience
**Dashboard**
<img width="1231" height="733" alt="image" src="https://github.com/user-attachments/assets/fa796f4d-dbf0-49d2-afa4-0e1b2e8eeb02" />


**Transactions & AI Categorization**
<img width="1240" height="763" alt="image" src="https://github.com/user-attachments/assets/ee795251-4ca1-4fae-a093-df0343c4e20f" />


---

### 👑 Premium & Reports
**Advanced Reports & CSV Export**
<img width="1305" height="769" alt="image" src="https://github.com/user-attachments/assets/2bfc18f7-9b0e-4811-97c4-b373cced01fc" />


**Cashfree Checkout & Leaderboard**
<img width="1324" height="761" alt="image" src="https://github.com/user-attachments/assets/4dfd22d3-8b43-4ed5-bbaa-2cc6df28a276" />

---

## ✨ Key Features

### 🔐 Secure Authentication
- **JWT-based Authentication**: Secure login and session management.
- **Password Hashing**: Uses `bcrypt` for secure password storage.
- **Password Reset Flow**: Complete "Forgot Password" flow using UUID tokens and secure email links.
- **Themed Emails**: Beautiful, responsive dark-mode HTML emails sent via Brevo for Signups, Password Resets, and Premium Upgrades.

### 🤖 AI-Powered Categorization
- Users simply enter a description (e.g., "Swiggy dinner" or "Monthly Salary") and the amount.
- The backend leverages AI to automatically categorize the transaction into 24+ distinct categories.
- Differentiates between **Income** and **Expense** categories (e.g., categorizing a positive amount as "Salary" instead of "Food").

### 💸 Income & Expense Management
- Single, unified form to add or edit transactions.
- **Dynamic Color Coding**: Income is highlighted in Green, and Expenses in Red.
- Full CRUD operations (Create, Read, Update, Delete) with instant UI feedback.
- Automatically updates the user's Total Income and Total Expenses in the database.

### 📈 Dynamic Dashboard
- Real-time calculation of **Net Balance**, **Total Income**, and **Total Expenses**.
- View a snapshot of your recent transactions.
- Instant UI updates via React Context API when a transaction is added or deleted.

### 📊 Detailed Reports & CSV Export
- Filter transactions by **Daily, Weekly, Monthly, or All Time**.
- **Client-side Pagination**: Select to view 10, 25, 50, or 100 rows at a time.
- **CSV Export**: Download a cleanly formatted spreadsheet that includes all transactions and a summary footer (Total Income, Total Expenses, Net Savings).

### 👑 Premium Tier & Leaderboard (Cashfree Integration)
- Integrated **Cashfree Payment Gateway** (Sandbox mode for development).
- Secure backend order creation, payment verification, and webhooks.
- **Premium Perks**: Unlock the "Spending Leaderboard" to compare your financial discipline against other users.
- Premium status updates instantly across the UI upon successful payment.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, React Router DOM, Axios, Context API |
| **Backend** | Node.js, Express.js, JWT, bcrypt, Sequelize ORM |
| **Database** | MySQL (Hosted on Aiven Cloud) |
| **Third-Party APIs** | Cashfree (Payments), Brevo (Emails), Groq/OpenAI (AI Categorization) |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🏗️ Architecture & Database Design

### Backend Request Flow
```text
Client Request (React)
      ↓
Express Router
      ↓
Authentication Middleware (JWT)
      ↓
Controller (Business Logic)
      ↓
AI / Cashfree / Email Services
      ↓
Sequelize ORM
      ↓
MySQL Database (Aiven)
```

### 🗄️ Database Schema (Sequelize Models)

**1. Users Table**
Stores user credentials, financial totals, and premium status.
- `id`, `name`, `email` (unique), `phone` (unique), `password`
- `totalExpense` (BigInt), `totalIncome` (BigInt)
- `isPremium` (Boolean)

**2. Expenses Table**
Stores individual transactions.
- `id`, `expenseAmount`, `category`, `description`
- `type` (ENUM: 'income', 'expense')
- `UserId` (Foreign Key)

**3. Orders Table**
Tracks Cashfree payment orders.
- `id`, `orderId` (unique), `amount`, `status` (PENDING, SUCCESSFUL, FAILED)
- `cfOrderId`, `paymentId`, `UserId`

**4. ForgotPasswords Table**
Tracks active password reset requests.
- `id` (UUID), `UserId` (Foreign Key), `isActive` (Boolean)

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/expenseflow.git
cd expenseflow
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` folder:
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3500

# Database (Aiven MySQL)
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_CA_CERT=your_ssl_certificate_string

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Third-Party Services
CASHFREE_CLIENT_ID=your_cashfree_id
CASHFREE_CLIENT_SECRET=your_cashfree_secret
BREVO_EMAIL_API_KEY=your_brevo_key
AI_API_KEY=your_ai_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` folder:
```env
VITE_API_URL=/api
BACKEND_URL=http://localhost:3000
```
Start the React app:
```bash
npm run dev
```

The application will be running at `http://localhost:3500`.

---

## ☁️ Deployment Notes

- **Frontend (Vercel):** Configured with a `vercel.json` file to handle React Router SPA redirects. Ensure `VITE_API_URL` is set to your live Render backend URL in the Vercel dashboard.
- **Backend (Render):** Ensure all environment variables (especially `FRONTEND_URL` and `DB_CA_CERT`) are set in the Render dashboard.
- **Render Cold Starts:** Because the backend runs on Render's free tier, it goes to sleep after 15 minutes of inactivity. A custom UI disclaimer banner is shown to users on the Home page to explain the initial 50-second loading delay.
- **Aiven Database:** Requires an SSL certificate (`ca.pem`). The backend dynamically loads this from an environment variable (`DB_CA_CERT`) in production to maintain security.

---

## 👨‍💻 Author

**Chaitanya More**

- LinkedIn: [Chaitanya's LinkedIn](https://www.linkedin.com/in/chaitanya-more-472203244/)
- GitHub: [Chaitanya's GitHub](https://github.com/chaitanyamore003)

## 📄 License

This project is licensed under the MIT License. It is created for educational and portfolio purposes.
