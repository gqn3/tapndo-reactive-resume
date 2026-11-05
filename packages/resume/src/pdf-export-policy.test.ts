import { expect, it } from "vite-plus/test";
import { pdfExportBlockReason } from "./pdf-export-policy";
it.each([
 { basics: { name: "ليلى أحمد" } },
 { metadata: { page: { locale: "ar-SA" } } },
 { sections: { experience: { items: [{ description: "<p>مهندسة Software Engineer</p>" }] } } },
 { summary: { content: "&#x644;&#1610;&#1604;&#1609;" } },
 { basics: { name: "ﻟﻴﻠﻰ" } },
])("blocks Arabic locale, nested/mixed/encoded content and presentation forms: %j", (data) => {
 expect(pdfExportBlockReason(data)).toContain("Arabic PDF");
});
it.each([null, {}, { basics: { name: "Ada Lovelace 李明" }, metadata: { page: { locale: "en-US" } } }])("allows other content: %j", (data) => {
 expect(pdfExportBlockReason(data)).toBeNull();
});
