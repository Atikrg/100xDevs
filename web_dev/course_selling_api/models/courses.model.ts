import { z } from "zod"
import { prisma } from "../db"
import { CreateCourseSchema, UpdateCourseSchema } from "../schema/courses.schema"

type CreateCourseInput = z.infer<typeof CreateCourseSchema>

type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>

export async function createCourseModal(course: CreateCourseInput, userId: string) {
    try {
        const validatedData = CreateCourseSchema.parse(course)


        const createCoursePrismaResult = await prisma.course.create({
            data: {
                ...validatedData,
                instructorId: userId
            },
        })

        return createCoursePrismaResult
    } catch (error) {
        throw error
    }
}


export async function getCoursesModal() {
    try {
        const courses = await prisma.course.findMany({

        });

        return courses;
    } catch (error) {
        throw error
    }
}


export async function getACourseModal(id: string) {
    try {
        const course = await prisma.course.findUnique({
            where: {
                id
            }
        })

        return course;
    } catch (error) {
        throw error
    }
}

type CourseUpdate = {
    title?: string;
    description?: string;
    price?: number;
}

export async function updateCourseModal(course: CourseUpdate, id: string) {
    try {
        
        const validatedData = UpdateCourseSchema.parse(course);
        const updateCourse = await prisma.course.update({
            where: {
                id
            },
            data: validatedData

        })
        return updateCourse


    } catch (error) {
        throw error;
    }
}


export async function deleteCourseModal(id: string) {
    try {

        const deleteCourse = await prisma.course.delete({
            where: {
                id
            }
        })

        return deleteCourse;

    } catch (error) {
        throw error;
    }
}