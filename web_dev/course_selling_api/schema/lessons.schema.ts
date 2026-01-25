import z from "zod/v3"
export const CourseLessonSchema = z.object({
    title: z.string(),
    content: z.string(),
    courseId: z.string()
}).strict();


export const CourseIdSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
})
