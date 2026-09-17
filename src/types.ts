export interface ListingPhoto {
  id: string;
  url: string;
  title: string;
  category: 'all' | 'living_room' | 'bedroom' | 'jacuzzi_bath' | 'kitchen_dining' | 'pool_exterior';
  categoryLabel: string;
  caption: string;
}

export interface Amenity {
  id: string;
  name: string;
  description?: string;
  icon: string;
  category: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  content: string;
  stayDuration?: string;
}

export interface HostInfo {
  name: string;
  avatar: string;
  joinedDate: string;
  isSuperhost: boolean;
  reviewsCount: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  bio: string;
  work: string;
  funFact: string;
  pets: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  tagline: string;
  location: string;
  neighborhood: string;
  rating: number;
  reviewsCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  propertyType: string;
  guestsCount: number;
  bedroomsCount: number;
  bedsCount: number;
  bathsCount: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFeeRate: number;
  taxRate: number;
  heroPhotos: ListingPhoto[];
  allPhotos: ListingPhoto[];
  description: string;
  highlights: { title: string; subtitle: string; icon: string }[];
  amenities: Amenity[];
  reviews: Review[];
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  host: HostInfo;
  houseRules: { title: string; details: string; icon: string }[];
  safetyRules: { title: string; details: string; icon: string }[];
  cancellationPolicy: { title: string; details: string; icon: string };
}
