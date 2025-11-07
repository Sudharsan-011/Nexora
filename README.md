# 🛒 Mock E-Com Cart

A full-stack shopping cart app built for the **Vibe Commerce Internship Assignment**.  
Handles add/remove items, cart total, and mock checkout using REST APIs.

---

## 🚀 Tech Stack
- **Frontend:** React (Vite), Zustand, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **API:** Fake Store API (for mock product data)

---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
````

Runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## 📦 API Endpoints

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/api/products`      | Fetch mock products   |
| GET    | `/api/cart/:userId`  | Get user cart         |
| POST   | `/api/cart`          | Add item to cart      |
| DELETE | `/api/cart/:id`      | Remove item from cart |
| POST   | `/api/cart/checkout` | Perform mock checkout |

