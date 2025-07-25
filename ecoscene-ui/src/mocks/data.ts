export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  values: {
    geneKeys: number[];
    humanDesign: string;
    enneagram: string;
  };
  certifications: string[];
  guilds: string[];
  impact: {
    treesPlanted: number;
    soilRestored: string;
    peopleEducated: number;
  };
  currencies: {
    V: number;
    Y: number;
    Q: number;
  };
  joinedDate: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  author: User;
  type: 'text' | 'image' | 'video' | 'project-update' | 'event';
  content: string;
  media?: string[];
  tags: string[];
  guild?: string;
  reactions: {
    hearts: number;
    leaves: number;
    suns: number;
  };
  comments: number;
  timestamp: string;
  location?: string;
}

export interface Product {
  id: string;
  seller: string;
  name: string;
  description: string;
  price: {
    USD: number;
    V: number;
    Y: number;
  };
  certifications: string[];
  impact: {
    biodiversityScore: number;
    carbonFootprint: number;
    communityBenefit: string;
  };
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  mission: string;
  avatar: string;
  banner: string;
  category: string;
  members: number;
  projects: number;
  location?: string;
  founded: string;
  leadership: {
    managers: string[];
    votingMembers: string[];
  };
  tags: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: User;
  category: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: {
    USD: number;
    V: number;
    Y: number;
  };
  rating: number;
  students: number;
  modules: number;
  image: string;
  tags: string[];
}

// Mock data generators
export const mockUsers: User[] = [
  {
    id: 'user-001',
    username: 'earthkeeper',
    fullName: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    bio: 'Regenerative agriculture advocate and permaculture designer. Building soil health one garden at a time.',
    location: 'Portland, OR',
    values: {
      geneKeys: [13, 25, 51],
      humanDesign: 'Generator 2/4',
      enneagram: 'Type 1w2',
    },
    certifications: ['Permaculture Design', 'Holistic Management', 'Soil Health Advisor'],
    guilds: ['Regenerative Farmers', 'Urban Gardens', 'Seed Savers'],
    impact: {
      treesPlanted: 1250,
      soilRestored: '5 acres',
      peopleEducated: 300,
    },
    currencies: {
      V: 1500,
      Y: 750,
      Q: 100,
    },
    joinedDate: '2024-03-15',
    followers: 892,
    following: 445,
  },
  {
    id: 'user-002',
    username: 'cosmicweaver',
    fullName: 'Michael Rivers',
    email: 'michael@example.com',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    bio: 'Holistic health practitioner and community builder. Weaving connections between earth and spirit.',
    location: 'Sedona, AZ',
    values: {
      geneKeys: [2, 14, 29],
      humanDesign: 'Projector 5/1',
      enneagram: 'Type 4w5',
    },
    certifications: ['Reiki Master', 'Yoga Teacher 500hr', 'Herbalist'],
    guilds: ['Healers Circle', 'Sacred Medicine', 'Community Builders'],
    impact: {
      treesPlanted: 500,
      soilRestored: '2 acres',
      peopleEducated: 1200,
    },
    currencies: {
      V: 2200,
      Y: 1100,
      Q: 150,
    },
    joinedDate: '2024-01-20',
    followers: 2341,
    following: 667,
  },
  {
    id: 'user-003',
    username: 'oceanguardian',
    fullName: 'Maya Patel',
    email: 'maya@example.com',
    avatar: 'https://i.pravatar.cc/150?u=maya',
    bio: 'Marine biologist and ocean conservation activist. Protecting our blue planet for future generations.',
    location: 'San Diego, CA',
    values: {
      geneKeys: [5, 35, 45],
      humanDesign: 'Manifestor 6/2',
      enneagram: 'Type 8w7',
    },
    certifications: ['Marine Biology PhD', 'PADI Divemaster', 'Environmental Educator'],
    guilds: ['Ocean Protectors', 'Plastic Free Living', 'Marine Research'],
    impact: {
      treesPlanted: 2000,
      soilRestored: '10 acres',
      peopleEducated: 5000,
    },
    currencies: {
      V: 3500,
      Y: 2000,
      Q: 300,
    },
    joinedDate: '2023-11-10',
    followers: 5672,
    following: 890,
  },
];

export const mockPosts: Post[] = [
  {
    id: 'post-001',
    author: mockUsers[0],
    type: 'project-update',
    content: 'Excited to share our community garden has produced its first harvest! 🌱 We grew over 200 pounds of organic vegetables that were distributed to 50 local families. This is what regenerative community looks like!',
    media: ['https://picsum.photos/600/400?random=1'],
    tags: ['#regenerative', '#communitygarden', '#portland', '#foodsecurity'],
    guild: 'Urban Gardens',
    reactions: {
      hearts: 145,
      leaves: 89,
      suns: 67,
    },
    comments: 23,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: 'Portland Community Garden',
  },
  {
    id: 'post-002',
    author: mockUsers[1],
    type: 'event',
    content: 'Join us for a Full Moon Meditation Circle this Saturday! We will gather to set intentions for regenerative healing in our communities. All are welcome. 🌕✨',
    tags: ['#meditation', '#fullmoon', '#community', '#healing'],
    guild: 'Healers Circle',
    reactions: {
      hearts: 78,
      leaves: 34,
      suns: 92,
    },
    comments: 15,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    location: 'Sedona Healing Center',
  },
  {
    id: 'post-003',
    author: mockUsers[2],
    type: 'image',
    content: 'Beach cleanup success! Our team removed 500 pounds of plastic from the coastline today. Every action counts in protecting our oceans. 🌊',
    media: ['https://picsum.photos/600/400?random=2', 'https://picsum.photos/600/400?random=3'],
    tags: ['#oceanconservation', '#beachcleanup', '#plasticfree', '#marinelife'],
    guild: 'Ocean Protectors',
    reactions: {
      hearts: 267,
      leaves: 156,
      suns: 189,
    },
    comments: 45,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    location: 'La Jolla Shores',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'product-001',
    seller: 'Conscious Foods Coop',
    name: 'Organic Heritage Tomato Seeds',
    description: 'Heirloom varieties preserved for generations. These seeds produce vibrant, flavorful tomatoes while supporting biodiversity.',
    price: {
      USD: 12.99,
      V: 15,
      Y: 10,
    },
    certifications: ['USDA Organic', 'Non-GMO', 'Fair Trade', 'Regenerative Organic'],
    impact: {
      biodiversityScore: 9.2,
      carbonFootprint: -2.5,
      communityBenefit: 'Supports 5 local seed-saving families',
    },
    images: ['https://picsum.photos/400/300?random=10'],
    category: 'Seeds & Plants',
    inStock: true,
    rating: 4.8,
    reviews: 127,
  },
  {
    id: 'product-002',
    seller: 'Earth Crafts Collective',
    name: 'Handwoven Hemp Basket Set',
    description: 'Beautiful, durable baskets made from sustainably grown hemp. Perfect for storage or farmers market shopping.',
    price: {
      USD: 45.00,
      V: 50,
      Y: 35,
    },
    certifications: ['Fair Trade', 'Handmade', 'Carbon Neutral'],
    impact: {
      biodiversityScore: 7.5,
      carbonFootprint: -5.0,
      communityBenefit: 'Provides income for 10 artisan families',
    },
    images: ['https://picsum.photos/400/300?random=11', 'https://picsum.photos/400/300?random=12'],
    category: 'Home & Living',
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 'product-003',
    seller: 'Sacred Herbs Apothecary',
    name: 'Wildcrafted Herbal Tea Blend',
    description: 'A calming blend of chamomile, lavender, and passionflower. Ethically wildcrafted with permission from the land.',
    price: {
      USD: 18.50,
      V: 20,
      Y: 15,
    },
    certifications: ['USDA Organic', 'Wildcrafted', 'Women-Owned'],
    impact: {
      biodiversityScore: 8.8,
      carbonFootprint: -3.2,
      communityBenefit: 'Preserves traditional herbal knowledge',
    },
    images: ['https://picsum.photos/400/300?random=13'],
    category: 'Health & Wellness',
    inStock: true,
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 'product-004',
    seller: 'Regenerative Ranch',
    name: 'Grass-Fed Beef Share',
    description: 'Quarter share of regeneratively raised, grass-fed beef. Our cattle help restore prairie ecosystems.',
    price: {
      USD: 185.00,
      V: 200,
      Y: 150,
    },
    certifications: ['Regenerative Organic', 'Grass-Fed', 'Animal Welfare Approved'],
    impact: {
      biodiversityScore: 8.5,
      carbonFootprint: -12.0,
      communityBenefit: 'Restores 50 acres of prairie land',
    },
    images: ['https://picsum.photos/400/300?random=14'],
    category: 'Food & Beverages',
    inStock: true,
    rating: 4.9,
    reviews: 56,
  },
  {
    id: 'product-005',
    seller: 'Sustainable Threads',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, durable t-shirt made from 100% organic cotton. Dyed with natural plant dyes.',
    price: {
      USD: 32.00,
      V: 35,
      Y: 25,
    },
    certifications: ['GOTS Certified', 'Fair Trade', 'Carbon Neutral'],
    impact: {
      biodiversityScore: 7.2,
      carbonFootprint: -4.5,
      communityBenefit: 'Fair wages for 20 garment workers',
    },
    images: ['https://picsum.photos/400/300?random=15'],
    category: 'Clothing & Textiles',
    inStock: true,
    rating: 4.6,
    reviews: 178,
  },
  {
    id: 'product-006',
    seller: 'Permaculture Tools',
    name: 'Broad Fork Garden Tool',
    description: 'Hand-forged broad fork for aerating soil without tilling. Built to last generations.',
    price: {
      USD: 120.00,
      V: 130,
      Y: 95,
    },
    certifications: ['Handmade', 'B-Corp', 'Lifetime Warranty'],
    impact: {
      biodiversityScore: 9.0,
      carbonFootprint: -8.0,
      communityBenefit: 'Supports local blacksmith guild',
    },
    images: ['https://picsum.photos/400/300?random=16'],
    category: 'Tools & Equipment',
    inStock: true,
    rating: 5.0,
    reviews: 43,
  },
  {
    id: 'product-007',
    seller: 'Forest School Press',
    name: 'The Regenerative Garden Book',
    description: 'Comprehensive guide to creating abundant gardens that heal the earth. Includes permaculture principles.',
    price: {
      USD: 28.00,
      V: 30,
      Y: 22,
    },
    certifications: ['FSC Certified', 'Carbon Neutral', 'Educational'],
    impact: {
      biodiversityScore: 6.5,
      carbonFootprint: -2.0,
      communityBenefit: 'Educates 1000+ gardeners annually',
    },
    images: ['https://picsum.photos/400/300?random=17'],
    category: 'Education & Books',
    inStock: true,
    rating: 4.8,
    reviews: 312,
  },
  {
    id: 'product-008',
    seller: 'Native Plant Nursery',
    name: 'Pollinator Garden Starter Kit',
    description: '12 native plants selected to support local pollinators. Includes planting guide and care instructions.',
    price: {
      USD: 65.00,
      V: 70,
      Y: 50,
    },
    certifications: ['Native Plants', 'Organic', 'Pollinator Friendly'],
    impact: {
      biodiversityScore: 9.8,
      carbonFootprint: -6.0,
      communityBenefit: 'Creates habitat for 30+ pollinator species',
    },
    images: ['https://picsum.photos/400/300?random=18'],
    category: 'Seeds & Plants',
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 'product-009',
    seller: 'Zero Waste Home',
    name: 'Beeswax Food Wraps Set',
    description: 'Reusable food wraps made from organic cotton and local beeswax. Replace 100+ rolls of plastic wrap.',
    price: {
      USD: 24.00,
      V: 25,
      Y: 18,
    },
    certifications: ['Plastic Free', 'Compostable', 'Women-Owned'],
    impact: {
      biodiversityScore: 7.8,
      carbonFootprint: -3.5,
      communityBenefit: 'Reduces plastic waste in oceans',
    },
    images: ['https://picsum.photos/400/300?random=19'],
    category: 'Home & Living',
    inStock: false,
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 'product-010',
    seller: 'Community Supported Agriculture',
    name: 'Weekly Organic Veggie Box',
    description: 'Fresh, seasonal vegetables from local regenerative farms. Subscription-based delivery.',
    price: {
      USD: 35.00,
      V: 40,
      Y: 30,
    },
    certifications: ['USDA Organic', 'Local', 'Regenerative Organic'],
    impact: {
      biodiversityScore: 9.1,
      carbonFootprint: -4.0,
      communityBenefit: 'Supports 15 small family farms',
    },
    images: ['https://picsum.photos/400/300?random=20'],
    category: 'Food & Beverages',
    inStock: true,
    rating: 4.8,
    reviews: 456,
  },
  {
    id: 'product-011',
    seller: 'Holistic Health Hub',
    name: 'Adaptogenic Mushroom Blend',
    description: 'Powerful blend of reishi, chaga, and lions mane. Sustainably wildcrafted from old-growth forests.',
    price: {
      USD: 42.00,
      V: 45,
      Y: 35,
    },
    certifications: ['Wildcrafted', 'Third-Party Tested', 'Forest Stewardship'],
    impact: {
      biodiversityScore: 8.2,
      carbonFootprint: -2.8,
      communityBenefit: 'Protects 100 acres of forest',
    },
    images: ['https://picsum.photos/400/300?random=21'],
    category: 'Health & Wellness',
    inStock: true,
    rating: 4.9,
    reviews: 167,
  },
  {
    id: 'product-012',
    seller: 'Ethical Electronics',
    name: 'Solar Phone Charger',
    description: 'Portable solar charger made from recycled materials. Powers your devices with clean energy.',
    price: {
      USD: 58.00,
      V: 60,
      Y: 45,
    },
    certifications: ['B-Corp', 'Fair Trade Electronics', 'Carbon Neutral'],
    impact: {
      biodiversityScore: 6.8,
      carbonFootprint: -15.0,
      communityBenefit: 'Provides solar access to rural communities',
    },
    images: ['https://picsum.photos/400/300?random=22'],
    category: 'Tools & Equipment',
    inStock: true,
    rating: 4.5,
    reviews: 234,
  },
];

export const mockGuilds: Guild[] = [
  {
    id: 'guild-001',
    name: 'Regenerative Farmers',
    description: 'A global community of farmers committed to regenerative agriculture practices that heal the soil and support biodiversity.',
    mission: 'To transform agriculture by sharing knowledge, resources, and support for regenerative farming practices worldwide.',
    avatar: 'https://picsum.photos/150/150?random=20',
    banner: 'https://picsum.photos/800/300?random=21',
    category: 'Agriculture',
    members: 3456,
    projects: 89,
    location: 'Global',
    founded: '2023-06-15',
    leadership: {
      managers: ['user-001', 'user-004'],
      votingMembers: ['user-001', 'user-004', 'user-005', 'user-006'],
    },
    tags: ['regenerative', 'soil health', 'permaculture', 'organic'],
  },
  {
    id: 'guild-002',
    name: 'Urban Gardens',
    description: 'Creating green spaces in cities through community gardens, rooftop farms, and guerrilla gardening.',
    mission: 'To make cities more livable and sustainable by growing food locally and building community connections.',
    avatar: 'https://picsum.photos/150/150?random=22',
    banner: 'https://picsum.photos/800/300?random=23',
    category: 'Community',
    members: 2178,
    projects: 156,
    location: 'Global',
    founded: '2023-09-01',
    leadership: {
      managers: ['user-001', 'user-007'],
      votingMembers: ['user-001', 'user-007', 'user-008', 'user-009'],
    },
    tags: ['urban farming', 'community', 'food security', 'green spaces'],
  },
  {
    id: 'guild-003',
    name: 'Ocean Protectors',
    description: 'Dedicated to marine conservation through beach cleanups, coral restoration, and sustainable fishing advocacy.',
    mission: 'To protect and restore ocean ecosystems for current and future generations.',
    avatar: 'https://picsum.photos/150/150?random=24',
    banner: 'https://picsum.photos/800/300?random=25',
    category: 'Environment',
    members: 4892,
    projects: 234,
    location: 'Coastal Regions',
    founded: '2023-04-22',
    leadership: {
      managers: ['user-003', 'user-010'],
      votingMembers: ['user-003', 'user-010', 'user-011', 'user-012'],
    },
    tags: ['ocean', 'marine life', 'conservation', 'plastic free'],
  },
];

export const mockCourses: Course[] = [
  {
    id: 'course-001',
    title: 'Introduction to Regenerative Agriculture',
    description: 'Learn the principles and practices of regenerative farming that heal the land while producing abundant food.',
    instructor: mockUsers[0],
    category: 'Agriculture',
    duration: '8 weeks',
    level: 'beginner',
    price: {
      USD: 149.00,
      V: 150,
      Y: 100,
    },
    rating: 4.9,
    students: 1234,
    modules: 12,
    image: 'https://picsum.photos/400/250?random=30',
    tags: ['regenerative', 'farming', 'soil health', 'permaculture'],
  },
  {
    id: 'course-002',
    title: 'Sacred Plant Medicine Journey',
    description: 'Explore the healing wisdom of plants through traditional practices and modern herbalism.',
    instructor: mockUsers[1],
    category: 'Wellness',
    duration: '6 weeks',
    level: 'intermediate',
    price: {
      USD: 199.00,
      V: 200,
      Y: 150,
    },
    rating: 4.8,
    students: 892,
    modules: 10,
    image: 'https://picsum.photos/400/250?random=31',
    tags: ['herbalism', 'healing', 'plant medicine', 'wellness'],
  },
  {
    id: 'course-003',
    title: 'Ocean Conservation Action Plan',
    description: 'Practical strategies for protecting marine ecosystems and organizing community action.',
    instructor: mockUsers[2],
    category: 'Environment',
    duration: '4 weeks',
    level: 'beginner',
    price: {
      USD: 99.00,
      V: 100,
      Y: 75,
    },
    rating: 4.7,
    students: 2341,
    modules: 8,
    image: 'https://picsum.photos/400/250?random=32',
    tags: ['ocean', 'conservation', 'activism', 'marine biology'],
  },
];