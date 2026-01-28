import React from 'react'
import "./TrustUs.scss"
import vetImage from "../../../assets/Gallery/image-9.png"
import award1 from "../../../assets/Icons/award-1.png"
import award2 from "../../../assets/Icons/award-2.png"
import award4 from "../../../assets/Icons/award-4.png"
import { FaBone, FaHeart, FaPaw } from "react-icons/fa"

export default function TrustUs() {
    const awards = [
        {
            id: 1,
            image: award1,
            title: "ULTRA PRESTIGIOUS BEST OF THE WORLD",
            certification: "Certified Veterinary Technician",
            date: "January 15, 2024"
        },
        {
            id: 2,
            image: award2,
            title: "ULTIMATE WINNER ULTRA BEST PERFORMANCE",
            certification: "Certified Pet Grooming Specialist",
            date: "March 22, 2023"
        },
        {
            id: 3,
            image: award4,
            title: "HYPER BEST AWARD WINNING",
            certification: "Veterinary Care Certification",
            date: "September 5, 2023"
        }
    ]

    return (
        <section className="trust-us-section">
            <div className="trust-us-container">
                <div className="trust-us-content">
                    {/* Left Side - Text and Awards */}
                    <div className="trust-left">
                        <div className="trust-header">
                            <div className="trust-logo">
                                <FaPaw className="paw-icon" />
                                {/* <FaPaw className="paw-icon" /> */}
                            </div>
                            <span className="trust-title-small">Trust Us</span>
                        </div>

                        <h2 className="trust-main-title">
                            Compassionate Care for Every Stage of Your Pet's Life
                        </h2>

                        <p className="trust-description">
                            We provide compassionate care tailored to your pet's unique needs at every stage of life, ensuring their health, happiness, and comfort.
                        </p>

                        <div className="awards-list">
                            {awards.map((award, index) => (
                                <React.Fragment key={award.id}>
                                    {index > 0 && <div className="award-divider"></div>}
                                    <div className="award-item">
                                        <div className="award-icon">
                                            <img src={award.image} alt={award.title} />
                                        </div>
                                        <div className="award-content">
                                            <h3 className="award-title">{award.title}</h3>
                                            <div className="award-stars">★★★★★</div>
                                            <p className="award-certification">{award.certification}</p>
                                            <p className="award-date">{award.date}</p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Veterinarian Image */}
                    <div className="trust-right">
                        <div className="trust-image-wrapper">
                            <img src={vetImage} alt="Veterinarian" className="trust-vet-image" />
                            <div className="trust-bg-elements">
                                <FaPaw className="bg-paw" />
                                <FaHeart className="bg-wave"/>
                                <FaBone className="bg-bone"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

