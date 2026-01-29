# 🛡️ TrustDrop

**TrustDrop** is a secure **Two-Factor Handover (2FH)** verification system built to solve the trust gap in African e-commerce.  
It ensures deliveries are only marked as **Successful** when a customer provides a unique release code to the rider, verified instantly via **USSD**.

> **Note:** This project was developed for the **Africa's Talking Hackathon (2026)** to demonstrate the power of **low‑tech, high‑security** solutions for the *next billion users*.

---

## 🚀 The Problem

In many African markets:

- **Pay on Delivery** → Risky for sellers (cash theft, rider fraud)
- **Pre‑payment** → Risky for customers (non‑delivery)

**TrustDrop bridges this gap** by replacing physical trust with a **digital handshake**.

---

## ✨ Key Features

- 🔐 **Automated 2FA** – Generates a 4‑digit release code upon dispatch  
- 📶 **Offline Verification** – Riders verify via USSD (no internet required)  
- 📊 **Real‑time Dashboard** – Instant delivery status updates  
- 🌍 **Africa's Talking Integration** – SMS & USSD powered communication  

---

## 🛠️ Tech Stack

**Backend**
- NestJS
- Prisma ORM
- SQLite

**Frontend**
- React (Vite)
- Tailwind CSS v4

**Communication**
- Africa's Talking SDK (SMS & USSD)

---

## 📂 Project Structure

```
trust-drop/
├── backend/                # NestJS + Prisma
│   ├── prisma/             # Database Schema
│   └── src/                # USSD & SMS Modules
└── frontend/               # React + Tailwind v4
    ├── src/                # Retailer Dashboard
    └── index.css           # Tailwind v4 Configuration
```

---

## ⚙️ Setup & Installation

### 1️⃣ Prerequisites

- Node.js (v18+)
- Africa's Talking Account (Sandbox or Live)
- Ngrok (to expose local backend)

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
# Add AT_API_KEY and AT_USERNAME to .env
npx prisma migrate dev --name init
npm run start:dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 4️⃣ USSD Configuration

Expose your backend:

```bash
ngrok http 3000
```

In the **Africa's Talking Sandbox**, set:

```
USSD Callback URL:
https://your-ngrok-url.ngrok-app.com/ussd/callback
```

---

## 📡 Africa's Talking Integration Details

### 📩 SMS Module

When a retailer clicks **Dispatch**, the system triggers:

```ts
await at.SMS.send({
  to: [customerPhone],
  message: `Your TrustDrop code is: ${releaseCode}. Give this to the rider only when you receive your package.`
});
```

---

### ☎️ USSD Module

**Rider Flow**

```
Rider dials: *384*123#
System: CON Enter Customer Release Code:
Rider: [enters code]
System: END Delivery Verified! Status Updated.
```

---

## 🤝 Acknowledgements

Special thanks to the **Africa's Talking team** for providing the infrastructure that makes **offline‑first digital solutions** possible across the continent.
