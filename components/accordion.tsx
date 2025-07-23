'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
  id: number;
  question: string;
  answer: string;
}

const data: AccordionItem[] = [
  {
    id: 1,
    question: "What are VOX Linerio Slat Panels?",
    answer:
      "VOX Linerio Slat Panels are decorative wall panels designed to enhance interior spaces with depth, warmth, and sophistication. They come in three variants—S-Line, M-Line, and L-Line—each differing in the width and depth of the slats. These panels are made from polystyrene, a lightweight and durable material that is 100% recyclable."
  },
  {
    id: 2,
    question: "What are the differences between S-Line, M-Line, and L-Line panels?",
    answer:
      "S-Line: Features narrow slats, providing a subtle texture suitable for minimalist designs.\nM-Line: Offers medium-width slats, balancing subtlety and prominence.\nL-Line: Comprises wide slats, making a bold statement and adding significant depth to walls."
  },
  {
    id: 3,
    question: "In which colors are Linerio panels available?",
    answer:
      "Linerio panels are available in various shades, including Natural, Mocca, Chocolate, White, Grey, Black, and Anthracite."
  },
  {
    id: 4,
    question: "Can Linerio panels be installed in bathrooms or kitchens?",
    answer:
      "Yes, Linerio panels can be installed in damp areas like bathrooms and kitchens. However, they should not be exposed to direct contact with water or installed in areas with temperatures exceeding 60°C, such as saunas or near cookers."
  },
  {
    id: 5,
    question: "How are Linerio panels installed?",
    answer:
      "Linerio panels are designed for easy installation. They can be mounted using adhesive and cut to size using a saw or jigsaw. Installation can be done vertically, horizontally, or diagonally. Visit shop.voxindia.co for an installation guide or contact VOX technicians at +91 9528500500 for complex designs."
  },
  {
    id: 6,
    question: "Do Linerio panels improve room acoustics?",
    answer:
      "Yes, the spatial structure of Linerio panels helps to soundproof interiors by eliminating reverberation and echo, especially in larger rooms."
  },
  {
    id: 7,
    question: "Are Linerio panels environmentally friendly?",
    answer:
      "Absolutely. Linerio panels are made from polystyrene, which is 100% recyclable. This makes them an eco-friendly choice for interior wall cladding."
  },
  {
    id: 8,
    question: "What are the dimensions of a single Linerio panel?",
    answer:
      "Each Linerio panel measures 3050 mm in length. The width and thickness vary by type:\nS-Line: 122 mm wide, 12 mm thick\nM-Line: 122 mm wide, 12 mm thick\nL-Line: 122 mm wide, 21 mm thick"
  },
  {
    id: 9,
    question: "Can Linerio panels be used on ceilings?",
    answer:
      "Yes, Linerio panels are versatile and can be installed on both walls and ceilings, allowing for cohesive interior designs."
  },
  {
    id: 10,
    question: "How do I maintain and clean Linerio panels?",
    answer:
      "Linerio panels are easy to maintain. Use a mild detergent and a soft cloth for cleaning. Avoid strong detergents, bleaching agents, solvents, strong acids/bases, or abrasives."
  },
  {
    id: 11,
    question: "Are VOX Linerio Slat Panels suitable for Indian weather conditions?",
    answer:
      "Yes, the panels are made from high-quality polystyrene that is resistant to moisture, heat, and humidity—suitable for Indian climates. They can be used in interiors and semi-humid areas like covered balconies."
  },
  {
    id: 12,
    question: "What are the best rooms to install VOX Linerio Panels in a home?",
    answer:
      "Ideal for living rooms, bedrooms, hallways, offices, and feature walls. Their acoustic benefits suit home theaters and study areas, while moisture resistance makes them suitable for kitchens and covered balconies."
  },
  {
    id: 13,
    question: "Can I use VOX Linerio Panels for commercial interiors?",
    answer:
      "Absolutely. They're widely used in cafes, salons, office lobbies, and showrooms due to their modern look, durability, and easy maintenance."
  },
  {
    id: 14,
    question: "How do VOX Linerio Panels compare to traditional wooden wall panels?",
    answer:
      "VOX Linerio Panels are lightweight, moisture-resistant, and low-maintenance. Unlike wood, they don’t warp, crack, or fade, making them better for humid conditions."
  },
  {
    id: 15,
    question: "Are VOX Linerio Panels customizable in terms of color or finish?",
    answer:
      "VOX offers panels in finishes like Natural Oak, Mocca, Chocolate, White, Grey, and Anthracite. While slat sizes (S, M, L) are fixed, you can choose a finish to match your decor."
  },
  {
    id: 16,
    question: "What is the estimated delivery time for VOX Linerio Slat Panels?",
    answer:
      "Delivery typically takes 8 to 14 working days from order confirmation. Orders ship after 24 hours, and cancellation is not possible post that."
  },
  {
    id: 17,
    question: "What should I do if my VOX Linerio panels arrive damaged?",
    answer:
      "Contact us at +91 9528500500 within 48 hours of delivery. Email photos of the damage and packaging to customercare@voxindia.co with your order details."
  },
  {
    id: 18,
    question: "Is there a warranty on VOX Linerio Panels?",
    answer:
      "Yes, there is a 2-year manufacturer’s warranty against defects in material and workmanship."
  },
  {
    id: 19,
    question: "Are shipping charges included in the product price?",
    answer:
      "Yes, VOX India offers Free Shipping across India on all orders placed via voxindia.co."
  },
  {
    id: 20,
    question: "How will Installation of VOX Linerio Panels work after delivery? Are there extra Installation Charges?",
    answer:
      "VOX India provides Free Installation across India for all orders from voxindia.co. For complex installations, accessories like Linerio Trims (sold separately) may be required. Contact +91 9528500500 post-order for more info."
  }
];

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);

    // If clicked item is among the last 3 visible, show 3 more
    if (index >= visibleCount - 3 && visibleCount < data.length) {
      const newVisible = Math.min(visibleCount + 3, data.length);
      setVisibleCount(newVisible);
    }
  };

  const visibleData = data.slice(0, visibleCount);

  return (
    <div className="max-w-full mt-10 space-y-4">
      {visibleData.map((item, index) => (
        <div key={item.id} className="border-b border-gray-200 w-full">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between w-full p-4 bg-gray-100 hover:bg-gray-200 text-left text-lg font-medium text-gray-800 transition-all"
          >
            {item.question}
            {activeIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {activeIndex === index && (
            <div className="p-4 text-gray-600 bg-white transition-all duration-300">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
