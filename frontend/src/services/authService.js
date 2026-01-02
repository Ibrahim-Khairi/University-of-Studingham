import api from './api';

export const registerStudent = async (formData) => {
    const res = await api.post("/auth/register/student", formData);
    return res.data;
};

export const registerTutor = async (formData) => {
    const res = await api.post("/auth/register/tutor", formData);
    return res.data;
};

export const registerAdmin = async (formData) => {
    const res = await api.post("/auth/register/admin", formData);
    return res.data;
};

export const loginUser = async (formData) => {
    const res = await api.post("/auth/login", formData);

    if (res.data.accessToken) localStorage.setItem("accessToken", res.data.accessToken);

    return res.data;
};