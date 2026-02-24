# LMS Backend (Django + DRF)
cd lms-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8001
Backend API for a minimal **Learning Management System (LMS)** where:

* Instructors create courses and lessons
* Students enroll in courses
* Students complete lessons
* Progress is tracked per course

This backend is built using **Django**, **Django REST Framework**, and **SQLite**.

---

## 🚀 Features

### Authentication

* JWT-based login using **SimpleJWT**
* Role-based users:

  * `instructor`
  * `student`

### Instructor Capabilities

* Create courses
* View own courses
* Add lessons to courses

### Student Capabilities

* View published courses
* Enroll in courses
* View enrolled courses
* Mark lessons as completed

### Progress Tracking

* Lesson completion stored per student
* Can be used to calculate:

  ```
  Progress = completed lessons / total lessons × 100
  ```

---

## 🛠 Tech Stack

* Python 3.x
* Django
* Django REST Framework
* SimpleJWT
* SQLite (default)

---

## 📂 Project Structure

```
lms-backend/
│
├── config/                # Project settings
│   ├── settings.py
│   ├── urls.py
│
├── lms/                   # Main app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│
├── db.sqlite3
└── manage.py
```

---

## 🧱 Database Models

### User (Custom)

| Field    | Type                 |
| -------- | -------------------- |
| username | string               |
| email    | string               |
| password | string               |
| role     | student / instructor |

---

### Course

| Field        | Type      |
| ------------ | --------- |
| title        | string    |
| description  | text      |
| instructor   | FK → User |
| cover_image  | URL       |
| is_published | boolean   |
| created_at   | datetime  |

---

### Lesson

| Field       | Type         |
| ----------- | ------------ |
| course      | FK → Course  |
| title       | string       |
| content     | text         |
| video_url   | URL          |
| lesson_type | text / video |
| order       | integer      |

---

### Enrollment

| Field       | Type        |
| ----------- | ----------- |
| student     | FK → User   |
| course      | FK → Course |
| enrolled_at | datetime    |

Unique: `(student, course)`

---

### LessonCompletion

| Field        | Type        |
| ------------ | ----------- |
| student      | FK → User   |
| lesson       | FK → Lesson |
| completed_at | datetime    |

Unique: `(student, lesson)`

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone <repo-url>
cd lms-backend
```

---

### 2. Create Virtual Environment

```
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
```

---

### 3. Install Dependencies

```
pip install django djangorestframework djangorestframework-simplejwt
```

---

### 4. Run Migrations

```
python manage.py makemigrations
python manage.py migrate
```

---

### 5. Create Superuser (optional)

```
python manage.py createsuperuser
```

---

### 6. Run Server

```
python manage.py runserver
```

Backend will run at:

```
http://127.0.0.1:8000/
```

---

## 🔐 Authentication (JWT)

### Login

**POST**

```
/api/token/
```

Body:

```
{
  "username": "user",
  "password": "password"
}
```

Response:

```
access
refresh
```

Use header for protected APIs:

```
Authorization: Bearer <access_token>
```

---

## 📡 API Endpoints

### Courses

| Method | Endpoint               | Description                                        |
| ------ | ---------------------- | -------------------------------------------------- |
| GET    | `/api/courses/`        | List courses (instructor: own, student: published) |
| POST   | `/api/courses/create/` | Create course                                      |

---

### Lessons

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/api/lessons/create/` | Add lesson to course |

---

### Enrollment

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/enroll/`     | Enroll in course         |
| GET    | `/api/my-courses/` | Student enrolled courses |

---

### Lesson Completion

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/api/complete/` | Mark lesson as completed |

---

## 🧪 Example Request (Postman)

Header:

```
Authorization: Bearer <token>
Content-Type: application/json
```

Enroll:

```
POST /api/enroll/
{
  "course": 1
}
```

Mark Complete:

```
POST /api/complete/
{
  "lesson": 5
}
```

---

## 📊 Progress Logic (Frontend or API)

```
total_lessons = course.lessons.count()
completed = LessonCompletion.objects.filter(student=user, lesson__course=course).count()
progress = (completed / total_lessons) * 100
```

---

## 📌 Notes

* SQLite is used for development.
* All APIs require authentication except login.
* Role handling should be enforced in frontend or permissions.
* Designed for easy integration with React frontend.

---

## 🔮 Future Improvements

* Instructor student progress API
* Course progress endpoint
* Permissions (IsInstructor / IsStudent)
* File upload for videos
* Deployment (Docker / Cloud)

---

## 📬 Deliverables

* Django backend
* JWT authentication
* Course & lesson management
* Enrollment tracking
* Progress data support
* Ready for frontend integration
