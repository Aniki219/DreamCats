import path from "path";
import { parse } from "yaml";
import fs from "fs/promises"

async function parseYamlFile<T>(filePath: string): Promise<T> {
  try {
    const fullPath = path.resolve(filePath);
    // Read the file content as a string
    const fileContent = await fs.readFile(fullPath, 'utf-8');

    // Parse the YAML string into a TypeScript object, casting to the interface
    const data = parse(fileContent);

    return data;
  } catch (error) {
    console.error('Error reading or parsing YAML file:', error);
    throw error;
  }
}