from django.urls import path
from .views import *

urlpatterns = [
    path('auth/signup/', SignUpView.as_view(), name='signup'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Courses
    path('courses/', CourseListView.as_view()),
    path('courses/create/', CourseCreateView.as_view()),

    # Lessons
    path('lessons/create/', LessonCreateView.as_view()),

    # Enrollment
    path('enroll/', EnrollCourseView.as_view()),
    path('my-courses/', MyCoursesView.as_view()),

    # Completion
    path('complete/', MarkLessonCompleteView.as_view()),
]