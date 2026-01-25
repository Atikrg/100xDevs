import { prisma } from "../db";
import bcrypt from "bcrypt";
import { Role } from "../generated/prisma/client";
import type { UserSignupCredentials, UserLoginCredentials } from "../types/auth.types";



const saltRounds = Number(process.env.SALT_ROUNDS);

export async function createUser(userCredentials: UserSignupCredentials) {
    try {

        const { email, password, username, role } = userCredentials;
        const hashedPassword = await bcrypt.hash(password, saltRounds);



        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
                role: role as Role
            }
        })
        return user;
    } catch (error: any) {

        if (error.code === "P2002") {
            throw new Error("Email already exists");
        }
    }

}


export async function loginUser(userLoginCredentials: UserLoginCredentials) {
    try {
        const { email, password } = userLoginCredentials;

        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        })


        if (!findUser) {
            throw new Error("Invalid credentails");
        }

        const isPasswordValid: boolean = await bcrypt.compare(
            password,
            findUser.password
        )

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }


        return findUser;


    } catch (error: any) {
        throw error;
    }

}
