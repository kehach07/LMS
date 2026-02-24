import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { RoleProvider } from "@/contexts/RoleContext";
import { EnrollmentProvider } from "@/contexts/EnrollmentContext";

import Navbar from "@/components/Navbar";

// Pages
import Home from "@/pages/Home";
import CourseCatalog from "@/pages/CourseCatalog";
import MyCourses from "@/pages/MyCourses";
import StudentDashboard from "@/pages/StudentDashboard";
import CourseLearning from "@/pages/CourseLearning";
import InstructorDashboard from "@/pages/InstructorDashboard";
import InstructorCourses from "@/pages/InstructorCourses";
import CourseStudents from "@/pages/CourseStudents";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const queryClient = new QueryClient();

/* ---------------- Layout with Navbar logic ---------------- */

function AppRoutes() {
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavbar =
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-background">
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Student routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<CourseCatalog />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/learn/:courseId" element={<CourseLearning />} />

        {/* Instructor routes */}
        <Route
          path="/instructor/dashboard"
          element={<InstructorDashboard />}
        />
        <Route
          path="/instructor/courses"
          element={<InstructorCourses />}
        />
        <Route
          path="/instructor/courses/:courseId/students"
          element={<CourseStudents />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

/* ---------------- Main App ---------------- */

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RoleProvider>
            <EnrollmentProvider>
              <AppRoutes />
            </EnrollmentProvider>
          </RoleProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;