from rest_framework import generics, permissions
from .models import *
from .serializers import *

from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
# ---------- Instructor APIs ----------

class CourseCreateView(generics.CreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


class CourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'instructor':
            return Course.objects.filter(instructor=self.request.user)
        return Course.objects.filter(is_published=True)


class LessonCreateView(generics.CreateAPIView):
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]


# ---------- Student APIs ----------

class EnrollCourseView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


class MyCoursesView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)


class MarkLessonCompleteView(generics.CreateAPIView):
    serializer_class = LessonCompletionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
class SignUpView(generics.CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [permissions.AllowAny]


class CustomLoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = User.objects.get(username=request.data["username"])

        response.data["user"] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
        return response