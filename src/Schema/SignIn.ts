import { z } from "zod";


export const SigninSchema = z.object({
    email : z.string().email({message : "invalid email address"}),
    password : z.string().min(6 , "passowrd must be atleast 6 character")
})