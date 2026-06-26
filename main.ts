import { Command } from "@cliffy/command";
import { resolve } from "@std/path";
import { showSpinner } from "./lib/spinner.ts";
import { VERSION } from "./version.ts";

function formatOutput<T>(
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

async function main() {
  await new Command()
    .name("dt")
    .version(VERSION)
    .description("Your Deno CLI tool — replace this description")
    .globalOption(
      "-o, --output <format:string>",
      "Output format: text (default) or json",
      { default: "text" },
    )
    .command("hello", "Say hello")
    .arguments("[name:string]")
    .action((options, name?: string) => {
      const greeting = name ? `Hello, ${name}!` : "Hello, world!";
      formatOutput({ greeting }, options.output, (d) => d.greeting);
    })
    .command("echo", "Echo back the arguments")
    .arguments("<words...:string[]>")
    .action((options, words: string[]) => {
      const result = words.join(" ");
      formatOutput({ result }, options.output, (d) => d.result);
    })
    .parse(Deno.args);
}

if (import.meta.main) {
  main();
}
