const API = import.meta.env.VITE_API_URL;

export const signUpApi = async (data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await fetch(`${API}/auth/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};


export const signInApi = async (data: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${API}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};