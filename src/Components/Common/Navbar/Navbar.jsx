import React, { useEffect, useState } from 'react'
import "./Navbar.scss"

// Dark logo for light backgrounds (header)
import logoDark from "../../../assets/Logo/elite-paws-logo-dark.png"

import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { services } from '../../../Datasets/services'
import HamburgerButton from '../../../Designs/HamburgerButton/HamburgerButton'

export default function Navbar(){
    const location = useLocation()
    // const [isAboutUsDropDownOpen, setIsAboutUsDropDownOpen] = useState(false)
    const [isServicesDropDownOpen, setIsServicesDropDownOpen] = useState(false)
    // const [isProductsDropDownOpen, setIsProductsDropDownOpen] = useState(false)
    const [ isSticky, setIsSticky ] = useState(false)

    const [mobileMenu, setMobileMenu] = useState(false)

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
    }

    const toggleServicesDropdown = (e) => {
        console.log('toggleServicesDropdown called');
        console.log('Current state before toggle:', isServicesDropDownOpen);
        e.preventDefault()
        e.stopPropagation()
        setIsServicesDropDownOpen(!isServicesDropDownOpen)
        console.log('State after toggle should be:', !isServicesDropDownOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
        if (location.pathname.startsWith("/blogs/")) {
            setIsSticky(true); // Keep sticky if pathname matches
        } else {
            window.scrollY > 100 ? setIsSticky(true) : mobileMenu ? setIsSticky(true) : setIsSticky(false); // Update based on scroll position otherwise
        }
        };

        // Add the scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Run once on mount to set initial sticky state
        handleScroll();

        // Cleanup the event listener on unmount
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname, mobileMenu]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isServicesDropDownOpen && !event.target.closest('li.dropdown-open')) {
                setIsServicesDropDownOpen(false);
            }
        };

        if (isServicesDropDownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isServicesDropDownOpen]);

    return (
        <>
        {mobileMenu && (
            <div className={`mobile-menu-overlay ${mobileMenu ? "active" : ""}`} onClick={toggleMenu}></div>
        )}
        <div className={`navbar ${isSticky ? "sticky" : ""} ${mobileMenu ? "mobile-menu-active" : ""}`}>
            <div className="logo-container">
                <a href="/" className="logo-link">
                    <img src={logoDark} alt="Elite Paws Logo" className="logo"/>
                </a>
            </div>
            <div className="mobile-menu-toggle">
                <HamburgerButton onClick={toggleMenu} />
            </div>
            <div className={`nav-links-div ${mobileMenu ? "menu-open" : ""}`}>
                <ul className={`menu-bar ${mobileMenu ? "mobile-menu-open" : "hide-mobile-menu"}`}>
                    <li><a href="/" className={location.pathname==="/" ? "" : ""}>Home</a></li>
                    <li><a href="/about-us" className={location.pathname==="/about-us" ? "" : ""}>About Us</a></li>
                    <li 
                        className={isServicesDropDownOpen ? "dropdown-open" : ""}
                        onClick={(e) => {
                            // Check if click is on the dropdown toggle
                            if (e.target.closest('.dropdown-toggle') || e.target.tagName === 'svg' || e.target.closest('svg')) {
                                // Only for mobile - toggle on click
                                if (window.innerWidth <= 1024) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleServicesDropdown(e);
                                }
                            }
                        }}>
                        Services
                        <span 
                            className="dropdown-toggle"
                            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', zIndex: 10, position: 'relative' }}>
                            <IoIosArrowDown />
                        </span>
                        {/* Desktop dropdown - shown on hover via CSS */}
                        <div className="dropdown services desktop-dropdown">
                            <ul>
                                {services.map((ele) => {
                                    return (
                                        <a href={`/services/${ele.slug}`} key={ele.id} className={location.pathname === `/services/${ele.slug}` ? "active" : ""}>
                                            <li>{ele.title}</li>
                                        </a>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* Mobile dropdown - shown on click with animation */}
                        <AnimatePresence>
                            {isServicesDropDownOpen && (
                                <motion.div 
                                    initial={{ 
                                        height: 0, 
                                        opacity: 0,
                                        marginTop: 0
                                    }}
                                    animate={{ 
                                        height: "auto", 
                                        opacity: 1,
                                        marginTop: 10
                                    }}
                                    exit={{ 
                                        height: 0, 
                                        opacity: 0,
                                        marginTop: 0
                                    }}
                                    transition={{ 
                                        height: {
                                            duration: 0.4,
                                            ease: [0.4, 0, 0.2, 1]
                                        },
                                        opacity: {
                                            duration: 0.3,
                                            ease: "easeInOut"
                                        },
                                        marginTop: {
                                            duration: 0.4,
                                            ease: [0.4, 0, 0.2, 1]
                                        }
                                    }}
                                    style={{ 
                                        overflow: 'hidden',
                                        willChange: 'height, opacity'
                                    }}
                                    className="dropdown services mobile-dropdown">
                                    <motion.ul
                                        initial={{ y: -10 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -10 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                            delay: 0.1
                                        }}>
                                        {services.map((ele) => {
                                            return (
                                                <li key={ele.id}>
                                                    <a href={`/services/${ele.slug}`} className={location.pathname === `/services/${ele.slug}` ? "active" : ""}>
                                                        {ele.title}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </motion.ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    <li><a href="/portfolio" className={location.pathname==="/portfolio" ? "" : ""}>Portfolio</a></li>
                    <li><a href="/blogs" className={location.pathname==="/blogs" ? "" : ""}>Blog</a></li>
                </ul>
            </div>
            <div className="button-div">
                <a href="/contact-us" className="btn btn-primary">
                    Contact Us
                    <IoIosArrowForward />
                </a>
            </div>
        </div>
        </>
    )
}