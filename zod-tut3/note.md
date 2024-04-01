# Notes On Zod

1. **Zod Primitive types**

```ts
import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(8),
  password: z.string().min(8),
  email: z.string().email().endsWith("@gmail.com"),
  isProgrammer: z.boolean().optional(),
  age: z.number().optional(),
  unknown: z.undefined().optional(), //this value is always undefined
  unknown2: z.null().optional(), //this value is always null
  score: z.array(z.number()),
  response: z.tuple([z.string(), z.number(), z.boolean()]).rest(z.string()),
  birthday: z.birthday(),
  unknown3: z.void(), //this value is returns undefined due to z.void()
  unknown4: z.unknown(), //this value is unknown
  unknown5: z.never(), //this value can never be defined
});

type User = z.infer<typeof UserSchema>;

const user: User = {
  username: "snivansh",
  password: "lfgkdftjewrd",
  email: "shivneeraj2004@chitkara.edu.in",
  score: [1, 34, 4532, 45],
  response: ["you are not authorized", 401, false, "fkldajlda"],
};

console.log(UserSchema.safeParse(user));
```
