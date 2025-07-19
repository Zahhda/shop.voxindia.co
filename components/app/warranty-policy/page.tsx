// File: pages/warranty-policy.tsx
"use client";

import { useState } from 'react';
import Head from 'next/head';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionSection: React.FC<SectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-xl font-semibold text-gray-800 hover:text-indigo-600 transition"
      >
        {title}
      </button>
      {isOpen && <div className="mt-2 text-gray-700 text-sm space-y-2">{children}</div>}
    </div>
  );
};

export default function WarrantyPolicy() {
  return (
    <>
      <Head>
        <title>Warranty Policy | VOX India</title>
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">Warranty Policy</h1>

        <AccordionSection title="1. Copyright Notice">
          <p>
            The copyright of this website is owned by VOX India. No part or product(s) here may be
            reproduced, distributed, published, displayed, broadcasted, hyperlinked or transmitted in any
            manner or by any means or stored in any information retrieval system without the prior written
            permission of VOX India.
          </p>
          <p>
            “Mirroring” of any material contained on this website or on any other server is strictly
            prohibited without the prior express permission in writing from VOX India.
          </p>
        </AccordionSection>

        <AccordionSection title="2. Trade Mark">
          <p>
            The trademarks, service marks, and logos (the “Trade Marks”) used and displayed on this website
            are registered and unregistered Trademarks of VOX India and others. Nothing on this website
            should be taken as granting, by implication, estoppels, or otherwise, any license or right to
            use any Trademark displayed on this website, without the prior written permission of VOX
            India or other respective Trademark owners. VOX India, uncompromisingly enforces its
            intellectual property rights to the fullest extent of the law. The name of VOX Interior and
            Exterior Solutions Private Limited, VOX India or the VOX logo may not be used in any way,
            including in advertising or publicity pertaining to distribution of materials on this website,
            without prior written permission of VOX Interior and Exterior Solutions Private Limited
            prohibits use of the VOX logo as a “hot” link to any site without the prior written permission
            of VOX India.
          </p>
        </AccordionSection>

        <AccordionSection title="3. Privacy Policy">
          <p>
            This Privacy Policy is to inform customers of our online information practices, our practices
            concerning the collection, storage, processing, transfer, and use of personal information and
            the choices available regarding the collection and use of customer’s personal information. By
            submitting your personal information to the company through this website or otherwise, you
            thereby give your consent to the handling of your personal data in the manner described in this
            policy.
          </p>
          <p>
            Content, Prices, Specifications, Quality, Terms and Conditions are subject to change without
            prior notice. Within/after the warranty claim requests raised by the customers; Brand has the
            rights to contact the customers regarding any communication about their warranty claims.
          </p>
        </AccordionSection>

        <AccordionSection title="4. Definition">
          <ol className="list-decimal ml-5 space-y-1">
            <li>
              <strong>“VOX”</strong> means VOX Interior and Exterior Solutions Private Limited or VOX
              Building Products Private Limited, company registered under The Companies Act, 2013,
              having its Registered Office at No. 1202, 100 Ft Road, HAL 2nd Stage, Domlur, Indiranagar,
              Bangalore, Karnataka, India, 560008 and engaged in the business of trading, manufacturing,
              selling & distribution of high end interior and exterior building products under the brand
              name VOX and any other products launched by VOX from time to time.
            </li>
            <li>
              <strong>“Customer”</strong> means any person, individual, body corporate or other legal entity
              whether incorporated or not and identified in Proposal / Quotation and / or Invoice of VOX
              and residing in the territorial limits of the Union of India.
            </li>
            <li>
              <strong>“Contract”</strong> means a contract for sale by VOX to a Customer of any
              Product(s) and / or services incorporating these terms and conditions.
            </li>
            <li>
              <strong>“Order Confirmation”</strong> means formal acceptance by VOX of any order for
              Product(s) placed by a customer.
            </li>
            <li>
              <strong>“Price”</strong> means the price as per VOX. Proposal / Quotation and / or Order
              Confirmation where precedence will be given to the latter.
            </li>
            <li>
              <strong>“Product(s)”</strong> mean any part(s) and / or Product(s), Device(s) as described in
              the Order Confirmation and may include VOX - Branded Product(s), Other Non- VOX Third
              Party Product(s) and Service Offerings.
            </li>
            <li>
              <strong>“Service Offering(s)”</strong> mean the various service options offered by VOX
              for VOX - Branded Product(s)s or any part of them and for varying periods, as described in
              VOX's published literature, including but not limited to VOX's Invoice and / or VOX's
              Service Description.
            </li>
            <li>
              <strong>“Third Party Product(s)”</strong> mean Product(s) and / or services of brands
              other than “VOX”.
            </li>
            <li>
              <strong>“Eligible Repairs”</strong> mean repair of any product(s) which have not been
              tampered and / or handled by any unauthorized personnel.
            </li>
            <li>
              <strong>“Service Centre”</strong> means any Service Centre/ Service Partner, authorized by
              VOX.
            </li>
            <li>
              <strong>“Installation”</strong> means Installation (or setup) of any Software (including
              Operating Systems, Drivers, Plug-ins, etc.) is the act of putting the software so that it can
              be executed.
            </li>
            <li>
              <strong>“Carry-in warranty”</strong> means Customer brings the Product(s) to any service
              center duly authorized by VOX and collects the same after the repair/ service.
            </li>
          </ol>
        </AccordionSection>

        <AccordionSection title="5. Disclaimer">
          <p>
            The information provided on this website is intended for general informational purposes only.
            While VOX strives to ensure that the information is accurate and up-to-date, we make no
            representations or warranties, express or implied, regarding the completeness, accuracy,
            reliability, suitability, or availability of the website’s content, products, services, or related
            graphics for any particular purpose. Any reliance on such information is done at your own
            risk. This website may contain links to third-party sites that are not controlled by VOX. We are
            not responsible for the nature, content, or availability of these external sites, and the inclusion
            of any links does not imply endorsement or recommendation of the views expressed therein.
          </p>
        </AccordionSection>

        <AccordionSection title="6. General">
          <ol className="list-decimal ml-5 space-y-1">
            <li>
              Warranty on all “VOX” products is governed by the “Warranty Terms and Conditions”
              specified on{' '}
              <a href="https://shop.voxindia.co/terms-and-conditions" className="text-blue-600 underline">https://shop.voxindia.co/terms-and-conditions</a>{' '}
              in force at the time of availing any service and/ or support. Such Warranty Terms and
              Conditions are liable to change from time to time without any notice to Customers. Any
              product not covered under the above terms, will be deemed to be outside the purview of
              warranty and accordingly service and support will be on chargeable basis only.
            </li>
            <li>
              The Customer shall not assign or otherwise transfer any Contracts or any of its rights and
              obligations hereunder whether in whole or in part without the prior written consent of VOX.
              Any such unauthorized assignment shall be deemed to be null and void vis-a-vis VOX.
            </li>
            <li>
              If any of the provision or provisions of these Terms and Conditions are found to be invalid
              or unenforceable, in whole or in part, by a competent authority, the validity of the
              remaining provisions shall not be affected, and the rest of the provisions will remain in full
              force and effect.
            </li>
            <li>
              No Waiver: Any failure or delay on VOX’s part in exercising any power or right under this
              agreement does not amount as a waiver, or any single act or partial exercise of any power
              or right does not exclude any other or further exercise, or the exercise of any other rights
              or powers.
            </li>
          </ol>
        </AccordionSection>

        <AccordionSection title="7. Contract Formation">
          <ol className="list-decimal ml-5 space-y-1">
            <li>
              The Contract shall come into existence only on a Customer Order being executed by VOX.
              The Customer indemnifies that the buying is for self-use only and not for any re-sale
              purposes.
            </li>
            <li>
              The Product(s) sold and / or Services rendered are subject to these Terms and Conditions
              only and no other terms and conditions stipulated or referred to by Customer shall be
              entertained (except as contained in any Sales Invoice raised by VOX).
            </li>
          </ol>
          <p>
            The Customer acknowledges that they have read and are aware of the contents of and agree to
            be bound by these Terms and Conditions. VOX’s acknowledgment of a purchase order or its
            failure to object to, varying, conflicting, or additional terms and conditions in a purchase order
            shall not be deemed an acceptance of such terms and conditions or a waiver of the terms and
            conditions hereof.
          </p>
        </AccordionSection>

        <AccordionSection title="8. Products Acceptance">
          <p>
            Product(s) shall be deemed to have been accepted by the Customer as being in good condition
            and in accordance with the Contract unless VOX is notified in writing to the contrary within 24
            (Twenty-Four) hours of delivery of the Product(s).
          </p>
        </AccordionSection>

        <AccordionSection title="9. Coverage of Limited Warranty">
          <p>VOX will honor its warranty when:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              The product supplied and installed is properly maintained and used for normal use as per the
              user manual and installation guidelines.
            </li>
            <li>
              The product is still owned by the original purchaser and if transferred to other is being
              informed and approved in advance by VOX.
            </li>
            <li>
              The product is still at its original installed position and location.
            </li>
            <li>
              The warranty has not expired, subject to limitations set forth through VOX terms & conditions.
            </li>
          </ul>
        </AccordionSection>

        <AccordionSection title="10. Limitations/Disclaimer of Warranty/Liability, Exclusions">
          <p>This Limited Warranty does not extend to:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Structural failure or workmanship that is not in accordance with standard industry practices
              and procedures and the VOX’s published Technical Information Brochure and User Manual.
            </li>
            <li>
              Physical defects or damage to the Product resulting from external factors that occurred after
              the Product was delivered to the Purchaser (VOX recommends to insure the Product subject to
              this Warranty against the effects of external factors), in particular related to:
              <ol className="list-decimal ml-5 mt-2 space-y-1">
                <li>
                  use of the Product contrary to its purpose or improper storage and transport prior to
                  installation;
                </li>
                <li>
                  installation contrary to the Product installation, sub-construction, machining, application
                  and User Manual;
                </li>
                <li>
                  use of accessories not provided for in the Product installation and User Manual;
                </li>
                <li>
                  impact of foreign bodies which exceeds the level specified in appropriate technical
                  approval which certifies the suitability of the product;
                </li>
                <li>
                  fire, earthquake, flooding, lightning, strong wind, hail, effects of abnormally high or low
                  air temperatures or other occurrences that may be classified as force majeure;
                </li>
                <li>
                  faults, defects or other damage to the building of material where the Product is installed,
                  caused in particular by movement, deformations, fractures or subsidence of walls,
                  materials or foundations of the building.
                </li>
              </ol>
            </li>
            <li>VOX shall be only liable for manufacturing defects resulting from reasons attributable to the Product.</li>
            <li>
              VOX shall not be liable for discoloration which exceed the range of allowable discolorations,
              specified in the Product installation and User Manual, or for other discoloration caused mostly
              by air pollution (including by metal oxides or particles), mold or exposure to harmful chemicals.
            </li>
            <li>
              Warranty shall not apply to any Product covered by the Purchaser with any other improvised
              coating (e.g. paint, varnish or plaster), or otherwise modified/changed.
            </li>
            <li>
              In the event the Product or any element thereof is replaced under Warranty, where the Product
              installed by the Purchaser is no longer manufactured or has been modified by VOX, then VOX
              may apply elements which are closest equivalents (in terms of type) to the Product originally
              installed.
            </li>
            <li>VOX will deny any claims that are not related to its material.</li>
            <li>
              VOX’s obligations, responsibilities and liability shall be limited to repairing or replacing the
              defective product as set forth in this limited warranty. In no event shall the VOX be liable for
              any special, indirect, incidental or consequential damages of any kind, including any damage to
              the property, the building or its contents, or for injury to any persons, that may occur as a
              result of the use of the VOX’s products or as a result of the breach of this warranty.
            </li>
            <li>
              In no event shall the VOX’s total liability arising out of or related to the product covered under
              this warranty exceed the original purchase price, exclusive of all applicable taxes, of the product.
              This limited warranty gives you specific legal rights and you may have other rights that may
              vary by jurisdiction.
            </li>
            <li>VOX reserves the right to refuse service to any customer for reasons furnished in writing.</li>
          </ul>
        </AccordionSection>

        <AccordionSection title="11. Service And Technical Support">
          <ol className="list-decimal ml-5 space-y-1">
            <li>
              To ensure faster warranty claims, please register your product on our website at:{' '}
              <a href="http://www.voxindia.co" className="text-indigo-600 hover:underline">
                www.voxindia.co
              </a>.
            </li>
            <li>
              The customer should notify VOX of the detected manufacturing defects of the Product
              immediately after detecting such a defect in the manner as stated below, being ground for a
              claim under the Warranty.
            </li>
            <li>A claim made under the Warranty may be considered under the following pre-conditions.</li>
          </ol>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Contact our customer support service team by writing to us at{' '}
              <a href="mailto:cc.tl@voxindia.co" className="text-indigo-600 hover:underline">
                cc.tl@voxindia.co
              </a>
              {' '}or contact us through our website at{' '}
              <a href="http://www.voxindia.co" className="text-indigo-600 hover:underline">
                www.voxindia.co
              </a>.
            </li>
            <li>
              When contacting us, for a claim under the Warranty, it should include – description of defect,
              address of Product installation site, claimant's contact details (full name, address, phone
              number, e-mail address) and photographs proving the defect, a bill or tax invoice of purchase
              in the manner as described below.
            </li>
            <li>VOX team will assess the defect and determine whether its falls under the warranty coverage.</li>
            {/* <li>
              The VOX shall provide, by e-mail or in writing, the information on the manner of considering the
              claim no later than 14 days of the date when the VOX received the claim.
            </li> */}
            <li>
              The VOX stipulates that the consideration of the claim may require inspection of the Product on
              site, which implies the Purchaser's obligation to make available the immovable property where
              the Product covered by this Warranty is installed.
            </li>
            {/* <li>
              In such event, VOX shall contact the Purchaser forthwith in order to set the date of inspection,
              and the above-mentioned period of 14 days shall be counted from the date when the inspection
              is completed. The inspection shall be performed by an authorized representative of VOX. The
              Purchaser shall provide VOX with all information and documents necessary for proper
              preparation and performance of the inspection.
            </li> */}
            <li>
              Where the Purchaser's claim is deemed justified, VOX shall perform its obligations specified
              herein within 60 days of the date when the Purchaser was provided with the information on the
              manner of considering the claim. At the same time, VOX stipulates that, due to the specific
              nature of the manufacturing process, the aforesaid period of 60 days may be extended by a
              time necessary to produce and deliver the elements necessary to replace the Product.
            </li>
            <li>
              For any claim that is not valid, VOX will be paid reasonable charges, including travel and labor,
              associated with investigation of such claim.
            </li>
          </ul>
        </AccordionSection>

        <AccordionSection title="18. Force Majeure">
          <p>
            This contract is subject to Force Majeure events and neither party shall be responsible for delays
            arising there from.
          </p>
        </AccordionSection>

        <AccordionSection title="19. Governing Law">
          <ol className="list-decimal ml-5 space-y-1">
            <li>
              All disputes arising from any Sales and/or Service Agreement or related matters shall first be
              referred to Arbitration under The Arbitration and Conciliation Act, 1996. The Arbitrator’s
              decision shall be final and binding on both parties. Arbitration shall be held only in Bangalore,
              Karnataka, India, and the courts in Bangalore shall have exclusive jurisdiction over arbitration
              proceedings and awards.
            </li>
            <li>
              In case of any disputes, the matter shall be subject to the exclusive jurisdiction of the courts in
              Bangalore, Karnataka, India.
            </li>
          </ol>
        </AccordionSection>

        <p className="text-gray-600 text-sm mt-8">
          Every effort is being made to keep the website up and running smoothly. GOVO is not responsible
          for any temporary website unavailability due to technical issues or factors beyond its control.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          All the above terms and conditions are subject to change without any prior notice or intimation.
        </p>

        <p className="text-xs text-center text-gray-500 mt-10">
          © {new Date().getFullYear()} VOX India. All rights reserved.
        </p>
      </main>
    </>
  );
}
