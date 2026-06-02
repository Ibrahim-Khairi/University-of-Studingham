# University of Studingham - University Management Portal

A full-stack university management portal built with the MERN stack, featuring role-based access for administrators, tutors, and students. The system covers the core operational needs of a university, from authentication and course management to a library portal, attendance tracking, and a Moodle-style LMS.

---

## Features

- **Role-based authentication**: separate portals and dashboards for admins, tutors, and students, with JWT-based auth and protected routes
- **Admin dashboard**: activity logging, pending approvals, course and policy management, student/tutor registration oversight
- **Timetable system**: dynamic timetable rendering for tutors and students, generated from lecture patterns
- **Library portal**: admins can add, edit, and remove books; students and tutors can borrow books with automatic availability management and overdue fines
- **Digital attendance register**: tutors mark attendance per module; students can view their attendance records
- **Moodle-style LMS**: curriculum rendering, quiz functionality, and module-based content for students and tutors
- **Finance tracker**: student-facing personal finance management with budget setup and expense tracking
- **Notice board**: admin-managed announcements surfaced across the portal
- **Rich-text policy pages**: policy management with a rich-text editor, rendered with Tailwind prose utilities

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (access + refresh tokens) |
| File Uploads | Multer |
| Rich Text | React Quill |

---

## Project Structure

```
├── backend/
│   ├── controllers/       # Route logic for all features
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express route definitions
│   ├── middleware/        # Auth, role, status, and upload middleware
│   ├── config/            # Database connection
│   └── utils/             # Token generation and helper functions
│
└── frontend/
    ├── src/
    │   ├── Pages/         # All page-level components
    │   ├── Components/    # Reusable UI components
    │   ├── context/       # Auth context
    │   └── services/      # API service layer
    └── public/            # Static assets
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or above)
- A MongoDB Atlas account (free tier is sufficient)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Ibrahim-Khairi/University-of-Studingham.git
cd University-of-Studingham
```

2. Set up the backend
```bash
cd backend
npm install
```

3. Create a `.env` file in the `backend` folder with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
PORT=5000
```

4. Set up the frontend
```bash
cd ../frontend
npm install
```

5. Run both servers (in separate terminals)
```bash
# Terminal 1 — backend
cd backend
node server.js

# Terminal 2 — frontend
cd frontend
npm run dev
```

6. Open `http://localhost:5173` in your browser

> **Note:** The database currently contains filler and testing data used during development. A clean seed script with representative demo data is planned for a future update.

---

## My Contributions

This project was built as a team of four. My specific contributions included:

- Designed the entire website UI/UX (excluding Moodle pages), ensuring consistency and accessibility across all user roles
- Defined the full sitemap and led storyboard development
- Built and wired all admin-facing pages: Admin Dashboard, pending approvals, course modification, policy management, and student digital registers
- Re-engineered initially static pages to communicate dynamically with the backend, including timetable rendering and rich-text policy pages
- Established the foundational backend architecture following industry-standard MVC structure
- Implemented the complete authentication system including admin auth, JWT access/refresh token flows, and auth context on the frontend
- Designed the majority of database models and collections
- Built supporting infrastructure: API service layers, authentication middleware, database utility scripts, and an activity-logging system
- Resolved merge conflicts and led technical decision-making throughout the project

---

## Future Improvements

- Deploy to a cloud platform (frontend on Vercel, backend on Render)
- Replace filler database content with clean demo data via a seed script
- Add email notifications for approvals, overdue library books, and notices
- Expand quiz functionality within the LMS

---

## License

This project was developed as part of a university coursework submission and is intended for portfolio and educational purposes.