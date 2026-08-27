import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="mt-6 w-full h-auto md:h-[70vh] bg-black text-white">
                <div className="flex flex-col ml-10 md:justify-evenly md:flex-row item-center gap-x-40" data-aos="fade-up">
                    <div className="mt-6">
                        <h1 className="text-xl leading-12">Customer Support</h1>
                        <h1 className="text-lg text-gray-300">Phone/WhatsApp: <span className="text-base block md:inline"> +7294033404</span> </h1>
                        <h1 className="text-lg text-gray-300 md:mt-0 mt-3">
                            Address: Plot 33 Road no 4 Near <br />
                            <span className="block md:inline">
                                {" "}Geeta Vikas School Shivaji Nagar <br />
                            </span>
                            
                        </h1>
                        <h1 className="text-lg mt-3 md:mt-0 md:leading-15 text-white">
                            Working Hours: <span className="text-base text-gray-300">Mon – Sat, 11:00 AM –</span> </h1>
                             <span className='block md:inline'>7:00 PM</span>
                    </div>

                    <div className="mt-6  leading-10 text-gray-300">
                        <h1 className="text-xl leading-12 text-white">Legal links</h1>
                        <p>About us</p>
                        <p>Contact Us</p>
                        <p>privacy Policy</p>
                        <p>Shipping Policy</p>
                        <p>Term Of Service</p>
                        <p>Return & Refund Policy</p>
                    </div>

                    <div className="mt-6 leading-10 text-gray-300">
                        <h1 className="text-white">OUR COMMITMENT</h1>
                        <p>✓ High-Quality Craftsmanship</p>
                        <p>✓ Customer Support</p>
                        <p>✓ Secured Transactions</p>
                        <p>✓ Fashion With Purpose</p>
                    </div>
                </div>

                <div className="flex text-center md:mt-0 mt-10 flex-col md:justify-around md:flex-row gap-10 md:gap-60" data-aos="fade-up">
                    <div>
                        <h1 className="text-lg">Subscribe to our emails</h1>
                        <input className="2xs md:w-xs py-2 border-1 border-solid mt-4" type="text" placeholder="Email" />
                    </div>

                    <div className="flex list-none justify-center gap-5">
                        <a href="https://www.facebook.com/">
                            <li><i className="fa-brands fa-facebook"></i></li>
                        </a>
                        <a href="https://www.instagram.com/">
                            <li><i className="fa-brands fa-instagram"></i></li>
                        </a>
                    </div>
                </div>
                <hr className="mt-15 text-gray-600" />
                <div className="flex justify-center md:justify-start py-4 md:py-0 md:mt-7">
                    <p className="text-sm md:ml-56 text-gray-500">© 2026, powered by zamart  Privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
