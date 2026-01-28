import React from 'react'
import "./AboutUs.scss"
import image1 from "../../../assets/Gallery/image-1.webp"
import image7 from "../../../assets/Gallery/image-8.png"
import dog2Image from "../../../assets/Images/dog-2.jpg"
import dog3Image from "../../../assets/Images/dog-3.jpg"
import cat1Image from "../../../assets/Images/cat-1.avif"
import cat2Image from "../../../assets/Images/cat-2.jpg"
import { IoIosArrowForward } from "react-icons/io"
import { FaPaw, FaBone } from "react-icons/fa"

export default function AboutUs() {
    return (
        <section className="about-us-section">
            <div className="about-us-container">
                <div className="about-us-content">
                    {/* Left Section - Cat Image with Testimonial */}
                    <div className="about-left">
                        <div className="about-image-card">
                            <img src={image1} alt="Veterinarian with Cat" className="about-image" />
                        </div>
                        <div className="testimonial-section">
                            <div className="top-section">
                                <div className="client-avatars">
                                    <div className="avatar">
                                        <img src={dog2Image} alt="Dog" />
                                    </div>
                                    <div className="avatar">
                                        <img src={dog3Image} alt="Dog" />
                                    </div>
                                    <div className="avatar">
                                        <img src={cat1Image} alt="Cat" />
                                    </div>
                                    <div className="avatar">
                                        <img src={cat2Image} alt="Cat" />
                                    </div>
                                </div>
                                <div className="testimonial-stats">
                                    <span className="stat-percentage">98%</span>
                                </div>
                            </div>
                            <span className="stat-label">Happy Client</span>
                        </div>
                    </div>

                    {/* Center Section - Person with Dog */}
                    <div className="about-center">
                        <div className="about-image-card center-card">
                            <img src={image7} alt="Veterinarian with Dog" className="about-image" />
                        </div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="about-right">
                        <div className="about-header">
                            <FaPaw className="paw-icon" />
                            <span>About Us</span>
                        </div>
                        
                        <h2 className="about-title">The Healthiest Pets Start Here</h2>
                        
                        <p className="about-description">
                            Providing comprehensive care for your pet, ensuring their health, happiness, and comfort from nose to tail.
                        </p>
                        
                        <ul className="about-features">
                            <li>
                                <FaBone className="bone-icon" />
                                <span>Pet gets top-notch care, tailored to their unique needs.</span>
                            </li>
                            <li>
                                <FaBone className="bone-icon" />
                                <span>We offer a full range of services to keep your pet happy.</span>
                            </li>
                            <li>
                                <FaBone className="bone-icon" />
                                <span>Welcoming space for pets and owners alike.</span>
                            </li>
                            <li>
                                <FaBone className="bone-icon" />
                                <span>We treat every pet like family, loving care with every touch.</span>
                            </li>
                        </ul>
                        
                        <button className="btn btn-primary">
                            Contact Us
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

