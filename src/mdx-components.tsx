import type { MDXComponents } from "mdx/types";
import type { StaticImageData } from "next/image";
import type { ComponentProps } from "react";
import Image from "next/image";

function isStaticImage(src: unknown): src is StaticImageData {
  return typeof src === "object" && src !== null && "src" in src;
}

/** Relative markdown images arrive as imports (rehype-mdx-import-media), which next/image optimises. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ alt, src }: ComponentProps<"img">) => {
      if (!isStaticImage(src)) {
        throw new TypeError("Markdown images must be relative paths");
      }
      return (
        <Image
          alt={alt ?? ""}
          className="h-auto w-full"
          sizes="(min-width: 42rem) 42rem, 100vw"
          src={src}
        />
      );
    },
    ...components,
  };
}
