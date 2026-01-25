import type { Request, Response } from "express";
import { CreateCourseSchema, UpdateCourseSchema, CourseParamsSchema } from "../schema/courses.schema";
import { createCourseModal, deleteCourseModal, getACourseModal, getCoursesModal, updateCourseModal } from "../models/courses.model";
import { parse, success } from "zod";


export const createCourseController = async (request: Request, response: Response) => {
    try {

        const requestBody = request.body;

        const userId = request.user.id;


        const parseRequestBody = CreateCourseSchema.safeParse(requestBody);

        if (parseRequestBody.success === false) {
            return response.status(400).json({
                success: "false",
                message: "Invalid parameters",
                error: parseRequestBody.error.errors
            })
        }

        await createCourseModal(requestBody, userId);


        return response.status(200).json({
            success: "success",
            message: "Course successfully created"
        })


    } catch (error: any) {
        return response.status(500).json({
            success: "fail",
            message: "Internal server error"
        })
    }
}


export const getAllCoursesController = async (request: Request, response: Response) => {
    try {

        const courses = await getCoursesModal();


        if (courses.length == 0) {
            return response.status(404).json({
                success: "fail",
                message: "Resource not found"
            })
        }


        return response.status(200).json({
            success: "success",
            results: {
                courses
            }
        })

    } catch (error: any) {
        return response.status(500).json({
            success: "fail",
            message: "Intrnal Server Error"
        })
    }
}


export const getACourseController = async (request: Request, response: Response) => {
    try {


        const params = request.params;

        const parseId = CourseParamsSchema.safeParse(params);


        if (parseId.success === false) {
            return response.status(400).json({
                success: "fail",
                message: "Course id required"
            })
        }

        const { id } = parseId.data;

        const course = await getACourseModal(id);


        if (course === null) {
            return response.status(404).json({
                success: "fail",
                message: "Course not found"
            })
        }


        return response.status(200).json({
            success: "success",
            results: {
                course
            }
        })

    } catch (error: any) {
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}



export const updateCourseController = async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;

        const requestParams = request.params;

        const parseParams = CourseParamsSchema.parse(requestParams);

        const { id } = parseParams;

        const parseRequestBody = UpdateCourseSchema.safeParse(requestBody);

        if (parseRequestBody.success === false) {
            return response.status(400).json({
                success: "fail",
                message: "Invalid parameters",
                error: parseRequestBody.error.errors
            })
        }

        const parseData = parseRequestBody.data;

        const updatedCourse = await updateCourseModal(parseData, id);

        if(updatedCourse === null)
        {
            return response.status(404).json({
                success: "fail",
                message: "Cannot update. Course not found"
            })
        }

        return response.status(200).json({
            success: "success",
            message: `Course successfully updated ${id}`,
            results: {
                data: updatedCourse
            }
        })

    } catch (error: any) {
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}


export const deleteCourseController = async (request: Request, response: Response) => {
    try {

        const params = request.params;
        const parseParams = CourseParamsSchema.safeParse(params);

        if (parseParams.success === false) {
            return response.status(400).json({
                success: "fail",
                message: "Invalid parameters",
                error: parseParams.error.errors
            })
        }

        const { id } = parseParams.data;


        const deleteCourse = await deleteCourseModal(id);


        if(deleteCourse === null)
        {
            return response.status(404).json({
                success: 'fail',
                message: "Course not found"
            })
        }


        return response.status(200).json({
            success: "success",
            message: `Course ${id} deleted successfully`,
            deleteCourse
        })

    } catch (error: any) {
        return response.status(500).json({
            success: "fail",
            message: "Internal Server Error"
        })
    }
}