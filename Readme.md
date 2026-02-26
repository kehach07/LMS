LMS Backend – API Documentation 
Hosted Application: https://lmstool-ten.vercel.app

Base URL
http://localhost:8000/api/

(or your deployed URL)

1. Setup & Run Instructions
Clone Project
git clone <your-repo-url>
cd lms-backend
Create Virtual Environment
Windows (PowerShell)
python -m venv venv
venv\Scripts\activate
Mac/Linux
python3 -m venv venv
source venv/bin/activate
Install Requirements
pip install -r requirements.txt
Apply Migrations
python manage.py makemigrations
python manage.py migrate
Create Superuser (optional)
python manage.py createsuperuser
Run Server
python manage.py runserver

Server runs at:

http://127.0.0.1:8000/
2. Authentication APIs
2.1 Sign Up

POST /api/signup/

Request:

{
  "username": "john",
  "email": "john@gmail.com",
  "password": "password123",
  "role": "student"
}

Response:

201 Created
2.2 Login (Username OR Email)

POST /api/login/

Request:

{
  "username_or_email": "john",
  "password": "password123"
}

Response:

{
  "access": "...",
  "refresh": "...",
  "username": "john",
  "email": "john@gmail.com",
  "role": "student"
}

Save:

Authorization: Bearer <access>
2.3 Refresh Token

POST /api/auth/refresh/

{
  "refresh": "<refresh_token>"
}
3. Instructor APIs
3.1 Create Course

POST /api/instructor/courses/create/

Headers:

Authorization: Bearer <token>
Content-Type: multipart/form-data

Body (form-data):

title: Python Basics
description: Learn Python
cover_image: (file)
3.2 List Instructor Courses

GET /api/instructor/courses/

Returns courses created by logged-in instructor.

3.3 Add Lesson

POST /api/instructor/lesson/create/

{
  "course": 1,
  "title": "Introduction",
  "lesson_type": "text",
  "content": "Welcome to the course",
  "order": 1
}

For video:

{
  "course": 1,
  "title": "Setup",
  "lesson_type": "video",
  "video_url": "https://youtube.com/..."
}
3.4 Instructor Dashboard

GET /api/instructor/dashboard/

Returns:

total courses

total students

enrollments

4. Student APIs
4.1 List Published Courses

GET /api/courses/

Returns all courses where:

is_published = true
4.2 Enroll in Course

POST /api/enroll/

{
  "course": 1
}
4.3 My Courses

GET /api/my-courses/

Returns student enrollments.

4.4 Mark Lesson Complete

POST /api/complete/

{
  "lesson": 5
}
5. Media Configuration

In settings.py

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

In urls.py

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
6. Postman Collection (Required for Submission)

Create a collection named:

LMS APIs

Add requests:

Auth

POST /signup

POST /login

POST /auth/refresh

Instructor

GET /instructor/courses

POST /instructor/courses/create

POST /instructor/lesson/create

GET /instructor/dashboard

Student

GET /courses

POST /enroll

GET /my-courses

POST /complete

Set Authorization:

Type: Bearer Token
Token: {{access}}