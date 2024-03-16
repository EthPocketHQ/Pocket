const { join, extname, basename } = require("path");
const solc = require("solc");
const { Class } = require("solidity-mermaid");
const { findAll } = require("solidity-ast/utils");
const { readFileSync, writeFileSync, readdirSync } = require("fs");

const contractsPath = join(__dirname, "../packages/contracts");
const artifactsPath = join(contractsPath, "out");

function* readAllFiles(dir) {
  const files = readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(join(dir, file.name));
    } else {
      yield file;
    }
  }
}

const solcOutput = { sources: {} };
Array.from(readAllFiles(artifactsPath)).forEach(({ name, path }) => {
  const slicedName = name.slice(0, name.length - 5);
  const solidityFileName = slicedName + ".sol";

  if (extname(name) === ".json") {
    const stdJsonOutput = JSON.parse(readFileSync(join(path, name), "utf8"));
    solcOutput.sources[solidityFileName] = {
      ...stdJsonOutput,
      name: slicedName,
    };
  }
});

const allowedFiles = Array.from(readAllFiles(join(contractsPath, "src")))
  .map(({ name }) => name)
  .reduce((acc, curr) => {
    console.log(basename(curr, extname(curr)));
    acc[basename(curr, extname(curr))] = true;
    return acc;
  }, {});

for (const [, { ast, name }] of Object.entries(solcOutput.sources)) {
  if (!allowedFiles[name]) continue;

  try {
    for (const typeDef of findAll(["ContractDefinition"], ast)) {
      if (!typeDef) continue;

      const classDiagram = new Class(
        solcOutput,
        "ContractDefinition",
        typeDef.id
      );

      // // Mermaid diagram
      writeFileSync(
        join(contractsPath, "diagrams", `${name}.mmd`),
        classDiagram.processed
      );
    }
  } catch (err) {
    console.log(err);
    continue;
  }
}
