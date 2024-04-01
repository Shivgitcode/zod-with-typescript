import { z } from "zod";

const hobbies = ["Programming", "Weight Lifting", "Guitar"] as const;
// we can also pass enums like this
const UserSchema = z
  .object({
    username: z.string().min(8),
    password: z.string().min(8),
    email: z.string().email().endsWith("@gmail.com"),
    isProgrammer: z.boolean().default(true), //gives default value to the isProgrammer key
    age: z.number().gt(0).optional(),
    unknown: z.undefined().optional(),
    unknown2: z.null().optional(),
    score: z.array(z.number()).nullish(), // nullish here signifies that the value can both be null and undefined
    response: z.tuple([z.string(), z.number(), z.boolean()]).rest(z.string()),
    img: z.literal(true), // sets the value to true if any other value is passed than throws an error
    hobby: z.enum(hobbies), // this sets the list of particular values hobbies can have other than these values zod will throw an error
  })
  .pick({ username: true }) //only picks username ignores other values
  .partial() // make every field inside the object optional
  .deepPartial() // make every field inside the object optional and also the fields which have nested objects
  .extend({ request: z.string() });

type User = z.infer<typeof UserSchema>;

const CartSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    productName: z.string(),
  })
  .passthrough();

type Cart = z.infer<typeof CartSchema>;

const user: User = {
  username: "snivansh",
  password: "lfgkdftjewrd",
  email: "shivneeraj2004@chitkara.edu.in",
  score: [1, 34, 4532, 45],
  response: ["you are not authorized", 401, false, "fkldajlda"],
  request: "params",
};

const cart1: Cart = {
  id: 1,
  productName: "gym shorts",
  quantity: 5,
};

console.log(UserSchema.partial().safeParse(user));

console.log(CartSchema.safeParse(cart1));

console.log(UserSchema.shape.username); // this tells the particular shape of the particular object field in the object
