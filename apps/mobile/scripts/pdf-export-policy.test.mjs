import assert from "node:assert/strict";
import { test } from "node:test";
import * as harness from "./harness.mjs";
const policy = harness.load("../../../packages/resume/src/pdf-export-policy.ts", {});
let renders = 0;
let disposals = 0;
const files = harness.load("../src/features/share/files.ts", {
 "@reactive-resume/resume/pdf-export-policy": policy,
 "@reactive-resume/resume/export-sections": { getResumeExportData: (data) => data },
 "@lingui/core/macro": { t: harness.tag },
 "expo-file-system": {}, "expo-print": {}, "expo-sharing": {},
 "./letter": {}, "./messages": {}, "./model": {},
 "@/api/client": {}, "@/auth/session": {}, "@/ui": {},
 "@/preview/pipeline": { createPreviewPipeline: () => ({
  render: async () => { renders++; return { pdf: new Uint8Array([37, 80, 68, 70]), lostCharacters: [], hasTextLoss: false }; },
  dispose: async () => { disposals++; },
 }) },
});
test("native local export blocks Arabic before renderer, preserving other PDF exports", async () => {
 await assert.rejects(files.localPdf({ basics: { name: "ليلى أحمد" } }), /Arabic PDF/);
 assert.equal(renders, 0);
 const result = await files.localPdf({ basics: { name: "Ada" } });
 assert.deepEqual([...result.pdf], [37,80,68,70]);
 assert.equal(renders, 1);
 assert.equal(disposals, 1);
});
