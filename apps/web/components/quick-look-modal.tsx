"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Plus, Heart, CreditCard, Check, ShoppingBag } from "lucide-react"
import { BlurPanel } from "./blur-panel"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

import { Product } from "./product-card"

interface QuickLookModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickLookModal({ product, isOpen, onClose }: QuickLookModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSwatch, setSelectedSwatch] = useState(0)
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  if (!product) return null

  const quickLookImages = product.quickLookImages || []
  const materials = product.materials || []
  const swatches = product.swatches || []
  const dimensions = product.dimensions || "N/A"

  const handleToggleLike = () => {
    setLiked((s) => !s)
    toast({ title: liked ? "Removed from wishlist" : "Added to wishlist" })
  }

  const handleAddToCart = () => {
    try {
      const raw = localStorage.getItem("cart")
      const cart = raw ? JSON.parse(raw) : []
      const existing = cart.find((i: any) => i.id === product.id)
      if (existing) existing.quantity = (existing.quantity || 1) + 1
      else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
      localStorage.setItem("cart", JSON.stringify(cart))
      toast({ title: "Added to cart" })
    } catch (e) {
      console.error(e)
      toast({ title: "Could not add to cart" })
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/checkout')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % quickLookImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + quickLookImages.length) % quickLookImages.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <BlurPanel className="bg-white/95 backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <Image
                      src={quickLookImages[currentImageIndex] || "/placeholder.svg"}
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Navigation Arrows */}
                    {quickLookImages.length > 1 && (
                      <>
                        <button
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200"
                          onClick={prevImage}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200"
                          onClick={nextImage}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Image Thumbnails */}
                  <div className="flex gap-2">
                    {quickLookImages.map((image: string, index: number) => (
                      <button
                        key={index}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          currentImageIndex === index ? "border-neutral-900" : "border-neutral-200"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h2>
                      <p className="text-lg text-neutral-600">{materials.join(", ")}</p>
                    </div>
                    <button
                      className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                      onClick={onClose}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6 flex-1">
                    {/* Price */}
                    <div className="text-2xl font-bold text-neutral-900">{product.price}</div>

                    {/* Dimensions */}
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 mb-2">DIMENSIONS</h4>
                      <p className="text-neutral-600">{dimensions}</p>
                    </div>

                    {/* Material Swatches */}
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 mb-3">FINISH</h4>
                      <div className="flex gap-3">
                        {swatches.map((swatch, index) => (
                          <button
                            key={index}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 relative group ${
                              selectedSwatch === index ? "border-neutral-900 scale-110" : "border-neutral-300"
                            }`}
                            style={{ backgroundColor: swatch.color }}
                            onClick={() => setSelectedSwatch(index)}
                          >
                            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                              {swatch.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 mb-3">FEATURES</h4>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        <li>• Sustainably sourced materials</li>
                        <li>• Hand-finished edges</li>
                        <li>• Made to order in Belgium</li>
                        <li>• Lifetime repair program</li>
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <motion.button
                      className="flex-1 bg-neutral-900 text-white py-4 rounded-full font-medium text-lg hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                    >
                      <ShoppingBag size={20} />
                      Add to Cart
                    </motion.button>

                    <motion.button
                      className="flex-1 bg-neutral-900 text-white py-4 rounded-full font-medium text-lg hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBuyNow}
                    >
                      <CreditCard size={20} />
                      Buy Now
                    </motion.button>

                    <motion.button
                      className={cn("w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200", liked ? "bg-red-50 border-red-200 text-red-500" : "border-neutral-200 hover:border-neutral-900")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleToggleLike}
                    >
                      <Heart size={24} className={cn(liked && "fill-current")} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </BlurPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
