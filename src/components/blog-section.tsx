"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar } from "@esmate/shadcn/pkgs/lucide-react"

/* -------------------- Types -------------------- */

interface BlogImage {
  url: string
  altText?: string | null
}

interface Article {
  id: string
  title: string
  handle: string
  publishedAt: string
  content: string
  image?: BlogImage | null
  blogHandle: string
}

/* -------------------- Component -------------------- */

export default function BlogSection() {
  const [articles] = useState<Article[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  /* Slider index detection */
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const onScroll = () => {
      const slideWidth = slider.offsetWidth
      if (!slideWidth) return

      const index = Math.round(slider.scrollLeft / slideWidth)
      setActiveIndex(Math.min(index, articles.length - 1))
    }

    slider.addEventListener("scroll", onScroll, { passive: true })
    return () => slider.removeEventListener("scroll", onScroll)
  }, [articles.length])

  if (!articles.length) return null

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Helpful reads and insights around Himalayan Pink Salt.
          </p>
        </div>

        {/* MOBILE SLIDER */}
        <div className="mt-14 lg:hidden">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          >
            {articles.map((post) => {
              const text =
                post.content?.replace(/<[^>]+>/g, "").trim() ?? ""

              return (
                <article
                  key={post.id}
                  className="snap-center min-w-full px-1"
                >
                  <div className="rounded-2xl bg-background shadow-sm">
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      {post.image?.url ? (
                        <Image
                          src={post.image.url}
                          alt={post.image.altText || post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <time className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </time>

                      <h3 className="mt-3 text-lg font-semibold leading-snug">
                        <Link
                          href={`/blogs/${post.blogHandle}/${post.handle}`}
                          className="hover:text-primary"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">
                        {text}
                      </p>

                      <Link
                        href={`/blogs/${post.blogHandle}/${post.handle}`}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
                      >
                        Read article <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Counter */}
          <div className="mt-4 text-center text-sm font-medium text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(articles.length).padStart(2, "0")}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="mt-16 hidden lg:grid grid-cols-3 gap-10">
          {articles.map((post) => {
            const text =
              post.content?.replace(/<[^>]+>/g, "").trim() ?? ""

            return (
              <article
                key={post.id}
                className="group rounded-2xl bg-background shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-t-2xl">
                  {post.image?.url ? (
                    <Image
                      src={post.image.url}
                      alt={post.image.altText || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <time className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>

                  <h3 className="mt-3 text-lg font-semibold leading-snug">
                    <Link
                      href={`/blogs/${post.blogHandle}/${post.handle}`}
                      className="hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">
                    {text}
                  </p>

                  <Link
                    href={`/blogs/${post.blogHandle}/${post.handle}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
