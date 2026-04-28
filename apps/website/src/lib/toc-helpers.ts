export function getLineOffset(depth: number): number {
  return depth >= 3 ? 10 : 0
}
