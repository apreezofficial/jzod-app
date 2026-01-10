export function jsonToZod(json: any, name: string = "schema"): string {
    let output = `import { z } from "zod";\n\n`;

    function parseValue(val: any, indent: string = ""): string {
        if (val === null) return "z.null()";
        if (typeof val === "string") return "z.string()";
        if (typeof val === "number") return "z.number()";
        if (typeof val === "boolean") return "z.boolean()";

        if (Array.isArray(val)) {
            if (val.length === 0) return "z.array(z.any())";
            const types = new Set(val.map(v => typeof v));
            if (types.size === 1) {
                return `z.array(${parseValue(val[0], indent)})`;
            }
            return `z.array(z.union([${Array.from(types).map(t => parseValue(val.find(v => typeof v === t), indent)).join(", ")}]))`;
        }

        if (typeof val === "object") {
            const keys = Object.keys(val);
            if (keys.length === 0) return "z.object({})";
            let res = `z.object({\n`;
            keys.forEach(key => {
                res += `${indent}  ${key}: ${parseValue(val[key], indent + "  ")},\n`;
            });
            res += `${indent}})`;
            return res;
        }

        return "z.any()";
    }

    try {
        const parsed = typeof json === "string" ? JSON.parse(json) : json;
        output += `export const ${name} = ${parseValue(parsed)};\n`;
        output += `\nexport type ${name.charAt(0).toUpperCase() + name.slice(1)} = z.infer<typeof ${name}>;`;
    } catch (e) {
        return `// Error parsing JSON: ${e instanceof Error ? e.message : String(e)}`;
    }

    return output;
}

export function zodToJson(zodString: string): string {
    // Simple heuristic parser for Zod strings back to JSON
    try {
        // This is a simplified implementation. A robust one would need a full AST parser.
        // For this demo, we'll try to extract the object structure if present.

        let cleaned = zodString.split('export const schema = ')[1] || zodString;
        cleaned = cleaned.split(';')[0]; // Remove after-semicolon stuff

        // Very basic mapping back
        const mockValue = (zod: string): any => {
            const z = zod.trim();
            if (z.includes('z.string()')) return "sample string";
            if (z.includes('z.number()')) return 123;
            if (z.includes('z.boolean()')) return true;
            if (z.includes('z.null()')) return null;
            if (z.includes('z.array')) {
                const match = z.match(/z\.array\((.*)\)/);
                if (match) return [mockValue(match[1])];
                return [];
            }
            if (z.includes('z.object')) {
                const match = z.match(/z\.object\(\{([\s\S]*)\}\)/);
                if (match) {
                    const objStr = match[1];
                    const obj: any = {};
                    // Improved split logic for nested objects
                    let depth = 0;
                    let current = '';
                    const parts: string[] = [];
                    for (let i = 0; i < objStr.length; i++) {
                        const char = objStr[i];
                        if (char === '{') depth++;
                        if (char === '}') depth--;
                        if (char === ',' && depth === 0) {
                            parts.push(current);
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    if (current) parts.push(current);

                    parts.forEach(part => {
                        const colonIndex = part.indexOf(':');
                        if (colonIndex !== -1) {
                            const key = part.slice(0, colonIndex).trim();
                            const val = part.slice(colonIndex + 1).trim();
                            if (key && val) {
                                obj[key] = mockValue(val);
                            }
                        }
                    });
                    return obj;
                }
                return {};
            }
            return "any";
        };

        if (cleaned.includes('z.object')) {
            const result = mockValue(cleaned);
            return JSON.stringify(result, null, 2);
        }

        return "// Could not reverse Zod to JSON accurately";
    } catch (e) {
        return `// Error reversing Zod: ${e instanceof Error ? e.message : String(e)}`;
    }
}
