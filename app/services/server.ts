import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

export const loginUser = async(mobile: string) => {
    try {
        const response = await axios.post(SERVER_BASE_URL, {
            mobile,
        });
        console.log(response);
        return response.data;
    } catch(error) {
        console.log(error);
        return "User not found. Create new user";
    }
}

export const createUser = async(mobile: string, username: string) => {
    try {
        const response = await axios.post(SERVER_BASE_URL, {
            mobile,
            username
        });
        return response.data;
    } catch(error) {
        console.log(error);
        return error;
    }
}