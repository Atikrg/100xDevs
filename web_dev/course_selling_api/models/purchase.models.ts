import { prisma } from "../db";


export async function purchaseCourseModel(courseId: string[], userId: string) {
    
    const purchaseCourses = await prisma.$transaction(async (tx) => {
        const purchases = await tx.purchase.createMany({
            data: courseId.map((id) => ({
                userId,
                courseId: id,
            })),
        });

        return purchases;
    });

    return purchaseCourses;
}


export async function getUserPurchasedCoursesModels(userId: string) {
    const courses = await prisma.purchase.findMany({
        where: {
            userId
        }
    })

    return courses;
}