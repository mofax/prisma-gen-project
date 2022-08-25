// import { onGenerate, GeneratorOptions } from "@prisma/generator-helper";
import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { generate } from "./generate";

generatorHandler({
	onGenerate: async (options) => {
		const dmmf = options.dmmf;
		const { enums, models, types } = dmmf.datamodel;
		generate(enums, models);
	},
});
