import image1 from '../assets/Services/Image-1.jpeg';
import image2 from '../assets/New-Gallery/Image-3.jpeg';
import image3 from '../assets/New-Gallery/Image-11.jpeg';

export const services = [
  {
    id: 1,
    title: 'Elite Ozone Therapy Treatment',
    subtitle: 'Skin, coat & comfort support',
    price: '250 AED + VAT',
    duration: '20–30 mins',
    image: image1,
    description:
      'Advanced treatment using ozone technology to deeply cleanse the skin, reduce odor and support overall coat and skin condition while providing a calming and relaxing effect during the grooming process.',
    includesDetailed: [
      { title: 'Coat support treatment', time: '5 min', desc: 'Improves coat softness and manageability.' },
      {
        title: 'Ozone bath application',
        time: '8 min',
        desc: 'Deep antibacterial and antifungal cleansing. Relaxation effect helps reduce stress—especially beneficial for senior or sensitive pets.',
      },
      { title: 'Light dry & brushing', time: '18 min', desc: 'Clean and refreshed finish.' },
    ],
  },
  {
    id: 2,
    title: 'Elite Puppy Introduction Groom',
    subtitle: 'First grooming experience for puppies',
    price: '231 AED + VAT',
    duration: '45–55 mins',
    image: image2,
    description:
      'Gentle grooming service designed to introduce a puppy to the grooming process in a calm and positive way.',
    includesDetailed: [
      { title: 'Warm bath with puppy-safe shampoo', time: '8 min', desc: 'Gentle cleansing adapted to sensitive puppy skin.' },
      { title: 'Low-noise blow dry', time: '15 min', desc: 'Soft drying with minimal stress and controlled airflow.' },
      { title: 'Coat brushing', time: '4 min', desc: 'Light brushing to remove loose hair and prevent tangles.' },
      { title: 'Teeth brushing', time: '2 min', desc: 'Introduction to oral care using pet-safe toothpaste.' },
      { title: 'Eye area tidy up', time: '2 min', desc: 'Gentle trimming around the eyes for hygiene.' },
      { title: 'Belly trim', time: '3 min', desc: 'Light hygienic trimming of the belly area.' },
      { title: 'Paw pad trim', time: '2 min', desc: 'Removal of excess hair between paw pads.' },
      { title: 'Sanitary trim', time: '2 min', desc: 'Hygienic trimming around sensitive areas.' },
      { title: 'Nail trimming & filing', time: '3 min', desc: 'Careful nail clipping to introduce the process.' },
      { title: 'Paw balm treatment', time: '1 min', desc: 'Moisturizing protection for puppy pads.' },
      { title: 'Handling & desensitization', time: '5 min', desc: 'Exposure to grooming tools and sounds.' },
      { title: 'Bandana finish', time: '1 min', desc: 'Stylish finishing touch.' },
      { title: 'Finishing cologne (optional)', time: '1 min', desc: 'Light fragrance only if suitable.' },
    ],
  },
  {
    id: 3,
    title: 'Elite Coat Recovery Treatment',
    subtitle: 'Detangling & coat restoration service',
    price: '150–250 AED + VAT',
    duration: '45–60 mins',
    image: image3,
    description:
      'Specialized service for matted or tangled coats, designed to restore the coat while preserving length whenever possible.',
    includesDetailed: [
      { title: 'Coat assessment', time: '3 min', desc: 'Evaluation of coat condition and matting level.' },
      { title: 'Reconstructor spray application', time: '3 min', desc: 'Softens knots and protects the hair fiber.' },
      { title: 'Detangling mask treatment', time: '8 min', desc: 'Deep conditioning to loosen tangles.' },
      { title: 'Targeted de-matting', time: '15–20 min', desc: 'Careful removal of knots using professional techniques.' },
      { title: 'Warm bath', time: '8 min', desc: 'Cleansing after detangling process.' },
      { title: 'Conditioning rinse', time: '5 min', desc: 'Hydration to smooth and protect the coat.' },
      { title: 'Blow dry & brushing', time: '15–20 min', desc: 'Coat separation and volume recovery.' },
      { title: 'Coat alignment finish', time: '5 min', desc: 'Final brushing for a smooth, fluffy result.' },
    ],
  },
];

