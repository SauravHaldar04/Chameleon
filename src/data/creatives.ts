// Import images
import cokeOriginal from '../images/coke-original.png';
import cokeMarathon from '../images/coke-marathon.png';
import cokeFamily from '../images/coke-family.png';
import cokeGaming from '../images/coke-gaming.png';
import cokeCooking from '../images/coke-cooking.png';
import nikeOriginal from '../images/nike-original.png';
import nikeFitness from '../images/nike-fitness.png';
import nikeStreet from '../images/nike-fashion.png';
import nikeSports from '../images/nike-sports.png';
import spotifyOriginal from '../images/spotify-original.png';
import spotifyMusic from '../images/spotify-music-review.png';
import spotifyFitness from '../images/spotify-fitness.png';
import spotifyStudent from '../images/spotify-student-life.png';

export interface Creative {
  id: string;
  name: string;
  advertiser: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  seedAd: {
    type: 'image' | 'video';
    url: string;
    copy: string;
  };
  brandGuidelines: {
    logoUrl: string;
    colorPalette: string[];
    approvedFonts: string[];
  };
  contextualVariations: Array<{
    context: string;
    generatedImageUrl: string;
    generatedCopy: string;
  }>;
  accessibilityPackage: {
    altText: string;
    audioDescriptionUrl?: string;
    colorContrastReport: {
      score: number;
      status: 'Pass' | 'Fail';
      suggestions: string[];
    };
    fullReportUrl: string;
  };
}

export const creatives: Creative[] = [
  {
    id: 'creative-1',
    name: 'Coca-Cola Summer Refresh',
    advertiser: 'Coca-Cola',
    status: 'Approved',
    seedAd: {
      type: 'image',
      url: cokeOriginal,
      copy: 'Ice Cold Coca-Cola. The Perfect Refreshment.'
    },
    brandGuidelines: {
      logoUrl: cokeOriginal,
      colorPalette: ['#FF0000', '#FFFFFF', '#000000'],
      approvedFonts: ['Spencerian', 'Helvetica', 'Arial']
    },
    contextualVariations: [
      {
        context: 'Marathon Article',
        generatedImageUrl: cokeMarathon,
        generatedCopy: 'Refresh Your Victory - Coca-Cola fuels champions'
      },
      {
        context: 'Family Picnic Blog Post',
        generatedImageUrl: cokeFamily,
        generatedCopy: 'The Perfect Companion for Your Family Outing'
      },
      {
        context: 'Video Game Review',
        generatedImageUrl: cokeGaming,
        generatedCopy: 'Level Up Your Game Break with Coca-Cola'
      },
      {
        context: 'Cooking Recipe Site',
        generatedImageUrl: cokeCooking,
        generatedCopy: 'The Secret Ingredient to Great Meals'
      }
    ],
    accessibilityPackage: {
      altText: 'Red Coca-Cola bottle with condensation droplets against a refreshing blue background',
      colorContrastReport: {
        score: 8.2,
        status: 'Pass',
        suggestions: []
      },
      fullReportUrl: '/reports/accessibility-coke-1.pdf'
    }
  },
  {
    id: 'creative-2',
    name: 'Nike Air Max Revolution',
    advertiser: 'Nike',
    status: 'Approved',
    seedAd: {
      type: 'image',
      url: nikeOriginal,
      copy: 'Just Do It. Air Max Revolution.'
    },
    brandGuidelines: {
      logoUrl: nikeOriginal,
      colorPalette: ['#000000', '#FFFFFF', '#FF6B35'],
      approvedFonts: ['Nike Futura', 'Helvetica Bold', 'Arial Black']
    },
    contextualVariations: [
      {
        context: 'Fitness Blog',
        generatedImageUrl: nikeFitness,
        generatedCopy: 'Transform Your Workout. Just Do It.'
      },
      {
        context: 'Street Fashion Article',
        generatedImageUrl: nikeStreet,
        generatedCopy: 'Street Style Revolution. Step Up Your Game.'
      },
      {
        context: 'Sports News Website',
        generatedImageUrl: nikeSports,
        generatedCopy: 'Performance Meets Innovation. Just Do It.'
      }
    ],
    accessibilityPackage: {
      altText: 'Black and orange Nike Air Max sneaker with white sole on minimalist background',
      colorContrastReport: {
        score: 7.8,
        status: 'Pass',
        suggestions: []
      },
      fullReportUrl: '/reports/accessibility-nike-1.pdf'
    }
  },
  {
    id: 'creative-3',
    name: 'Spotify Premium Experience',
    advertiser: 'Spotify',
    status: 'Pending',
    seedAd: {
      type: 'image',
      url: spotifyOriginal,
      copy: 'Music For Everyone. Spotify Premium. Ad-Free.'
    },
    brandGuidelines: {
      logoUrl: spotifyOriginal,
      colorPalette: ['#1DB954', '#191414', '#FFFFFF', '#1ED760'],
      approvedFonts: ['Circular', 'Helvetica Neue', 'Arial']
    },
    contextualVariations: [
      {
        context: 'Music Review Blog',
        generatedImageUrl: spotifyMusic,
        generatedCopy: 'Discover Your Sound. Premium Quality Streaming.'
      },
      {
        context: 'Fitness Community',
        generatedImageUrl: spotifyFitness,
        generatedCopy: 'Fuel Your Workout. Premium Playlists.'
      },
      {
        context: 'Student Life Website',
        generatedImageUrl: spotifyStudent,
        generatedCopy: 'Study Sessions Made Better. Student Discount Available.'
      }
    ],
    accessibilityPackage: {
      altText: 'Spotify app interface showing personalized playlists with green brand accent colors',
      audioDescriptionUrl: '/audio/spotify-description.mp3',
      colorContrastReport: {
        score: 7.8,
        status: 'Pass',
        suggestions: []
      },
      fullReportUrl: '/reports/accessibility-spotify-1.pdf'
    }
  },
  // // {
  // //   id: 'creative-4',
  // //   name: 'Tesla Model Y Innovation',
  // //   advertiser: 'Tesla',
  // //   status: 'Approved',
  // //   seedAd: {
  // //     type: 'image',
  // //     url: '/images/tesla-original.jpg',
  // //     copy: 'Accelerate Sustainable Transport. Tesla Model Y.'
  // //   },
  // //   brandGuidelines: {
  // //     logoUrl: '/images/tesla-logo.png',
  // //     colorPalette: ['#CC0000', '#000000', '#FFFFFF', '#E31937'],
  // //     approvedFonts: ['Tesla', 'Gotham', 'Helvetica']
  // //   },
  // //   contextualVariations: [
  // //     {
  // //       context: 'Automotive Review Site',
  // //       generatedImageUrl: '/images/tesla-review.jpg',
  // //       generatedCopy: 'The Future of Driving. Zero Emissions, Maximum Performance.'
  // //     },
  // //     {
  // //       context: 'Environmental Blog',
  // //       generatedImageUrl: '/images/tesla-eco.jpg',
  // //       generatedCopy: 'Drive Change. Sustainable Electric Innovation.'
  // //     },
  // //     {
  // //       context: 'Tech Innovation News',
  // //       generatedImageUrl: '/images/tesla-tech.jpg',
  // //       generatedCopy: 'Autopilot Technology. The Smart Way Forward.'
  // //     }
  // //   ],
  // //   accessibilityPackage: {
  // //     altText: 'White Tesla Model Y electric vehicle in modern urban setting with charging station',
  // //     colorContrastReport: {
  // //       score: 8.7,
  // //       status: 'Pass',
  // //       suggestions: []
  // //     },
  // //     fullReportUrl: '/reports/accessibility-tesla-1.pdf'
  // //   }
  // }
];
