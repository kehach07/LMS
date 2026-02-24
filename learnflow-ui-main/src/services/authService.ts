const API = import.meta.env.VITE_API_URL;

export const signUpApi = async (data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await fetch(`${API}/api/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};


export const signInApi = async (data: {
  username_or_email: string;
  password: string;
}) => {
  const res = await fetch(`${API}/api/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    // Backend may send: { detail: "..."} or validation errors
    throw new Error(
      result.detail ||
      result.username_or_email?.[0] ||
      "Login failed"
    );
  }

  return result;
};