import { templateLiteral } from "zod"
import z from "zod/v3"

export const CreateCourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
})


export const UpdateCourseSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional()
})

export const CourseParamsSchema = z.object({
    id: z.string().min(1, "Course ID is required"),
})

