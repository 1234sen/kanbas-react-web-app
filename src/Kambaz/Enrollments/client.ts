import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API_BASE = `${REMOTE_SERVER}/api`;

// 获取用户的所有注册课程
export const findEnrollmentsForUser = async (userId: string) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/enrollments`);
    return response.data;
};

// 获取课程的所有已注册用户
export const findEnrollmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${API_BASE}/courses/${courseId}/enrollments`);
    return response.data;
};

// 检查用户是否已注册特定课程
export const isUserEnrolledInCourse = async (userId: string, courseId: string) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/courses/${courseId}`);
    return response.data;
};

// 用户注册课程
export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axios.post(`${API_BASE}/users/${userId}/enrollments/${courseId}`);
    return response.data;
};

// 用户取消注册课程
export const unenrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axios.delete(`${API_BASE}/users/${userId}/enrollments/${courseId}`);
    return response.data;
}; 