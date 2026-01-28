import React from 'react'
import "./CTASection.scss"
import { FaPaw, FaBone, FaPlay } from "react-icons/fa"
import { IoIosArrowForward } from "react-icons/io"
import ctaImage from "../../../assets/Gallery/image-12.png"

export default function CTASection() {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-banner">
                    {/* Decorative Background Elements */}
                    <div className="cta-bg-elements">
                        <FaPaw className="bg-paw" />
                        <FaBone className="bg-bone" />
                        <div className="bg-wave"></div>
                    </div>

                    {/* Left Side - Dog Image */}
                    <div className="cta-image-wrapper">
                        <img src={ctaImage} alt="Happy Pet" className="cta-dog-image" />
                    </div>

                    {/* Right Side - Content */}
                    <div className="cta-content">
                        <div className="cta-header">
                            <div className="cta-logo">
                                <FaPaw className="paw-icon" />
                                <span className="cta-logo-text">The Best Care</span>
                            </div>
                        </div>

                        <h2 className="cta-headline">
                            New Client? Get 10% Off Your First Visit!
                        </h2>

                        <p className="cta-description">
                            New here? Enjoy 10% off your first visit—because your pet deserves the best care right from the start!
                        </p>

                        <div className="cta-buttons">
                            <button className="btn btn-primary cta-appointment-btn">
                                Make Appointment
                                <IoIosArrowForward />
                            </button>
                            <button className="cta-play-btn" aria-label="Play video">
                                <FaPlay />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

