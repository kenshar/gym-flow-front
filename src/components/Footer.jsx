import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl gradient-text mb-4">GYMFLOW</h3>
            <p className="font-body text-muted-foreground">
              Transform your body and mind with the ultimate fitness experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="font-body text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="font-body text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("upcoming")}
                  className="font-body text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Upcoming
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 font-body text-muted-foreground">
                <FiPhone className="w-5 h-5 text-primary" />
                +254 (712) 345-678
              </li>
              <li className="flex items-center gap-3 font-body text-muted-foreground">
                <FiMail className="w-5 h-5 text-primary" />
                gymflow@gmail.com
              </li>
              <li className="flex items-center gap-3 font-body text-muted-foreground">
                <FiMapPin className="w-5 h-5 text-primary" />
                123 Mwananchi ST, NBO 00100
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-xl mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300 group"
              >
                <FiInstagram className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300 group"
              >
                <FiFacebook className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="font-body text-muted-foreground">© 2026 GymFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
