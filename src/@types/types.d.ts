type GeneratorConfig = {
	output: string | null;
	name: string;
	provider: string;
	config: Dictionary<string>;
	binaryTargets: string[];
	pinnedBinaryTarget?: string | null;
};

type ConnectorType = "mysql" | "mongo" | "sqlite" | "postgresql";

type Datasource = {
	name: string;
	connectorType: ConnectorType;
	url: EnvValue;
	config: { [key: string]: string };
};

type GeneratorOptions = {
	generator: GeneratorConfig;
	otherGenerators: GeneratorConfig[];
	schemaPath: string;
	dmmf: DMMF.Document;
	datasources: Datasource[];
	datamodel: string;
	binaryPaths?: BinaryPaths;
};

type BinaryPaths = {
	migrationEngine?: { [binaryTarget: string]: string }; // key: target, value: path
	queryEngine?: { [binaryTarget: string]: string };
	introspectionEngine?: { [binaryTarget: string]: string };
};
