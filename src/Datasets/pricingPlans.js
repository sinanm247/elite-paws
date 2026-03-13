import { FaPaw, FaCrown, FaShower, FaCut, FaSpa, FaGem, FaCheck, FaTimes, FaStethoscope, FaBath, FaHeart, FaUserFriends, FaStar } from "react-icons/fa"
import { FaScissors } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io"

export const pricingPlans = [
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
                    // "Full body haircut (breed standard or owner preference)",
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