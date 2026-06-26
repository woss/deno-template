export function formatOutput<T>(
  data: T,
  format: string,
  formatter: (d: T) => string,
): void {
  if (format === "json") {
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log(formatter(data));
  }
}
