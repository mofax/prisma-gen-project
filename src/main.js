"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { onGenerate, GeneratorOptions } from "@prisma/generator-helper";
const generator_helper_1 = require("@prisma/generator-helper");
const generate_1 = require("./generate");
(0, generator_helper_1.generatorHandler)({
    onGenerate: async (options) => {
        const dmmf = options.dmmf;
        const { enums, models, types } = dmmf.datamodel;
        // console.log(enums);
        // console.log(models[0].fields);
        (0, generate_1.generate)(enums);
    },
});
