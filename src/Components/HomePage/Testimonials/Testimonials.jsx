import React, { useState, useEffect } from 'react'
import "./Testimonials.scss"
import { FaPaw } from "react-icons/fa"
import { FaQuoteLeft } from "react-icons/fa6";
import testimonialImage from "../../../assets/Gallery/image-13.webp"
import dog2Image from "../../../assets/Images/dog-2.jpg"
import dog3Image from "../../../assets/Images/dog-3.jpg"
import cat1Image from "../../../assets/Images/cat-1.avif"

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            quote: "We can't thank the veterinary team enough for the care they gave our dog, Charlie. After a tough surgery, they went above and beyond to ensure his recovery was smooth. Their follow-up care and support were outstanding!",
            name: "Rachel Emily",
            designation: "Designation"
        },
        {
            id: 2,
            quote: "The grooming services here are exceptional. My cat always comes back looking and feeling amazing. The staff truly cares about every pet!",
            name: "Sarah Johnson",
            designation: "Pet Owner"
        },
        {
            id: 3,
            quote: "Professional, caring, and always available when we need them. Our pets love visiting Elite Paws!",
            name: "Michael Chen",
            designation: "Happy Customer"
        }
    ]

    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    // Auto-sliding functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length)
        }, 4000) // Change every 4 seconds

        return () => clearInterval(interval)
    }, [testimonials.length])

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-content">
                    {/* Left Side - Image */}
                    <div className="testimonials-left">
                        <div className="testimonials-image-wrapper center-card">
                            <img src={testimonialImage} alt="Happy Pet Owner" className="testimonials-image" />
                        </div>
                    </div>
                    

                    {/* Right Side - Content */}
                    <div className="testimonials-right">
                        <div className="testimonials-header">
                            <div className="testimonials-logo">
                                <FaPaw className="paw-icon" />
                            </div>
                            <span className="testimonials-title-small">Testimonials</span>
                        </div>

                        <h2 className="testimonials-main-title">
                            Why Pet Owners Trust Us with Their Pet
                        </h2>

                        <p className="testimonials-description">
                            With compassionate care, expert grooming, and a focus on your pet's wellbeing, we provide the best for your fur babies every time they visit.
                        </p>

                        <div className="testimonial-quote-section">
                            <FaQuoteLeft className="quote-icon" />
                            <p className="testimonial-quote">
                                {testimonials[currentTestimonial].quote}
                            </p>
                        </div>

                        <div className="author-happy-client-div">
                            <div className="testimonial-footer">
                                <div className="testimonial-author">
                                    <p className="author-name">{testimonials[currentTestimonial].name}</p>
                                    <p className="author-designation">{testimonials[currentTestimonial].designation}</p>
                                </div>

                                {/* Pagination Dots */}
                                <div className="testimonial-dots">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                                            onClick={() => setCurrentTestimonial(index)}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Happy Client Section */}
                            <div className="happy-client-section">
                                <div className="client-avatars">
                                    <div className="avatar">
                                        <img src={dog2Image} alt="Happy Client" />
                                    </div>
                                    <div className="avatar">
                                        <img src={dog3Image} alt="Happy Client" />
                                    </div>
                                    <div className="avatar">
                                        <img src={cat1Image} alt="Happy Client" />
                                    </div>
                                </div>
                                <div className="client-stats">
                                    <span className="stat-percentage">98%</span>
                                    <span className="stat-label">Happy Client</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

