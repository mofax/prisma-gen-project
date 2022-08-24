"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const ts_morph_1 = require("ts-morph");
const fs = __importStar(require("fs"));
async function deleteFolderSync(name) {
    if (fs.existsSync(name)) {
        fs.readdirSync(name).forEach((file) => {
            const curPath = name + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderSync(curPath);
            }
            else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(name);
    }
}
async function generate(...params) {
    const [enums] = params;
    const project = new ts_morph_1.Project();
    const sourceFile = project.createSourceFile("./output/index.ts", "", {
        overwrite: true,
    });
    sourceFile.addImportDeclaration({
        moduleSpecifier: "zod",
        namedImports: ["z"],
    });
    sourceFile.addStatements(`
		  const enums = z.enum(['A', 'B', 'C']);
		`);
    // add enums
    enums.forEach((enum_) => {
        const enumName = enum_.name;
        const enumValues = enum_.values.map((value) => {
            return {
                name: value.name,
            };
        });
        const enumDeclaration = sourceFile.addEnum({
            name: enumName,
            isExported: true,
            members: enumValues,
        });
    });
    // sourceFile.addVariableStatements([
    // 	{
    // 		declarationKind: VariableDeclarationKind.Const,
    // 		declarations: [
    // 			{
    // 				name: "schema",
    // 				initializer: "z.object({})",
    // 			},
    // 		],
    // 	},
    // ]);
    sourceFile.saveSync();
    // sourceFile.emitSync();
}
exports.generate = generate;
