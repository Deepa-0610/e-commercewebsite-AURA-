"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard, type Product } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

interface FeaturedProductsProps {
  products?: any[]
}

export function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const displayProducts: Product[] = products.length > 0 
    ? products.map(p => ({
        id: p.id,
        name: p.name,
        price: `$${p.price}`,
        image: p.image_url,
        badge: p.stock < 10 ? "Limited" : undefined,
        materials: p.ingredients ? p.ingredients.split(",").slice(0, 2) : [],
        quickLookImages: p.image_urls || [p.image_url],
        dimensions: "Standard Size"
      }))
    : []

  if (displayProducts.length === 0) return null

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Featured <span className="italic font-light">Skincare</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Discover our most transformative formulas, each crafted with premium Hyaluronic Acids and cutting-edge science
              for visible results.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
