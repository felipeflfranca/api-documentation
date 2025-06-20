import { Project, SyntaxKind } from "ts-morph";
import fg from "fast-glob";
import path from "node:path";
import { forbiddenTerms, validAttributes } from "../contracts/glossary";

const snakeCaseRegex = /^[a-z]+(_[a-z0-9]+)*$/;

async function main() {
  const schemaFiles = await fg("src/**/*.schema.ts");
  const project = new Project();
  const erros: string[] = [];

  schemaFiles.forEach((filePath) => {
    const sourceFile = project.addSourceFileAtPath(filePath);

    sourceFile.getVariableDeclarations().forEach((decl) => {
      const initializer = decl.getInitializer();
      if (!initializer) return;

      const objectLiterals = initializer.getDescendantsOfKind(
        SyntaxKind.ObjectLiteralExpression
      );

      objectLiterals.forEach((obj) => {
        obj.getProperties().forEach((prop) => {
          if (prop.getKind() !== SyntaxKind.PropertyAssignment) return;

          const propertyAssignment = prop.asKindOrThrow(
            SyntaxKind.PropertyAssignment
          );

          const nameNode = propertyAssignment.getNameNode();
          const name = nameNode.getText().replace(/['"`]/g, "");
          const line = nameNode.getStartLineNumber();
          const file = path.relative(process.cwd(), filePath);

          if (!snakeCaseRegex.test(name)) {
            erros.push(
              `[${file}:${line}] ❌ O atributo '${name}' deve estar em snake_case.`
            );
          }

          if (!(name in validAttributes)) {
            erros.push(
              `[${file}:${line}] ⚠️ O atributo '${name}' não está definido no glossário.`
            );
          }

          if (forbiddenTerms[name]) {
            erros.push(
              `[${file}:${line}] ❌ '${name}' é proibido. Use '${forbiddenTerms[name]}' no lugar.`
            );
          }
        });
      });
    });
  });

  if (erros.length > 0) {
    console.error("⛔️ Foram encontradas violações nos contratos de schema:\n");
    erros.forEach((e) => console.error(e));
    process.exit(1);
  } else {
    console.log(
      "✅ Todos os atributos seguem os padrões definidos no glossário."
    );
  }
}

main();
