import { prisma } from "../db";
import bcrypt from "bcrypt";
import type { User } from "../generated/prisma/client";
import { Role } from "../generated/prisma/client";
import { hash } from "zod";


type UserCredentials = {
    email: string,
    password: string,
    username: string
}

const saltRounds = Number(process.env.SALT_ROUNDS);

export async function createUser(userCredentials: UserCredentials) {


    try {

        const { email, password, username } = userCredentials;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
                role: Role.STUDENT
            }
        })
        return user;
    } catch (error: any) {

        if (error.code === "P2002") {
            throw new Error("Email already exists");
        }
    }

}