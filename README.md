# HealthyTrack (React Version)

HealthyTrack is a full-stack health, nutrition, and meal planning web platform. It features two separate React web portals—one for administrators to manage meal plans, body types, users, and messages, and another for users to register, discover diet plans tailored to their body type, track daily fitness advice, and manage their profile—backed by a central Node.js/Express REST API and MongoDB database.

---

## Architecture & Project Structure

```text
Healthytrack-React-Version/
├── .gitignore                     # Git ignore rules for node_modules, build outputs, and .env
├── README.md                      # Project documentation and setup guide
├── docs/
│   └── detail.txt                 # Original developer architecture and workflow notes
├── backend/                       # REST API Server (Node.js & Express 5)
│   ├── .env.example               # Environment variables template
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js                  # Main server entry point & MongoDB connection
│   ├── controllers/               # Business logic
│   │   ├── adminCtrl.js           # Admin authentication and management
│   │   ├── BodyTypeCtrl.js        # Body type operations and diet configurations
│   │   └── userCtrl.js            # User authentication and profile logic
│   ├── middleware/
│   │   └── auth.js                # JWT verification middleware
│   ├── models/                    # Mongoose database schemas
│   │   ├── adminModel.js          # Admin account schema
│   │   ├── BodyTypeModel.js       # Body type classification and diet guidelines
│   │   ├── contactModel.js        # Contact inquiry schema
│   │   ├── feedbackModel.js       # User feedback schema
│   │   ├── MealModel.js           # Meal and nutrition schema
│   │   └── userModel.js           # User account and profile schema
│   └── routes/                    # API route definitions
│       ├── adminRouter.js         # /admin routes
│       ├── BodyTypeRouter.js      # /bodytype routes
│       ├── contactRouter.js       # /api/contact routes
│       ├── feedbackRouter.js      # /api/feedback routes
│       ├── mealPlanRouter.js      # /mealplans routes
│       └── userRouter.js          # /user routes
├── frontend_admin/                # Admin Portal (React 19, CRA)
│   ├── package.json
│   ├── package-lock.json
│   ├── public/                    # Static assets & HTML template
│   └── src/
│       ├── App.js                 # Admin routing and route views
│       ├── index.js               # React DOM entry point
│       ├── Assets/                # Admin image assets
│       └── components/            # Admin UI components & management pages
│           ├── Login.js / Register.js
│           └── pages/             # Dashboard, Users, AssignMeal, ListMeal, etc.
└── frontend_user/                 # User Portal (React 19, CRA)
    ├── package.json
    ├── package-lock.json
    ├── public/                    # Static assets & HTML template
    └── src/
        ├── App.js                 # User routing and route views
        ├── index.js               # React DOM entry point
        ├── Assets/                # User image assets
        └── components/            # User UI components & client pages
            ├── Home.js, Login.js, Register.js
            └── pages/             # Dashboard, Body_type, MealPlans, Profile, Tips
```

---

## Tech Stack

* **Frontend (Admin & User):** React 19, React Router v7, Axios, Pure Modular CSS, Create React App (`react-scripts` 5.0.1)
* **Backend:** Node.js, Express 5, Mongoose 8
* **Database:** MongoDB
* **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## Prerequisites

Before running the application, make sure you have installed:
1. **Node.js** (v18.x or later recommended; v20 LTS recommended)
2. **npm** (comes with Node.js)
3. **MongoDB** (running locally on port `27017` or a MongoDB Atlas connection URI)

---

## Environment Configuration

The backend requires environment variables to connect to MongoDB and generate authentication tokens.

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Copy the template `.env.example` to `.env`:
   * **Windows (PowerShell):**
     ```powershell
     Copy-Item .env.example .env
     ```
   * **Windows (CMD):**
     ```cmd
     copy .env.example .env
     ```
   * **macOS / Linux:**
     ```bash
     cp .env.example .env
     ```
3. Open `.env` and fill in your settings:
   ```env
   PORT=5000
   DATABASE=mongodb://127.0.0.1:27017/healthytrack
   TOKEN_SECRET=your_jwt_secret_key_here
   ```
   > **Note:** The server verifies that both `DATABASE` and `TOKEN_SECRET` are present on startup. Never commit `.env` to version control.

---

## Installation

Install dependencies for all three projects:

### 1. Backend
```bash
cd backend
npm install
```

### 2. Admin Frontend
```bash
cd frontend_admin
npm install
```

### 3. User Frontend
```bash
cd frontend_user
npm install
```

---

## Running the Application

To run the full stack, start the backend and each frontend in separate terminal windows:

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm start
```
*Script defined in `backend/package.json`: `node server.js`*
* Server runs at: `http://localhost:5000`
* Test endpoint: `http://localhost:5000/test` (returns `"Server is working"`)

### 2. Start the User Frontend (Port 3000)
```bash
cd frontend_user
npm start
```
*Script defined in `frontend_user/package.json`: `set PORT=3000 && react-scripts start`*
* Opens at: `http://localhost:3000`
* Proxies API calls to: `http://localhost:5000`

### 3. Start the Admin Frontend (Port 3001)
```bash
cd frontend_admin
npm start
```
*Script defined in `frontend_admin/package.json`: `set PORT=3001 && react-scripts start`*
* Opens at: `http://localhost:3001`
* Proxies API calls to: `http://localhost:5000`

---

## Database Setup

* **Automatic Schema Initialization:** Mongoose schemas automatically configure the collections in MongoDB upon inserting records.
* **Collections used:**
  * `users`
  * `admins`
  * `meals`
  * `bodytypes`
  * `contacts`
  * `feedbacks`
* For additional background on models, routes, and controllers, see [`docs/detail.txt`](docs/detail.txt).

---

## Production Build

To generate optimized production builds of the React portals:
```bash
# Build Admin Frontend
cd frontend_admin
npm run build

# Build User Frontend
cd frontend_user
npm run build
```
Build outputs will be generated in `frontend_admin/build` and `frontend_user/build`, which are ignored by Git.

