 full-stack job portal project, assuming the backend is built with Node.js, Express, MySQL, MongoDB, Cloudinary, and Mongoose:

📄 README.md

# SIRA — Job Portal Platform

SIRA is a full-stack job portal application where users can register, create/update profiles, apply for jobs, and administrators can manage jobs, users, and applications. The backend is built with Node.js, Express, MySQL (for users), MongoDB (for jobs & applications), and Cloudinary (for image and resume uploads).

---

## 📁 Project Structure

```bash
.
├── client/                 # React frontend (not included in this README)
├── server/
│   ├── config/             # DB and cloudinary configurations
│   │   ├── config.env      # Environment variables
│   │   └── database.js     # MySQL DB connection initializer
│   ├── controllers/        # Route logic for users, jobs, admin, etc.
│   ├── middlewares/        # JWT auth and token middleware
│   ├── models/             # Mongoose models for Job, User (Mongo), Application
│   ├── routes/             # Express route handlers
│   ├── app.js              # Express app setup
│   └── server.js           # Entry point
```

---

## ⚙️ Technologies Used

* Node.js + Express
* MySQL 
* Cloudinary (for image and resume uploads)
* JWT (for secure login authentication)
* bcrypt (for password hashing)
* dotenv (for environment configs)

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sira-job-portal.git
   cd sira-job-portal/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a config.env file inside the /config directory and add:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=job_portal
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```

4. Set up your MySQL database and import the schema for the users table. MongoDB collections for jobs and applications will be created automatically by Mongoose.

---

## 🚀 Usage

1. Run the backend server:

   ```bash
   npm start
   ```

2. The server will start on [http://localhost:3000](http://localhost:3000) (or your configured port).

---

## 🧪 API Endpoints (Sample)

* POST /api/register — Register a user
* POST /api/login — Login
* GET /api/me — Get user profile
* PUT /api/update-profile — Update user profile
* PUT /api/change-password — Change password
* DELETE /api/delete-account — Delete user account

Admin:

* GET /api/admin/jobs — Get all jobs
* PUT /api/admin/job/\:id — Update a job
* DELETE /api/admin/job/\:id — Delete a job
* GET /api/admin/users — Get all users
* PUT /api/admin/user/\:id — Update user role
* DELETE /api/admin/user/\:id — Delete user

---

## 🔐 Authentication

* All protected routes use JWT for authentication.
* Include the token in the Authorization header as:

  ```
  Authorization: Bearer <your_token_here>
  ```

---

## ☁️ File Uploads

* Images (avatar, company logo) and resumes are uploaded to Cloudinary via base64 data URLs.
* Uploads are handled and stored securely using cloudinary.v2.uploader.

---


