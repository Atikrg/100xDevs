import type { Request, Response } from "express";
import z from "zod/v3";
import { createUser, loginUser } from "../models/auth.model";
import { UserLoginSchema, UserSignupSchema } from "../schema/auth.schema";
import { generateJwtToken } from "../handler";


export const signupController = async (request: Request, response: Response) => {
    try {

        const requestBody = request.body;

        const parametersParse = UserSignupSchema.safeParse(requestBody);


        if (parametersParse.success === false) {
            return response.status(400).json({
                success: "fail",
                message: parametersParse.error.errors

            })
        }


        const userSignUpCredentials = {
            username: requestBody.username,
            password: requestBody.password,
            email: requestBody.email,
            role: requestBody.role
        }


        await createUser(userSignUpCredentials);

        return response.status(200).json(
            {
                success: "succcess",
                message: "Signup successfull"
            }
        )


    } catch (error: any) {

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

        const loginCredentials = {
            password: requestBody.password,
            email: requestBody.email
        }

        const user = await loginUser(loginCredentials);


        if (!user) {
            return response.status(404).json({
                success: "fail",
                message: "No user found"
            })
        }


        const jwtTokenPayload = {
            id: user.id,
            role: user.role
        }



        const jwtToken = await generateJwtToken(jwtTokenPayload);

        return response.status(200).json({
            success: "success",
            message: "Successfully logged in",
            data: {
                token: jwtToken
            }
        })


    } catch (error: any) {
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}

