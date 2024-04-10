let API_URL = process.env.NEXT_PUBLIC_API_URL;
type EImageSize = "sm" | "md" | "lg";
export function renderImage({
  size = "lg",
  imgPath,
  gSize,
}: {
  size?: EImageSize;
  imgPath: string;
  gSize?: number | string | null;
}): string {
  if (imgPath?.includes("facebook")) {
    return imgPath;
  }
  
  let imageUrl = `${API_URL}/uploads/image/${imgPath}`;
  console.log(imageUrl, "url")
  
  if (gSize) {
    imageUrl = imageUrl.split("=")[0] + `=s${gSize}`;
  }

  return imageUrl;
}
