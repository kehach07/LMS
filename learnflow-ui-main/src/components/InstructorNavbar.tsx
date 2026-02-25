import { Link, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut } from "lucide-react";

const InstructorNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const active = (path: string) =>
    location.pathname.startsWith(path)
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-muted";

  return (
    <header className="sticky top-0 z-50 border-b bg-card">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/instructor/dashboard" className="flex items-center gap-2">
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">LearnHub</span>
        </Link>

        <nav className="flex gap-2">
          <Link to="/instructor/dashboard" className={`px-3 py-2 rounded ${active("/instructor/dashboard")}`}>
            Dashboard
          </Link>
          <Link to="/instructor/courses" className={`px-3 py-2 rounded ${active("/instructor/courses")}`}>
            My Courses
          </Link>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2 border px-3 py-1.5 rounded"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default InstructorNavbar;