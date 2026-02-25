import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, BookOpen, Users, LogIn, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const location = useLocation();
  const role = user?.role;

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
          {isAuthenticated && role === "student" && (
            <>
              <NavItem to="/catalog" label="Catalog" active={location.pathname === "/catalog"} />
              <NavItem to="/my-courses" label="My Courses" active={location.pathname === "/my-courses"} />
              <NavItem to="/dashboard" label="Dashboard" active={location.pathname === "/dashboard"} />
            </>
          )}
          {isAuthenticated && role === "instructor" && (
            <>
              <NavItem to="/instructor/dashboard" label="Dashboard" active={location.pathname === "/instructor/dashboard"} />
              <NavItem to="/instructor/courses" label="My Courses" active={location.pathname.startsWith("/instructor/courses")} />
            </>
          )}
          {!isAuthenticated && (
            <NavItem to="/catalog" label="Browse Courses" active={location.pathname === "/catalog"} />
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground capitalize">
                  {role === "instructor" ? <><Users className="mr-1 inline h-3 w-3" />Instructor</> : <><BookOpen className="mr-1 inline h-3 w-3" />Student</>}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover ring-2 ring-border" />
                <span className="hidden text-sm font-medium text-foreground sm:block">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="gap-1.5">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
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
