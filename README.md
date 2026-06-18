# 🤖 AI & Robotics Summer Workshop — Landing Page

A full-stack, production-ready workshop landing page built with **React.js + TypeScript + Tailwind CSS** (frontend) and **Express.js + TypeScript** (backend).

---

## 📸 Overview

This project is a responsive landing page for the **Kidrove AI & Robotics Summer Workshop**, targeting kids aged 8–14. It includes a registration enquiry form connected to a REST API backend with server-side validation and an optional MongoDB integration.

---

## 🗂️ Project Structure

```
workshop/
├── frontend/                  # React + TypeScript + Tailwind CSS
│   └── src/
│       ├── App.tsx            # Root layout, navbar, footer, scroll logic
│       └── components/
│           ├── HeroSection.tsx
│           ├── WorkshopDetails.tsx
│           ├── LearningOutcomes.tsx
│           ├── FAQSection.tsx
│           └── RegistrationForm.tsx
│
└── backend/                   # Express + TypeScript
    └── src/
        └── server.ts          # API routes, validation, MongoDB schema (optional)
```

---

## ✨ Features

### Frontend
- **Hero Section** — Full-bleed gradient with animated floating icons and dual CTA buttons
- **Workshop Details** — Icon cards displaying Age, Duration, Mode, Fee, and Start Date
- **Learning Outcomes** — 5 curriculum cards covering the full 4-week programme
- **FAQ Accordion** — 5 smooth animated accordions with keyboard accessibility
- **Registration Form** — Real-time field validation, loading state, success screen, and server error handling
- **Navbar** — Fixed with smooth scroll nav links; logo click returns to top
- **Footer** — Logo click returns to top; mailto support link
- Fully **responsive** (mobile-first)

### Backend
- `POST /api/enquiry` — Accepts `name`, `email`, `phone` with server-side validation
- `GET /api/health` — Health check endpoint
- Structured JSON error responses with per-field messages
- **MongoDB/Mongoose schema** prepared and commented — one uncomment away from being active
- CORS configured for local development

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, TypeScript, Tailwind CSS, Vite |
| Backend   | Express.js, TypeScript, ts-node-dev     |
| Database  | MongoDB + Mongoose (optional, prepared) |
| Validation| Custom regex (frontend + backend)        |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB URI (optional, only if enabling DB persistence)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

Server starts at **http://localhost:5000**

| Script | Description |
|---|---|
| `npm run dev` | Start with ts-node-dev (hot reload) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled JS from `dist/` |

#### Enable MongoDB (optional)

In `backend/src/server.ts`, uncomment the three blocks marked:
```
// ─── Optional: MongoDB / Mongoose Setup ───
```
Then set your environment variable:
```bash
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/workshop
```

---

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

App starts at **http://localhost:5173**

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

> **Note:** If you haven't set up Tailwind yet:
> ```bash
> npm install -D tailwindcss postcss autoprefixer
> npx tailwindcss init -p
> ```
> In `tailwind.config.js` set:
> ```js
> content: ["./index.html", "./src/**/*.{ts,tsx}"]
> ```

---

## 🔌 API Reference

### `POST /api/enquiry`

Registers a new workshop enquiry.

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@email.com",
  "phone": "9876543210"
}
```

**Success response `201`:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully!"
}
```

**Validation error response `422`:**
```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Please enter a valid email address." }
  ]
}
```

---

### `GET /api/health`

```json
{
  "status": "ok",
  "timestamp": "2026-07-01T10:00:00.000Z"
}
```

---

## ✅ Form Validation Rules

| Field | Rule |
|---|---|
| Name | Minimum 2 characters |
| Email | Valid email format (`x@x.x`) |
| Phone | 10-digit Indian mobile number starting with 6–9 |

Validation runs **on blur** (when leaving a field) and **on submit**. Errors clear in real time as the user corrects their input.

---

## 🗓️ Workshop Details

| Detail | Info |
|---|---|
| Workshop Name | AI & Robotics Summer Workshop |
| Target Age | 8 – 14 Years |
| Duration | 4 Weeks |
| Mode | 100% Online |
| Fee | ₹2,999 |
| Start Date | 15 July 2026 |

---

## 📄 License

MIT © [Kidrove](mailto:support@kidrove.com)
