"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (field, message) => {
    return {
        errors: [
            {
                field,
                message
            }
        ]
    };
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map