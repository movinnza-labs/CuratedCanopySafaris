import Image, { type ImageProps } from "next/image";
import { homeImages, type HomeImageKey } from "@/lib/data/home-images";

type HomeImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  imageKey: HomeImageKey;
  alt?: string;
};

/** next/image bound to the homepage media registry (intrinsic sizes + original alt text). */
export function HomeImage({ imageKey, alt, fill, quality = 85, ...props }: HomeImageProps) {
  const image = homeImages[imageKey];
  if (fill) return <Image src={image.src} alt={alt ?? image.alt} fill quality={quality} {...props} />;
  return (
    <Image src={image.src} alt={alt ?? image.alt} width={image.width} height={image.height} quality={quality} {...props} />
  );
}
