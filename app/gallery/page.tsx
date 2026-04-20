import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"
import { Cinzel, Cormorant_Garamond } from "next/font/google"
import Image from "next/image"
import fs from "fs"
import path from "path"

const cinzel = Cinzel({ subsets: ["latin"], weight: "400" })

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Re-fetch on every request so newly added images appear without a rebuild
export const dynamic = "force-dynamic"

type GalleryImage = {
  src: string
  category: "desktop" | "mobile"
}

function readLocalImages(
  folder: string,
  category: "desktop" | "mobile"
): GalleryImage[] {
  try {
    const dir = path.join(process.cwd(), "public", folder)
    const files = fs.readdirSync(dir)

    return files
      .filter((f) => /\.(webp|jpg|jpeg|png|gif)$/i.test(f))
      .sort((a, b) => {
        // Sort numerically by the (N) suffix in filename
        const numA = parseInt(a.match(/\((\d+)\)/)?.[1] ?? "0", 10)
        const numB = parseInt(b.match(/\((\d+)\)/)?.[1] ?? "0", 10)
        return numA - numB
      })
      .map((f) => ({
        src: `/${folder}/${encodeURIComponent(f)}`,
        category,
      }))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const desktopImages = readLocalImages("desktop-bakgroundnew", "desktop")
  const mobileImages = readLocalImages("mobile-backgroundnew", "mobile")

  // Desktop images first (landscape), then mobile portrait images
  const images = [...desktopImages, ...mobileImages]

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "var(--color-motif-cream)" }}
    >
      {/* Subtle layered background tint — matches main page gallery section */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.18] pointer-events-none"
        style={{
          background:
            "linear-gradient(165deg, var(--color-motif-cream) 0%, color-mix(in srgb, var(--color-motif-soft) 13%, transparent) 35%, color-mix(in srgb, var(--color-motif-medium) 6%, transparent) 70%, color-mix(in srgb, var(--color-motif-deep) 5%, transparent) 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-motif-soft) 0%, transparent 55%)",
        }}
      />

      {/* Corner floral decorations */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[120px] sm:max-w-[170px] md:max-w-[220px] lg:max-w-[260px] opacity-20"
          priority={false}
          style={{ transform: "scaleY(-1)" }}
        />
      </div>
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[120px] sm:max-w-[170px] md:max-w-[220px] lg:max-w-[260px] opacity-20"
          priority={false}
          style={{ transform: "scaleX(-1) scaleY(-1)" }}
        />
      </div>
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[120px] sm:max-w-[170px] md:max-w-[220px] lg:max-w-[260px] opacity-20"
          priority={false}
        />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[120px] sm:max-w-[170px] md:max-w-[220px] lg:max-w-[260px] opacity-20"
          priority={false}
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-3 sm:px-4">
          {/* Top divider dots */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span
              className="h-px w-10 sm:w-14 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-accent) 60%, transparent))",
              }}
            />
            <div className="flex gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full opacity-80"
                style={{ backgroundColor: "var(--color-motif-accent)" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full opacity-50"
                style={{ backgroundColor: "var(--color-motif-accent)" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full opacity-80"
                style={{ backgroundColor: "var(--color-motif-accent)" }}
              />
            </div>
            <span
              className="h-px w-10 sm:w-14 rounded-full"
              style={{
                background:
                  "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-accent) 60%, transparent))",
              }}
            />
          </div>

          <p
            className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] mb-2`}
            style={{ color: "var(--color-motif-medium)" }}
          >
            Our Story in Frames
          </p>

          <h1
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-2 sm:mb-3 md:mb-4`}
            style={{ color: "var(--color-motif-deep)" }}
          >
            Our Love Story Gallery
          </h1>

          <p
            className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg font-light max-w-xl mx-auto leading-relaxed px-2`}
            style={{ color: "var(--color-motif-medium)" }}
          >
            Every photograph tells a story of {siteConfig.couple.groomNickname} &amp;{" "}
            {siteConfig.couple.brideNickname}&apos;s journey to forever
          </p>

          {/* Bottom divider dots */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <span
              className="h-px w-10 sm:w-14 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-accent) 60%, transparent))",
              }}
            />
            <div className="flex gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full opacity-80"
                style={{ backgroundColor: "var(--color-motif-accent)" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full opacity-50"
                style={{ backgroundColor: "var(--color-motif-accent)" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full opacity-80"
                style={{ backgroundColor: "var(--color-motif-accent)" }}
              />
            </div>
            <span
              className="h-px w-10 sm:w-14 rounded-full"
              style={{
                background:
                  "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-accent) 60%, transparent))",
              }}
            />
          </div>

          {/* Image count badge */}
          {images.length > 0 && (
            <p
              className={`${cormorant.className} text-xs sm:text-sm mt-4 opacity-70`}
              style={{ color: "var(--color-motif-medium)" }}
            >
              {desktopImages.length} landscape · {mobileImages.length} portrait
            </p>
          )}
        </div>

        {/* Gallery grid or empty state */}
        {images.length === 0 ? (
          <div
            className={`${cormorant.className} text-center py-16`}
            style={{ color: "var(--color-motif-medium)" }}
          >
            <p className="font-light text-base">
              No images found. Add files to{" "}
              <code
                className="px-2 py-1 rounded border text-sm"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 8%, transparent)",
                  borderColor: "color-mix(in srgb, var(--color-motif-deep) 30%, transparent)",
                  color: "var(--color-motif-deep)",
                }}
              >
                public/desktop-bakgroundnew
              </code>{" "}
              or{" "}
              <code
                className="px-2 py-1 rounded border text-sm"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 8%, transparent)",
                  borderColor: "color-mix(in srgb, var(--color-motif-deep) 30%, transparent)",
                  color: "var(--color-motif-deep)",
                }}
              >
                public/mobile-backgroundnew
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}
      </section>
    </main>
  )
}