import z from "zod/v3"

export const UserSignupSchema = z.object({
    username: z.string(),
    password: z.string().min(6, "Password must be atleast 6 character"),
    confirmPassword: z.string(),
    role: z.string(),
    email: z.string(),

})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"]
    })



    
export const UserLoginSchema = z.object({
        email: z.string(),
        password: z.string()
})
    