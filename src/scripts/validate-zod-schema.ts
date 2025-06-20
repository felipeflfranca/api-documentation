import fg from "fast-glob";
import fs from "fs";
import path from "node:path";

const allowedFiles = [
  "src/contracts/shared/define-schema.ts",
  "src/scripts/validate-zod-schema.ts",
];

const files = fg.sync("src/**/*.ts", {
  ignore: ["**/*.spec.ts", "**/*.test.ts", "**/*.d.ts", "src/types/**"],
});


let hasError = false;

for (const file of files) {
  if (allowedFiles.includes(file)) continue;

  const content = fs.readFileSync(file, "utf-8");

  const usesZodObject = /z\s*\.\s*object\s*\(/.test(content);

  const importedZod =
    content.includes('from "zod"') || content.includes("from 'zod'");

  if (usesZodObject && importedZod) {
    const relative = path.relative(process.cwd(), file);
    console.error(`❌ Erro: uso proibido de 'z.object()' em ${relative}`);
    hasError = true;
  }
}

if (hasError) process.exit(1);
