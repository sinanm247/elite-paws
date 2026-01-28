import React from 'react'
import "./PricingPlans.scss"
import { FaPaw, FaCrown, FaShower, FaCut, FaSpa, FaGem, FaCheck, FaTimes, FaStethoscope, FaBath, FaHeart, FaUserFriends, FaStar } from "react-icons/fa"
import { FaScissors } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io"

export default function PricingPlans() {
    const plans = [
        {
            id: 1,
            name: "Mini Makeover",
            subtitle: "Quick maintenance between full grooms",
            price: "50 AED",
            duration: "15 mins",
            time: "7:00 PM – 10:30 PM",
            icon: FaCrown,
            includes: [
                "Teeth brushing",
                "Fur / hair brushing"
            ],
            notIncluded: [
                "Bath",
                "Blow dry",
                "Haircut"
            ],
            note: "Quick maintenance service between full grooms."
        },
        {
            id: 2,
            name: "Wash & Blow",
            subtitle: "All sizes welcome",
            price: "123 AED",
            secondaryPrice: "Double-Coated Breeds: 246 AED",
            icon: FaShower,
            includes: [
                "Bath",
                "Blow dry",
                "Professional Hydra shampoo"
            ]
        },
        {
            id: 3,
            name: "Elite Makeover",
            subtitle: "Complete styling without bath",
            price: "123 AED",
            icon: FaPaw,
            includesGroups: [
                {
                    title: "Grooming & Styling",
                    items: [
                        "Face shaping & detailing",
                        "Sanitary trim",
                        "Paw pad trim",
                        "Tail styling"
                    ]
                },
                {
                    title: "Hygiene & Care",
                    items: [
                        "Nail trimming (filing included)",
                        "Ear cleaning",
                        "Teeth brushing",
                        "Eye & tear stain cleaning"
                    ]
                },
                {
                    title: "Finishing Touch",
                    items: [
                        "Pet-safe cologne",
                        "Paw or nose balm",
                        "Bow or bandana",
                        "Final quality check & touch-ups",
                        "Light de-matting"
                    ]
                }
            ],
            notIncluded: [
                "Bath",
                "Blow dry"
            ]
        },
        {
            id: 4,
            name: "Full Grooming",
            subtitle: "Complete head-to-tail transformation",
            price: "321 AED",
            icon: FaCut,
            includesGroups: [
                {
                    title: "Health & Coat Visual Check",
                    items: [
                        "Overall coat & skin assessment",
                        "Matting level review",
                        "Grooming approach adjusted to pet needs"
                    ]
                },
                {
                    title: "Bath & Coat Treatment",
                    items: [
                        "Premium coat-specific shampoo",
                        "Deep conditioning treatment",
                        "Professional blow-dry & fluff",
                        "Standard brush-out (no de-shedding)"
                    ]
                },
                {
                    title: "Full Groom & Styling",
                    items: [
                        "Full body haircut (breed standard or owner preference)",
                        "Face shaping & detailing",
                        "Sanitary trim",
                        "Paw pad trim",
                        "Tail styling"
                    ]
                },
                {
                    title: "Hygiene & Care",
                    items: [
                        "Nail trimming (filing included)",
                        "Ear cleaning",
                        "Teeth brushing",
                        "Eye & tear stain cleaning"
                    ]
                }
            ],
            notIncluded: [
                "De-shedding",
                "Spa finishing treatments"
            ]
        },
        {
            id: 5,
            name: "Elite Care Package",
            subtitle: "Premium spa experience for your pet",
            price: "699 AED",
            icon: FaSpa,
            includesGroups: [
                {
                    title: "Health & Coat Visual Check",
                    items: [
                        "In-depth skin & coat assessment",
                        "Shedding, matting & sensitivity analysis"
                    ]
                },
                {
                    title: "Advanced Bath & Coat Treatment",
                    items: [
                        "Premium coat-specific shampoo",
                        "Deep conditioning treatment",
                        "Professional blow-dry & fluff",
                        "Full de-shedding treatment (if required)"
                    ]
                },
                {
                    title: "Full Groom & Styling",
                    items: [
                        "Precision full body haircut",
                        "Face shaping & detailing",
                        "Sanitary, paw pad & tail trimming"
                    ]
                },
                {
                    title: "Hygiene & Care",
                    items: [
                        "Nail trimming (filing included)",
                        "Ear cleaning (plucking if required)",
                        "Teeth brushing",
                        "Eye & tear stain cleaning"
                    ]
                },
                {
                    title: "Finishing Touch",
                    items: [
                        "Pet-safe cologne",
                        "Paw or nose balm",
                        "Bow or bandana",
                        "Final quality check & detailed touch-ups"
                    ]
                },
                {
                    title: "Additional Benefits",
                    items: [
                        "Spa paw treatment",
                        "Blueberry facial",
                        "Optional aromatherapy",
                        "Memory photo included"
                    ]
                }
            ]
        },
        {
            id: 6,
            name: "Elite Experience",
            subtitle: "The ultimate luxury grooming journey",
            price: "1,123 AED",
            icon: FaGem,
            includesGroups: [
                {
                    title: "Everything in Elite Care, Plus",
                    items: [
                        "Sun, dust & salty water coat treatment",
                        "Simple shedding treatment (gentle, maintenance-focused)",
                        "Alopecia-support grooming treatment (cosmetic, non-medical; coat recovery focus)"
                    ]
                },
                {
                    title: "Personalised Experience",
                    items: [
                        "Extended one-on-one grooming time",
                        "Calm, low-stress handling",
                        "Extra attention to comfort & behaviour"
                    ]
                },
                {
                    title: "Recommended For",
                    items: [
                        "Senior dogs, Puppies (first grooming experience), Dogs with special needs or anxiety"
                    ]
                }
            ],
            bonus: "Video recap of the grooming session"
        }
    ]

    // Function to get icon for group title
    const getGroupIcon = (title) => {
        const titleLower = title.toLowerCase()
        if (titleLower.includes('grooming') || titleLower.includes('styling')) return FaScissors
        if (titleLower.includes('hygiene') || titleLower.includes('care')) return FaHeart
        if (titleLower.includes('health') || titleLower.includes('coat') || titleLower.includes('visual')) return FaStethoscope
        if (titleLower.includes('bath') || titleLower.includes('treatment')) return FaBath
        if (titleLower.includes('finishing') || titleLower.includes('touch')) return IoSparkles
        if (titleLower.includes('additional') || titleLower.includes('benefits')) return FaGem
        if (titleLower.includes('personalised') || titleLower.includes('experience')) return FaUserFriends
        if (titleLower.includes('recommended') || titleLower.includes('for')) return FaStar
        return FaCheck // Default icon
    }

    return (
        <section className="pricing-plans-section">
            <div className="pricing-plans-container">
                {/* Header Section */}
                <div className="pricing-header">
                    <div className="pricing-header-content">
                        <div className="pricing-header-top">
                            <div className="pricing-logo">
                                <FaPaw className="paw-icon" />
                            </div>
                            <span className="pricing-title-small">Pricing Plans</span>
                        </div>

                        <h2 className="pricing-main-title">
                            The Right Plan for Your<br/> Pet's Needs
                        </h2>

                        <p className="pricing-description">
                            Perfect care plan tailored to your pet's health and grooming, ensuring they receive the best care at the right price.
                        </p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="pricing-cards">
                    {plans.map((plan) => {
                        const IconComponent = plan.icon
                        return (
                            <div key={plan.id} className="pricing-card">
                                <div className="pricing-card-icon">
                                    <IconComponent />
                                </div>

                                <div className="pricing-card-body">
                                    <h3 className="pricing-card-name">{plan.name}</h3>

                                    {plan.subtitle && (
                                        <p className="pricing-card-subtitle">{plan.subtitle}</p>
                                    )}

                                    <div className="pricing-card-price">
                                        <span className="price-amount">{plan.price}</span>
                                    </div>

                                    {plan.secondaryPrice && (
                                        <p className="pricing-card-secondary-price">{plan.secondaryPrice}</p>
                                    )}

                                    {(plan.duration || plan.time) && (
                                        <div className="pricing-meta">
                                            {plan.duration && <span className="meta-pill">{plan.duration}</span>}
                                            {plan.time && <span className="meta-pill">{plan.time}</span>}
                                        </div>
                                    )}

                                    {plan.note && (
                                        <p className="pricing-card-description">{plan.note}</p>
                                    )}

                                    <div className="hr-line"></div>

                                    {plan.includesGroups?.length ? (
                                        <div className="pricing-list-block">
                                            <div className="pricing-list-title">Includes</div>

                                            <div className="pricing-groups">
                                                {plan.includesGroups.map((group, gi) => {
                                                    const GroupIconComponent = getGroupIcon(group.title)
                                                    return (
                                                        <div key={gi} className="pricing-group">
                                                            <div className="pricing-group-title">
                                                                <GroupIconComponent className="group-title-icon" />
                                                                <span>{group.title}</span>
                                                            </div>
                                                            <ul className="pricing-features">
                                                                {group.items.map((item, ii) => (
                                                                    <li key={ii} className="pricing-feature-item">
                                                                        <FaCheck className="feature-check-icon" />
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ) : plan.includes?.length ? (
                                        <div className="pricing-list-block">
                                            <div className="pricing-list-title">Includes</div>
                                            <ul className="pricing-features">
                                                {plan.includes.map((item, index) => (
                                                    <li key={index} className="pricing-feature-item">
                                                        <FaCheck className="feature-check-icon" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}

                                    {plan.bonus ? (
                                        <div className="pricing-bonus">
                                            <div className="pricing-bonus-title">Bonus</div>
                                            <div className="pricing-bonus-text">{plan.bonus}</div>
                                        </div>
                                    ) : null}

                                    {plan.notIncluded?.length ? (
                                        <div className="pricing-list-block not-included">
                                            <div className="pricing-list-title">Not Included</div>
                                            <ul className="pricing-features">
                                                {plan.notIncluded.map((item, index) => (
                                                    <li key={index} className="pricing-feature-item">
                                                        <FaTimes className="feature-times-icon" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="pricing-card-footer">
                                    <button className="btn btn-primary">
                                        Make Appointment
                                        <IoIosArrowForward />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

