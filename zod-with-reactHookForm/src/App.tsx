import "./App.css";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
  };
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(5).max(30),
      lastName: z.string().min(5).max(30),
      email: z.string().email().endsWith("@gmail.com"),
      age: z.number().gte(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitData = (data: FormData) => {
    console.log("It worked ", data);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmitData)}>
        <div>
          <label>First Name: </label>
          <input type="text" {...register("firstName")}></input>
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div>
          <label>Last Name: </label>
          <input type="text" {...register("lastName")}></input>
        </div>
        <div>
          <label>Email: </label>
          <input type="email" {...register("email")}></input>
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" {...register("password")}></input>
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="password" {...register("confirmPassword")}></input>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
