// Dark logo for light backgrounds (footer main)
import logoDark from "../../../assets/Logo/elite-paws-logo-dark.png"
import { FaFacebook, FaYoutube, FaPhone, FaGlobe, FaPaw, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.scss"
import { RiInstagramFill } from "react-icons/ri"
import { useLocation } from "react-router-dom"
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io"
import footerDogImage from "../../../assets/Gallery/image-14.png"

export default function Footer() {
    const location = useLocation()

    return (
        <footer>
            {/* Main Footer Content - Light Background */}
            <div className="footer-main">
                <div className="footer-main-container">
                    {/* Top Section - Headline and Logo */}
                    <div className="footer-top-header">
                        <h1 className="footer-headline">Keeping Your Pets Healthy, Happy, and Groomed</h1>
                        <div className="footer-logo-section">
                            <img className="footer-logo-icon" src={logoDark} alt="Elite Paws Logo" />
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="footer-content-grid">
                        {/* Left Side - Dog Image */}
                        <div className="footer-image-section">
                            <img src={footerDogImage} alt="Happy Pet" className="footer-dog-image" />
                        </div>

                        <div className="footer-links-newsletter-div">
                            {/* Links Section */}
                            <div className="footer-links-div">
                                {/* Navigation Links */}
                                <div className="footer-links navigation-section">
                                    <h3 className="footer-section-title">Quick Links</h3>
                                    <ul className="footer-nav-column">
                                        <li><a className={location.pathname === "/" ? "active" : ""} href="/">Home</a></li>
                                        <li><a className={location.pathname === "/about-us" ? "active" : ""} href="/about-us">About</a></li>
                                        <li><a className={location.pathname === "/services" ? "active" : ""} href="/services">Services</a></li>
                                        <li><a className={location.pathname === "/contact-us" ? "active" : ""} href="/contact-us">Contact Us</a></li>
                                        {/* <li><a href="/faqs">FAQs</a></li>
                                        <li><a href="/gallery">Gallery</a></li>
                                        <li><a href="/articles">Articles</a></li> */}
                                    </ul>
                                </div>

                                {/* Services Links */}
                                <div className="footer-links service-section">
                                    <h3 className="footer-section-title">Services</h3>
                                    <ul className="footer-services-list">
                                        <li><a href="/services/grooming">Grooming</a></li>
                                        <li><a href="/services/boarding">Boarding</a></li>
                                        <li><a href="/services/training">Training</a></li>
                                    </ul>
                                </div>

                                {/* Contact Information */}
                                <div className="footer-links contact-section">
                                    <h3 className="footer-section-title">Contact Us</h3>
                                    <div className="footer-contact-item">
                                        <FaPhone className="contact-icon" />
                                        <span>0761-8523-398</span>
                                    </div>
                                    <div className="footer-contact-item">
                                        <FaGlobe className="contact-icon" />
                                        <span>www.hellodomainsite.com</span>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="footer-links address-section">
                                    <h3 className="footer-section-title">Address</h3>
                                    <div className="footer-contact-item">
                                        <FaMapMarkerAlt className="contact-icon" />
                                        <div>
                                            <p>KLLG St, No.99</p>
                                            <p>Pku City, ID 28289</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Newsletter Section */}
                            <div className="footer-newsletter-section">
                                <h3 className="footer-newsletter-title">Subscribe Newsletter</h3>
                                <div className="footer-newsletter-form">
                                    <input type="email" placeholder="Your Email" className="footer-newsletter-input" />
                                    <button className="footer-newsletter-btn">
                                        Send Message
                                        <IoIosArrowForward />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom - Dark Background */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="footer-copyright">Copyright © 2025 Rometheme. All Rights Reserved.</p>
                    <div className="footer-social-icons">
                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                        <a href="#" aria-label="Instagram"><RiInstagramFill /></a>
                        <a href="#" aria-label="Twitter"><FaXTwitter /></a>
                        <a href="#" aria-label="YouTube"><FaYoutube /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// {/* <a href="/" alt=""><img className='social' src={facebook} alt=""/></a>
// <a href="/" alt=""><img className='social' src={instagram} alt=""/></a>
// <a href="/" alt=""><img className='social' src={youtube} alt=""/></a>
// <a href="/" alt=""><img className='social' src={twitter} alt=""/></a>
// <a href="/" alt=""><img className='social' src={linkedin} alt=""/></a> */}