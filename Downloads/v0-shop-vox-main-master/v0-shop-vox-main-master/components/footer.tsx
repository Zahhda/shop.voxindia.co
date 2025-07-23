import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-vox.svg"
              alt="Linerio Logo"
              width={80}
              height={32}
              className="mr-3"
            />
            <span className="sr-only">Linerio</span>
          </Link><br/>
            <p className="text-muted-foreground mb-4">Premium slatted wall and ceiling panels for modern interiors.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/wall-panels/s-line" className="text-muted-foreground hover:text-primary transition-colors">
                  S-Line
                </Link>
              </li>
              <li>
                <Link href="/wall-panels/m-line" className="text-muted-foreground hover:text-primary transition-colors">
                  M-Line
                </Link>
              </li>
              <li>
                <Link href="/wall-panels/l-line" className="text-muted-foreground hover:text-primary transition-colors">
                  L-Line
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms-and-conditions" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/return-cancellation" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/warranty-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Warranty Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>1202, 100-ft Rd</p>
              <p>Indiranagar</p>
              <p>Bengaluru, KA-560008</p>
              {/* 1202, 100-ft Rd, Indiranagar, Bengaluru, KA-560008
095285 00500
customercare@voxindia.co */}
              <p className="mt-2">
                <a href="tel:+919528500500" className="hover:text-primary transition-colors">
                  +91 9528-500-500
                </a>
              </p>
              <p>
                <a href="mailto:customercare@voxindia.co" className="hover:text-primary transition-colors">
                  customercare@voxindia.co
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VOX Interior and Exterior Solutions Pvt Ltd. All rights reserved.</p>
          {/* <div className="mt-4 space-x-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
