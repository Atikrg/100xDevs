import z from "zod/v3";


export const PurchaseCourseSchema = z.object({
  courseId: z.array(z.string()).min(1, "At least one courseId is required"),
})


export const UserCoursePurchaseSchema = z.object({
    id: z.string()
})