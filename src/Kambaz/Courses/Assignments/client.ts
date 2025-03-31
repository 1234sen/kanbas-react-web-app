import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// 获取课程的所有作业
export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

// 获取单个作业详情
export const findAssignmentById = async (assignmentId: string) => {
    const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

// 创建新作业
export const createAssignment = async (courseId: string, assignment: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};

// 更新作业
export const updateAssignment = async (assignment: any) => {
    const response = await axios.put(
        `${ASSIGNMENTS_API}/${assignment._id}`,
        assignment
    );
    return response.data;
};

// 删除作业
export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
}; 