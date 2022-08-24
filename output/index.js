"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const zod_1 = require("zod");
var Role;
(function (Role) {
    Role[Role["USER"] = 0] = "USER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
const schema = zod_1.z.object({});
