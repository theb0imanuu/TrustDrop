# 🛡️ TrustDrop

**TrustDrop** is a secure **Two-Factor Handover (2FH)** verification system built to solve the trust gap in African e-commerce using **Africa's Talking** APIs.  
It ensures deliveries are only marked as **Successful** when a customer provides a unique 6-digit release code to the rider, verified instantly via **SMS** and **USSD**.

---

## 🚀 The Problem

In many African markets, the "Pay on Delivery" model is common but risky. Riders may falsely mark items as delivered, or customers may claim non-receipt.  
**TrustDrop** bridges this gap by replacing physical trust with a **digital handshake** powered by reliable, offline-accessible technology.

---

## ✨ Key Features

- 🔐 **Secure Handover** – Generates a unique 6-digit code for every order.
- 📩 **Automatic SMS** – Sends the delivery code to the customer upon dispatch.
- 📶 **USSD Verification** – Riders can verify delivery codes instantly via USSD (no internet required on the rider's side).
- 📊 **Real-time Dashboard** – A sleek Next.js dashboard for retailers to manage dispatches and track delivery statuses.
- 🌍 **Africa's Talking Integration** – Leveraging SMS for code distribution and USSD for verification.

---

## 🛠️ Tech Stack

### **Backend**

- **Django** & **Django REST Framework**
- **SQLite** (Database)
- **Africa's Talking SDK** (SMS & USSD)

### **Frontend**

- **Next.js 15 (App Router)**
- **Tailwind CSS**
- **TanStack Query** (Data fetching)
- **Lucide React** (Icons)

---

## 📂 Project Structure

```text
TrustDrop/
├── api/                # Django Application (Models, Views, Serializers)
├── core/               # Django Project Configuration
├── frontend/           # Next.js Dashboard
├── scripts/            # Integration Scripts (SMS, USSD Handler)
├── manage.py           # Django Management CLI
└── requirements.txt    # Backend Dependencies
```

---

## ⚙️ Setup & Installation

### 1️⃣ Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **Africa's Talking Account** (Sandbox or Live API Key)

### 2️⃣ Backend Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Setup Database
python manage.py makemigrations
python manage.py migrate

# Run Server
python manage.py runserver 8000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
pnpm install  # or npm install
pnpm dev      # or npm run dev
```

The dashboard will be available at `http://localhost:3000`.

### 4️⃣ USSD Verification Setup

To test USSD verification locally, run the USSD handler script:

```bash
python scripts/ussd_handler.py
```

_Note: You may need to expose this local server using a tool like ngrok to set the callback URL in the Africa's Talking dashboard._

---

## 🛰️ Africa's Talking Integration

### 📩 SMS Flow

When a retailer clicks **Dispatch**, the system:

1. Generates a 6-digit code in the database.
2. Triggers the Africa's Talking SMS API to send the code to the customer.

### ☎️ USSD Flow

**Rider Verification:**

1. Rider dials the USSD service code.
2. System prompts for the Customer Release Code.
3. Upon entry, the system verifies the code via the Django API and marks the order as **Delivered**.

---

## 🤝 Acknowledgements

Special thanks to the **Africa's Talking team** for providing the infrastructure that makes offline-first digital solutions possible across the continent.
