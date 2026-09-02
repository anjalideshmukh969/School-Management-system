# School Management System (MERN)

A role-based school management system built for a government school setup —
Admin, Teacher, Student, and Parent roles each get their own dashboard and
permissions. Clean MVC backend, modern minimal light-theme React frontend.

## Tech Stack

- **Frontend:** React 18 (Vite), React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, bcrypt password hashing, role-based route protection

## Features

| Role | Capabilities |
|---|---|
| **Admin** | Dashboard with live stats, manage students, manage teachers, manage classes, post notices, activate/deactivate accounts |
| **Teacher** | View assigned classes, mark daily attendance, create exams, enter marks |
| **Student / Parent** | View profile, attendance % and history, exam results with grades, notices |

Also included at the data layer (routes + models ready, wire up UI as needed):
fee tracking (dues/payments), class timetable.

## Folder Structure

```
school-management/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/                   # Mongoose schemas (User, Student, Teacher,
│   │                              #   ClassRoom, Attendance, Exam, Result,
│   │                              #   Notice, Fee, Timetable)
│   ├── controllers/               # Business logic — one file per resource
│   ├── routes/                    # Express routers — wire URLs to controllers
│   ├── middleware/
│   │   ├── auth.js                # JWT verification + role authorization
│   │   └── errorHandler.js
│   ├── utils/generateToken.js
│   ├── seed/seed.js               # Creates the first admin login
│   ├── server.js                  # App entry point
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js           # Configured API client (auto-attaches JWT)
│   │   ├── context/AuthContext.jsx
│   │   ├── components/            # ProtectedRoute, Table, StatCard
│   │   ├── layouts/DashboardLayout.jsx   # Sidebar + role-based nav
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── admin/             # Dashboard, Students, Teachers, Classes, Notices
│   │   │   ├── teacher/           # Dashboard, Attendance, Marks
│   │   │   └── student/           # Dashboard, MyAttendance, MyResults
│   │   └── App.jsx                # All routes
│   └── vite.config.js             # Proxies /api to backend on :5000
│
└── README.md
```

This follows **MVC**: Models (`models/`) → Controllers (`controllers/`) →
Routes act as the "C" wiring layer that map HTTP endpoints to controller
functions. Views are the React frontend, talking to the API over REST.

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your own MongoDB URI:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/school_management
JWT_SECRET=some_long_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create the first admin account, then start the server:

```bash
npm run seed     # creates admin@school.gov.in / Admin@123
npm run dev      # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev      # starts on http://localhost:5173
```

Open `http://localhost:5173/login` and sign in with the seeded admin account.
**Change the default password immediately** via the change-password endpoint
(`PUT /api/auth/change-password`) — wire a settings page to it, or call it
directly for now.

### 3. Typical first-time flow

1. Log in as admin.
2. Go to **Classes** → create a class (e.g. "Class 8", Section "A").
3. Go to **Teachers** → add a teacher, then edit the class to assign them as
   class teacher (or extend the Classes form to pick a teacher inline).
4. Go to **Students** → add students, assigning them to the class you made.
5. Log out, log in as the teacher you created → mark attendance, create an
   exam, enter marks.
6. Log in as a student → see attendance %, results, and notices.

## Security notes for a government deployment

- Change `JWT_SECRET` to a long random value before going live — never use
  the example value.
- Passwords are hashed with bcrypt; plaintext is never stored.
- All non-auth routes require a valid JWT (`middleware/auth.js`) and are
  further restricted by role (`authorize("admin")`, etc.) — a student token
  cannot hit teacher/admin-only endpoints.
- Put the backend behind HTTPS in production (e.g. via a reverse proxy like
  Nginx) — JWTs sent over plain HTTP can be intercepted.
- Consider rate-limiting `/api/auth/login` (e.g. `express-rate-limit`) to
  slow down brute-force attempts.

## Extending it further

- **Fees UI:** models/routes exist (`Fee.js`, `feeRoutes.js`) — add an admin
  page similar to `Students.jsx` to record dues/payments per student.
- **Timetable UI:** same — `Timetable.js` + `timetableRoutes.js` are ready;
  build a simple weekly grid page.
- **Parent accounts:** currently parents share the student's view via the
  `parent` role + `Student.parent` reference — add a parent-specific signup
  flow if parents need their own separate login from the student's.
- **UDISE+ / APAAR integration:** `Student.aparId` field is there as a
  placeholder for the government's Automated Permanent Academic Registry ID
  if you need to sync with state education portals.
