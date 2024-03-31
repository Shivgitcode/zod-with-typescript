import { z } from "zod";

// type User = {
//   username: string;
// };
const hobbies = ["Programming", "weight Lifting", "Guitar"] as const;
const UserSchema = z.object({
  username: z.string().min(3), //min length 3
  age: z.number().gt(0).default(Math.random()), //gt than zero
  birthday: z.date().optional(),
  isProgrammer: z.boolean().default(true).optional(), // can be null
  test: z.any(),
  hello: z.literal(true),
  hobby: z.enum(hobbies),
});

type User = z.infer<typeof UserSchema>;

const user: User = {
  username: "shivansh",
};

console.log(UserSchema.partial().parse(user));
