import React, { useState, useEffect } from 'react'
import "./HomeHero.scss"
import dogImage from "../../../assets/Images/dog-1.png"
import dog2Image from "../../../assets/Images/dog-2.jpg"
import dog3Image from "../../../assets/Images/dog-3.jpg"
import cat1Image from "../../../assets/Images/cat-1.avif"
import cat2Image from "../../../assets/Images/cat-2.jpg"
import { IoIosArrowForward } from "react-icons/io"
import { FaPlay, FaTimes } from "react-icons/fa"
import { FaPaw, FaHeart, FaBone } from "react-icons/fa"
import ReactPlayer from 'react-player'

export default function HomeHero() {
    const [isVideoOpen, setIsVideoOpen] = useState(false)
    const videoUrl = "https://www.youtube.com/watch?v=YpzjiS5M8V0"
    // Alternative: const videoUrl = "https://youtu.be/YpzjiS5M8V0"

    const handleVideoOpen = () => {
        setIsVideoOpen(true)
    }

    const handleVideoClose = () => {
        setIsVideoOpen(false)
    }

    // Close video on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isVideoOpen) {
                setIsVideoOpen(false)
            }
        }

        if (isVideoOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isVideoOpen])

    return (
        <section className="home-hero">
            {/* Background Icons */}
            <div className="hero-bg-icons">
                <FaPaw className="bg-icon bg-icon-1" />
                <FaBone className="bg-icon bg-icon-2" />
                <FaHeart className="bg-icon bg-icon-3" />
                <FaPaw className="bg-icon bg-icon-4" />
                {/* <div className="bg-icon bg-icon-4" >🐾</div> */}
                <FaHeart className="bg-icon bg-icon-5" />
            </div>
            <div className="home-hero-container">
                <div className="home-hero-content">
                    <div className="hero-left">
                        <div className="hero-badge">
                            <span className="paw-icon">🐾</span>
                            <span>Pet's Well-Being</span>
                        </div>
                        
                        <h1 className="hero-title">
                            Caring Your Pet from <span className="color">Nose to Tail</span>
                        </h1>
                        
                        <p className="hero-description">
                            Providing comprehensive care for your pet, ensuring their health, happiness, and comfort from nose to tail.
                        </p>
                        
                        <div className="hero-buttons">
                            <button className="btn btn-primary">
                                Contact Us
                                <IoIosArrowForward />
                            </button>
                        </div>
                        
                        <div className="hero-breeds">
                            <span className="breeds-label">Work With All Breeds</span>
                            <div className="breeds-avatars">
                                <div className="breed-avatar">
                                    <img src={dog2Image} alt="Dog" />
                                </div>
                                <div className="breed-avatar">
                                    <img src={dog3Image} alt="Dog" />
                                </div>
                                <div className="breed-avatar">
                                    <img src={cat1Image} alt="Cat" />
                                </div>
                                <div className="breed-avatar">
                                    <img src={cat2Image} alt="Cat" />
                                </div>
                            </div>
                            <button className="breeds-arrow-btn">
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                    
                    <div className="hero-right">
                        <div className="hero-image-wrapper">
                            <img src={dogImage} alt="Happy Dog" className="hero-dog-image" />
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">10th</span>
                                    <span className="stat-label">Years Experience</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">25+</span>
                                    <span className="stat-label">Medic Veterinary</span>
                                </div>
                            </div>
                            <button className="watch-video-btn" onClick={handleVideoOpen}>
                                <div className="video-btn-circle">
                                    <svg className="video-btn-text-rotating" viewBox="0 0 200 200" width="200" height="200">
                                        <defs>
                                            <path id="circle-path-1" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                                        </defs>
                                        <text fontSize="10" fontWeight="600" fill="#000" textAnchor="middle">
                                            <textPath href="#circle-path-1" startOffset="0%">
                                                Video • Watch Video • Watch Video • Watch Video • Watch Video • Watch Video • Watch 
                                            </textPath>
                                        </text>
                                    </svg>
                                    <FaPlay className="play-icon" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="video-modal-overlay" onClick={handleVideoClose}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="video-modal-close" onClick={handleVideoClose}>
                            <FaTimes />
                        </button>
                        <div className="video-player-wrapper">
                            {isVideoOpen && (
                                <ReactPlayer
                                    key={isVideoOpen ? 'video-player' : 'video-player-hidden'}
                                    url={videoUrl}
                                    playing={true}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    pip={false}
                                    stopOnUnmount={true}
                                    onReady={() => console.log('Player ready')}
                                    onStart={() => console.log('Video started')}
                                    onError={(error) => console.error('Player error:', error)}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                autoplay: 1,
                                                rel: 0,
                                                modestbranding: 1,
                                            }
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

