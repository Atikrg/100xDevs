import z from "zod"
import { prisma } from "../db"
import { CourseLessonSchema } from "../schema/lessons.schema"

type CourseLessonInput = z.infer<typeof CourseLessonSchema>

export async function createLessonModal(lessonData: CourseLessonInput) {
    try {

        const validatedData = CourseLessonSchema.parse(lessonData);
        return prisma.lesson.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                course: {
                    connect: {
                        id: validatedData.courseId
                    }
                }
            }
        });
    } catch (error) {
        throw error;
    }
}


export async function getCourseLessonModel(courseId: string){

    const getCourseLessonPrismaResults = await prisma.lesson.findMany({
        where: {
            courseId
        }
    })

    return getCourseLessonPrismaResults;
}
