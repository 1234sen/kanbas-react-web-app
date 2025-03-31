import axios from "axios";
const axiosWithCredentials = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  // 添加以下行以便于调试
  validateStatus: status => true // 允许所有状态码，方便调试
});

// 添加拦截器记录请求状态
axiosWithCredentials.interceptors.response.use(
  response => {
    console.log(`请求 ${response.config.url} 状态: ${response.status}`);
    return response;
  },
  error => {
    console.error(`请求错误: ${error.message}`);
    return Promise.reject(error);
  }
);

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};
