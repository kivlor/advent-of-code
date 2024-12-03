function answer() {
  return 42;
}

export function main() {
  console.log("Correct answer:", answer());
}

if (import.meta.main) {
  main();
}
