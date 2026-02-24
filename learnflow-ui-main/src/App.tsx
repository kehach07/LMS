import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import { EnrollmentProvider } from "@/contexts/EnrollmentContext";
import Navbar from "@/components/Navbar";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoleProvider>
          <EnrollmentProvider>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<CourseCatalog />} />
                    <Route path="/my-courses" element={<MyCourses />} />
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/learn/:courseId" element={<CourseLearning />} />
                    <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                    <Route path="/instructor/courses" element={<InstructorCourses />} />
                    <Route path="/instructor/courses/:courseId/students" element={<CourseStudents />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              } />
            </Routes>
          </EnrollmentProvider>
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
