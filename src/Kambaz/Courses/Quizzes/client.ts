import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({
    withCredentials: true
});

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
export const findQuizAttemptById = async (attemptId: string) => {
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/quiz-attempts/${attemptId}`);
    return response.data;
};
export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const addQuestionToQuiz = async (quizId: string, question: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
};

export const updateQuizQuestion = async (quizId: string, questionId: string, question: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/questions/${questionId}`, question);
    return response.data;
};

export const deleteQuizQuestion = async (quizId: string, questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
};

export const startQuizAttempt = async (quizId: string) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`);
    return response.data;
};

export const findUserQuizAttempts = async (userId: string, quizId: string) => {
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/users/${userId}/quizzes/${quizId}/attempts`);
    return response.data;
};

export const findLatestQuizAttempt = async (userId: string, quizId: string) => {
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/users/${userId}/quizzes/${quizId}/latest-attempt`);
    return response.data;
};

export const saveQuizAnswer = async (attemptId: string, questionId: string, answer: any) => {
    const response = await axiosWithCredentials.post(
        `${REMOTE_SERVER}/api/quiz-attempts/${attemptId}/questions/${questionId}/answer`,
        { answer }
    );
    return response.data;
};

export const submitQuizAttempt = async (attemptId: string) => {
    const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/quiz-attempts/${attemptId}/submit`);
    return response.data;
};