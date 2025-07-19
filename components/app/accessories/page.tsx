// app/product/fix-all-high-tack/page.tsx
import RelatedProduct from '@/components/ui/RelatedProduct';
import Image from 'next/image';

export const metadata = {
  title: 'Fix ALL High Tack | Soudal',
  description: 'High-quality, single-component adhesive sealant with very high initial tack and durable elasticity.',
};

export default function FixAllHighTackPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Product Title */}
      {/* <h1 className="text-3xl font-bold mb-4">Fix ALL High Tack</h1> */}

      {/* Product Image */}
      {/* <div className="mb-6">
        <Image
          src="/images/fix-all-high-tack.jpg"
          alt="Fix ALL High Tack Cartridge"
          width={600}
          height={400}
          className="object-cover rounded-lg shadow"
        />
      </div> */}
<RelatedProduct />
      {/* Description */}
      <section className="mb-8 mt-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="leading-relaxed">
          Fix ALL High Tack is a high-quality, neutral, elastic, one-component adhesive sealant based on SMX Hybrid Polymer with very high initial tack. It offers strong immediate bonding, reducing or eliminating the need for temporary supports. Fast curing and durable elasticity make it suitable for a wide range of construction and industrial bonding tasks. :contentReference[oaicite:2]
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>High initial tack, reducing need for initial support.</li>
          <li>Fast curing (skin formation ~5 min at 23°C/50% R.H., curing speed ~3 mm/24h).</li>
          <li>Stable paste consistency for easy extrusion.</li>
          <li>High shear strength after full cure (no primer needed).</li>
          <li>Remains elastic after curing; durable over time.</li>
          <li>Impervious to mould and virtually odour-free.</li>
          <li>Paintable with water-based systems (test compatibility for alkyd-based paints).</li>
          <li>Good weather and UV resistance (may discolour under extreme or prolonged UV but performance remains).</li>
          <li>Free of isocyanates and silicones; good adhesion on slightly moist substrates.</li>
          <li>Wide temperature resistance after cure: -40 °C to +90 °C.</li>
        </ul>
      </section>

      {/* Technical Data */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Technical Data (typical values)</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <tbody>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Basis</th>
                <td className="py-2">SMX Hybrid Polymer</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Consistency</th>
                <td className="py-2">Stable paste</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Curing System</th>
                <td className="py-2">Moisture curing</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Skin Formation<br />(23°C, 50% RH)</th>
                <td className="py-2">~5 min</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Curing Speed<br />(23°C, 50% RH)</th>
                <td className="py-2">~3 mm / 24 h</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Hardness (Shore A)</th>
                <td className="py-2">65 ± 5</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Density</th>
                <td className="py-2">1.47 g/ml</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Elastic Recovery</th>
                <td className="py-2">&gt;75%</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Max. Tension (ISO 37)</th>
                <td className="py-2">3.20 N/mm²</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Elongation at Break</th>
                <td className="py-2">~400%</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Temperature Resistance</th>
                <td className="py-2">-40 °C to +90 °C</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Application Temp.</th>
                <td className="py-2">+5 °C to +35 °C</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-2">*Values may vary with environment and substrates; data relate to fully cured product.</p>
      </section>

      {/* Applications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Applications</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Sealing and bonding in building and construction (panels, profiles, joints in bathrooms/kitchens).</li>
          <li>Elastic bonding of panels, profiles, decorative elements on substrates like wood, MDF, chipboard, metals, PVC, plastics.</li>
          <li>Structural bonding in automotive, container industry (provided substrate compatibility is tested).</li>
          <li>Bonding mirrors and signage (heavy-duty bonding; immediate tack supports weight).</li>
          <li>General mounting adhesive: absorbent ceiling panels, façade elements (subject to preliminary tests).</li>
        </ul>
      </section>

      {/* Substrate & Surface Preparation */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Substrates & Surface Preparation</h2>
        <p className="leading-relaxed">
          Suitable for most common building substrates: treated wood, metals, PVC, plastics. Surfaces must be rigid, clean, dry or slightly moist, free of dust and grease. Porous substrates in water-loaded applications should be primed with Primer 150; non-porous substrates cleaned/prepared with Soudal activator or cleaner. Not suitable for PE, PP, PTFE, bituminous substrates, copper or copper-containing materials (bronze, brass). Preliminary adhesion tests recommended.
        </p>
      </section>

      {/* Packaging & Storage */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Packaging & Storage</h2>
        <p className="leading-relaxed">
          Available colours: white, black, grey, alu grey, light grey, brown, beige, anthracite, oak, brick red; other colours on request. Packaging: 80 ml tube, 125 ml tube, 290 ml cartridge, 400 ml foil bag, 600 ml foil bag, others on request. Shelf life: 15 months in unopened packaging at +5 °C to +25 °C in cool, dry storage.
        </p>
      </section>

      {/* Application Method */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Application Method</h2>
        <p className="leading-relaxed">
          Apply with manual or pneumatic caulking gun. After extrusion, press components together; finish with soapy solution or Soudal Finishing Solution before skin formation. Clean uncured sealant with Soudal Surface Cleaner or Swipex. Repair with same material. Application temperature between +5 °C and +35 °C.
        </p>
      </section>

      {/* Safety & Remarks */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Safety & Remarks</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Consult label and Material Safety Data Sheet for handling and protective measures. Dangerous; respect precautions for use.</li>
          <li>May be overpainted with water-based paints; compatibility test recommended. Drying time of alkyd paints may increase.</li>
          <li>May discolour under extreme UV or chemicals, but performance unaffected. Avoid contact with bitumen, tar, plasticizer-releasing materials (EPDM, neoprene, butyl) to prevent discoloration or loss of adhesion. Do not use where continuous water immersion occurs.</li>
          <li>Not suitable as glazing sealant or for aquariums. For natural stone bonding, only on underside of tiles; not as joint sealant.</li>
          <li>When using multiple reactive sealants, allow full cure of first before next.</li>
        </ul>
      </section>
    </main>
  );
}
