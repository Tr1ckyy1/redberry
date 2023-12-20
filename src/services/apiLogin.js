import { TOKEN, API } from "../data";

export async function login(email) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ email }),
  });
  console.log(res);
    if (!res.ok) throw new Error("Invalid email");

//   const data = await res.json();
//   console.log(data);
//   return data;
}
