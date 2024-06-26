export const generateResponse = (
    error: boolean,
    code: number,
    type: string,
    message: string
) => {
    return {
        "status": {
            error,
            code,
            type,
            message,
        }
    };
}