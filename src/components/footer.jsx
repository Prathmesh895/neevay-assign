import React from "react";
import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

const socialLinks = [
  { id: 1, icon: <FaInstagram size={24} />, href: "#" },
  { id: 2, icon: <FaLinkedin size={24} />, href: "#" },
  { id: 3, icon: <FaYoutube size={24} />, href: "#" },
  { id: 4, icon: <FaTwitter size={24} />, href: "#" },
];

const companyLinks = [
  { id: 1, text: "About Us", href: "#" },
  { id: 2, text: "Blog", href: "#" },
  { id: 3, text: "Legal", href: "#" },
];

const solutionsLinks = [
  { id: 1, text: "For Construction Companies", href: "#" },
  { id: 2, text: "For Vendors", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-black py-8 text-white  lg:px-32 font-trade-gothic">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Side - Logo and Description */}
          <div className="mb-8 md:mb-0 md:w-1/2">
            <img
              src="https://storagereponeevaydevcdn.blob.core.windows.net/business/neevay.svg"
              alt="Neevay"
              className="w-[112px] h-[34px] md:h-[39px] md:w-auto"
            />
            <p className="text-gray-300 mt-4 lg:mr-20">
              Neevay aims to revolutionize the construction industry by enhancing the lives of its workers, fostering technological innovation, and building a global community. Our platform connects all project stakeholders, providing unlimited support and a construction-focused business model.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ id, icon, href }) => (
                <a key={id} href={href} className="text-white hover:text-gray-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="mb-8 md:mb-0 md:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map(({ id, text, href }) => (
                <li key={id}>
                  <a href={href} className="text-white hover:text-gray-300">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutionsLinks.map(({ id, text, href }) => (
                <li key={id}>
                  <a href={href} className="text-white hover:text-gray-300">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright and Links */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 Tathaatvam Technologies Pvt Ltd</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Notice</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
