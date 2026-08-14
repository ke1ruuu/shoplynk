import { ProductItem } from "@/components/marketplace/product-card";
import { Category } from "@/components/marketplace/marketplace-filters";

/**
 * Historical mock data used during early scaffold design.
 * Preserved for testing / reference; inactive for the live Beta release.
 */
export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Food & Drinks", slug: "food-and-drinks", icon: "Utensils" },
  { id: "2", name: "Handmade Crafts", slug: "handmade-crafts", icon: "Palette" },
  { id: "3", name: "Student Merchandise", slug: "student-merchandise", icon: "Shirt" },
  { id: "4", name: "School & Stationery", slug: "school-and-stationery", icon: "BookOpen" },
  { id: "5", name: "Lifestyle Goods", slug: "lifestyle-goods", icon: "ShoppingBag" },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: "sample-1",
    title: "Homemade Chocolate Chip Cookies (Dozen)",
    slug: "chocolate-chip-cookies",
    description: "Freshly baked soft-batch chocolate chip cookies using premium butter. Perfect afternoon snack on campus!",
    price: 150,
    stock: 8,
    status: "ACTIVE",
    prep_time_minutes: 30,
    category: { name: "Food & Drinks", slug: "food-and-drinks" },
    store: {
      id: "store-1",
      name: "Maria's Kitchenette",
      slug: "marias-kitchenette",
      logo_url: null,
      pickup_locations: "Student Center / Main Library Gate",
      rating_avg: 4.9,
      rating_count: 14,
      owner: { full_name: "Maria Santos", role: "SELLER" },
    },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
        display_order: 1,
      },
    ],
  },
  {
    id: "sample-2",
    title: "Handcrafted Canvas Tote Bag",
    slug: "canvas-tote-bag",
    description: "Heavy-duty 100% cotton canvas tote bag with custom screen-printed campus design. Fits 15-inch laptops.",
    price: 280,
    stock: 5,
    status: "ACTIVE",
    prep_time_minutes: 0,
    category: { name: "Handmade Crafts", slug: "handmade-crafts" },
    store: {
      id: "store-2",
      name: "Reyes Canvas Studio",
      slug: "reyes-canvas-studio",
      logo_url: null,
      pickup_locations: "Building B Quadrangle",
      rating_avg: 4.8,
      rating_count: 9,
      owner: { full_name: "Ethan Reyes", role: "SELLER" },
    },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        display_order: 1,
      },
    ],
  },
  {
    id: "sample-3",
    title: "Comprehensive Physics & Calculus Notes",
    slug: "physics-calculus-notes",
    description: "Handwritten and digitized review notes with step-by-step problem sets and formula cheat sheets.",
    price: 120,
    stock: 25,
    status: "ACTIVE",
    prep_time_minutes: 10,
    category: { name: "School & Stationery", slug: "school-and-stationery" },
    store: {
      id: "store-3",
      name: "Academia Notes",
      slug: "academia-notes",
      logo_url: null,
      pickup_locations: "Faculty Lounge / Online PDF",
      rating_avg: 5.0,
      rating_count: 21,
      owner: { full_name: "Prof. Jenna Lim", role: "SELLER" },
    },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
        display_order: 1,
      },
    ],
  },
  {
    id: "sample-4",
    title: "Cold Brew Iced Caramel Latte (16oz)",
    slug: "iced-caramel-latte",
    description: "Rich arabica cold brew coffee layered with vanilla bean syrup and fresh milk over ice.",
    price: 95,
    stock: 12,
    status: "ACTIVE",
    prep_time_minutes: 15,
    category: { name: "Food & Drinks", slug: "food-and-drinks" },
    store: {
      id: "store-4",
      name: "Cafe Bandala",
      slug: "cafe-bandala",
      logo_url: null,
      pickup_locations: "Cafeteria Kiosk #3",
      rating_avg: 4.7,
      rating_count: 32,
      owner: { full_name: "Cafe Bandala Team", role: "SELLER" },
    },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        display_order: 1,
      },
    ],
  },
  {
    id: "sample-5",
    title: "Custom Event Poster & Logo Design",
    slug: "poster-logo-design",
    description: "Professional graphic design services for school org events, posters, stickers, and social media branding.",
    price: 350,
    stock: 10,
    status: "ACTIVE",
    prep_time_minutes: 120,
    category: { name: "Lifestyle Goods", slug: "lifestyle-goods" },
    store: {
      id: "store-5",
      name: "MDC Creative Lab",
      slug: "mdc-creative-lab",
      logo_url: null,
      pickup_locations: "Digital Delivery / Campus Meetup",
      rating_avg: 4.9,
      rating_count: 17,
      owner: { full_name: "Miguel Dela Cruz", role: "SELLER" },
    },
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
        display_order: 1,
      },
    ],
  },
];
