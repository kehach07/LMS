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

import StudentNavbar from "@/components/StudentNavbar";
import InstructorNavbar from "@/components/InstructorNavbar";
import { useAuth } from "@/contexts/AuthContext";

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
import { AuthProvider } from "./contexts/AuthContext";
import CreateCourse from "@/pages/CreateCourse";
const queryClient = new QueryClient();

/* ---------------- Layout with Navbar logic ---------------- */
function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavbar =
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  const renderNavbar = () => {
    if (hideNavbar) return null;

    if (!user) return null;

    if (user.role === "instructor") {
      return <InstructorNavbar />;
    }

    return <StudentNavbar />;
  };

  return (
    <div className="min-h-screen bg-background">
      {renderNavbar()}

      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Student */}
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<CourseCatalog />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/learn/:courseId" element={<CourseLearning />} />

        {/* Instructor */}
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/instructor/courses/:courseId/students" element={<CourseStudents />} />
        
        <Route path="/instructor/courses/new" element={<CreateCourse />} />
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
            <AuthProvider>
            <AppRoutes />
          </AuthProvider>
            </EnrollmentProvider>
          </RoleProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;