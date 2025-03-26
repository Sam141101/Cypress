import { basePost, baseGet, basePatch } from "utils/api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const authServices = {
    signIn: async ({ body }) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.SIGN_IN,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    signUp: async ({ body }) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.SIGN_UP,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    refreshAccessToken: async (refreshToken) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.REFRESH_ACCESS_TOKEN,
                body: {
                    "refreshToken": refreshToken,
                }
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    sendMailVerifyAccount: async ({ body }) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.SEND_MAIL_VERIFY_ACCOUNT,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    verifyAccount: async ({ token }) => {
        let response = null;
        try {
            response = await baseGet({
                endpoint: apiEndPointList.auth.VERIFY_ACCOUNT(token),
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    sendMailResetPassword: async ({ body }) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.SEND_MAIL_RESET_PASSWORD,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    resetPassword: async ({ body }) => {
        let response = null;
        try {
            response = await basePatch({
                endpoint: apiEndPointList.auth.RESET_PASSWORD,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    verifyPassword: async ({ body }) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.VERIFY_PASSWORD,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    },

}

export default authServices;