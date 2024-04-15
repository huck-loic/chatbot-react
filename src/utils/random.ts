export function randomBetweenInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomFromArray<T>(arr: T[], number: number): T[] {
  const length = Math.min(arr.length, number);
  const result = new Array<T>();
  const keys = Array.from({ length: length }, (_, index) => index);
  for (let i = 0; i < length; i++) {
    const index = randomBetweenInt(0, keys.length);
    const [key] = keys.splice(index, 1);
    result.push(arr[key]);
  }

  return result;
}
