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
