const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function showSpinner(msg: string): { stop: () => void } {
  let i = 0;
  const id = setInterval(() => {
    Deno.stderr.writeSync(
      new TextEncoder().encode(`\r${FRAMES[i]} ${msg}`),
    );
    i = (i + 1) % FRAMES.length;
  }, 80);

  return {
    stop: () => {
      clearInterval(id);
      Deno.stderr.writeSync(new TextEncoder().encode("\r\x1b[K"));
    },
  };
}
