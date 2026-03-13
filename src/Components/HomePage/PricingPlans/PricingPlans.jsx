import React, { useState } from 'react'
import "./PricingPlans.scss"
import { FaPaw, FaCrown, FaShower, FaCut, FaSpa, FaGem, FaCheck, FaTimes, FaStethoscope, FaBath, FaHeart, FaUserFriends, FaStar } from "react-icons/fa"
import { FaScissors } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io"
import { pricingPlans } from '../../../Datasets/pricingPlans';

const COLUMNS_PER_ROW = 3

export default function PricingPlans() {
    const [expandedRowIndex, setExpandedRowIndex] = useState(null)

    const toggleRow = (rowIndex) => {
        setExpandedRowIndex((prev) => (prev === rowIndex ? null : rowIndex))
    }

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
                    {pricingPlans.map((plan, index) => {
                        const IconComponent = plan.icon
                        const rowIndex = Math.floor(index / COLUMNS_PER_ROW)
                        const isExpanded = expandedRowIndex === rowIndex
                        return (
                            <div key={plan.id} className={`pricing-card ${isExpanded ? 'pricing-card--expanded' : ''}`}>
                                <div className="pricing-card-icon">
                                    <IconComponent />
                                </div>

                                <div className="pricing-card-body">
                                    <div className={`pricing-card-content ${isExpanded ? 'pricing-card-content--expanded' : ''}`}>
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
                                </div>

                                <div className="pricing-card-actions">
                                    <button
                                        type="button"
                                        className="pricing-see-more-btn"
                                        onClick={() => toggleRow(rowIndex)}
                                        aria-expanded={isExpanded}
                                    >
                                        {isExpanded ? 'See less' : 'See more'}
                                    </button>
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

