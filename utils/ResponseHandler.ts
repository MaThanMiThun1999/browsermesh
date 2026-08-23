/* eslint-disable @typescript-eslint/no-explicit-any */
export function SendSuccessResponse(
    data: any,
    fallbackMessage = "Operation completed successfully"
) {
    const resolvedMessage = data?.message || fallbackMessage;

    return {
        data: data?.data ?? data,
        message: resolvedMessage,
    };
}

export function SendErrorResponse(error: any, fallbackMessage = "Something went wrong") {
    const backendMessage = error?.response?.data?.message || error?.message;
    const statusCode = error?.response?.status ?? "NETWORK_ERROR";

    return {
        message: backendMessage || fallbackMessage,
        code: statusCode,
    };
}
