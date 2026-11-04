import { templateLayouts, templateSchema } from "@reactive-resume/schema/templates";
import { templates } from "@/dialogs/resume/template/data";

export type ColumnFilter = "all" | "one" | "two";

export function filterTemplates(
	query: string,
	columns: ColumnFilter,
	translatedDescriptions: Partial<Record<string, string>> = {},
) {
	const needle = query.trim().toLocaleLowerCase();
	return templateSchema.options.filter((id) => {
		const matchesColumns = columns === "all" || templateLayouts[id].columns === (columns === "one" ? 1 : 2);
		const words = [templates[id].name, ...templates[id].tags, translatedDescriptions[id] ?? ""]
			.join(" ")
			.toLocaleLowerCase();
		return matchesColumns && words.includes(needle);
	});
}
