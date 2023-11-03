// 并发控制
export default async function* asyncPool(poolLimit: any, array: any, iteratorFn: any) {
  const executings = new Set();

  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    const clean = () => executings.delete(p);
    executings.add(p);
    p.then(clean).catch(clean);
    if (executings.size >= poolLimit) {
      yield await Promise.race(executings);
    }
  }

  while (executings.size) {
    yield await Promise.race(executings);
  }
}