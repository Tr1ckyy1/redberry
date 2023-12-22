import { TOKEN, API } from "../data";

export async function login(email) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("ელ-ფოსტა არ მოიძებნა");
  if (!localStorage.getItem("token")) localStorage.setItem("token", TOKEN);
}
