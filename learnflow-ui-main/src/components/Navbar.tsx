import { Link, useLocation } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { getInstructor } from "@/data/mockData";
import { GraduationCap, BookOpen, Users } from "lucide-react";

const Navbar = () => {
  const { role, setRole, currentUserId } = useRole();
  const location = useLocation();
  const user = getInstructor(currentUserId) || { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">LearnHub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {role === "student" ? (
            <>
              <NavItem to="/catalog" label="Catalog" active={location.pathname === "/catalog"} />
              <NavItem to="/my-courses" label="My Courses" active={location.pathname === "/my-courses"} />
              <NavItem to="/dashboard" label="Dashboard" active={location.pathname === "/dashboard"} />
            </>
          ) : (
            <>
              <NavItem to="/instructor/dashboard" label="Dashboard" active={location.pathname === "/instructor/dashboard"} />
              <NavItem to="/instructor/courses" label="My Courses" active={location.pathname.startsWith("/instructor/courses")} />
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border bg-muted p-0.5">
            <button
              onClick={() => setRole("student")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                role === "student" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Student
            </button>
            <button
              onClick={() => setRole("instructor")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                role === "instructor" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Instructor
            </button>
          </div>

          <div className="flex items-center gap-2">
            <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover ring-2 ring-border" />
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
