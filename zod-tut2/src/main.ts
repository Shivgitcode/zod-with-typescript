console.log("shivansh");

import { z } from "zod";

const schema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    birthday: z.date().optional(),
    isProgrammer: z.boolean().default(true).optional(),
    age: z.number().gte(18).optional(),
    test: z.undefined().optional(),
  })
  .partial();

const UserSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    // z.string().or(z.number())
    username: z.string(),
    // friends: z.array(z.string()).nonempty(),
    coords: z.tuple([z.number(), z.number(), z.number()]).rest(z.string()),
  })
  .passthrough();

// z.record()

const UserMap = z.record(z.string(), z.number());

const user2 = {
  height: 173,
  age: 20,
};

// z.strict strictly checks if the there any key defined in the object other than the schema and throws an error if not

// other types z.undefined(),z.null(),z.void(),z.any(),z.never()
// z.deepPartial()
// z.extend() extends the current object with another field
// z.merge({}) to pass multiple objects with validations in existing schema

// validations z.optional to give optional property to for zod z.nullish() can be a null value,z.min() z.email() to check min value and also to chech if the value is email z.required() to so that z.default we can also define default value z.literal() can define a particular value for the field and no other value can be beside the default value  z.enum([]) defines the array of values for the field where the user cannot enter the values other than the defined values
type User = z.infer<typeof UserSchema>;

// UserSchema.shape.friends.element;

const user1: User = {
  id: 345,
  username: 1,
  age: 20,
  coords: [1, 2, 3, "shdfkjk"],
};

// console.log(UserMap.parse(user2));
console.log(UserSchema.safeParse(user1));

// custom validations in zod

// const brandEmail = z
//   .string()
//   .email()
//   .refine((val) => val.endsWith("@gmail.com"), {
//     message: "Email must end with @gmail.com",
//   });

// const email = "test@gmail.com";

// console.log(brandEmail.safeParse(email));
