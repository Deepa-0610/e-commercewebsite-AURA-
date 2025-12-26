"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./reveal"
import { createClient } from "@/lib/supabase/client"

interface Product {
  id: string
  name: string
  image_url: string
  price: number
}

interface Collection {
  id: string
  name: string
  slug: string
  image_url: string
  count_text: string
  brand_images?: string[]
  cover_products?: Product[]
}

export function CollectionStrip() {
  const [collections, setCollections] = useState<Collection[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchCollections() {
      const { data } = await supabase.from("collections").select(`
        *,
        collection_cover_products (
          product:products (
            id,
            name,
            image_url,
            price
          )
        )
      `)
      
      if (data) {
        const formattedData = data.map((col: any) => ({
          ...col,
          cover_products: col.collection_cover_products
            ? col.collection_cover_products.map((item: any) => item.product)
            : []
        }))
        setCollections(formattedData)
      }
    }
    fetchCollections()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  const itemWidth = 320
  const totalWidth = collections.length * (itemWidth + 32) - 32
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48)

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">Collections</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our curated collections, each formulated to address specific skincare concerns with proven
              results.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
        >
          {collections.map((collection, index) => (
            <Link href={`/category/${collection.slug}`} key={collection.id}>
              <motion.div
                className="flex-shrink-0 w-80 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ filter: "blur(1px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={collection.image_url || "/placeholder.svg"}
                      alt={collection.name}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <motion.div
                      className="text-center text-white mb-4"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-3xl font-bold tracking-wider mb-2">{collection.name}</h3>
                      <p className="text-sm opacity-90">{collection.count_text}</p>
                    </motion.div>

                    {collection.cover_products && collection.cover_products.length > 0 && (
                      <motion.div 
                        className="flex gap-3 mt-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {collection.cover_products.slice(0, 3).map((product) => (
                          <div key={product.id} className="w-16 h-20 rounded-md bg-white shadow-lg overflow-hidden relative border border-white/20">
                             <Image 
                               src={product.image_url} 
                               alt={product.name} 
                               fill 
                               className="object-cover"
                               sizes="64px"
                             />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag to explore collections →</p>
      </div>
    </section>
  )
}
