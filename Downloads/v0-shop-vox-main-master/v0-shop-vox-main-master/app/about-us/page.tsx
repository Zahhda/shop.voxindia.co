import React from 'react';
import Link from 'next/link';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <h1 className="text-3xl font-bold">About Brand</h1>
          <p>
            VOX is an interior design brand that has been steadily
            strengthening its position as one of the most innovative companies
            in the furniture sector in Poland since 1989.
          </p>
          <p>
            Our portfolio includes both unique as well as complementary products
            and services connected with decorating apartments and houses.
          </p>
          <p>
            In VOX we believe that real freedom begins at home, and the way we
            organise our living space has a great influence on our life.
            Therefore, our products are created as the answer to people’s actual
            needs based on the design thinking methodology.
          </p>
          <p>
            They are developed by multidisciplinary teams that, apart from
            designers, consist of psychologists, ethnographers and
            sociologists.
          </p>
          <p>
            Our goal is to constantly develop and provide comprehensive interior
            design solutions. In this way furniture floor and door collections,
            accessories as well as wall and façade systems that match one
            another are made.
          </p>
          <p>
            VOX is also a network of home decoration shops across Poland as well
            as the vox.pl online shopping platform. We also give real freedom of
            creation to consumers in more than 50 countries on all continents,
            including USA, Mexico, Australia and Taiwan.
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="md:col-span-1 border-l pl-4">
          <ul className="space-y-4">
            <li>
              <Link href="/about" className="text-red-600 hover:underline">
                About Brand
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-red-600 hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AboutUs;
