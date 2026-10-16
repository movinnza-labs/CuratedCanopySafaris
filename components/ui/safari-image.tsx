import Image, { type ImageProps } from "next/image";
import { images, type ImageKey } from "@/lib/data/images";

type SafariImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  imageKey: ImageKey;
  /** Override alt text, e.g. "" when the image is purely decorative next to a caption. */
  alt?: string;
};

/** next/image bound to the audited image registry, so every image has intrinsic size and alt text. */
export function SafariImage({ imageKey, alt, fill, ...props }: SafariImageProps) {
  const image = images[imageKey];
  if (fill) {
    return <Image src={image.src} alt={alt ?? image.alt} fill {...props} />;
  }
  return <Image src={image.src} alt={alt ?? image.alt} width={image.width} height={image.height} {...props} />;
}

export function isImageKey(key: string | undefined): key is ImageKey {
  return typeof key === "string" && key in images;
}
