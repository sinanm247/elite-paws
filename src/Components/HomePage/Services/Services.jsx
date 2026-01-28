import React from 'react'
import "./Services.scss"
import { IoIosArrowForward } from "react-icons/io"
import image1 from "../../../assets/Gallery/image-11.jpg"
import image2 from "../../../assets/Gallery/image-2.webp"
import image3 from "../../../assets/Gallery/image-5.avif"
import { FaPaw } from 'react-icons/fa'

export default function Services() {
    const services = [
        {
            id: 1,
            title: "Wellness Check-ups",
            description: "Monitor your pet's health, prevent diseases, and keep them in top shape.",
            image: image1
        },
        {
            id: 2,
            title: "Immunizations",
            description: "Protecting your pet from common diseases with essential vaccinations.",
            image: image2
        },
        {
            id: 3,
            title: "Dental Care & Cleanings",
            description: "Professional teeth cleaning, check-ups, and dental treatments to maintain oral health.",
            image: image3
        }
    ]

    return (
        <section className="services-section">
            <div className="services-container">
                {/* Header Section */}
                <div className="services-header">
                    <div className="services-header-content">
                        <div className="services-header-top">
                            <div className="services-logo">
                                <FaPaw className="paw-icon" />
                                {/* <FaPaw className="paw-icon" /> */}
                            </div>
                            <span className="services-title-small">Pet's Health</span>
                        </div>
                        <h2 className="services-main-title">
                            Expert Care for Every Stage<br/> of Your Pet's Life
                        </h2>
                        <p className="services-description">
                            From puppies to seniors, we provide specialized care at every stage, ensuring your pet's health and happiness throughout their life.
                        </p>
                    </div>
                </div>

                {/* Services Cards */}
                <div className="services-cards">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-card-content">
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                            <div className="service-image-wrapper">
                                <img src={service.image} alt={service.title} className="service-image" />
                                <button className="service-card-button" aria-label={`Learn more about ${service.title}`}>
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* All Services Button */}
                <div className="services-footer">
                    <button className="btn btn-secondary">
                        All Services
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </section>
    )
}

