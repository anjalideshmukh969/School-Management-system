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
| **Public visitor** (not logged in) | About page: school name/tagline, establishment year, UDISE code, board affiliation, about text, principal's message, facilities grid, achievements, photo gallery, contact info |
| **Admin** | Dashboard with live stats, manage students, manage teachers, manage classes, build class timetables, manage fee records + payments, post notices, edit the public School Profile (About page content + photos), activate/deactivate accounts |
| **Teacher** | View assigned classes, mark daily attendance, create exams, enter marks |
| **Student / Parent** | View profile, attendance % and history, exam results with grades, weekly timetable, fee dues/payment status, notices |

Each role sees a **different sidebar and different pages** — this isn't just
visual, it's enforced: a student's login token literally cannot call
teacher- or admin-only API routes (403 if it tries). See "First-time flow"
below for exactly how to create and log in as each role.

## Folder Structure

```
school-management/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/                   # Mongoose schemas (User, Student, Teacher,
│   │                              #   ClassRoom, Attendance, Exam, Result,
│   │                              #   Notice, Fee, Timetable, SchoolInfo)
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
│   │   │   ├── Home.jsx           # Public About page (no login required)
│   │   │   ├── Login.jsx
│   │   │   ├── admin/             # Dashboard, Students, Teachers, Classes,
│   │   │   │                      #   Timetable, Fees, Notices, School Profile
│   │   │   ├── teacher/           # Dashboard, Attendance, Marks
│   │   │   └── student/           # Dashboard, Attendance, Results, Timetable, Fees
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
2. Go to **School Profile** → fill in your school's real name, tagline,
   establishment year, UDISE code, about text, principal's message,
   facilities, achievements, and paste in URLs to real photos of your school
   (hero photo + gallery). Save — then visit `/` in a new tab (logged out or
   in an incognito window) to see the public About page update live.
3. Go to **Classes** → create a class (e.g. "Class 8", Section "A").
4. Go to **Teachers** → add a teacher, then edit the class to assign them as
   class teacher (or extend the Classes form to pick a teacher inline).
5. Go to **Students** → add students, assigning them to the class you made.
6. Go to **Timetable** → pick the class and day, add periods with subject/
   teacher/time.
7. Go to **Fees** → pick a student, add a fee record (type, amount, due date).
8. Log out, log in as the teacher you created → you'll see a completely
   different sidebar (Attendance, Marks Entry only) — mark attendance,
   create an exam, enter marks.
9. Log in as a student → different sidebar again (Attendance, Results,
   Timetable, Fees, no admin/teacher pages) — see attendance %, results,
   timetable, and fee status.

### 4. The public About page

Visiting `/` without logging in shows a government-school-style About page
built from whatever you saved in **School Profile** — no login required.
Since real school photos can't be bundled into this codebase, you add them
by pasting a URL to an already-hosted image (your school's existing website,
a public Google Drive/Photos link, etc.) into the Hero Photo / Gallery
fields. Leave them blank and the page shows a clean placeholder pattern
instead of a broken image.

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

- **Parent accounts:** currently parents share the student's view via the
  `parent` role + `Student.parent` reference — add a parent-specific signup
  flow if parents need their own separate login from the student's.
- **UDISE+ / APAAR integration:** `Student.aparId` field is there as a
  placeholder for the government's Automated Permanent Academic Registry ID
  if you need to sync with state education portals.
- **Photo uploads:** currently hero/gallery photos are added by pasting a
  URL. To support direct file uploads, add `multer` on the backend and a
  file input on the School Profile page, storing files locally or on
  something like Cloudinary/S3.
- **Change-password UI:** the backend endpoint exists
  (`PUT /api/auth/change-password`) but there's no settings page yet —
  add one so users aren't stuck with the temporary password an admin set.
