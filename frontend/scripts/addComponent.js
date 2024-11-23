import fs from "fs";
import path from "path";
import readlineSync from "readline-sync";

function promptUserInput(prompt) {
  return readlineSync.question(prompt);
}

const fileName = promptUserInput("Enter component name: ");

if (!fileName) {
  console.error("Please provide a valid component name.");
  process.exit(1);
}

const currentModulePath = new URL(import.meta.url).pathname;
const currentModuleDir = path.dirname(currentModulePath);

const projectRootDir = path.resolve(currentModuleDir, "../");

const componentsDirectory = path.join(projectRootDir, "src", "components");

// Check if the components directory exists
if (!fs.existsSync(componentsDirectory)) {
  console.error("Components directory does not exist.");
  process.exit(1);
}

// Check if the folder for the new component already exists
const componentDir = path.join(componentsDirectory, fileName);

if (fs.existsSync(componentDir)) {
  console.error(`Component folder "${fileName}" already exists.`);
  process.exit(1);
}

// Step 1: Create the component folder
fs.mkdirSync(componentDir);

// Step 2: Create the index.tsx file inside the new component folder
const indexFilePath = path.join(componentDir, "index.tsx");
const indexFileContent = `import React from 'react';

const ${fileName} = () => {
  return <div>${fileName}</div>;
};

export default ${fileName};`;

fs.writeFileSync(indexFilePath, indexFileContent);
console.log(`Created ${indexFilePath}`);

// Step 3: Create the styles.scss file inside the new component folder
const stylesFilePath = path.join(componentDir, "styles.scss");
const stylesFileContent = `/* Styles for ${fileName} component */`;

fs.writeFileSync(stylesFilePath, stylesFileContent);
console.log(`Created ${stylesFilePath}`);

// Step 4: Create the test file (ComponentName.test.tsx) inside the new component folder
const testFilePath = path.join(componentDir, `${fileName}.test.tsx`);
const testFileContent = `import { render, screen } from '@testing-library/react';
import ${fileName} from './index';

describe("${fileName}", () => {
    it("should render the component and show the HTML", () => {
      render(<${fileName} />);
      screen.debug(); // To output the component's HTML for debugging
    });
})`;

fs.writeFileSync(testFilePath, testFileContent);
console.log(`Created ${testFilePath}`);

console.log(`Component "${fileName}" has been created successfully!`);
