function scanForDoOps(input: string): string[] {
  const ops: string[] = [];

  let prev = 0;
  input.matchAll(/(don\'t\(\)|do\(\))/g).forEach((match) => {
    ops.push(input.slice(prev, match.index));
    prev = match.index;

    console.log(match.index);
  });

  ops.push(input.slice(prev, input.length));

  return ops.filter((op) => !op.startsWith("don't()"));
}

function scanForOrders(input: string): [number, number][] {
  const orders: [number, number][] = [];

  input.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g).forEach((match) => {
    const [_, a, b] = match;

    orders.push([Number(a), Number(b)]);
  });

  return orders;
}

function totalAllOrders(input: string): number {
  return scanForOrders(input).reduce<number>((acc, order) => {
    const [a, b] = order;

    return acc + (a * b);
  }, 0);
}

function totalAllOrderInDoOps(input: string): number {
  const ops = scanForDoOps(input);

  console.log(ops);

  return ops.reduce<number>((acc, op) => {
    const orders = scanForOrders(op).reduce<number>((total, order) => {
      const [a, b] = order;

      return total + (a * b);
    }, 0);

    return acc + orders;
  }, 0);
}

export function main() {
  const data = Deno.readTextFileSync("./data.txt");

  console.log("Total of found orders:", totalAllOrders(data));
  console.log("Total of found orders in do ops:", totalAllOrderInDoOps(data));
}

if (import.meta.main) {
  main();
}
