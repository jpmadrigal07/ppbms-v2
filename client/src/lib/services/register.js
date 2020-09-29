import axios from "axios";

export const createAccount = async (userData) => {
    const res = axios.post("/api/user", userData)
    return await res;
}

export const createReferral = async (inviterId, invitedId) => {
    const res = axios.post("/api/referral", {
        inviterId: inviterId,
        invitedId: invitedId,
        isInvitedPaid: false
    })
    return await res;
}