import type { Request, Response } from "express";
import z from "zod/v3";
import { createUser } from "../models/auth.models";
import { success } from "zod";

const UserSignupSchema = z.object({
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


export const signupController = async (request: Request, response: Response) => {
    try {

        const requestBody = request.body;

        const parametersParse = UserSignupSchema.safeParse(requestBody);

        console.log("parametersParse", parametersParse);

        if (parametersParse.success === false) {
            return response.status(400).json({
                success: "fail",
                message: parametersParse.error.errors

            })
        }


        const userName = requestBody.username;
        const password = requestBody.password;
        const email = requestBody.email;

        await createUser(
            {
                username: userName,
                password: password,
                email: email
            }

        );

        return response.status(200).json(
            {
                success: "succcess",
                message: "Signup successfull"
            }
        )


    } catch (error: any) {
        console.error("Error", error.message);

        if (error.message === "Email already exists") {
            return response.status(400).json({ message: "User already exists" });
        }

        return response.status(500).json({
            success: "fail",
            results: {
                message: "Internal Server Error"
            }
        })
    }
}




const UserLoginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const loginController = async (request: Request, response: Response) => {
    try {


        const requestBody = request.body;

        const parseParameters = UserLoginSchema.safeParse(requestBody);

        if (parseParameters.success === false) {
            return response.status(400).json({
                success: "fail",
                error: parseParameters.error.errors,
                message: "Invalid Parameters"
            })
        }


    } catch (error: any) {
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}