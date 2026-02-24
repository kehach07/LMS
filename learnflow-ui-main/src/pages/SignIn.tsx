import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signInApi } from "@/services/authService";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signInApi({
        username: email, // backend uses username
        password,
      });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Welcome back!",
        description: "Signed in successfully",
      });

      if (data.user.role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.detail || JSON.stringify(err),
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <GraduationCap className="mx-auto h-10 w-10" />
          <h1 className="text-2xl font-bold mt-4">Sign In</h1>
        </div>

        <div className="border rounded-xl p-6 bg-card shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Email / Username</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;