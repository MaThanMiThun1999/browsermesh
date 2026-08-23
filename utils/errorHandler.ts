/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleApiError = (error: any) => {
    console.log("error: ", error);
    const defaultMessage = "An unexpected error occurred. Please try again.";
    const backendMessage = error?.response?.data?.message;
    const status = error?.response?.status as number;

    const messages: Record<number, string> = {
        400: "Invalid request data",
        401: "Session expired. Please login again",
        403: "You are not authorized for this action",
        404: "Requested resource not found",
        500: "Server error. Please try later",
    };

    if (error?.message === "Network Error" && error?.code === "ERR_NETWORK") {
        return {
            message: "Connection refused. Please check your network connection.",
            code: "ERR_CONNECTION_REFUSED",
        };
    }

    return {
        message: backendMessage || messages[status] || defaultMessage,
        code: status || "NETWORK_ERROR",
    };
};
