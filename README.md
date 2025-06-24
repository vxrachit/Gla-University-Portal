# 🎓 GLA University Portal

> 📘 *A small project built for a university assignment (1st Year – B.Tech CSE Hons, GLA University)*

A full-stack university portal built using **React.js**, **FastAPI**, and **MySQL (TiDB Cloud)**. This platform supports role-based dashboards for **Students**, **Faculties**, and **Admins**, offering features like student registration, faculty leave requests, and admin leave approvals.

---

## 🌐 Live Preview

[Click Here](https://gla.vxrachit.dpdns.org)

---

## 🔐 Demo Login Credentials

| Role     | Email                                | Password   |
|----------|--------------------------------------|------------|
| Student  | student@vxrachit.dpdns.org           | vxrachit   |
| Faculty  | faculty@vxrachit.dpdns.org           | vxrachit   |
| Admin    | admin@vxrachit.dpdns.org             | vxrachit   |

---

## 📸 Screenshots

### 👨‍🎓 Student Dashboard
![Student Dashboard](https://raw.githubusercontent.com/vxrachit/gla/main/screenshots/student_dashboard.png)

### 👨‍🏫 Faculty Dashboard
![Faculty Dashboard](https://raw.githubusercontent.com/vxrachit/gla/main/screenshots/faculty_dashboard.png)

### 🧑‍💼 Admin Dashboard
![Admin Dashboard](https://raw.githubusercontent.com/vxrachit/gla/main/screenshots/admin_dashboard.png)

### ⚙️ Backend API
![Backend API](https://raw.githubusercontent.com/vxrachit/gla/main/screenshots/admin_dashboard.png)

---

## ⚙️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React.js + Tailwind CSS |
| Backend   | FastAPI (Python)        |
| Database  | MySQL (via TiDB Cloud)  |
| ORM       | SQLAlchemy              |
| Auth      | Passlib (Password Hash) |

---

## 📦 Installation & Setup

### Clone and Setup Backend
```bash
git clone https://github.com/vxrachit/Gla-University-Portal.git
cd Gla-University-Portal/backend

# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn app.main:app --reload
```

### Clone and Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables (`.env`)

For backend:

```env
DB_HOST=your_tidb_host
DB_PORT=4000
DB_USER=username
DB_PASSWORD=password
DB_NAME=gla_portal
```

---

## 📑 API Documentation

### 🎓 Student Endpoints

| Method | Endpoint              | Description        |
|--------|------------------------|--------------------|
| POST   | `/student/login`       | Student Login      |
| POST   | `/student/register`    | Student Register   |

---

### 🧑‍💼 Admin Endpoints

| Method | Endpoint                           | Description           |
|--------|------------------------------------|-----------------------|
| POST   | `/admin/login`                     | Admin Login           |
| POST   | `/admin/create-faculty`            | Create Faculty        |
| GET    | `/admin/faculties`                 | Get All Faculties     |
| DELETE | `/admin/faculty/{faculty_id}`      | Delete Faculty        |
| GET    | `/admin/admin/unread-leaves`       | Get Unread Leaves     |
| GET    | `/admin/admin/new-leaves`          | Get New Leaves        |

---

### 👨‍🏫 Faculty Endpoints

| Method | Endpoint                               | Description         |
|--------|----------------------------------------|---------------------|
| POST   | `/faculty/login`                       | Faculty Login       |
| GET    | `/faculty/students`                    | Get Students        |
| DELETE | `/faculty/students/{student_id}`       | Delete Student      |
| GET    | `/faculty/{faculty_id}/leave`          | Get Faculty Leaves  |

---

### 📝 Leave Management

| Method | Endpoint                                      | Description           |
|--------|-----------------------------------------------|-----------------------|
| POST   | `/leave/request`                              | Request Leave         |
| GET    | `/leave/all`                                  | Get All Leaves        |
| PUT    | `/leave/approve/{leave_id}`                   | Approve Leave         |
| PUT    | `/leave/reject/{leave_id}`                    | Reject Leave          |
| PUT    | `/leave/admin/mark-leave-read/{leave_id}`     | Mark Leave as Read    |

---

## 📜 License

This project is licensed under the MIT License.  
&copy; [vxRachit](https://github.com/vxrachit)

---
