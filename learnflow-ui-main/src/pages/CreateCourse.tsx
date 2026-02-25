import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourseApi } from "@/services/courseService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast({
        title: "Missing fields",
        description: "Title and description are required",
      });
      return;
    }

    setLoading(true);

    try {
      await createCourseApi({
        title,
        description,
        cover_image: cover || undefined,
      });

      toast({
        title: "Course created",
        description: "Your course has been created successfully",
      });

      // Redirect to instructor courses
      navigate("/instructor/courses");
    } catch (err: any) {
      toast({
        title: "Error creating course",
        description: err?.detail || JSON.stringify(err),
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title */}
          <div>
            <Label>Course Title</Label>
            <Input
              placeholder="Enter course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              className="w-full border rounded-md p-2 min-h-[120px] bg-background"
              placeholder="Enter course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <Label>Cover Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setCover(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Preview */}
          {cover && (
            <img
              src={URL.createObjectURL(cover)}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          )}

          {/* Submit */}
          <Button className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Course"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;