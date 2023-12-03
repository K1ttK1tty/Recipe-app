module.exports = class FileError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static ReadError() {
        return new FileError(500, 'Data error');
    }

    static getDataError() {
        return new FileError(500, 'Data error');
    }
    static customError(code, message) {
        // for any error, not only for file error
        return new FileError(code, message);
    }
};
