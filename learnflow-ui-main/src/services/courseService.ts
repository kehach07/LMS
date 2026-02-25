const API = import.meta.env.VITE_API_URL || "http://localhost:8001";

export const getInstructorCourses = async () => {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API}/api/instructor/courses/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw await res.json();
  return res.json();
};
export const createCourseApi = async (data: {
  title: string;
  description: string;
  cover_image?: File;
}) => {
  const token = localStorage.getItem("access");

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);

  if (data.cover_image) {
    formData.append("cover_image", data.cover_image);
  }

  const res = await fetch(`${API}/api/instructor/courses/create/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw await res.json();
  return res.json();
};