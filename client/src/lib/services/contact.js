import axios from "axios";

export const createMessage = async (message) => {
    const res = axios.post("/api/messages", message)
    return await res;
}