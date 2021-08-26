"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = void 0;
const verification = (inputs) => {
    let valErrors = [];
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!inputs.email.match(regEx)) {
        valErrors = [
            ...valErrors,
            {
                field: "email",
                message: "Email must be a vaild email address"
            }
        ];
    }
    if (inputs.password && inputs.password.length <= 2) {
        valErrors = [
            ...valErrors,
            {
                field: "password",
                message: "Password must be at least two characters long"
            }
        ];
    }
    if (inputs.username && inputs.username.length <= 2) {
        valErrors = [
            ...valErrors,
            {
                field: "username",
                message: "Username must be at least two characters long"
            }
        ];
    }
    if (inputs.isExist && Boolean(inputs.isExist)) {
        valErrors = [
            ...valErrors,
            {
                field: 'email',
                message: 'user already exists'
            }
        ];
    }
    return {
        valid: Object.keys(valErrors).length < 1,
        valErrors
    };
};
exports.verification = verification;
//# sourceMappingURL=verification.js.map