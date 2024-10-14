export function createImgUrl(pct: File): string {
  return URL.createObjectURL(pct)
}

export function bufferImgUrl(
  buffer: any,
  fileName: string,
  mimeType: string,
): any {
  const blob = new Blob([buffer], { type: mimeType })
  const file = new File([blob], fileName, { type: mimeType })
  return createImgUrl(file)
}
