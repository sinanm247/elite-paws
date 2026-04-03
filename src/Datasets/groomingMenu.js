import image1 from '../assets/Grooming/Image-1.jpeg';
import image2 from '../assets/Grooming/Image-2.jpeg';
import image3 from '../assets/Grooming/Image-3.jpeg';
import image4 from '../assets/Grooming/Image-4.jpeg';
import image5 from '../assets/Grooming/Image-5.jpeg';

export const groomingMenu = [
  {
    id: 1,
    name: 'Mini Makeover',
    subtitle: 'Quick maintenance between full grooms',
    price: '65 AED',
    image: image1,
    duration: '15 mins',
    time: '7:00 PM – 10:30 PM',
    description:
      'Quick hygiene and maintenance service designed to keep your pet fresh between grooming visits.',
    includesDetailed: [
      {
        title: 'Teeth brushing',
        time: '2 min',
        desc: 'Gentle brushing using pet-safe toothpaste to support oral hygiene.',
      },
      {
        title: 'Fur / hair brushing',
        time: '5 min',
        desc: 'Quick coat brushing to remove loose hair and refresh the coat.',
      },
      {
        title: 'Sanitary hygiene cleaning',
        time: '3 min',
        desc: 'Cleaning of the rear area to maintain hygiene between baths.',
      },
      {
        title: 'Paw check & quick wipe',
        time: '1 min',
        desc: 'Quick paw inspection and wipe to remove dirt or dust.',
      },
      {
        title: 'Finishing cologne',
        time: '1 min',
        desc: 'Light fragrance application to leave the pet smelling fresh.',
      },
    ],
  },
  {
    id: 2,
    name: 'Elite Makeover',
    subtitle: 'Essential refresh grooming service',
    price: '123 AED + VAT',
    image: image2,
    duration: '25 mins',
    description:
      'Waterless grooming refresh designed to maintain hygiene and appearance between full grooming sessions.',
    includesDetailed: [
      {
        title: 'Dry bath with Hydra spray product',
        time: '4 min',
        desc: 'Waterless cleansing to refresh the coat and remove light dirt and odors.',
      },
      { title: 'Coat brushing', time: '3 min', desc: 'Brushing to smooth the coat and remove loose hair.' },
      { title: 'Teeth brushing', time: '2 min', desc: 'Gentle brushing with pet-safe toothpaste for oral hygiene.' },
      { title: 'Eye area tidy up', time: '2 min', desc: 'Clearing hair around the eyes to improve visibility and hygiene.' },
      { title: 'Belly trim', time: '3 min', desc: 'Light trimming of the belly area for hygiene.' },
      { title: 'Paw pad trim', time: '2 min', desc: 'Removal of excess hair between paw pads for grip and cleanliness.' },
      { title: 'Sanitary trim', time: '2 min', desc: 'Hygienic trimming around the rear area.' },
      { title: 'Nail trimming & filing', time: '2 min', desc: 'Nail clipping followed by smoothing.' },
      { title: 'Paw balm treatment', time: '1 min', desc: 'Moisturizing balm applied to protect paw pads.' },
      { title: 'Bandana finish', time: '1 min', desc: 'Bandana added for a fresh and stylish finish.' },
      { title: 'Finishing cologne', time: '1 min', desc: 'Light fragrance for a clean final touch.' },
    ],
  },
  {
    id: 3,
    name: 'Wash & Blow',
    subtitle: 'Refreshing bath & coat care service',
    price: '123 AED + VAT',
    image: image3,
    duration: '30 mins',
    description:
      'Bath and drying service designed to clean the coat and leave your pet fresh without a full haircut.',
    includesDetailed: [
      {
        title: 'Warm bath with locally sourced grooming shampoo',
        time: '10 min',
        desc: 'Cleansing bath to remove dirt and odors.',
      },
      { title: 'Blow dry & coat fluff', time: '10 min', desc: 'Professional drying to remove moisture and refresh the coat.' },
      { title: 'Coat brushing', time: '4 min', desc: 'Brushing to remove loose hair and smooth the coat.' },
      { title: 'Eye area cleaning', time: '1 min', desc: 'Cleaning around the eyes for hygiene.' },
      { title: 'Sanitary hygiene cleaning', time: '2 min', desc: 'Cleaning of the rear hygiene area after the bath.' },
      { title: 'Paw check & wipe', time: '1 min', desc: 'Quick inspection and cleaning of paws.' },
      { title: 'Bandana finish', time: '1 min', desc: 'Bandana added for a stylish finish.' },
      { title: 'Finishing cologne', time: '1 min', desc: 'Light fragrance for a fresh finish.' },
    ],
  },
  {
    id: 4,
    name: 'Full Grooming',
    subtitle: 'Complete grooming & styling service',
    price: 'Starting from 321 AED + VAT',
    image: image4,
    duration: '60–90 mins',
    description:
      'Complete grooming service including bath, blow dry, haircut and hygiene care.',
    includesDetailed: [
      { title: 'Warm bath with locally sourced grooming shampoo', time: '10 min', desc: 'Thorough cleansing bath for the coat.' },
      { title: 'Blow dry & coat preparation', time: '15 min', desc: 'Professional drying before styling.' },
      { title: 'Full body haircut & styling', time: '20–30 min', desc: 'Customized haircut according to breed or owner preference.' },
      { title: 'Coat brushing & finishing', time: '5 min', desc: 'Final brushing to smooth the coat.' },
      { title: 'Ear cleaning', time: '3 min', desc: 'Cleaning ears to remove wax and debris.' },
      { title: 'Eye cleaning & face tidy', time: '3 min', desc: 'Cleaning around eyes and trimming facial hair.' },
      { title: 'Belly trim', time: '3 min', desc: 'Light hygienic trimming of the belly.' },
      { title: 'Paw pad trim', time: '3 min', desc: 'Removal of hair between paw pads.' },
      { title: 'Sanitary trim', time: '3 min', desc: 'Hygienic trimming around the rear area.' },
      { title: 'Nail trimming & filing', time: '4 min', desc: 'Nail clipping followed by smoothing.' },
      { title: 'Bandana finish', time: '1 min', desc: 'Stylish finishing touch.' },
      { title: 'Finishing cologne', time: '1 min', desc: 'Light fragrance applied.' },
    ],
  },
  {
    id: 5,
    name: 'Elite Care Package',
    subtitle: 'Premium grooming & spa experience',
    price: '499 AED + VAT',
    image: image5,
    duration: '90–120 mins',
    description:
      'Our most complete grooming and spa experience combining full grooming with advanced coat and skin treatments.',
    includesDetailed: [
      { title: 'Warm bath with locally sourced grooming shampoo', time: '10 min', desc: 'Deep cleansing bath for coat preparation.' },
      { title: 'Conditioning treatment', time: '5 min', desc: 'Hydrating treatment to improve coat softness.' },
      { title: 'Blow dry & coat preparation', time: '20 min', desc: 'Professional drying before styling.' },
      { title: 'Full body haircut & styling', time: '25–35 min', desc: 'Customized haircut and styling.' },
      { title: 'De-shedding or Dubai climate treatment', time: '10 min', desc: 'Specialized treatment to reduce shedding or repair coat damage.' },
      { title: 'Blueberry facial', time: '3 min', desc: 'Facial cleaning treatment for tear stains.' },
      { title: 'Eye cleaning & face tidy', time: '3 min', desc: 'Cleaning and trimming around the eyes.' },
      { title: 'Belly trim', time: '3 min', desc: 'Hygiene trimming of belly area.' },
      { title: 'Paw pad trim', time: '3 min', desc: 'Removal of excess hair between paw pads.' },
      { title: 'Sanitary trim', time: '3 min', desc: 'Hygienic trimming around rear area.' },
      { title: 'Nail trimming & filing', time: '4 min', desc: 'Nail clipping and smoothing.' },
      { title: 'Paw spa treatment', time: '5 min', desc: 'Soothing paw soak to clean and hydrate paw pads.' },
      { title: 'Paw balm application', time: '1 min', desc: 'Protective balm applied to paw pads.' },
      { title: 'Teeth brushing', time: '2 min', desc: 'Gentle brushing for oral hygiene.' },
      { title: 'Bandana finish', time: '1 min', desc: 'Stylish grooming finish.' },
      { title: 'Finishing cologne', time: '1 min', desc: 'Fresh fragrance applied.' },
      { title: 'Polaroid memory photo', time: '', desc: 'A keepsake photo of your pet after grooming.' },
    ],
  },
];