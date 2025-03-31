import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API_BASE = `${REMOTE_SERVER}/api`;

export const findPeopleInCourse = async (courseId: string) => {
    const response = await axios.get(`${API_BASE}/courses/${courseId}/people`);
    return response.data;
};

export const addUserToCourse = async (courseId: string, userId: string, role: string = "STUDENT") => {
    const response = await axios.post(`${API_BASE}/courses/${courseId}/people/${userId}`, { role });
    return response.data;
};

export const createUserAndAddToCourse = async (courseId: string, userData: any, role: string = "STUDENT") => {
    const response = await axios.post(`${API_BASE}/courses/${courseId}/people`, { userData, role });
    return response.data;
};

export const updateUserRoleInCourse = async (enrollmentId: string, role: string) => {
    const response = await axios.put(`${API_BASE}/enrollments/${enrollmentId}/role`, { role });
    return response.data;
};

export const removeUserFromCourse = async (enrollmentId: string) => {
    const response = await axios.delete(`${API_BASE}/enrollments/${enrollmentId}`);
    return response.data;
}; 