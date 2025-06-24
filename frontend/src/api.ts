
const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function getComplaints() {
  const res = await fetch(`${BASE_URL}/complaints`);
  if (!res.ok) throw new Error("Failed to fetch complaints");
  return res.json();
}
