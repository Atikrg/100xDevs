
import type { Request, Response } from 'express'
import type { Role } from "../generated/prisma/enums"
import { CourseIdSchema, CourseLessonSchema } from '../schema/lessons.schema';
import { createLessonModal, getCourseLessonModel } from '../models/lessons.model';
import { success } from 'zod';


export const createLessonController = async (request: Request, response: Response) => {
    try {

        const requestBody = request.body;
        const parseRequestBody = CourseLessonSchema.safeParse(requestBody);

        if (parseRequestBody.success === false) {
            return response.status(400).json({
                success: "error",
                message: "Invalid parameters",
                error: parseRequestBody.error.errors
            })
        }

        const lessonData = parseRequestBody.data;

        const result = await createLessonModal(lessonData);

        return response.status(200).json({
            success: "success",
            message: "Successfully created lesson",
            results: {
                result
            }
        })




    } catch (error) {
        console.error("error", error);
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}


export const getCourseLessonController = async (request: Request, response: Response) => {
    try {

        const params = request.params;

        const parseParams = CourseIdSchema.safeParse(params);

        if (parseParams.success === false) {
            return response.status(400).json({
                success: "fail",
                message: "Course id required"
            })
        }


        const { courseId } = parseParams.data;

        const course = await getCourseLessonModel(courseId);

        if (course.length == 0) {
            return response.status(404).json({
                success: "fail",
                message: "Resource not found"
            })
        }

        return response.status(200).json({
            success: "success",
            message: `Successfully fetched the course with id ${courseId}`,
            results: {
                course
            }
        })


    } catch (error) {
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}