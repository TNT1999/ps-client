export function isEmpty(value: string | undefined | null): boolean {
  return value == null || value === '';
}
export function isNotEmpty(value: string | undefined | null): value is string {
  return !isEmpty(value);
}
