from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView

from .views import (
    SignUpView,
    LoginView,
    CourseCreateView,
    CourseListView,
    LessonCreateView,
    EnrollCourseView,
    MyCoursesView,
    MarkLessonCompleteView,
)

urlpatterns = [
    # ---------------- Auth ----------------
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ---------------- Courses ----------------
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('courses/create/', CourseCreateView.as_view(), name='course-create'),

    # ---------------- Lessons ----------------
    path('lessons/create/', LessonCreateView.as_view(), name='lesson-create'),

    # ---------------- Enrollment ----------------
    path('enroll/', EnrollCourseView.as_view(), name='enroll-course'),
    path('my-courses/', MyCoursesView.as_view(), name='my-courses'),

    # ---------------- Completion ----------------
    path('complete/', MarkLessonCompleteView.as_view(), name='mark-complete'),
]