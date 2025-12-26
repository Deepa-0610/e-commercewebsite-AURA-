import { ProductForm } from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif text-gray-900">Add New Product</h1>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <ProductForm />
      </div>
    </div>
  )
}
