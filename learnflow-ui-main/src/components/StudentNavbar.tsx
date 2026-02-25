import { Link, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUserId } = useRole();

  const user = {
    name: "Student",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  };

  // -------- Logout Function --------
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/signin");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            LearnHub
          </span>
        </Link>

        {/* Student Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavItem
            to="/catalog"
            label="Catalog"
            active={location.pathname === "/catalog"}
          />
          <NavItem
            to="/my-courses"
            label="My Courses"
            active={location.pathname === "/my-courses"}
          />
          <NavItem
            to="/dashboard"
            label="Dashboard"
            active={location.pathname === "/dashboard"}
          />
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!currentUserId ? (
            <>
              <Link
                to="/signin"
                className="rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-border"
              />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const NavItem = ({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) => (
  <Link
    to={to}
    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`}
  >
    {label}
  </Link>
);

export default StudentNavbar;