import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("app/public"));

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [];

let nextUserId = 1;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const user: User = {
    id: nextUserId,
    name,
    email,
  };

  console.log("User created", user);

  users.push(user);
  nextUserId++;

  res.status(201).json(user);
});

app.post("/api/login", (req, res) => {
  const { email } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(401).json({
      error: "Invalid credentials",
    });
    return;
  }

  res.json(user);
});

app.delete("/api/test/reset", (_req, res) => {
  users.length = 0;
  nextUserId = 1;
  res.status(204).send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
