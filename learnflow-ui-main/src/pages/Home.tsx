import { Link } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { GraduationCap, BookOpen, Users, ArrowRight, Star, Play } from "lucide-react";
import { getPublishedCourses, getInstructor } from "@/data/mockData";
import CourseCard from "@/components/CourseCard";

const Home = () => {
  const { setRole } = useRole();
  const featuredCourses = getPublishedCourses().slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--info)) 0%, transparent 50%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
              <Play className="h-3.5 w-3.5 text-primary" />
              Over 5,000+ students learning
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn without{" "}
              <span className="text-gradient">limits</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Start, switch, or advance your career with courses from world-class instructors. Build real-world skills at your own pace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                onClick={() => setRole("student")}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <BookOpen className="h-4 w-4" />
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/instructor/dashboard"
                onClick={() => setRole("instructor")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold text-foreground transition-all hover:bg-muted"
              >
                <Users className="h-4 w-4" />
                Start Teaching
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            { label: "Courses", value: "7+", icon: <BookOpen className="h-5 w-5" /> },
            { label: "Students", value: "5,000+", icon: <Users className="h-5 w-5" /> },
            { label: "Instructors", value: "3", icon: <GraduationCap className="h-5 w-5" /> },
            { label: "Avg. Rating", value: "4.7", icon: <Star className="h-5 w-5" /> },
          ].map((stat) => (
            <div key={stat.label} className="text-center animate-fade-in">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                {stat.icon}
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Featured Courses</h2>
            <p className="mt-1 text-muted-foreground">Most popular courses chosen by learners</p>
          </div>
          <Link
            to="/catalog"
            onClick={() => setRole("student")}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} linkTo={`/catalog`} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
