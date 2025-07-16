const baseUrl = "http://localhost:3000/api/users";

export async function signUpUser(userData) {
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "ההרשמה נכשלה");
  }

  return response.json();
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "שגיאה בהתחברות");
  }

  const data = await response.json();
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function fetchUserData() {
  const token = localStorage.getItem("token");
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("שגיאה באחזור נתוני משתמש");
  }

  return await response.json();
}
