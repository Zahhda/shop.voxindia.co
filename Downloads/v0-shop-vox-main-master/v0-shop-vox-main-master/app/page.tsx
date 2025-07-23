import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductCollection from "@/components/product-collection"
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative h-[70vh] rounded-xl overflow-hidden mb-16">
        <Image
          src="/VideoCover-3-1400x547.jpg?height=1080&width=1920"
          alt="Linerio Slat Panels"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Transform Your Space</h1>
          <p className="text-xl text-white mb-8 max-w-xl">
            Premium slatted wall and ceiling panels for modern interiors. 100% recyclable, lightweight, and easy to
            install.
          </p>
          <Link href="/wall-panels">
            <Button size="lg" className="text-lg bg-[#e80808] hover:bg-[#c80707] text-white">
              Explore Collection
            </Button>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Collections</h2>
        <ProductCollection />
      </section>

      {/* Features Section */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-muted p-8 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Eco-Friendly</h3>
          <p>Made from 100% recyclable polystyrene with hot-stamp finish.</p>
        </div>
        <div className="bg-muted p-8 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Easy Installation</h3>
          <p>Quick and easy glue-on installation with matching mounting strips.</p>
        </div>
        <div className="bg-muted p-8 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Sound Absorbing</h3>
          <p>Improve your room's acoustics with our sound-absorbing panels.</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-8 rounded-xl">
            <p className="italic mb-4">
              "The Linerio panels transformed our living room. Easy to install and the quality is outstanding."
            </p>
            <p className="font-bold">- Sarah J.</p>
          </div>
          <div className="bg-muted p-8 rounded-xl">
            <p className="italic mb-4">
              "Perfect solution for our office space. The acoustic properties make a noticeable difference."
            </p>
            <p className="font-bold">- Michael T., Interior Designer</p>
          </div>
        </div>
      </section>
    </div>
  )
}
