class ErrorService {
    public static replayError(error: Error) {
        return {
            EndDt: new Date().toISOString(),
            Status: {
                Message: error.message,
                Severity: 'Error',
                StatusCode: 500
            }
        };
    }
}

export { ErrorService };
