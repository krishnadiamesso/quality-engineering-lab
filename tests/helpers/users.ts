import { APIRequestContext } from "@playwright/test";

type UserInput = {
  name: string;
  email: string;
};

type User = UserInput & {
  id: number;
};

export async function createUser(
  request: APIRequestContext,
  data: UserInput,
): Promise<User> {
  // POST
  const response = await request.post("/api/users", { data });
  // parse response
  return await response.json();
}
