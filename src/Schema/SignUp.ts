import { z } from "zod";


const usernameValidation = z
.string()
.min(2 , "username must atleast 2 character")
.max(14, " username must be less than 14 character")



export const SignupSchema = z.object({
    username : usernameValidation ,
    email : z.string().email({message : "invalid email address"}),
    password : z.string().min(6 , "passowrd must be atleast 6 character")
})