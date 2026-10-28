// Public files need the same prefix as Next routes when previewed under /frcc.
export function publicAsset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
}
