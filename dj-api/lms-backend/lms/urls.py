from django.urls import path
from .views import *

urlpatterns = [
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