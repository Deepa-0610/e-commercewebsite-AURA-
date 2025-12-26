import { Footer } from '@/components/footer'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">Blog</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Latest news, tips, and stories from AURA.
            </p>
            <p>
              Stay tuned for updates on beauty trends, product launches, and more.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
