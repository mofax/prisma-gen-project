import { DMMF } from "@prisma/generator-helper";
import { Project, SourceFile, VariableDeclarationKind } from "ts-morph";
import * as fs from "fs";

async function deleteFolderSync(name: string) {
	if (fs.existsSync(name)) {
		fs.readdirSync(name).forEach((file: string) => {
			const curPath = name + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) {
				// recurse
				deleteFolderSync(curPath);
			} else {
				// delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(name);
	}
}

function generateEnums(sourceFile: SourceFile, enums: DMMF.DatamodelEnum[]) {
	enums.forEach((enum_) => {
		const enumName = enum_.name;
		const enumValues = enum_.values.map((value) => {
			return `"${value.name}"`;
		});

		const enumList = enumValues.join(", ");
		console.log(enumList);

		sourceFile.addStatements(
			`export const ${enumName} = z.enum([${enumList}]);`
		);
	});
}

type GeneratorParams = [DMMF.DatamodelEnum[]];
export async function generate(...params: GeneratorParams) {
	const [enums] = params;
	const project = new Project();
	const sourceFile = project.createSourceFile("./output/index.ts", "", {
		overwrite: true,
	});

	sourceFile.addImportDeclaration({
		moduleSpecifier: "zod",
		namedImports: ["z"],
	});

	// add enums
	generateEnums(sourceFile, enums);

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
