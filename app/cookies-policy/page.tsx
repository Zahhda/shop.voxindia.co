// File: pages/cookie-policy.js

import React from "react";

export default function CookiePolicy() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">COOKIES POLICY</h1>

      {/* Section 1: What is Cookies? */}
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">1. What is Cookies?</h2>
        <p className="mb-4">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are used in order to make the website work, remember preferences, or to work more efficiently, as well as provide reporting information.
        </p>
        <p>
          Most Internet browsers support cookies; however, users can set their browsers to decline certain types of cookies or specific cookies. Further, users can delete cookies at any time.
        </p>
      </section>

      {/* Section 2: Why do we use cookies? */}
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">2. Why do we use cookies?</h2>
        <p className="mb-4">
          We use cookies to learn how you interact with our content and to improve your experience when visiting our website(s). For example, some cookies remember your language or preferences so that you do not have to repeatedly make these choices when you visit one of our websites.
        </p>
        <p className="mb-4">
          We also use cookies to help us with geolocation tracking in order to present you with the closest store and office locations. Additionally, cookies allow us to serve you specific content, such as videos on our website(s). We may employ the learnings of your behavior on our website(s) to serve you with targeted advertisements on third-party website(s) in an effort to “re-market” our products and services to you.
        </p>
      </section>

      {/* Section 3: Types of cookies used */}
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">3. Types of cookies used:</h2>

        {/* 3a: First-Party and Third-Party Cookies */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">a) First-Party and Third-Party Cookies</h3>
          <p>
            First-party cookies are cookies issued from our domain that are generally used to identify language and location preferences or render basic site functionality.
          </p>
          <p className="mt-2">
            Third-party cookies belong to and are managed by other parties, such as advertising networks or providers of external services like web traffic analysis services. These third-party cookies are likely to be performance cookies or targeting cookies, over which we hold no control.
          </p>
        </div>

        {/* 3b: Session Cookies */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">b) Session Cookies</h3>
          <p>
            Session cookies are temporary cookies that are used to remember you during the course of your visit to the website, and they expire when you close the web browser.
          </p>
        </div>

        {/* 3c: Persistent Cookies */}
        <div>
          <h3 className="text-xl font-semibold mb-2">c) Persistent Cookies</h3>
          <p>
            Persistent cookies are used to remember your preferences within the website and remain on your desktop or mobile device even after you close your browser or restart your computer. We use these cookies to analyze user behavior to establish visit patterns so that we can improve our website functionality for you and others who visit our website(s). These cookies also allow us to serve you with targeted advertising and measure the effectiveness of our site functionality and advertising.
          </p>
        </div>
      </section>

      {/* Section 4: How to reject or delete cookies? */}
      <section>
        <h2 className="text-2xl font-medium mb-4">4. How to reject or delete cookies?</h2>
        <p className="mb-4">
          You can choose to reject or block all or specific types of cookies set by virtue of your visit to our website by clicking on the cookie preferences on our website(s). You can change your preferences for our websites and/or the websites of any third-party suppliers by changing your browser settings. Please note that most browsers automatically accept cookies. Therefore, if you do not wish cookies to be used, you may need to actively delete or block the cookies.
        </p>
        <p>
          If you reject the use of cookies, you will still be able to visit our websites but some functions may not work correctly. By using our website without deleting or rejecting some or all cookies, you agree that we can place those cookies that you have not deleted or rejected on your device.
        </p>
      </section>
    </main>
  );
}
