import React from 'react'
import "./FeaturesSlide.scss"
import { FaHeartbeat, FaCut, FaCertificate, FaShieldAlt } from "react-icons/fa"

export default function FeaturesSlide() {
    const features = [
        {
            id: 1,
            text: "Dedicated to Animal Health.",
            icon: FaHeartbeat
        },
        {
            id: 2,
            text: "Grooming with Love and Expertise.",
            icon: FaCut
        },
        {
            id: 3,
            text: "Certification You Can Trust",
            icon: FaCertificate
        },
        {
            id: 4,
            text: "Ensuring Quality Care For You Pet.",
            icon: FaShieldAlt
        }
    ]

    // Duplicate features for seamless loop
    const duplicatedFeatures = [...features, ...features]

    return (
        <section className="features-slide-section">
            <div className="features-slide-container">
                <div className="features-slide-wrapper">
                    <div className="features-slide-track">
                        {duplicatedFeatures.map((feature, index) => {
                            const IconComponent = feature.icon
                            
                            return (
                                <div
                                    key={`${feature.id}-${index}`}
                                    className="feature-slide"
                                >
                                    <div className="feature-icon">
                                        <IconComponent />
                                    </div>
                                    <p className="feature-text">{feature.text}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

