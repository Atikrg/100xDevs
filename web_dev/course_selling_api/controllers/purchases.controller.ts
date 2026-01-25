import type { Request, Response } from 'express'
import { success } from 'zod'
import { PurchaseCourseSchema, UserCoursePurchaseSchema } from '../schema/purchase.schema'
import { getUserPurchasedCoursesModels, purchaseCourseModel } from '../models/purchase.models';


export const purchaseCourseController = async (request: Request, response: Response) => {
    try {


        const requestBody = request.body;

        const parseParams = PurchaseCourseSchema.safeParse(requestBody);

        if (parseParams.success === false) {

            return response.status(400).json({
                success: "fail",
                message: "Invalid parameters",
                errors: parseParams.error.flatten(),
            })
        }

        if (!request.user) {
             return response.status(401).json({ message: "Unauthorized" });
        }

        const userId = request.user.id;
        const { courseId } = parseParams.data;

        const purchaseCourse = await purchaseCourseModel(courseId, userId)

        return response.status(200).json({
            success: "success",
            message: `Successfully purchased the course ${courseId}`,
            results: {
                purchaseCourse
            }
        })

    } catch (error: any) {

        if (error.code === "P2002") {
            return response.status(409).json({
                success: "fail",
                message: `Course already purchased`
            })
        }

        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}


export const getStudentPurchasesCourseController = async (request: Request, response: Response) => {
    try {

        const requestParams = request.params;

        const parseRequestParams = UserCoursePurchaseSchema.safeParse(requestParams);


        if (parseRequestParams.success === false) {
            return response.status(400).json({
                success: "fail",
                message: "Invalid parameters"
            })
        }


        const { id } = parseRequestParams.data;


        const coursePurchases = await getUserPurchasedCoursesModels(id);

        if (coursePurchases === null) {
            return response.status(404).json({
                success: "fail",
                message: "Student course not found"
            })
        }


        return response.status(200).json({
            success: "success",
            message: `Successfully fetch the courses of user ${id}`,
            results: {
                coursePurchases
            }
        })


    } catch (error) {
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}