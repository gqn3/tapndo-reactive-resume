import { describe, expect, it } from "vitest";
import { filterTemplates } from "./gallery-filter";

describe("template gallery filtering", () => {
	it("combines a case-insensitive name search with the column filter", () => {
		expect(filterTemplates(" BRONZOR ", "one")).toEqual(["bronzor"]);
		expect(filterTemplates("bronzor", "two")).toEqual([]);
	});
	it("finds metadata tags and returns every template when filters are clear", () => {
		expect(filterTemplates("editorial", "all")).toContain("smeargle");
		expect(filterTemplates("", "all")).toHaveLength(18);
		expect(filterTemplates("إبداعي", "all", { smeargle: "تصميم إبداعي" })).toEqual(["smeargle"]);
	});
});
