# Note Sharing System
Collaborative web app for creating, organizing, and sharing notes across teams or classrooms with fine-grained access control.

## Features
- Secure registration/login with role-based permissions for admins, contributors, and readers.
- Rich-text note editing with attachments, tags, and autosave drafts.
- Advanced filters (subject, author, favorites, updated date) plus global search.
- Share settings for public links, private invites, and group workspaces.
- Real-time notifications for edits/comments along with audit trails and soft deletes.
- Analytics dashboard summarizing recently viewed notes, top contributors, and storage usage.

## Tech Stack
- Frontend: React, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB + Mongoose
- Security & tooling: JWT, bcrypt, Multer, Nodemailer, dotenv, ESLint/Prettier, Jest/RTL

## Installation
### Clone
```bash
git clone <repo-url>
cd NoteShareingSystem
```

### Backend
```bash
cd backend
npm install
cp .env.example .env    # fill values below
```

### Frontend
```bash
cd ../frontend
npm install
cp .env.example .env    # optional for frontend envs
```

### Backend env (`backend/.env`)
```bash
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/db
JWT_SECRET=super-secret-string
MAIL_USER=you@example.com
MAIL_PASS=app-password
CLIENT_URL=http://localhost:3000
```

## Usage
Start API:
```bash
cd backend
npm run dev
```

Start frontend:
```bash
cd ../frontend
npm start
```

Open `http://localhost:3000`, create your workspace, add notes, invite collaborators, and begin sharing resources.


