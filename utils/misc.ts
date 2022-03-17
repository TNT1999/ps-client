export function isJSONResponse(res: Response): boolean {
  for (const [header, value] of res.headers.entries()) {
    if (
      header.toLowerCase() === 'content-type' &&
      value.toLowerCase().includes('application/json')
    ) {
      return true;
    }
  }
  return false;
}
