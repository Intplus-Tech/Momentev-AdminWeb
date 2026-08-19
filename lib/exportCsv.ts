export function downloadCsv<T>(data: T[], filename: string) {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0] as object);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      let value = (row as Record<string, any>)[header];
      if (value === null || value === undefined) {
        value = "";
      } else if (typeof value === "object") {
        value = JSON.stringify(value).replace(/"/g, '""');
        value = `"${value}"`;
      } else if (typeof value === "string") {
        value = value.replace(/"/g, '""');
        if (value.includes(",") || value.includes("\n") || value.includes('"')) {
          value = `"${value}"`;
        }
      }
      return value;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
