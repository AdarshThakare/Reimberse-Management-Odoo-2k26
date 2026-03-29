type CsvCell = string | number | boolean | Date | null | undefined;

function escapeCsvValue(value: CsvCell): string {
  if (value === null || value === undefined) return "";

  const text = value instanceof Date ? value.toISOString() : String(value);
  const escaped = text.replaceAll('"', '""');

  if (/[",\n\r]/.test(escaped)) {
    return `"${escaped}"`;
  }

  return escaped;
}

export function downloadCsv(
  filename: string,
  headers: readonly string[],
  rows: ReadonlyArray<readonly CsvCell[]>,
): void {
  const csvLines = [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => row.map(escapeCsvValue).join(",")),
  ];

  const blob = new Blob([`\uFEFF${csvLines.join("\n")}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
