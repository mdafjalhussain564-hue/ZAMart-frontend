"use client";

import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h1 className="text-4xl md:text-5xl font-bold">
            About GMart
          </h1>

          <p className="mt-5 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Your trusted destination for quality products,
            great prices and a simple online shopping experience.
          </p>

        </div>
      </section>


      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>

            <span className="text-blue-600 font-semibold uppercase tracking-wide">
              Who We Are
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Welcome to GMart
            </h2>

            <p className="text-gray-600 mt-5 leading-7">
              GMart is an online shopping platform created to make
              everyday shopping simple, convenient and reliable.
              We bring different categories of products together
              in one place so customers can easily find what they need.
            </p>

            <p className="text-gray-600 mt-4 leading-7">
              From fashion and footwear to electronics, beauty and
              home products, GMart is designed to provide a smooth
              and enjoyable shopping experience.
            </p>

            <Link
              href="/products"
              className="inline-block mt-7 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Explore Products
            </Link>

          </div>


          {/* Right */}
          <div className="bg-white rounded-2xl shadow-lg p-10">

            <div className="text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-4xl">
                  🛍️
                </span>
              </div>

              <h3 className="text-2xl font-bold mt-5">
                Shop Smart. Shop Easy.
              </h3>

              <p className="text-gray-500 mt-3">
                Everything you need, all in one place.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Categories */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-gray-900">
              What We Offer
            </h2>

            <p className="text-gray-500 mt-3">
              Explore products across different categories
            </p>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

            <Category
              icon="👔"
              title="Men's"
            />

            <Category
              icon="👗"
              title="Women's"
            />

            <Category
              icon="📱"
              title="Electronics"
            />

            <Category
              icon="👟"
              title="Footwear"
            />

            <Category
              icon="🏠"
              title="Home & Kitchen"
            />

            <Category
              icon="💄"
              title="Beauty"
            />

          </div>

        </div>

      </section>


      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="bg-blue-600 rounded-2xl text-white p-10 md:p-14 text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            Our Mission
          </h2>

          <p className="max-w-3xl mx-auto mt-5 text-blue-100 text-lg leading-8">
            Our mission is to provide customers with a smooth,
            trusted and enjoyable online shopping experience by
            offering quality products at reasonable prices.
          </p>

        </div>

      </section>


      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold">
              Why Choose GMart?
            </h2>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <Feature
              icon="💰"
              title="Affordable Prices"
              text="Great products at competitive prices."
            />

            <Feature
              icon="🛒"
              title="Easy Shopping"
              text="Simple and convenient shopping experience."
            />

            <Feature
              icon="🚚"
              title="Fast Delivery"
              text="Reliable delivery for your orders."
            />

            <Feature
              icon="❤️"
              title="Customer First"
              text="Customer satisfaction is our priority."
            />

          </div>

        </div>

      </section>


      {/* Bottom CTA */}
      <section className="bg-white py-16 text-center">

        <h2 className="text-3xl font-bold">
          Ready to Start Shopping?
        </h2>

        <p className="text-gray-500 mt-3">
          Discover our latest products today.
        </p>

        <Link
          href="/products"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Shop Now
        </Link>

      </section>

    </div>
  );
};


// Category Component
const Category = ({ icon, title }) => {
  return (
    <div className="bg-gray-50 hover:bg-blue-50 border rounded-xl p-6 text-center transition">

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="font-semibold mt-3">
        {title}
      </h3>

    </div>
  );
};


// Feature Component
const Feature = ({ icon, title, text }) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="font-bold text-lg mt-4">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2">
        {text}
      </p>

    </div>
  );
};


export default AboutPage;

