/** Temporary release gate: remove only with reviewed all-template Arabic extraction evidence.
 * Preview rendering stays available; downloads and printing call this policy separately.
 * Inspect content as well as locale so changing the page language cannot bypass the gate.
 */
export function pdfExportBlockReason(data: unknown): string | null {
 const containsArabic = (value: unknown): boolean => {
  if (typeof value === "string") {
   const decoded = value.replace(/&#(x[0-9a-f]+|[0-9]+);?/gi, (entity, digits: string) => {
    const point = digits[0]?.toLowerCase() === "x" ? Number.parseInt(digits.slice(1), 16) : Number(digits);
    return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
   });
   return /\p{Script_Extensions=Arabic}/u.test(decoded);
  }
  if (Array.isArray(value)) return value.some(containsArabic);
  return value !== null && typeof value === "object" && Object.values(value).some(containsArabic);
 };
 const locale = (data as { metadata?: { page?: { locale?: string } } } | null)?.metadata?.page?.locale;
 if (!/^ar(?:[-_]|$)/i.test(locale ?? "") && !containsArabic(data)) return null;
 return "تنزيل وطباعة PDF العربي متوقفان مؤقتًا حتى التحقق من ترتيب النص. يمكنك متابعة التحرير وحفظ JSON. / Arabic PDF download and printing are temporarily unavailable while text order is verified. Continue editing or save JSON.";
}
