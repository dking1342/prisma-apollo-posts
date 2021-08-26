"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = exports.generateToken = exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (context) => {
    const authorization = context.headers.authorization;
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        if (token) {
            try {
                const user = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                return {
                    user,
                };
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: 'token',
                            message: 'Invalid/Expired token'
                        }
                    ]
                };
            }
        }
        else {
            return {
                errors: [
                    {
                        field: 'token',
                        message: 'Authentication token must be formatted properly'
                    }
                ]
            };
        }
    }
    else {
        return {
            errors: [
                {
                    field: 'token',
                    message: 'Correct header must be given'
                }
            ]
        };
    }
};
exports.isAuth = isAuth;
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, process.env.TOKEN_SECRET, {
        expiresIn: '1hr'
    });
};
exports.generateToken = generateToken;
const authCheck = (id, context) => {
    let valErrors = [];
    if (Boolean(context.errors)) {
        valErrors = [
            ...valErrors,
            {
                field: 'authorization',
                message: 'Not authorized'
            }
        ];
    }
    let user = context.user;
    if (id && context.user && user.email && id !== user.email) {
        valErrors = [
            ...valErrors,
            {
                field: 'authorization',
                message: 'Not authorized'
            }
        ];
    }
    return {
        valid: Object.keys(valErrors).length < 1,
        valErrors
    };
};
exports.authCheck = authCheck;
//# sourceMappingURL=auth.js.map