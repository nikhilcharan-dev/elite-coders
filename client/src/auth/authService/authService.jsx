import axios from "axios";

export const refreshToken = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/refresh_token`, {
            refreshToken: localStorage.getItem('token'),
        });
        return res.data.token;
    } catch(err) {
        throw err;
    }
}


export const logoutUser = () => {
    localStorage.clear();
    window.location.href = '/login';
};


