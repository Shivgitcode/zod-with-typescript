# Notes On Zod

1. **Zod Primitive types**

```ts
import { z } from "zod";

const UserSchema = z
  .object({
    username: z.string().min(8),
    password: z.string().min(8),
    email: z.string().email().endsWith("@gmail.com"),
    isProgrammer: z.boolean().optional(),
    age: z.number().optional(),
    unknown: z.undefined().optional(),
    unknown2: z.null().optional(),
    score: z.array(z.number()),
    response: z.tuple([z.string(), z.number(), z.boolean()]).rest(z.string()),
  })
  .partial();

type User = z.infer<typeof UserSchema>;

const user: User = {
  username: "snivansh",
  password: "lfgkdftjewrd",
  email: "shivneeraj2004@chitkara.edu.in",
  score: [1, 34, 4532, 45],
  response: ["you are not authorized", 401, false, "fkldajlda"],
};

console.log(UserSchema.partial().safeParse(user));
```
