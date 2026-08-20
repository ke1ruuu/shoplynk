import { ProductItem } from "@/components/marketplace/product-card";
import { Category } from "@/components/marketplace/marketplace-filters";

export interface MockCampus {
  id: string;
  name: string;
  code: string;
  address: string;
  is_active: boolean;
}

export interface MockUser {
  id: string;
  email: string;
  full_name: string;
  role: "BUYER" | "SELLER" | "CAMPUS_ADMIN" | "PLATFORM_ADMIN";
  campus_id: string;
  avatar_url: string;
}

export interface MockStore {
  id: string;
  user_id: string;
  campus_id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  banner_url: string | null;
  gcash_name: string;
  gcash_number: string;
  pickup_locations: string;
  operating_hours: string;
  is_active: boolean;
  rating_avg: number;
  rating_count: number;
  owner: {
    full_name: string;
    role: string;
  };
}

export interface MockOrder {
  id: string;
  order_number: string;
  buyer_id: string;
  store_id: string;
  campus_id: string;
  total_amount: number;
  status: string;
  cancellation_reason: string | null;
  created_at: string;
}

export interface MockReview {
  id: string;
  order_id: string;
  product_id: string;
  store_id: string;
  buyer_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface MockNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  link_url: string;
  is_read: boolean;
}

export interface MockVerification {
  id: string;
  user_id: string;
  student_id_number: string;
  id_image_url: string;
  program: string;
  year_level: string;
  status: string;
  rejection_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
}

export interface MockReport {
  id: string;
  reporter_id: string;
  target_type: string;
  target_id: string;
  reason: string;
  status: string;
}

// 1. MOCK USERS (1 Admin, 1 Customer, plus sellers)
export const MOCK_ADMIN: MockUser = {
  "id": "11111111-1111-4111-8111-111111111111",
  "email": "admin@projectkita.edu.ph",
  "full_name": "Campus Administrator (LYFJSHS)",
  "role": "PLATFORM_ADMIN",
  "campus_id": "00000000-0000-4000-a000-000000000001",
  "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
};
export const MOCK_CUSTOMER: MockUser = {
  "id": "22222222-2222-4222-8222-222222222222",
  "email": "customer@projectkita.edu.ph",
  "full_name": "Juan Dela Cruz",
  "role": "BUYER",
  "campus_id": "00000000-0000-4000-a000-000000000001",
  "avatar_url": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
};
export const MOCK_SELLER_PROFILES: MockUser[] = [
  {
    "id": "00000000-0000-4000-b000-000000000001",
    "email": "maria.santos1@lyfjshs.edu.ph",
    "full_name": "Maria Santos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500000000000?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000002",
    "email": "ethan.dela cruz2@lyfjshs.edu.ph",
    "full_name": "Ethan Dela Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500001234567?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000003",
    "email": "jenna.flores3@lyfjshs.edu.ph",
    "full_name": "Jenna Flores",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500002469134?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000004",
    "email": "miguel.gonzales4@lyfjshs.edu.ph",
    "full_name": "Miguel Gonzales",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500003703701?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000005",
    "email": "alyssa.rivera5@lyfjshs.edu.ph",
    "full_name": "Alyssa Rivera",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500004938268?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000006",
    "email": "joshua.salazar6@lyfjshs.edu.ph",
    "full_name": "Joshua Salazar",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500006172835?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000007",
    "email": "bea.pascual7@lyfjshs.edu.ph",
    "full_name": "Bea Pascual",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500007407402?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000008",
    "email": "christian.reyes8@lyfjshs.edu.ph",
    "full_name": "Christian Reyes",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500008641969?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000009",
    "email": "hannah.garcia9@lyfjshs.edu.ph",
    "full_name": "Hannah Garcia",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500009876536?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000000a",
    "email": "rafael.bautista10@lyfjshs.edu.ph",
    "full_name": "Rafael Bautista",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500011111103?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000000b",
    "email": "camille.ramos11@lyfjshs.edu.ph",
    "full_name": "Camille Ramos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500012345670?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000000c",
    "email": "daniel.aquino12@lyfjshs.edu.ph",
    "full_name": "Daniel Aquino",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500013580237?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000000d",
    "email": "patricia.mercado13@lyfjshs.edu.ph",
    "full_name": "Patricia Mercado",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500014814804?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000000e",
    "email": "angelo.cruz14@lyfjshs.edu.ph",
    "full_name": "Angelo Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500016049371?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000000f",
    "email": "samantha.lim15@lyfjshs.edu.ph",
    "full_name": "Samantha Lim",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500017283938?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000010",
    "email": "kevin.mendoza16@lyfjshs.edu.ph",
    "full_name": "Kevin Mendoza",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500018518505?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000011",
    "email": "nicole.villanueva17@lyfjshs.edu.ph",
    "full_name": "Nicole Villanueva",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500019753072?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000012",
    "email": "mark.castro18@lyfjshs.edu.ph",
    "full_name": "Mark Castro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500020987639?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000013",
    "email": "chloe.navarro19@lyfjshs.edu.ph",
    "full_name": "Chloe Navarro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500022222206?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000014",
    "email": "gabriel.tan20@lyfjshs.edu.ph",
    "full_name": "Gabriel Tan",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500023456773?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000015",
    "email": "maria.santos21@lyfjshs.edu.ph",
    "full_name": "Maria Santos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500024691340?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000016",
    "email": "ethan.dela cruz22@lyfjshs.edu.ph",
    "full_name": "Ethan Dela Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500025925907?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000017",
    "email": "jenna.flores23@lyfjshs.edu.ph",
    "full_name": "Jenna Flores",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500027160474?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000018",
    "email": "miguel.gonzales24@lyfjshs.edu.ph",
    "full_name": "Miguel Gonzales",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500028395041?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000019",
    "email": "alyssa.rivera25@lyfjshs.edu.ph",
    "full_name": "Alyssa Rivera",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500029629608?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000001a",
    "email": "joshua.salazar26@lyfjshs.edu.ph",
    "full_name": "Joshua Salazar",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500030864175?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000001b",
    "email": "bea.pascual27@lyfjshs.edu.ph",
    "full_name": "Bea Pascual",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500032098742?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000001c",
    "email": "christian.reyes28@lyfjshs.edu.ph",
    "full_name": "Christian Reyes",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500033333309?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000001d",
    "email": "hannah.garcia29@lyfjshs.edu.ph",
    "full_name": "Hannah Garcia",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500034567876?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000001e",
    "email": "rafael.bautista30@lyfjshs.edu.ph",
    "full_name": "Rafael Bautista",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500035802443?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000001f",
    "email": "camille.ramos31@lyfjshs.edu.ph",
    "full_name": "Camille Ramos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500037037010?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000020",
    "email": "daniel.aquino32@lyfjshs.edu.ph",
    "full_name": "Daniel Aquino",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500038271577?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000021",
    "email": "patricia.mercado33@lyfjshs.edu.ph",
    "full_name": "Patricia Mercado",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500039506144?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000022",
    "email": "angelo.cruz34@lyfjshs.edu.ph",
    "full_name": "Angelo Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500040740711?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000023",
    "email": "samantha.lim35@lyfjshs.edu.ph",
    "full_name": "Samantha Lim",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500041975278?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000024",
    "email": "kevin.mendoza36@lyfjshs.edu.ph",
    "full_name": "Kevin Mendoza",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500043209845?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000025",
    "email": "nicole.villanueva37@lyfjshs.edu.ph",
    "full_name": "Nicole Villanueva",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500044444412?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000026",
    "email": "mark.castro38@lyfjshs.edu.ph",
    "full_name": "Mark Castro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500045678979?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000027",
    "email": "chloe.navarro39@lyfjshs.edu.ph",
    "full_name": "Chloe Navarro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500046913546?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000028",
    "email": "gabriel.tan40@lyfjshs.edu.ph",
    "full_name": "Gabriel Tan",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500048148113?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000029",
    "email": "maria.santos41@lyfjshs.edu.ph",
    "full_name": "Maria Santos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500049382680?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000002a",
    "email": "ethan.dela cruz42@lyfjshs.edu.ph",
    "full_name": "Ethan Dela Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500050617247?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000002b",
    "email": "jenna.flores43@lyfjshs.edu.ph",
    "full_name": "Jenna Flores",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500051851814?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000002c",
    "email": "miguel.gonzales44@lyfjshs.edu.ph",
    "full_name": "Miguel Gonzales",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500053086381?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000002d",
    "email": "alyssa.rivera45@lyfjshs.edu.ph",
    "full_name": "Alyssa Rivera",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500054320948?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000002e",
    "email": "joshua.salazar46@lyfjshs.edu.ph",
    "full_name": "Joshua Salazar",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500055555515?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000002f",
    "email": "bea.pascual47@lyfjshs.edu.ph",
    "full_name": "Bea Pascual",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500056790082?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000030",
    "email": "christian.reyes48@lyfjshs.edu.ph",
    "full_name": "Christian Reyes",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500058024649?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000031",
    "email": "hannah.garcia49@lyfjshs.edu.ph",
    "full_name": "Hannah Garcia",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500059259216?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000032",
    "email": "rafael.bautista50@lyfjshs.edu.ph",
    "full_name": "Rafael Bautista",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500060493783?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000033",
    "email": "camille.ramos51@lyfjshs.edu.ph",
    "full_name": "Camille Ramos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500061728350?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000034",
    "email": "daniel.aquino52@lyfjshs.edu.ph",
    "full_name": "Daniel Aquino",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500062962917?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000035",
    "email": "patricia.mercado53@lyfjshs.edu.ph",
    "full_name": "Patricia Mercado",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500064197484?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000036",
    "email": "angelo.cruz54@lyfjshs.edu.ph",
    "full_name": "Angelo Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500065432051?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000037",
    "email": "samantha.lim55@lyfjshs.edu.ph",
    "full_name": "Samantha Lim",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500066666618?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000038",
    "email": "kevin.mendoza56@lyfjshs.edu.ph",
    "full_name": "Kevin Mendoza",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500067901185?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000039",
    "email": "nicole.villanueva57@lyfjshs.edu.ph",
    "full_name": "Nicole Villanueva",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500069135752?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000003a",
    "email": "mark.castro58@lyfjshs.edu.ph",
    "full_name": "Mark Castro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500070370319?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000003b",
    "email": "chloe.navarro59@lyfjshs.edu.ph",
    "full_name": "Chloe Navarro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500071604886?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000003c",
    "email": "gabriel.tan60@lyfjshs.edu.ph",
    "full_name": "Gabriel Tan",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500072839453?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000003d",
    "email": "maria.santos61@lyfjshs.edu.ph",
    "full_name": "Maria Santos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500074074020?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000003e",
    "email": "ethan.dela cruz62@lyfjshs.edu.ph",
    "full_name": "Ethan Dela Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500075308587?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000003f",
    "email": "jenna.flores63@lyfjshs.edu.ph",
    "full_name": "Jenna Flores",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500076543154?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000040",
    "email": "miguel.gonzales64@lyfjshs.edu.ph",
    "full_name": "Miguel Gonzales",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500077777721?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000041",
    "email": "alyssa.rivera65@lyfjshs.edu.ph",
    "full_name": "Alyssa Rivera",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500079012288?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000042",
    "email": "joshua.salazar66@lyfjshs.edu.ph",
    "full_name": "Joshua Salazar",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500080246855?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000043",
    "email": "bea.pascual67@lyfjshs.edu.ph",
    "full_name": "Bea Pascual",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500081481422?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000044",
    "email": "christian.reyes68@lyfjshs.edu.ph",
    "full_name": "Christian Reyes",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500082715989?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000045",
    "email": "hannah.garcia69@lyfjshs.edu.ph",
    "full_name": "Hannah Garcia",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500083950556?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000046",
    "email": "rafael.bautista70@lyfjshs.edu.ph",
    "full_name": "Rafael Bautista",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500085185123?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000047",
    "email": "camille.ramos71@lyfjshs.edu.ph",
    "full_name": "Camille Ramos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500086419690?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000048",
    "email": "daniel.aquino72@lyfjshs.edu.ph",
    "full_name": "Daniel Aquino",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500087654257?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000049",
    "email": "patricia.mercado73@lyfjshs.edu.ph",
    "full_name": "Patricia Mercado",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500088888824?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000004a",
    "email": "angelo.cruz74@lyfjshs.edu.ph",
    "full_name": "Angelo Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500090123391?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000004b",
    "email": "samantha.lim75@lyfjshs.edu.ph",
    "full_name": "Samantha Lim",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500091357958?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000004c",
    "email": "kevin.mendoza76@lyfjshs.edu.ph",
    "full_name": "Kevin Mendoza",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500092592525?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000004d",
    "email": "nicole.villanueva77@lyfjshs.edu.ph",
    "full_name": "Nicole Villanueva",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500093827092?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000004e",
    "email": "mark.castro78@lyfjshs.edu.ph",
    "full_name": "Mark Castro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500095061659?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000004f",
    "email": "chloe.navarro79@lyfjshs.edu.ph",
    "full_name": "Chloe Navarro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500096296226?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000050",
    "email": "gabriel.tan80@lyfjshs.edu.ph",
    "full_name": "Gabriel Tan",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500097530793?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000051",
    "email": "maria.santos81@lyfjshs.edu.ph",
    "full_name": "Maria Santos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500098765360?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000052",
    "email": "ethan.dela cruz82@lyfjshs.edu.ph",
    "full_name": "Ethan Dela Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500099999927?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000053",
    "email": "jenna.flores83@lyfjshs.edu.ph",
    "full_name": "Jenna Flores",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500101234494?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000054",
    "email": "miguel.gonzales84@lyfjshs.edu.ph",
    "full_name": "Miguel Gonzales",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500102469061?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000055",
    "email": "alyssa.rivera85@lyfjshs.edu.ph",
    "full_name": "Alyssa Rivera",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500103703628?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000056",
    "email": "joshua.salazar86@lyfjshs.edu.ph",
    "full_name": "Joshua Salazar",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500104938195?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000057",
    "email": "bea.pascual87@lyfjshs.edu.ph",
    "full_name": "Bea Pascual",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500106172762?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000058",
    "email": "christian.reyes88@lyfjshs.edu.ph",
    "full_name": "Christian Reyes",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500107407329?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000059",
    "email": "hannah.garcia89@lyfjshs.edu.ph",
    "full_name": "Hannah Garcia",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500108641896?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000005a",
    "email": "rafael.bautista90@lyfjshs.edu.ph",
    "full_name": "Rafael Bautista",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500109876463?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000005b",
    "email": "camille.ramos91@lyfjshs.edu.ph",
    "full_name": "Camille Ramos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500111111030?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000005c",
    "email": "daniel.aquino92@lyfjshs.edu.ph",
    "full_name": "Daniel Aquino",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500112345597?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000005d",
    "email": "patricia.mercado93@lyfjshs.edu.ph",
    "full_name": "Patricia Mercado",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500113580164?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000005e",
    "email": "angelo.cruz94@lyfjshs.edu.ph",
    "full_name": "Angelo Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500114814731?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-00000000005f",
    "email": "samantha.lim95@lyfjshs.edu.ph",
    "full_name": "Samantha Lim",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500116049298?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000060",
    "email": "kevin.mendoza96@lyfjshs.edu.ph",
    "full_name": "Kevin Mendoza",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500117283865?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000061",
    "email": "nicole.villanueva97@lyfjshs.edu.ph",
    "full_name": "Nicole Villanueva",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500118518432?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000062",
    "email": "mark.castro98@lyfjshs.edu.ph",
    "full_name": "Mark Castro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500119752999?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000063",
    "email": "chloe.navarro99@lyfjshs.edu.ph",
    "full_name": "Chloe Navarro",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500120987566?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000064",
    "email": "gabriel.tan100@lyfjshs.edu.ph",
    "full_name": "Gabriel Tan",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500122222133?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000065",
    "email": "maria.santos101@lyfjshs.edu.ph",
    "full_name": "Maria Santos",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500123456700?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000066",
    "email": "ethan.dela cruz102@lyfjshs.edu.ph",
    "full_name": "Ethan Dela Cruz",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500124691267?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000067",
    "email": "jenna.flores103@lyfjshs.edu.ph",
    "full_name": "Jenna Flores",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500125925834?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000068",
    "email": "miguel.gonzales104@lyfjshs.edu.ph",
    "full_name": "Miguel Gonzales",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500127160401?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": "00000000-0000-4000-b000-000000000069",
    "email": "alyssa.rivera105@lyfjshs.edu.ph",
    "full_name": "Alyssa Rivera",
    "role": "SELLER",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "avatar_url": "https://images.unsplash.com/photo-1500128394968?auto=format&fit=crop&w=200&q=80"
  }
];
export const MOCK_USERS: MockUser[] = [MOCK_ADMIN, MOCK_CUSTOMER, ...MOCK_SELLER_PROFILES];

// 2. MOCK CAMPUSES (100+ Campuses)
export const MOCK_CAMPUSES: MockCampus[] = [
  {
    "id": "00000000-0000-4000-a000-000000000001",
    "name": "Luis Y. Ferrer Jr. Senior High School",
    "code": "LYFJSHS",
    "address": "General Trias, Cavite",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000002",
    "name": "University of the Philippines Diliman",
    "code": "UPD",
    "address": "Diliman, Quezon City",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000003",
    "name": "De La Salle University Manila",
    "code": "DLSU",
    "address": "Taft Avenue, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000004",
    "name": "Ateneo de Manila University",
    "code": "ADMU",
    "address": "Katipunan Ave, Quezon City",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000005",
    "name": "University of Santo Tomas",
    "code": "UST",
    "address": "España Blvd, Sampaloc, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000006",
    "name": "Cavite State University - Main Campus",
    "code": "CVSU-MAIN",
    "address": "Indang, Cavite",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000007",
    "name": "Cavite State University - General Trias",
    "code": "CVSU-GT",
    "address": "General Trias, Cavite",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000008",
    "name": "Polytechnic University of the Philippines",
    "code": "PUP-STA-MESA",
    "address": "Sta. Mesa, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000009",
    "name": "Far Eastern University",
    "code": "FEU-MNL",
    "address": "Nicanor Reyes St, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000000a",
    "name": "University of the East",
    "code": "UE-MNL",
    "address": "C.M. Recto Ave, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000000b",
    "name": "Mapua University",
    "code": "MAPUA-MNL",
    "address": "Muralla St, Intramuros, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000000c",
    "name": "Adamson University",
    "code": "AdU",
    "address": "San Marcelino St, Ermita, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000000d",
    "name": "Technological University of the Philippines",
    "code": "TUP-MNL",
    "address": "Ayala Blvd, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000000e",
    "name": "National University Manila",
    "code": "NU-MNL",
    "address": "M.F. Jhocson St, Sampaloc, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000000f",
    "name": "Philippine Normal University",
    "code": "PNU",
    "address": "Taft Ave, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000010",
    "name": "Batangas State University",
    "code": "BATSTATEU",
    "address": "Rizal Ave, Batangas City",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000011",
    "name": "University of the Philippines Los Baños",
    "code": "UPLB",
    "address": "College, Los Baños, Laguna",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000012",
    "name": "De La Salle Medical and Health Sciences Institute",
    "code": "DLSMHSI",
    "address": "Dasmariñas, Cavite",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000013",
    "name": "De La Salle University - Dasmariñas",
    "code": "DLSUD",
    "address": "DBB-B, Dasmariñas, Cavite",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000014",
    "name": "Lyceum of the Philippines University - Cavite",
    "code": "LPU-CVT",
    "address": "Governor's Drive, General Trias, Cavite",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000015",
    "name": "San Beda University",
    "code": "SBU-MNL",
    "address": "Mendiola St, San Miguel, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000016",
    "name": "Centro Escolar University",
    "code": "CEU-MNL",
    "address": "Mendiola St, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000017",
    "name": "Pamantasan ng Lungsod ng Maynila",
    "code": "PLM",
    "address": "Intramuros, Manila",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000018",
    "name": "Rizal Technological University",
    "code": "RTU",
    "address": "Boni Ave, Mandaluyong City",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000019",
    "name": "Bulacan State University",
    "code": "BULSU",
    "address": "Guinhawa, Malolos, Bulacan",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000001a",
    "name": "Metro Manila Integrated National High School #26",
    "code": "PK-CAMP-026",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000001b",
    "name": "Central Luzon Integrated Senior High School #27",
    "code": "PK-CAMP-027",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000001c",
    "name": "Ilocos Integrated Science High School #28",
    "code": "PK-CAMP-028",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000001d",
    "name": "Cordillera Integrated State College #29",
    "code": "PK-CAMP-029",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000001e",
    "name": "Bicol Integrated Institute of Technology #30",
    "code": "PK-CAMP-030",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000001f",
    "name": "Cavite Integrated National High School #31",
    "code": "PK-CAMP-031",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000020",
    "name": "Laguna Integrated Senior High School #32",
    "code": "PK-CAMP-032",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000021",
    "name": "Batangas Integrated Science High School #33",
    "code": "PK-CAMP-033",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000022",
    "name": "Rizal Integrated State College #34",
    "code": "PK-CAMP-034",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000023",
    "name": "Quezon Integrated Institute of Technology #35",
    "code": "PK-CAMP-035",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000024",
    "name": "Metro Manila Integrated National High School #36",
    "code": "PK-CAMP-036",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000025",
    "name": "Central Luzon Integrated Senior High School #37",
    "code": "PK-CAMP-037",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000026",
    "name": "Ilocos Integrated Science High School #38",
    "code": "PK-CAMP-038",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000027",
    "name": "Cordillera Integrated State College #39",
    "code": "PK-CAMP-039",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000028",
    "name": "Bicol Integrated Institute of Technology #40",
    "code": "PK-CAMP-040",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000029",
    "name": "Cavite Integrated National High School #41",
    "code": "PK-CAMP-041",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000002a",
    "name": "Laguna Integrated Senior High School #42",
    "code": "PK-CAMP-042",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000002b",
    "name": "Batangas Integrated Science High School #43",
    "code": "PK-CAMP-043",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000002c",
    "name": "Rizal Integrated State College #44",
    "code": "PK-CAMP-044",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000002d",
    "name": "Quezon Integrated Institute of Technology #45",
    "code": "PK-CAMP-045",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000002e",
    "name": "Metro Manila Integrated National High School #46",
    "code": "PK-CAMP-046",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000002f",
    "name": "Central Luzon Integrated Senior High School #47",
    "code": "PK-CAMP-047",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000030",
    "name": "Ilocos Integrated Science High School #48",
    "code": "PK-CAMP-048",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000031",
    "name": "Cordillera Integrated State College #49",
    "code": "PK-CAMP-049",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000032",
    "name": "Bicol Integrated Institute of Technology #50",
    "code": "PK-CAMP-050",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000033",
    "name": "Cavite Integrated National High School #51",
    "code": "PK-CAMP-051",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000034",
    "name": "Laguna Integrated Senior High School #52",
    "code": "PK-CAMP-052",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000035",
    "name": "Batangas Integrated Science High School #53",
    "code": "PK-CAMP-053",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000036",
    "name": "Rizal Integrated State College #54",
    "code": "PK-CAMP-054",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000037",
    "name": "Quezon Integrated Institute of Technology #55",
    "code": "PK-CAMP-055",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000038",
    "name": "Metro Manila Integrated National High School #56",
    "code": "PK-CAMP-056",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000039",
    "name": "Central Luzon Integrated Senior High School #57",
    "code": "PK-CAMP-057",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000003a",
    "name": "Ilocos Integrated Science High School #58",
    "code": "PK-CAMP-058",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000003b",
    "name": "Cordillera Integrated State College #59",
    "code": "PK-CAMP-059",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000003c",
    "name": "Bicol Integrated Institute of Technology #60",
    "code": "PK-CAMP-060",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000003d",
    "name": "Cavite Integrated National High School #61",
    "code": "PK-CAMP-061",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000003e",
    "name": "Laguna Integrated Senior High School #62",
    "code": "PK-CAMP-062",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000003f",
    "name": "Batangas Integrated Science High School #63",
    "code": "PK-CAMP-063",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000040",
    "name": "Rizal Integrated State College #64",
    "code": "PK-CAMP-064",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000041",
    "name": "Quezon Integrated Institute of Technology #65",
    "code": "PK-CAMP-065",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000042",
    "name": "Metro Manila Integrated National High School #66",
    "code": "PK-CAMP-066",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000043",
    "name": "Central Luzon Integrated Senior High School #67",
    "code": "PK-CAMP-067",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000044",
    "name": "Ilocos Integrated Science High School #68",
    "code": "PK-CAMP-068",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000045",
    "name": "Cordillera Integrated State College #69",
    "code": "PK-CAMP-069",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000046",
    "name": "Bicol Integrated Institute of Technology #70",
    "code": "PK-CAMP-070",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000047",
    "name": "Cavite Integrated National High School #71",
    "code": "PK-CAMP-071",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000048",
    "name": "Laguna Integrated Senior High School #72",
    "code": "PK-CAMP-072",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000049",
    "name": "Batangas Integrated Science High School #73",
    "code": "PK-CAMP-073",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000004a",
    "name": "Rizal Integrated State College #74",
    "code": "PK-CAMP-074",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000004b",
    "name": "Quezon Integrated Institute of Technology #75",
    "code": "PK-CAMP-075",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000004c",
    "name": "Metro Manila Integrated National High School #76",
    "code": "PK-CAMP-076",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000004d",
    "name": "Central Luzon Integrated Senior High School #77",
    "code": "PK-CAMP-077",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000004e",
    "name": "Ilocos Integrated Science High School #78",
    "code": "PK-CAMP-078",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000004f",
    "name": "Cordillera Integrated State College #79",
    "code": "PK-CAMP-079",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000050",
    "name": "Bicol Integrated Institute of Technology #80",
    "code": "PK-CAMP-080",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000051",
    "name": "Cavite Integrated National High School #81",
    "code": "PK-CAMP-081",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000052",
    "name": "Laguna Integrated Senior High School #82",
    "code": "PK-CAMP-082",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000053",
    "name": "Batangas Integrated Science High School #83",
    "code": "PK-CAMP-083",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000054",
    "name": "Rizal Integrated State College #84",
    "code": "PK-CAMP-084",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000055",
    "name": "Quezon Integrated Institute of Technology #85",
    "code": "PK-CAMP-085",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000056",
    "name": "Metro Manila Integrated National High School #86",
    "code": "PK-CAMP-086",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000057",
    "name": "Central Luzon Integrated Senior High School #87",
    "code": "PK-CAMP-087",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000058",
    "name": "Ilocos Integrated Science High School #88",
    "code": "PK-CAMP-088",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000059",
    "name": "Cordillera Integrated State College #89",
    "code": "PK-CAMP-089",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000005a",
    "name": "Bicol Integrated Institute of Technology #90",
    "code": "PK-CAMP-090",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000005b",
    "name": "Cavite Integrated National High School #91",
    "code": "PK-CAMP-091",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000005c",
    "name": "Laguna Integrated Senior High School #92",
    "code": "PK-CAMP-092",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000005d",
    "name": "Batangas Integrated Science High School #93",
    "code": "PK-CAMP-093",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000005e",
    "name": "Rizal Integrated State College #94",
    "code": "PK-CAMP-094",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-00000000005f",
    "name": "Quezon Integrated Institute of Technology #95",
    "code": "PK-CAMP-095",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000060",
    "name": "Metro Manila Integrated National High School #96",
    "code": "PK-CAMP-096",
    "address": "Calamba, Laguna, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000061",
    "name": "Central Luzon Integrated Senior High School #97",
    "code": "PK-CAMP-097",
    "address": "Antipolo, Rizal, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000062",
    "name": "Ilocos Integrated Science High School #98",
    "code": "PK-CAMP-098",
    "address": "Pasig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000063",
    "name": "Cordillera Integrated State College #99",
    "code": "PK-CAMP-099",
    "address": "Makati City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000064",
    "name": "Bicol Integrated Institute of Technology #100",
    "code": "PK-CAMP-100",
    "address": "Taguig City, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000065",
    "name": "Cavite Integrated National High School #101",
    "code": "PK-CAMP-101",
    "address": "Imus, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000066",
    "name": "Laguna Integrated Senior High School #102",
    "code": "PK-CAMP-102",
    "address": "Bacoor, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000067",
    "name": "Batangas Integrated Science High School #103",
    "code": "PK-CAMP-103",
    "address": "Dasmariñas, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000068",
    "name": "Rizal Integrated State College #104",
    "code": "PK-CAMP-104",
    "address": "Tagaytay, Cavite, Philippines",
    "is_active": true
  },
  {
    "id": "00000000-0000-4000-a000-000000000069",
    "name": "Quezon Integrated Institute of Technology #105",
    "code": "PK-CAMP-105",
    "address": "Santa Rosa, Laguna, Philippines",
    "is_active": true
  }
];

// 3. MOCK CATEGORIES
export const MOCK_CATEGORIES: Category[] = [
  {
    "id": "00000000-0000-4000-c000-000000000001",
    "name": "Food & Drinks",
    "slug": "food-and-drinks",
    "icon": "Utensils"
  },
  {
    "id": "00000000-0000-4000-c000-000000000002",
    "name": "Handmade Crafts",
    "slug": "handmade-crafts",
    "icon": "Palette"
  },
  {
    "id": "00000000-0000-4000-c000-000000000003",
    "name": "Student Merchandise",
    "slug": "student-merchandise",
    "icon": "Shirt"
  },
  {
    "id": "00000000-0000-4000-c000-000000000004",
    "name": "School & Stationery",
    "slug": "school-and-stationery",
    "icon": "BookOpen"
  },
  {
    "id": "00000000-0000-4000-c000-000000000005",
    "name": "Lifestyle Goods",
    "slug": "lifestyle-goods",
    "icon": "ShoppingBag"
  },
  {
    "id": "00000000-0000-4000-c000-000000000006",
    "name": "Tech & Services",
    "slug": "tech-services",
    "icon": "Laptop"
  }
];

// 4. MOCK STORES (100+ Stores)
export const MOCK_STORES: MockStore[] = [
  {
    "id": "00000000-0000-4000-d000-000000000001",
    "user_id": "00000000-0000-4000-b000-000000000001",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Maria's Kitchenette",
    "slug": "maria-s-kitchenette-1",
    "description": "Official campus storefront of Maria Santos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARIA SANTOS",
    "gcash_number": "09170000000",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 8,
    "owner": {
      "full_name": "Maria Santos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000002",
    "user_id": "00000000-0000-4000-b000-000000000002",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Reyes Canvas Studio",
    "slug": "reyes-canvas-studio-2",
    "description": "Official campus storefront of Ethan Dela Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ETHAN DELA CRUZ",
    "gcash_number": "09170013579",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 19,
    "owner": {
      "full_name": "Ethan Dela Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000003",
    "user_id": "00000000-0000-4000-b000-000000000003",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Academia Notes & Reviewers",
    "slug": "academia-notes-reviewers-3",
    "description": "Official campus storefront of Jenna Flores at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JENNA FLORES",
    "gcash_number": "09170027158",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 30,
    "owner": {
      "full_name": "Jenna Flores",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000004",
    "user_id": "00000000-0000-4000-b000-000000000004",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Cafe Bandala & Cold Brews",
    "slug": "cafe-bandala-cold-brews-4",
    "description": "Official campus storefront of Miguel Gonzales at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MIGUEL GONZALES",
    "gcash_number": "09170040737",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 41,
    "owner": {
      "full_name": "Miguel Gonzales",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000005",
    "user_id": "00000000-0000-4000-b000-000000000005",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "MDC Creative Lab & Prints",
    "slug": "mdc-creative-lab-prints-5",
    "description": "Official campus storefront of Alyssa Rivera at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ALYSSA RIVERA",
    "gcash_number": "09170054316",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 52,
    "owner": {
      "full_name": "Alyssa Rivera",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000006",
    "user_id": "00000000-0000-4000-b000-000000000006",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Ateneo & Green Orgs Merch",
    "slug": "ateneo-green-orgs-merch-6",
    "description": "Official campus storefront of Joshua Salazar at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JOSHUA SALAZAR",
    "gcash_number": "09170067895",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 63,
    "owner": {
      "full_name": "Joshua Salazar",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000007",
    "user_id": "00000000-0000-4000-b000-000000000007",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Sweet Cravings Bakery",
    "slug": "sweet-cravings-bakery-7",
    "description": "Official campus storefront of Bea Pascual at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "BEA PASCUAL",
    "gcash_number": "09170081474",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 9,
    "owner": {
      "full_name": "Bea Pascual",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000008",
    "user_id": "00000000-0000-4000-b000-000000000008",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Campus Stationery Depot",
    "slug": "campus-stationery-depot-8",
    "description": "Official campus storefront of Christian Reyes at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHRISTIAN REYES",
    "gcash_number": "09170095053",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 20,
    "owner": {
      "full_name": "Christian Reyes",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000009",
    "user_id": "00000000-0000-4000-b000-000000000009",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Clay & Crochet Creations",
    "slug": "clay-crochet-creations-9",
    "description": "Official campus storefront of Hannah Garcia at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "HANNAH GARCIA",
    "gcash_number": "09170108632",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 31,
    "owner": {
      "full_name": "Hannah Garcia",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000000a",
    "user_id": "00000000-0000-4000-b000-00000000000a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "ByteCraft Tech & 3D Print Hub",
    "slug": "bytecraft-tech-3d-print-hub-10",
    "description": "Official campus storefront of Rafael Bautista at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "RAFAEL BAUTISTA",
    "gcash_number": "09170122211",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 42,
    "owner": {
      "full_name": "Rafael Bautista",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000000b",
    "user_id": "00000000-0000-4000-b000-00000000000b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Camille's Kitchenette #11",
    "slug": "camille-s-kitchenette-11-11",
    "description": "Official campus storefront of Camille Ramos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CAMILLE RAMOS",
    "gcash_number": "09170135790",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 53,
    "owner": {
      "full_name": "Camille Ramos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000000c",
    "user_id": "00000000-0000-4000-b000-00000000000c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Daniel's Canvas Studio #12",
    "slug": "daniel-s-canvas-studio-12-12",
    "description": "Official campus storefront of Daniel Aquino at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "DANIEL AQUINO",
    "gcash_number": "09170149369",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 64,
    "owner": {
      "full_name": "Daniel Aquino",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000000d",
    "user_id": "00000000-0000-4000-b000-00000000000d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Patricia's Notes & Reviewers #13",
    "slug": "patricia-s-notes-reviewers-13-13",
    "description": "Official campus storefront of Patricia Mercado at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "PATRICIA MERCADO",
    "gcash_number": "09170162948",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 10,
    "owner": {
      "full_name": "Patricia Mercado",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000000e",
    "user_id": "00000000-0000-4000-b000-00000000000e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Angelo's Bandala & Cold Brews #14",
    "slug": "angelo-s-bandala-cold-brews-14-14",
    "description": "Official campus storefront of Angelo Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ANGELO CRUZ",
    "gcash_number": "09170176527",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 21,
    "owner": {
      "full_name": "Angelo Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000000f",
    "user_id": "00000000-0000-4000-b000-00000000000f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Samantha's Creative Lab & Prints #15",
    "slug": "samantha-s-creative-lab-prints-15-15",
    "description": "Official campus storefront of Samantha Lim at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "SAMANTHA LIM",
    "gcash_number": "09170190106",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 32,
    "owner": {
      "full_name": "Samantha Lim",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000010",
    "user_id": "00000000-0000-4000-b000-000000000010",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Kevin's Orgs Merch #16",
    "slug": "kevin-s-orgs-merch-16-16",
    "description": "Official campus storefront of Kevin Mendoza at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "KEVIN MENDOZA",
    "gcash_number": "09170203685",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 43,
    "owner": {
      "full_name": "Kevin Mendoza",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000011",
    "user_id": "00000000-0000-4000-b000-000000000011",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Nicole's Cravings Bakery #17",
    "slug": "nicole-s-cravings-bakery-17-17",
    "description": "Official campus storefront of Nicole Villanueva at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "NICOLE VILLANUEVA",
    "gcash_number": "09170217264",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 54,
    "owner": {
      "full_name": "Nicole Villanueva",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000012",
    "user_id": "00000000-0000-4000-b000-000000000012",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Mark's Stationery Depot #18",
    "slug": "mark-s-stationery-depot-18-18",
    "description": "Official campus storefront of Mark Castro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARK CASTRO",
    "gcash_number": "09170230843",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 65,
    "owner": {
      "full_name": "Mark Castro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000013",
    "user_id": "00000000-0000-4000-b000-000000000013",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Chloe's Creations #19",
    "slug": "chloe-s-creations-19-19",
    "description": "Official campus storefront of Chloe Navarro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHLOE NAVARRO",
    "gcash_number": "09170244422",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 11,
    "owner": {
      "full_name": "Chloe Navarro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000014",
    "user_id": "00000000-0000-4000-b000-000000000014",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Gabriel's Tech & 3D Print Hub #20",
    "slug": "gabriel-s-tech-3d-print-hub-20-20",
    "description": "Official campus storefront of Gabriel Tan at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "GABRIEL TAN",
    "gcash_number": "09170258001",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 22,
    "owner": {
      "full_name": "Gabriel Tan",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000015",
    "user_id": "00000000-0000-4000-b000-000000000015",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Maria's Kitchenette #21",
    "slug": "maria-s-kitchenette-21-21",
    "description": "Official campus storefront of Maria Santos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARIA SANTOS",
    "gcash_number": "09170271580",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 33,
    "owner": {
      "full_name": "Maria Santos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000016",
    "user_id": "00000000-0000-4000-b000-000000000016",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Ethan's Canvas Studio #22",
    "slug": "ethan-s-canvas-studio-22-22",
    "description": "Official campus storefront of Ethan Dela Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ETHAN DELA CRUZ",
    "gcash_number": "09170285159",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 44,
    "owner": {
      "full_name": "Ethan Dela Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000017",
    "user_id": "00000000-0000-4000-b000-000000000017",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Jenna's Notes & Reviewers #23",
    "slug": "jenna-s-notes-reviewers-23-23",
    "description": "Official campus storefront of Jenna Flores at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JENNA FLORES",
    "gcash_number": "09170298738",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 55,
    "owner": {
      "full_name": "Jenna Flores",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000018",
    "user_id": "00000000-0000-4000-b000-000000000018",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Miguel's Bandala & Cold Brews #24",
    "slug": "miguel-s-bandala-cold-brews-24-24",
    "description": "Official campus storefront of Miguel Gonzales at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MIGUEL GONZALES",
    "gcash_number": "09170312317",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 66,
    "owner": {
      "full_name": "Miguel Gonzales",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000019",
    "user_id": "00000000-0000-4000-b000-000000000019",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Alyssa's Creative Lab & Prints #25",
    "slug": "alyssa-s-creative-lab-prints-25-25",
    "description": "Official campus storefront of Alyssa Rivera at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ALYSSA RIVERA",
    "gcash_number": "09170325896",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 12,
    "owner": {
      "full_name": "Alyssa Rivera",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000001a",
    "user_id": "00000000-0000-4000-b000-00000000001a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Joshua's Orgs Merch #26",
    "slug": "joshua-s-orgs-merch-26-26",
    "description": "Official campus storefront of Joshua Salazar at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JOSHUA SALAZAR",
    "gcash_number": "09170339475",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 23,
    "owner": {
      "full_name": "Joshua Salazar",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000001b",
    "user_id": "00000000-0000-4000-b000-00000000001b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Bea's Cravings Bakery #27",
    "slug": "bea-s-cravings-bakery-27-27",
    "description": "Official campus storefront of Bea Pascual at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "BEA PASCUAL",
    "gcash_number": "09170353054",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 34,
    "owner": {
      "full_name": "Bea Pascual",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000001c",
    "user_id": "00000000-0000-4000-b000-00000000001c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Christian's Stationery Depot #28",
    "slug": "christian-s-stationery-depot-28-28",
    "description": "Official campus storefront of Christian Reyes at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHRISTIAN REYES",
    "gcash_number": "09170366633",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 45,
    "owner": {
      "full_name": "Christian Reyes",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000001d",
    "user_id": "00000000-0000-4000-b000-00000000001d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Hannah's Creations #29",
    "slug": "hannah-s-creations-29-29",
    "description": "Official campus storefront of Hannah Garcia at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "HANNAH GARCIA",
    "gcash_number": "09170380212",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 56,
    "owner": {
      "full_name": "Hannah Garcia",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000001e",
    "user_id": "00000000-0000-4000-b000-00000000001e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Rafael's Tech & 3D Print Hub #30",
    "slug": "rafael-s-tech-3d-print-hub-30-30",
    "description": "Official campus storefront of Rafael Bautista at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "RAFAEL BAUTISTA",
    "gcash_number": "09170393791",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 67,
    "owner": {
      "full_name": "Rafael Bautista",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000001f",
    "user_id": "00000000-0000-4000-b000-00000000001f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Camille's Kitchenette #31",
    "slug": "camille-s-kitchenette-31-31",
    "description": "Official campus storefront of Camille Ramos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CAMILLE RAMOS",
    "gcash_number": "09170407370",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 13,
    "owner": {
      "full_name": "Camille Ramos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000020",
    "user_id": "00000000-0000-4000-b000-000000000020",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Daniel's Canvas Studio #32",
    "slug": "daniel-s-canvas-studio-32-32",
    "description": "Official campus storefront of Daniel Aquino at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "DANIEL AQUINO",
    "gcash_number": "09170420949",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 24,
    "owner": {
      "full_name": "Daniel Aquino",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000021",
    "user_id": "00000000-0000-4000-b000-000000000021",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Patricia's Notes & Reviewers #33",
    "slug": "patricia-s-notes-reviewers-33-33",
    "description": "Official campus storefront of Patricia Mercado at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "PATRICIA MERCADO",
    "gcash_number": "09170434528",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 35,
    "owner": {
      "full_name": "Patricia Mercado",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000022",
    "user_id": "00000000-0000-4000-b000-000000000022",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Angelo's Bandala & Cold Brews #34",
    "slug": "angelo-s-bandala-cold-brews-34-34",
    "description": "Official campus storefront of Angelo Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ANGELO CRUZ",
    "gcash_number": "09170448107",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 46,
    "owner": {
      "full_name": "Angelo Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000023",
    "user_id": "00000000-0000-4000-b000-000000000023",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Samantha's Creative Lab & Prints #35",
    "slug": "samantha-s-creative-lab-prints-35-35",
    "description": "Official campus storefront of Samantha Lim at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "SAMANTHA LIM",
    "gcash_number": "09170461686",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 57,
    "owner": {
      "full_name": "Samantha Lim",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000024",
    "user_id": "00000000-0000-4000-b000-000000000024",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Kevin's Orgs Merch #36",
    "slug": "kevin-s-orgs-merch-36-36",
    "description": "Official campus storefront of Kevin Mendoza at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "KEVIN MENDOZA",
    "gcash_number": "09170475265",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 68,
    "owner": {
      "full_name": "Kevin Mendoza",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000025",
    "user_id": "00000000-0000-4000-b000-000000000025",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Nicole's Cravings Bakery #37",
    "slug": "nicole-s-cravings-bakery-37-37",
    "description": "Official campus storefront of Nicole Villanueva at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "NICOLE VILLANUEVA",
    "gcash_number": "09170488844",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 14,
    "owner": {
      "full_name": "Nicole Villanueva",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000026",
    "user_id": "00000000-0000-4000-b000-000000000026",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Mark's Stationery Depot #38",
    "slug": "mark-s-stationery-depot-38-38",
    "description": "Official campus storefront of Mark Castro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARK CASTRO",
    "gcash_number": "09170502423",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 25,
    "owner": {
      "full_name": "Mark Castro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000027",
    "user_id": "00000000-0000-4000-b000-000000000027",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Chloe's Creations #39",
    "slug": "chloe-s-creations-39-39",
    "description": "Official campus storefront of Chloe Navarro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHLOE NAVARRO",
    "gcash_number": "09170516002",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 36,
    "owner": {
      "full_name": "Chloe Navarro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000028",
    "user_id": "00000000-0000-4000-b000-000000000028",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Gabriel's Tech & 3D Print Hub #40",
    "slug": "gabriel-s-tech-3d-print-hub-40-40",
    "description": "Official campus storefront of Gabriel Tan at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "GABRIEL TAN",
    "gcash_number": "09170529581",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 47,
    "owner": {
      "full_name": "Gabriel Tan",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000029",
    "user_id": "00000000-0000-4000-b000-000000000029",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Maria's Kitchenette #41",
    "slug": "maria-s-kitchenette-41-41",
    "description": "Official campus storefront of Maria Santos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARIA SANTOS",
    "gcash_number": "09170543160",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 58,
    "owner": {
      "full_name": "Maria Santos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000002a",
    "user_id": "00000000-0000-4000-b000-00000000002a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Ethan's Canvas Studio #42",
    "slug": "ethan-s-canvas-studio-42-42",
    "description": "Official campus storefront of Ethan Dela Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ETHAN DELA CRUZ",
    "gcash_number": "09170556739",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 69,
    "owner": {
      "full_name": "Ethan Dela Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000002b",
    "user_id": "00000000-0000-4000-b000-00000000002b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Jenna's Notes & Reviewers #43",
    "slug": "jenna-s-notes-reviewers-43-43",
    "description": "Official campus storefront of Jenna Flores at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JENNA FLORES",
    "gcash_number": "09170570318",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 15,
    "owner": {
      "full_name": "Jenna Flores",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000002c",
    "user_id": "00000000-0000-4000-b000-00000000002c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Miguel's Bandala & Cold Brews #44",
    "slug": "miguel-s-bandala-cold-brews-44-44",
    "description": "Official campus storefront of Miguel Gonzales at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MIGUEL GONZALES",
    "gcash_number": "09170583897",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 26,
    "owner": {
      "full_name": "Miguel Gonzales",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000002d",
    "user_id": "00000000-0000-4000-b000-00000000002d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Alyssa's Creative Lab & Prints #45",
    "slug": "alyssa-s-creative-lab-prints-45-45",
    "description": "Official campus storefront of Alyssa Rivera at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ALYSSA RIVERA",
    "gcash_number": "09170597476",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 37,
    "owner": {
      "full_name": "Alyssa Rivera",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000002e",
    "user_id": "00000000-0000-4000-b000-00000000002e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Joshua's Orgs Merch #46",
    "slug": "joshua-s-orgs-merch-46-46",
    "description": "Official campus storefront of Joshua Salazar at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JOSHUA SALAZAR",
    "gcash_number": "09170611055",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 48,
    "owner": {
      "full_name": "Joshua Salazar",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000002f",
    "user_id": "00000000-0000-4000-b000-00000000002f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Bea's Cravings Bakery #47",
    "slug": "bea-s-cravings-bakery-47-47",
    "description": "Official campus storefront of Bea Pascual at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "BEA PASCUAL",
    "gcash_number": "09170624634",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 59,
    "owner": {
      "full_name": "Bea Pascual",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000030",
    "user_id": "00000000-0000-4000-b000-000000000030",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Christian's Stationery Depot #48",
    "slug": "christian-s-stationery-depot-48-48",
    "description": "Official campus storefront of Christian Reyes at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHRISTIAN REYES",
    "gcash_number": "09170638213",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 70,
    "owner": {
      "full_name": "Christian Reyes",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000031",
    "user_id": "00000000-0000-4000-b000-000000000031",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Hannah's Creations #49",
    "slug": "hannah-s-creations-49-49",
    "description": "Official campus storefront of Hannah Garcia at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "HANNAH GARCIA",
    "gcash_number": "09170651792",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 16,
    "owner": {
      "full_name": "Hannah Garcia",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000032",
    "user_id": "00000000-0000-4000-b000-000000000032",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Rafael's Tech & 3D Print Hub #50",
    "slug": "rafael-s-tech-3d-print-hub-50-50",
    "description": "Official campus storefront of Rafael Bautista at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "RAFAEL BAUTISTA",
    "gcash_number": "09170665371",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 27,
    "owner": {
      "full_name": "Rafael Bautista",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000033",
    "user_id": "00000000-0000-4000-b000-000000000033",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Camille's Kitchenette #51",
    "slug": "camille-s-kitchenette-51-51",
    "description": "Official campus storefront of Camille Ramos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CAMILLE RAMOS",
    "gcash_number": "09170678950",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 38,
    "owner": {
      "full_name": "Camille Ramos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000034",
    "user_id": "00000000-0000-4000-b000-000000000034",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Daniel's Canvas Studio #52",
    "slug": "daniel-s-canvas-studio-52-52",
    "description": "Official campus storefront of Daniel Aquino at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "DANIEL AQUINO",
    "gcash_number": "09170692529",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 49,
    "owner": {
      "full_name": "Daniel Aquino",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000035",
    "user_id": "00000000-0000-4000-b000-000000000035",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Patricia's Notes & Reviewers #53",
    "slug": "patricia-s-notes-reviewers-53-53",
    "description": "Official campus storefront of Patricia Mercado at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "PATRICIA MERCADO",
    "gcash_number": "09170706108",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 60,
    "owner": {
      "full_name": "Patricia Mercado",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000036",
    "user_id": "00000000-0000-4000-b000-000000000036",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Angelo's Bandala & Cold Brews #54",
    "slug": "angelo-s-bandala-cold-brews-54-54",
    "description": "Official campus storefront of Angelo Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ANGELO CRUZ",
    "gcash_number": "09170719687",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 71,
    "owner": {
      "full_name": "Angelo Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000037",
    "user_id": "00000000-0000-4000-b000-000000000037",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Samantha's Creative Lab & Prints #55",
    "slug": "samantha-s-creative-lab-prints-55-55",
    "description": "Official campus storefront of Samantha Lim at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "SAMANTHA LIM",
    "gcash_number": "09170733266",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 17,
    "owner": {
      "full_name": "Samantha Lim",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000038",
    "user_id": "00000000-0000-4000-b000-000000000038",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Kevin's Orgs Merch #56",
    "slug": "kevin-s-orgs-merch-56-56",
    "description": "Official campus storefront of Kevin Mendoza at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "KEVIN MENDOZA",
    "gcash_number": "09170746845",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 28,
    "owner": {
      "full_name": "Kevin Mendoza",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000039",
    "user_id": "00000000-0000-4000-b000-000000000039",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Nicole's Cravings Bakery #57",
    "slug": "nicole-s-cravings-bakery-57-57",
    "description": "Official campus storefront of Nicole Villanueva at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "NICOLE VILLANUEVA",
    "gcash_number": "09170760424",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 39,
    "owner": {
      "full_name": "Nicole Villanueva",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000003a",
    "user_id": "00000000-0000-4000-b000-00000000003a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Mark's Stationery Depot #58",
    "slug": "mark-s-stationery-depot-58-58",
    "description": "Official campus storefront of Mark Castro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARK CASTRO",
    "gcash_number": "09170774003",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 50,
    "owner": {
      "full_name": "Mark Castro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000003b",
    "user_id": "00000000-0000-4000-b000-00000000003b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Chloe's Creations #59",
    "slug": "chloe-s-creations-59-59",
    "description": "Official campus storefront of Chloe Navarro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHLOE NAVARRO",
    "gcash_number": "09170787582",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 61,
    "owner": {
      "full_name": "Chloe Navarro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000003c",
    "user_id": "00000000-0000-4000-b000-00000000003c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Gabriel's Tech & 3D Print Hub #60",
    "slug": "gabriel-s-tech-3d-print-hub-60-60",
    "description": "Official campus storefront of Gabriel Tan at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "GABRIEL TAN",
    "gcash_number": "09170801161",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 72,
    "owner": {
      "full_name": "Gabriel Tan",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000003d",
    "user_id": "00000000-0000-4000-b000-00000000003d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Maria's Kitchenette #61",
    "slug": "maria-s-kitchenette-61-61",
    "description": "Official campus storefront of Maria Santos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARIA SANTOS",
    "gcash_number": "09170814740",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 18,
    "owner": {
      "full_name": "Maria Santos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000003e",
    "user_id": "00000000-0000-4000-b000-00000000003e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Ethan's Canvas Studio #62",
    "slug": "ethan-s-canvas-studio-62-62",
    "description": "Official campus storefront of Ethan Dela Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ETHAN DELA CRUZ",
    "gcash_number": "09170828319",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 29,
    "owner": {
      "full_name": "Ethan Dela Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000003f",
    "user_id": "00000000-0000-4000-b000-00000000003f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Jenna's Notes & Reviewers #63",
    "slug": "jenna-s-notes-reviewers-63-63",
    "description": "Official campus storefront of Jenna Flores at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JENNA FLORES",
    "gcash_number": "09170841898",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 40,
    "owner": {
      "full_name": "Jenna Flores",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000040",
    "user_id": "00000000-0000-4000-b000-000000000040",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Miguel's Bandala & Cold Brews #64",
    "slug": "miguel-s-bandala-cold-brews-64-64",
    "description": "Official campus storefront of Miguel Gonzales at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MIGUEL GONZALES",
    "gcash_number": "09170855477",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 51,
    "owner": {
      "full_name": "Miguel Gonzales",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000041",
    "user_id": "00000000-0000-4000-b000-000000000041",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Alyssa's Creative Lab & Prints #65",
    "slug": "alyssa-s-creative-lab-prints-65-65",
    "description": "Official campus storefront of Alyssa Rivera at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ALYSSA RIVERA",
    "gcash_number": "09170869056",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 62,
    "owner": {
      "full_name": "Alyssa Rivera",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000042",
    "user_id": "00000000-0000-4000-b000-000000000042",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Joshua's Orgs Merch #66",
    "slug": "joshua-s-orgs-merch-66-66",
    "description": "Official campus storefront of Joshua Salazar at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JOSHUA SALAZAR",
    "gcash_number": "09170882635",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 8,
    "owner": {
      "full_name": "Joshua Salazar",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000043",
    "user_id": "00000000-0000-4000-b000-000000000043",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Bea's Cravings Bakery #67",
    "slug": "bea-s-cravings-bakery-67-67",
    "description": "Official campus storefront of Bea Pascual at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "BEA PASCUAL",
    "gcash_number": "09170896214",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 19,
    "owner": {
      "full_name": "Bea Pascual",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000044",
    "user_id": "00000000-0000-4000-b000-000000000044",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Christian's Stationery Depot #68",
    "slug": "christian-s-stationery-depot-68-68",
    "description": "Official campus storefront of Christian Reyes at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHRISTIAN REYES",
    "gcash_number": "09170909793",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 30,
    "owner": {
      "full_name": "Christian Reyes",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000045",
    "user_id": "00000000-0000-4000-b000-000000000045",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Hannah's Creations #69",
    "slug": "hannah-s-creations-69-69",
    "description": "Official campus storefront of Hannah Garcia at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "HANNAH GARCIA",
    "gcash_number": "09170923372",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 41,
    "owner": {
      "full_name": "Hannah Garcia",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000046",
    "user_id": "00000000-0000-4000-b000-000000000046",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Rafael's Tech & 3D Print Hub #70",
    "slug": "rafael-s-tech-3d-print-hub-70-70",
    "description": "Official campus storefront of Rafael Bautista at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "RAFAEL BAUTISTA",
    "gcash_number": "09170936951",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 52,
    "owner": {
      "full_name": "Rafael Bautista",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000047",
    "user_id": "00000000-0000-4000-b000-000000000047",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Camille's Kitchenette #71",
    "slug": "camille-s-kitchenette-71-71",
    "description": "Official campus storefront of Camille Ramos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CAMILLE RAMOS",
    "gcash_number": "09170950530",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 63,
    "owner": {
      "full_name": "Camille Ramos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000048",
    "user_id": "00000000-0000-4000-b000-000000000048",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Daniel's Canvas Studio #72",
    "slug": "daniel-s-canvas-studio-72-72",
    "description": "Official campus storefront of Daniel Aquino at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "DANIEL AQUINO",
    "gcash_number": "09170964109",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 9,
    "owner": {
      "full_name": "Daniel Aquino",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000049",
    "user_id": "00000000-0000-4000-b000-000000000049",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Patricia's Notes & Reviewers #73",
    "slug": "patricia-s-notes-reviewers-73-73",
    "description": "Official campus storefront of Patricia Mercado at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "PATRICIA MERCADO",
    "gcash_number": "09170977688",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 20,
    "owner": {
      "full_name": "Patricia Mercado",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000004a",
    "user_id": "00000000-0000-4000-b000-00000000004a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Angelo's Bandala & Cold Brews #74",
    "slug": "angelo-s-bandala-cold-brews-74-74",
    "description": "Official campus storefront of Angelo Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ANGELO CRUZ",
    "gcash_number": "09170991267",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 31,
    "owner": {
      "full_name": "Angelo Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000004b",
    "user_id": "00000000-0000-4000-b000-00000000004b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Samantha's Creative Lab & Prints #75",
    "slug": "samantha-s-creative-lab-prints-75-75",
    "description": "Official campus storefront of Samantha Lim at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "SAMANTHA LIM",
    "gcash_number": "09171004846",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 42,
    "owner": {
      "full_name": "Samantha Lim",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000004c",
    "user_id": "00000000-0000-4000-b000-00000000004c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Kevin's Orgs Merch #76",
    "slug": "kevin-s-orgs-merch-76-76",
    "description": "Official campus storefront of Kevin Mendoza at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "KEVIN MENDOZA",
    "gcash_number": "09171018425",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 53,
    "owner": {
      "full_name": "Kevin Mendoza",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000004d",
    "user_id": "00000000-0000-4000-b000-00000000004d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Nicole's Cravings Bakery #77",
    "slug": "nicole-s-cravings-bakery-77-77",
    "description": "Official campus storefront of Nicole Villanueva at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "NICOLE VILLANUEVA",
    "gcash_number": "09171032004",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 64,
    "owner": {
      "full_name": "Nicole Villanueva",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000004e",
    "user_id": "00000000-0000-4000-b000-00000000004e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Mark's Stationery Depot #78",
    "slug": "mark-s-stationery-depot-78-78",
    "description": "Official campus storefront of Mark Castro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARK CASTRO",
    "gcash_number": "09171045583",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 10,
    "owner": {
      "full_name": "Mark Castro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000004f",
    "user_id": "00000000-0000-4000-b000-00000000004f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Chloe's Creations #79",
    "slug": "chloe-s-creations-79-79",
    "description": "Official campus storefront of Chloe Navarro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHLOE NAVARRO",
    "gcash_number": "09171059162",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 21,
    "owner": {
      "full_name": "Chloe Navarro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000050",
    "user_id": "00000000-0000-4000-b000-000000000050",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Gabriel's Tech & 3D Print Hub #80",
    "slug": "gabriel-s-tech-3d-print-hub-80-80",
    "description": "Official campus storefront of Gabriel Tan at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "GABRIEL TAN",
    "gcash_number": "09171072741",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 32,
    "owner": {
      "full_name": "Gabriel Tan",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000051",
    "user_id": "00000000-0000-4000-b000-000000000051",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Maria's Kitchenette #81",
    "slug": "maria-s-kitchenette-81-81",
    "description": "Official campus storefront of Maria Santos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARIA SANTOS",
    "gcash_number": "09171086320",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 43,
    "owner": {
      "full_name": "Maria Santos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000052",
    "user_id": "00000000-0000-4000-b000-000000000052",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Ethan's Canvas Studio #82",
    "slug": "ethan-s-canvas-studio-82-82",
    "description": "Official campus storefront of Ethan Dela Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ETHAN DELA CRUZ",
    "gcash_number": "09171099899",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 54,
    "owner": {
      "full_name": "Ethan Dela Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000053",
    "user_id": "00000000-0000-4000-b000-000000000053",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Jenna's Notes & Reviewers #83",
    "slug": "jenna-s-notes-reviewers-83-83",
    "description": "Official campus storefront of Jenna Flores at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JENNA FLORES",
    "gcash_number": "09171113478",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 65,
    "owner": {
      "full_name": "Jenna Flores",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000054",
    "user_id": "00000000-0000-4000-b000-000000000054",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Miguel's Bandala & Cold Brews #84",
    "slug": "miguel-s-bandala-cold-brews-84-84",
    "description": "Official campus storefront of Miguel Gonzales at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MIGUEL GONZALES",
    "gcash_number": "09171127057",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 11,
    "owner": {
      "full_name": "Miguel Gonzales",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000055",
    "user_id": "00000000-0000-4000-b000-000000000055",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Alyssa's Creative Lab & Prints #85",
    "slug": "alyssa-s-creative-lab-prints-85-85",
    "description": "Official campus storefront of Alyssa Rivera at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ALYSSA RIVERA",
    "gcash_number": "09171140636",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 22,
    "owner": {
      "full_name": "Alyssa Rivera",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000056",
    "user_id": "00000000-0000-4000-b000-000000000056",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Joshua's Orgs Merch #86",
    "slug": "joshua-s-orgs-merch-86-86",
    "description": "Official campus storefront of Joshua Salazar at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JOSHUA SALAZAR",
    "gcash_number": "09171154215",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 33,
    "owner": {
      "full_name": "Joshua Salazar",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000057",
    "user_id": "00000000-0000-4000-b000-000000000057",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Bea's Cravings Bakery #87",
    "slug": "bea-s-cravings-bakery-87-87",
    "description": "Official campus storefront of Bea Pascual at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "BEA PASCUAL",
    "gcash_number": "09171167794",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 44,
    "owner": {
      "full_name": "Bea Pascual",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000058",
    "user_id": "00000000-0000-4000-b000-000000000058",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Christian's Stationery Depot #88",
    "slug": "christian-s-stationery-depot-88-88",
    "description": "Official campus storefront of Christian Reyes at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHRISTIAN REYES",
    "gcash_number": "09171181373",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 55,
    "owner": {
      "full_name": "Christian Reyes",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000059",
    "user_id": "00000000-0000-4000-b000-000000000059",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Hannah's Creations #89",
    "slug": "hannah-s-creations-89-89",
    "description": "Official campus storefront of Hannah Garcia at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "HANNAH GARCIA",
    "gcash_number": "09171194952",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 66,
    "owner": {
      "full_name": "Hannah Garcia",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000005a",
    "user_id": "00000000-0000-4000-b000-00000000005a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Rafael's Tech & 3D Print Hub #90",
    "slug": "rafael-s-tech-3d-print-hub-90-90",
    "description": "Official campus storefront of Rafael Bautista at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "RAFAEL BAUTISTA",
    "gcash_number": "09171208531",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 12,
    "owner": {
      "full_name": "Rafael Bautista",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000005b",
    "user_id": "00000000-0000-4000-b000-00000000005b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Camille's Kitchenette #91",
    "slug": "camille-s-kitchenette-91-91",
    "description": "Official campus storefront of Camille Ramos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CAMILLE RAMOS",
    "gcash_number": "09171222110",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 23,
    "owner": {
      "full_name": "Camille Ramos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000005c",
    "user_id": "00000000-0000-4000-b000-00000000005c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Daniel's Canvas Studio #92",
    "slug": "daniel-s-canvas-studio-92-92",
    "description": "Official campus storefront of Daniel Aquino at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "DANIEL AQUINO",
    "gcash_number": "09171235689",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 34,
    "owner": {
      "full_name": "Daniel Aquino",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000005d",
    "user_id": "00000000-0000-4000-b000-00000000005d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Patricia's Notes & Reviewers #93",
    "slug": "patricia-s-notes-reviewers-93-93",
    "description": "Official campus storefront of Patricia Mercado at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "PATRICIA MERCADO",
    "gcash_number": "09171249268",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 45,
    "owner": {
      "full_name": "Patricia Mercado",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000005e",
    "user_id": "00000000-0000-4000-b000-00000000005e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Angelo's Bandala & Cold Brews #94",
    "slug": "angelo-s-bandala-cold-brews-94-94",
    "description": "Official campus storefront of Angelo Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ANGELO CRUZ",
    "gcash_number": "09171262847",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 56,
    "owner": {
      "full_name": "Angelo Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-00000000005f",
    "user_id": "00000000-0000-4000-b000-00000000005f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Samantha's Creative Lab & Prints #95",
    "slug": "samantha-s-creative-lab-prints-95-95",
    "description": "Official campus storefront of Samantha Lim at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "SAMANTHA LIM",
    "gcash_number": "09171276426",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 67,
    "owner": {
      "full_name": "Samantha Lim",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000060",
    "user_id": "00000000-0000-4000-b000-000000000060",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Kevin's Orgs Merch #96",
    "slug": "kevin-s-orgs-merch-96-96",
    "description": "Official campus storefront of Kevin Mendoza at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "KEVIN MENDOZA",
    "gcash_number": "09171290005",
    "pickup_locations": "Senior High School Pavilion",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.65,
    "rating_count": 13,
    "owner": {
      "full_name": "Kevin Mendoza",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000061",
    "user_id": "00000000-0000-4000-b000-000000000061",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Nicole's Cravings Bakery #97",
    "slug": "nicole-s-cravings-bakery-97-97",
    "description": "Official campus storefront of Nicole Villanueva at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "NICOLE VILLANUEVA",
    "gcash_number": "09171303584",
    "pickup_locations": "Gate 2 Guardhouse",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.72,
    "rating_count": 24,
    "owner": {
      "full_name": "Nicole Villanueva",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000062",
    "user_id": "00000000-0000-4000-b000-000000000062",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Mark's Stationery Depot #98",
    "slug": "mark-s-stationery-depot-98-98",
    "description": "Official campus storefront of Mark Castro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARK CASTRO",
    "gcash_number": "09171317163",
    "pickup_locations": "Science Wing Hallway",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.79,
    "rating_count": 35,
    "owner": {
      "full_name": "Mark Castro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000063",
    "user_id": "00000000-0000-4000-b000-000000000063",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Chloe's Creations #99",
    "slug": "chloe-s-creations-99-99",
    "description": "Official campus storefront of Chloe Navarro at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "CHLOE NAVARRO",
    "gcash_number": "09171330742",
    "pickup_locations": "Arts & Design Studio Lounge",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.86,
    "rating_count": 46,
    "owner": {
      "full_name": "Chloe Navarro",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000064",
    "user_id": "00000000-0000-4000-b000-000000000064",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Gabriel's Tech & 3D Print Hub #100",
    "slug": "gabriel-s-tech-3d-print-hub-100-100",
    "description": "Official campus storefront of Gabriel Tan at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "GABRIEL TAN",
    "gcash_number": "09171344321",
    "pickup_locations": "Computer Lab 2 Corridor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.93,
    "rating_count": 57,
    "owner": {
      "full_name": "Gabriel Tan",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000065",
    "user_id": "00000000-0000-4000-b000-000000000065",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Maria's Kitchenette #101",
    "slug": "maria-s-kitchenette-101-101",
    "description": "Official campus storefront of Maria Santos at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MARIA SANTOS",
    "gcash_number": "09171357900",
    "pickup_locations": "Main Library Lobby",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.3,
    "rating_count": 68,
    "owner": {
      "full_name": "Maria Santos",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000066",
    "user_id": "00000000-0000-4000-b000-000000000066",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Ethan's Canvas Studio #102",
    "slug": "ethan-s-canvas-studio-102-102",
    "description": "Official campus storefront of Ethan Dela Cruz at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ETHAN DELA CRUZ",
    "gcash_number": "09171371479",
    "pickup_locations": "Building B Quadrangle",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.37,
    "rating_count": 14,
    "owner": {
      "full_name": "Ethan Dela Cruz",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000067",
    "user_id": "00000000-0000-4000-b000-000000000067",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Jenna's Notes & Reviewers #103",
    "slug": "jenna-s-notes-reviewers-103-103",
    "description": "Official campus storefront of Jenna Flores at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "JENNA FLORES",
    "gcash_number": "09171385058",
    "pickup_locations": "Cafeteria Kiosk #3",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.44,
    "rating_count": 25,
    "owner": {
      "full_name": "Jenna Flores",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000068",
    "user_id": "00000000-0000-4000-b000-000000000068",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Miguel's Bandala & Cold Brews #104",
    "slug": "miguel-s-bandala-cold-brews-104-104",
    "description": "Official campus storefront of Miguel Gonzales at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "MIGUEL GONZALES",
    "gcash_number": "09171398637",
    "pickup_locations": "Student Center 1st Floor",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.51,
    "rating_count": 36,
    "owner": {
      "full_name": "Miguel Gonzales",
      "role": "SELLER"
    }
  },
  {
    "id": "00000000-0000-4000-d000-000000000069",
    "user_id": "00000000-0000-4000-b000-000000000069",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "name": "Alyssa's Creative Lab & Prints #105",
    "slug": "alyssa-s-creative-lab-prints-105-105",
    "description": "Official campus storefront of Alyssa Rivera at LYFJSHS. Providing fresh and reliable products for fellow students and faculty.",
    "logo_url": null,
    "banner_url": null,
    "gcash_name": "ALYSSA RIVERA",
    "gcash_number": "09171412216",
    "pickup_locations": "Gymnasium Entrance",
    "operating_hours": "Mon - Fri, 8:00 AM - 5:00 PM",
    "is_active": true,
    "rating_avg": 4.58,
    "rating_count": 47,
    "owner": {
      "full_name": "Alyssa Rivera",
      "role": "SELLER"
    }
  }
];

// 5. MOCK PRODUCTS (100+ Products)
export const MOCK_PRODUCTS: ProductItem[] = [
  {
    "id": "00000000-0000-4000-e000-000000000001",
    "title": "Homemade Chocolate Chip Cookies (Dozen)",
    "slug": "homemade-chocolate-chip-cookies-dozen-1",
    "description": "Freshly baked soft-batch chocolate chip cookies with premium butter. Perfect snack during class breaks.",
    "price": 150,
    "stock": 5,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000001",
      "name": "Maria's Kitchenette",
      "slug": "maria-s-kitchenette-1",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 8,
      "owner": {
        "full_name": "Maria Santos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000002",
    "title": "Cold Brew Iced Caramel Latte (16oz)",
    "slug": "cold-brew-iced-caramel-latte-16oz-2",
    "description": "Rich arabica cold brew coffee layered with salted caramel syrup and creamy fresh milk.",
    "price": 100,
    "stock": 12,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000002",
      "name": "Reyes Canvas Studio",
      "slug": "reyes-canvas-studio-2",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 19,
      "owner": {
        "full_name": "Ethan Dela Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000003",
    "title": "Matcha Cream Cheese Brownies (Box of 6)",
    "slug": "matcha-cream-cheese-brownies-box-of-6-3",
    "description": "Fudgy matcha green tea brownies swirled with decadent cream cheese filling.",
    "price": 190,
    "stock": 19,
    "status": "ACTIVE",
    "prep_time_minutes": 45,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000003",
      "name": "Academia Notes & Reviewers",
      "slug": "academia-notes-reviewers-3",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 30,
      "owner": {
        "full_name": "Jenna Flores",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000004",
    "title": "Crispy Siomai with Chili Garlic Oil (6 pcs)",
    "slug": "crispy-siomai-with-chili-garlic-oil-6-pcs-4",
    "description": "Steamed and fried pork siomai served with signature homemade toasted chili garlic sauce and calamansi.",
    "price": 80,
    "stock": 26,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000004",
      "name": "Cafe Bandala & Cold Brews",
      "slug": "cafe-bandala-cold-brews-4",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 41,
      "owner": {
        "full_name": "Miguel Gonzales",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000005",
    "title": "Iced Strawberry Hibiscus Tea (22oz)",
    "slug": "iced-strawberry-hibiscus-tea-22oz-5",
    "description": "Refreshing brewed herbal hibiscus tea with real strawberry puree and chia seeds.",
    "price": 95,
    "stock": 33,
    "status": "ACTIVE",
    "prep_time_minutes": 5,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000005",
      "name": "MDC Creative Lab & Prints",
      "slug": "mdc-creative-lab-prints-5",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 52,
      "owner": {
        "full_name": "Alyssa Rivera",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000006",
    "title": "Artisan Ube Cheese Pandesal (Pack of 10)",
    "slug": "artisan-ube-cheese-pandesal-pack-of-10-6",
    "description": "Fluffy purple yam bread stuffed with melting cheddar cheese cubes. Served warm.",
    "price": 145,
    "stock": 40,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000006",
      "name": "Ateneo & Green Orgs Merch",
      "slug": "ateneo-green-orgs-merch-6",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 63,
      "owner": {
        "full_name": "Joshua Salazar",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000007",
    "title": "Mango Graham Float Cups (350ml)",
    "slug": "mango-graham-float-cups-350ml-7",
    "description": "Layers of crushed honey grahams, sweet condensed cream, and ripe Guimaras mangoes in convenient cup.",
    "price": 115,
    "stock": 7,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000007",
      "name": "Sweet Cravings Bakery",
      "slug": "sweet-cravings-bakery-7",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 9,
      "owner": {
        "full_name": "Bea Pascual",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000008",
    "title": "Gourmet Spam Musubi with Japanese Furikake",
    "slug": "gourmet-spam-musubi-with-japanese-furikake-8",
    "description": "Teriyaki-glazed luncheon meat over seasoned sushi rice wrapped in nori seaweed.",
    "price": 60,
    "stock": 14,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000008",
      "name": "Campus Stationery Depot",
      "slug": "campus-stationery-depot-8",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 20,
      "owner": {
        "full_name": "Christian Reyes",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000009",
    "title": "Handcrafted Canvas Tote Bag (Laptop Sized)",
    "slug": "handcrafted-canvas-tote-bag-laptop-sized-9",
    "description": "Heavy-duty 14oz cotton canvas tote with zipper and inside pocket. Custom silkscreen printed.",
    "price": 285,
    "stock": 21,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000009",
      "name": "Clay & Crochet Creations",
      "slug": "clay-crochet-creations-9",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 31,
      "owner": {
        "full_name": "Hannah Garcia",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000000a",
    "title": "Crochet Sunflower Keychain & Bag Charm",
    "slug": "crochet-sunflower-keychain-bag-charm-10",
    "description": "Lovingly hand-crocheted milk cotton sunflower with sturdy metal lobster clasp.",
    "price": 105,
    "stock": 28,
    "status": "ACTIVE",
    "prep_time_minutes": 60,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000000a",
      "name": "ByteCraft Tech & 3D Print Hub",
      "slug": "bytecraft-tech-3d-print-hub-10",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 42,
      "owner": {
        "full_name": "Rafael Bautista",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000000b",
    "title": "Custom Resin Letter Keychain with Gold Flakes",
    "slug": "custom-resin-letter-keychain-with-gold-flakes-11",
    "description": "Crystal clear epoxy resin alphabet keychain embedded with dried baby's breath and foil accents.",
    "price": 125,
    "stock": 35,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000000b",
      "name": "Camille's Kitchenette #11",
      "slug": "camille-s-kitchenette-11-11",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 53,
      "owner": {
        "full_name": "Camille Ramos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000000c",
    "title": "Woven Macrame Cup Sleeve & Strap",
    "slug": "woven-macrame-cup-sleeve-strap-12",
    "description": "Eco-friendly handmade cotton cord drink holder for tumblers and boba cups.",
    "price": 150,
    "stock": 42,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000000c",
      "name": "Daniel's Canvas Studio #12",
      "slug": "daniel-s-canvas-studio-12-12",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 64,
      "owner": {
        "full_name": "Daniel Aquino",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000000d",
    "title": "Beaded Pearl Phone Charm Wristlet",
    "slug": "beaded-pearl-phone-charm-wristlet-13",
    "description": "Durable nylon cord lanyard with iridescent beads and cute pastel stars.",
    "price": 110,
    "stock": 9,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000000d",
      "name": "Patricia's Notes & Reviewers #13",
      "slug": "patricia-s-notes-reviewers-13-13",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 10,
      "owner": {
        "full_name": "Patricia Mercado",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000000e",
    "title": "Hand-poured Soy Candle (Lavender & Sage)",
    "slug": "hand-poured-soy-candle-lavender-sage-14",
    "description": "100% natural soy wax in 150g amber jar with cotton wick. Burns clean for 30+ hours.",
    "price": 250,
    "stock": 16,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000000e",
      "name": "Angelo's Bandala & Cold Brews #14",
      "slug": "angelo-s-bandala-cold-brews-14-14",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 21,
      "owner": {
        "full_name": "Angelo Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000000f",
    "title": "LYFJSHS Campus Minimalist Lanyard & Card Case",
    "slug": "lyfjshs-campus-minimalist-lanyard-card-case-15",
    "description": "Thick satin lanyard with leather accent and clear ID badge holder. Official campus colors.",
    "price": 120,
    "stock": 23,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000000f",
      "name": "Samantha's Creative Lab & Prints #15",
      "slug": "samantha-s-creative-lab-prints-15-15",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 32,
      "owner": {
        "full_name": "Samantha Lim",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000010",
    "title": "Senior High Strand Embroidered Bucket Hat",
    "slug": "senior-high-strand-embroidered-bucket-hat-16",
    "description": "100% cotton twill bucket hat with minimalist strand initials embroidered on front.",
    "price": 295,
    "stock": 30,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000010",
      "name": "Kevin's Orgs Merch #16",
      "slug": "kevin-s-orgs-merch-16-16",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 43,
      "owner": {
        "full_name": "Kevin Mendoza",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000011",
    "title": "Oversized 'Puyat for the Future' Graphic Shirt",
    "slug": "oversized-puyat-for-the-future-graphic-shirt-17",
    "description": "220 GSM heavyweight combed cotton tee with breathable screen-printed student art.",
    "price": 390,
    "stock": 37,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000011",
      "name": "Nicole's Cravings Bakery #17",
      "slug": "nicole-s-cravings-bakery-17-17",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 54,
      "owner": {
        "full_name": "Nicole Villanueva",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000012",
    "title": "Matte Vinyl Campus Sticker Pack (10 Pieces)",
    "slug": "matte-vinyl-campus-sticker-pack-10-pieces-18",
    "description": "Waterproof and scratchproof die-cut vinyl stickers for hydroflasks, laptops, and binders.",
    "price": 90,
    "stock": 44,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000012",
      "name": "Mark's Stationery Depot #18",
      "slug": "mark-s-stationery-depot-18-18",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 65,
      "owner": {
        "full_name": "Mark Castro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000013",
    "title": "Insulated Stainless Steel Campus Tumbler (750ml)",
    "slug": "insulated-stainless-steel-campus-tumbler-750ml-19",
    "description": "Double-wall vacuum insulated water bottle keeping drinks icy cold for 24 hours.",
    "price": 440,
    "stock": 11,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000013",
      "name": "Chloe's Creations #19",
      "slug": "chloe-s-creations-19-19",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 11,
      "owner": {
        "full_name": "Chloe Navarro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000014",
    "title": "Comprehensive Calculus & STEM Review Notes (Digitized)",
    "slug": "comprehensive-calculus-stem-review-notes-digitized-20",
    "description": "High-yield summarized handwritten review notes with step-by-step solved formulas.",
    "price": 145,
    "stock": 18,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000014",
      "name": "Gabriel's Tech & 3D Print Hub #20",
      "slug": "gabriel-s-tech-3d-print-hub-20-20",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 22,
      "owner": {
        "full_name": "Gabriel Tan",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000015",
    "title": "Hardbound Grid Bullet Journal Notebook (160 Pages)",
    "slug": "hardbound-grid-bullet-journal-notebook-160-pages-21",
    "description": "120 GSM bleed-resistant dotted ivory paper with elastic closure band and ribbon bookmark.",
    "price": 225,
    "stock": 25,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000015",
      "name": "Maria's Kitchenette #21",
      "slug": "maria-s-kitchenette-21-21",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 33,
      "owner": {
        "full_name": "Maria Santos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000016",
    "title": "Pastel Gel Ink Retractable Pens (Set of 6)",
    "slug": "pastel-gel-ink-retractable-pens-set-of-6-22",
    "description": "Smooth-writing 0.5mm quick-dry Japanese ink in vintage aesthetic barrel colors.",
    "price": 140,
    "stock": 32,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000016",
      "name": "Ethan's Canvas Studio #22",
      "slug": "ethan-s-canvas-studio-22-22",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 44,
      "owner": {
        "full_name": "Ethan Dela Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000017",
    "title": "Aesthetic Sticky Notes & Index Tabs Bundle",
    "slug": "aesthetic-sticky-notes-index-tabs-bundle-23",
    "description": "6 pads of neutral pastel sticky notes and translucent PET film page flags.",
    "price": 70,
    "stock": 39,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000017",
      "name": "Jenna's Notes & Reviewers #23",
      "slug": "jenna-s-notes-reviewers-23-23",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 55,
      "owner": {
        "full_name": "Jenna Flores",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000018",
    "title": "Accounting & General Mathematics Quick Formula Cards",
    "slug": "accounting-general-mathematics-quick-formula-cards-24",
    "description": "Laminated flashcard ring with essential financial equations and algebra shortcuts.",
    "price": 100,
    "stock": 6,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000018",
      "name": "Miguel's Bandala & Cold Brews #24",
      "slug": "miguel-s-bandala-cold-brews-24-24",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 66,
      "owner": {
        "full_name": "Miguel Gonzales",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000019",
    "title": "Custom Org Poster & Event Layout Design",
    "slug": "custom-org-poster-event-layout-design-25",
    "description": "Professional high-res digital poster, banner, and pubmat design delivered in PSD/PNG.",
    "price": 365,
    "stock": 13,
    "status": "ACTIVE",
    "prep_time_minutes": 180,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000019",
      "name": "Alyssa's Creative Lab & Prints #25",
      "slug": "alyssa-s-creative-lab-prints-25-25",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 12,
      "owner": {
        "full_name": "Alyssa Rivera",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000001a",
    "title": "Mechanical Keyboard Lube & Switch Modding Service",
    "slug": "mechanical-keyboard-lube-switch-modding-service-26",
    "description": "Full Krytox 205g0 lubing and stabilizer holee-modding service for buttery smooth typing.",
    "price": 270,
    "stock": 20,
    "status": "ACTIVE",
    "prep_time_minutes": 240,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000001a",
      "name": "Joshua's Orgs Merch #26",
      "slug": "joshua-s-orgs-merch-26-26",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 23,
      "owner": {
        "full_name": "Joshua Salazar",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000001b",
    "title": "Thrifted Vintage Corduroy Jacket (Unisex Oversized)",
    "slug": "thrifted-vintage-corduroy-jacket-unisex-oversized-27",
    "description": "Handpicked, washed, and sanitized retro 90s corduroy button-up jacket. Fits S-L.",
    "price": 415,
    "stock": 27,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000001b",
      "name": "Bea's Cravings Bakery #27",
      "slug": "bea-s-cravings-bakery-27-27",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 34,
      "owner": {
        "full_name": "Bea Pascual",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000001c",
    "title": "Custom 3D Printed Laptop Stand & Phone Dock",
    "slug": "custom-3d-printed-laptop-stand-phone-dock-28",
    "description": "Ergonomic dual-angle matte black PLA filament desk stand with cable organizer slot.",
    "price": 210,
    "stock": 34,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000001c",
      "name": "Christian's Stationery Depot #28",
      "slug": "christian-s-stationery-depot-28-28",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 45,
      "owner": {
        "full_name": "Christian Reyes",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000001d",
    "title": "Acoustic Guitar Restringing & Deep Clean Service",
    "slug": "acoustic-guitar-restringing-deep-clean-service-29",
    "description": "Fretboard lemon oil conditioning, truss rod check, and installation of D'Addario strings.",
    "price": 150,
    "stock": 41,
    "status": "ACTIVE",
    "prep_time_minutes": 45,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000001d",
      "name": "Hannah's Creations #29",
      "slug": "hannah-s-creations-29-29",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 56,
      "owner": {
        "full_name": "Hannah Garcia",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000001e",
    "title": "Homemade Chocolate Chip Cookies (Dozen) (Batch #2)",
    "slug": "homemade-chocolate-chip-cookies-dozen-batch-2-30",
    "description": "Freshly baked soft-batch chocolate chip cookies with premium butter. Perfect snack during class breaks.",
    "price": 155,
    "stock": 8,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000001e",
      "name": "Rafael's Tech & 3D Print Hub #30",
      "slug": "rafael-s-tech-3d-print-hub-30-30",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 67,
      "owner": {
        "full_name": "Rafael Bautista",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000001f",
    "title": "Cold Brew Iced Caramel Latte (16oz) (Batch #2)",
    "slug": "cold-brew-iced-caramel-latte-16oz-batch-2-31",
    "description": "Rich arabica cold brew coffee layered with salted caramel syrup and creamy fresh milk.",
    "price": 105,
    "stock": 15,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000001f",
      "name": "Camille's Kitchenette #31",
      "slug": "camille-s-kitchenette-31-31",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 13,
      "owner": {
        "full_name": "Camille Ramos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000020",
    "title": "Matcha Cream Cheese Brownies (Box of 6) (Batch #2)",
    "slug": "matcha-cream-cheese-brownies-box-of-6-batch-2-32",
    "description": "Fudgy matcha green tea brownies swirled with decadent cream cheese filling.",
    "price": 195,
    "stock": 22,
    "status": "ACTIVE",
    "prep_time_minutes": 45,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000020",
      "name": "Daniel's Canvas Studio #32",
      "slug": "daniel-s-canvas-studio-32-32",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 24,
      "owner": {
        "full_name": "Daniel Aquino",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000021",
    "title": "Crispy Siomai with Chili Garlic Oil (6 pcs) (Batch #2)",
    "slug": "crispy-siomai-with-chili-garlic-oil-6-pcs-batch-2-33",
    "description": "Steamed and fried pork siomai served with signature homemade toasted chili garlic sauce and calamansi.",
    "price": 85,
    "stock": 29,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000021",
      "name": "Patricia's Notes & Reviewers #33",
      "slug": "patricia-s-notes-reviewers-33-33",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 35,
      "owner": {
        "full_name": "Patricia Mercado",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000022",
    "title": "Iced Strawberry Hibiscus Tea (22oz) (Batch #2)",
    "slug": "iced-strawberry-hibiscus-tea-22oz-batch-2-34",
    "description": "Refreshing brewed herbal hibiscus tea with real strawberry puree and chia seeds.",
    "price": 100,
    "stock": 36,
    "status": "ACTIVE",
    "prep_time_minutes": 5,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000022",
      "name": "Angelo's Bandala & Cold Brews #34",
      "slug": "angelo-s-bandala-cold-brews-34-34",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 46,
      "owner": {
        "full_name": "Angelo Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000023",
    "title": "Artisan Ube Cheese Pandesal (Pack of 10) (Batch #2)",
    "slug": "artisan-ube-cheese-pandesal-pack-of-10-batch-2-35",
    "description": "Fluffy purple yam bread stuffed with melting cheddar cheese cubes. Served warm.",
    "price": 150,
    "stock": 43,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000023",
      "name": "Samantha's Creative Lab & Prints #35",
      "slug": "samantha-s-creative-lab-prints-35-35",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 57,
      "owner": {
        "full_name": "Samantha Lim",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000024",
    "title": "Mango Graham Float Cups (350ml) (Batch #2)",
    "slug": "mango-graham-float-cups-350ml-batch-2-36",
    "description": "Layers of crushed honey grahams, sweet condensed cream, and ripe Guimaras mangoes in convenient cup.",
    "price": 85,
    "stock": 10,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000024",
      "name": "Kevin's Orgs Merch #36",
      "slug": "kevin-s-orgs-merch-36-36",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 68,
      "owner": {
        "full_name": "Kevin Mendoza",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000025",
    "title": "Gourmet Spam Musubi with Japanese Furikake (Batch #2)",
    "slug": "gourmet-spam-musubi-with-japanese-furikake-batch-2-37",
    "description": "Teriyaki-glazed luncheon meat over seasoned sushi rice wrapped in nori seaweed.",
    "price": 65,
    "stock": 17,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000025",
      "name": "Nicole's Cravings Bakery #37",
      "slug": "nicole-s-cravings-bakery-37-37",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 14,
      "owner": {
        "full_name": "Nicole Villanueva",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000026",
    "title": "Handcrafted Canvas Tote Bag (Laptop Sized) (Batch #2)",
    "slug": "handcrafted-canvas-tote-bag-laptop-sized-batch-2-38",
    "description": "Heavy-duty 14oz cotton canvas tote with zipper and inside pocket. Custom silkscreen printed.",
    "price": 290,
    "stock": 24,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000026",
      "name": "Mark's Stationery Depot #38",
      "slug": "mark-s-stationery-depot-38-38",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 25,
      "owner": {
        "full_name": "Mark Castro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000027",
    "title": "Crochet Sunflower Keychain & Bag Charm (Batch #2)",
    "slug": "crochet-sunflower-keychain-bag-charm-batch-2-39",
    "description": "Lovingly hand-crocheted milk cotton sunflower with sturdy metal lobster clasp.",
    "price": 110,
    "stock": 31,
    "status": "ACTIVE",
    "prep_time_minutes": 60,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000027",
      "name": "Chloe's Creations #39",
      "slug": "chloe-s-creations-39-39",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 36,
      "owner": {
        "full_name": "Chloe Navarro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000028",
    "title": "Custom Resin Letter Keychain with Gold Flakes (Batch #2)",
    "slug": "custom-resin-letter-keychain-with-gold-flakes-batch-2-40",
    "description": "Crystal clear epoxy resin alphabet keychain embedded with dried baby's breath and foil accents.",
    "price": 130,
    "stock": 38,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000028",
      "name": "Gabriel's Tech & 3D Print Hub #40",
      "slug": "gabriel-s-tech-3d-print-hub-40-40",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 47,
      "owner": {
        "full_name": "Gabriel Tan",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000029",
    "title": "Woven Macrame Cup Sleeve & Strap (Batch #2)",
    "slug": "woven-macrame-cup-sleeve-strap-batch-2-41",
    "description": "Eco-friendly handmade cotton cord drink holder for tumblers and boba cups.",
    "price": 155,
    "stock": 5,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000029",
      "name": "Maria's Kitchenette #41",
      "slug": "maria-s-kitchenette-41-41",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 58,
      "owner": {
        "full_name": "Maria Santos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000002a",
    "title": "Beaded Pearl Phone Charm Wristlet (Batch #2)",
    "slug": "beaded-pearl-phone-charm-wristlet-batch-2-42",
    "description": "Durable nylon cord lanyard with iridescent beads and cute pastel stars.",
    "price": 115,
    "stock": 12,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000002a",
      "name": "Ethan's Canvas Studio #42",
      "slug": "ethan-s-canvas-studio-42-42",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 69,
      "owner": {
        "full_name": "Ethan Dela Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000002b",
    "title": "Hand-poured Soy Candle (Lavender & Sage) (Batch #2)",
    "slug": "hand-poured-soy-candle-lavender-sage-batch-2-43",
    "description": "100% natural soy wax in 150g amber jar with cotton wick. Burns clean for 30+ hours.",
    "price": 220,
    "stock": 19,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000002b",
      "name": "Jenna's Notes & Reviewers #43",
      "slug": "jenna-s-notes-reviewers-43-43",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 15,
      "owner": {
        "full_name": "Jenna Flores",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000002c",
    "title": "LYFJSHS Campus Minimalist Lanyard & Card Case (Batch #2)",
    "slug": "lyfjshs-campus-minimalist-lanyard-card-case-batch-2-44",
    "description": "Thick satin lanyard with leather accent and clear ID badge holder. Official campus colors.",
    "price": 125,
    "stock": 26,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000002c",
      "name": "Miguel's Bandala & Cold Brews #44",
      "slug": "miguel-s-bandala-cold-brews-44-44",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 26,
      "owner": {
        "full_name": "Miguel Gonzales",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000002d",
    "title": "Senior High Strand Embroidered Bucket Hat (Batch #2)",
    "slug": "senior-high-strand-embroidered-bucket-hat-batch-2-45",
    "description": "100% cotton twill bucket hat with minimalist strand initials embroidered on front.",
    "price": 300,
    "stock": 33,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000002d",
      "name": "Alyssa's Creative Lab & Prints #45",
      "slug": "alyssa-s-creative-lab-prints-45-45",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 37,
      "owner": {
        "full_name": "Alyssa Rivera",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000002e",
    "title": "Oversized 'Puyat for the Future' Graphic Shirt (Batch #2)",
    "slug": "oversized-puyat-for-the-future-graphic-shirt-batch-2-46",
    "description": "220 GSM heavyweight combed cotton tee with breathable screen-printed student art.",
    "price": 395,
    "stock": 40,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000002e",
      "name": "Joshua's Orgs Merch #46",
      "slug": "joshua-s-orgs-merch-46-46",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 48,
      "owner": {
        "full_name": "Joshua Salazar",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000002f",
    "title": "Matte Vinyl Campus Sticker Pack (10 Pieces) (Batch #2)",
    "slug": "matte-vinyl-campus-sticker-pack-10-pieces-batch-2-47",
    "description": "Waterproof and scratchproof die-cut vinyl stickers for hydroflasks, laptops, and binders.",
    "price": 95,
    "stock": 7,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000002f",
      "name": "Bea's Cravings Bakery #47",
      "slug": "bea-s-cravings-bakery-47-47",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 59,
      "owner": {
        "full_name": "Bea Pascual",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000030",
    "title": "Insulated Stainless Steel Campus Tumbler (750ml) (Batch #2)",
    "slug": "insulated-stainless-steel-campus-tumbler-750ml-batch-2-48",
    "description": "Double-wall vacuum insulated water bottle keeping drinks icy cold for 24 hours.",
    "price": 445,
    "stock": 14,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000030",
      "name": "Christian's Stationery Depot #48",
      "slug": "christian-s-stationery-depot-48-48",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 70,
      "owner": {
        "full_name": "Christian Reyes",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000031",
    "title": "Comprehensive Calculus & STEM Review Notes (Digitized) (Batch #2)",
    "slug": "comprehensive-calculus-stem-review-notes-digitized-batch-2-49",
    "description": "High-yield summarized handwritten review notes with step-by-step solved formulas.",
    "price": 150,
    "stock": 21,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000031",
      "name": "Hannah's Creations #49",
      "slug": "hannah-s-creations-49-49",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 16,
      "owner": {
        "full_name": "Hannah Garcia",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000032",
    "title": "Hardbound Grid Bullet Journal Notebook (160 Pages) (Batch #2)",
    "slug": "hardbound-grid-bullet-journal-notebook-160-pages-batch-2-50",
    "description": "120 GSM bleed-resistant dotted ivory paper with elastic closure band and ribbon bookmark.",
    "price": 195,
    "stock": 28,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000032",
      "name": "Rafael's Tech & 3D Print Hub #50",
      "slug": "rafael-s-tech-3d-print-hub-50-50",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 27,
      "owner": {
        "full_name": "Rafael Bautista",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000033",
    "title": "Pastel Gel Ink Retractable Pens (Set of 6) (Batch #2)",
    "slug": "pastel-gel-ink-retractable-pens-set-of-6-batch-2-51",
    "description": "Smooth-writing 0.5mm quick-dry Japanese ink in vintage aesthetic barrel colors.",
    "price": 145,
    "stock": 35,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000033",
      "name": "Camille's Kitchenette #51",
      "slug": "camille-s-kitchenette-51-51",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 38,
      "owner": {
        "full_name": "Camille Ramos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000034",
    "title": "Aesthetic Sticky Notes & Index Tabs Bundle (Batch #2)",
    "slug": "aesthetic-sticky-notes-index-tabs-bundle-batch-2-52",
    "description": "6 pads of neutral pastel sticky notes and translucent PET film page flags.",
    "price": 75,
    "stock": 42,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000034",
      "name": "Daniel's Canvas Studio #52",
      "slug": "daniel-s-canvas-studio-52-52",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 49,
      "owner": {
        "full_name": "Daniel Aquino",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000035",
    "title": "Accounting & General Mathematics Quick Formula Cards (Batch #2)",
    "slug": "accounting-general-mathematics-quick-formula-cards-batch-2-53",
    "description": "Laminated flashcard ring with essential financial equations and algebra shortcuts.",
    "price": 105,
    "stock": 9,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000035",
      "name": "Patricia's Notes & Reviewers #53",
      "slug": "patricia-s-notes-reviewers-53-53",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 60,
      "owner": {
        "full_name": "Patricia Mercado",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000036",
    "title": "Custom Org Poster & Event Layout Design (Batch #2)",
    "slug": "custom-org-poster-event-layout-design-batch-2-54",
    "description": "Professional high-res digital poster, banner, and pubmat design delivered in PSD/PNG.",
    "price": 370,
    "stock": 16,
    "status": "ACTIVE",
    "prep_time_minutes": 180,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000036",
      "name": "Angelo's Bandala & Cold Brews #54",
      "slug": "angelo-s-bandala-cold-brews-54-54",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 71,
      "owner": {
        "full_name": "Angelo Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000037",
    "title": "Mechanical Keyboard Lube & Switch Modding Service (Batch #2)",
    "slug": "mechanical-keyboard-lube-switch-modding-service-batch-2-55",
    "description": "Full Krytox 205g0 lubing and stabilizer holee-modding service for buttery smooth typing.",
    "price": 275,
    "stock": 23,
    "status": "ACTIVE",
    "prep_time_minutes": 240,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000037",
      "name": "Samantha's Creative Lab & Prints #55",
      "slug": "samantha-s-creative-lab-prints-55-55",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 17,
      "owner": {
        "full_name": "Samantha Lim",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000038",
    "title": "Thrifted Vintage Corduroy Jacket (Unisex Oversized) (Batch #2)",
    "slug": "thrifted-vintage-corduroy-jacket-unisex-oversized-batch-2-56",
    "description": "Handpicked, washed, and sanitized retro 90s corduroy button-up jacket. Fits S-L.",
    "price": 420,
    "stock": 30,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000038",
      "name": "Kevin's Orgs Merch #56",
      "slug": "kevin-s-orgs-merch-56-56",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 28,
      "owner": {
        "full_name": "Kevin Mendoza",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000039",
    "title": "Custom 3D Printed Laptop Stand & Phone Dock (Batch #2)",
    "slug": "custom-3d-printed-laptop-stand-phone-dock-batch-2-57",
    "description": "Ergonomic dual-angle matte black PLA filament desk stand with cable organizer slot.",
    "price": 180,
    "stock": 37,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000039",
      "name": "Nicole's Cravings Bakery #57",
      "slug": "nicole-s-cravings-bakery-57-57",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 39,
      "owner": {
        "full_name": "Nicole Villanueva",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000003a",
    "title": "Acoustic Guitar Restringing & Deep Clean Service (Batch #2)",
    "slug": "acoustic-guitar-restringing-deep-clean-service-batch-2-58",
    "description": "Fretboard lemon oil conditioning, truss rod check, and installation of D'Addario strings.",
    "price": 155,
    "stock": 44,
    "status": "ACTIVE",
    "prep_time_minutes": 45,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000003a",
      "name": "Mark's Stationery Depot #58",
      "slug": "mark-s-stationery-depot-58-58",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 50,
      "owner": {
        "full_name": "Mark Castro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000003b",
    "title": "Homemade Chocolate Chip Cookies (Dozen) (Batch #3)",
    "slug": "homemade-chocolate-chip-cookies-dozen-batch-3-59",
    "description": "Freshly baked soft-batch chocolate chip cookies with premium butter. Perfect snack during class breaks.",
    "price": 160,
    "stock": 11,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000003b",
      "name": "Chloe's Creations #59",
      "slug": "chloe-s-creations-59-59",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 61,
      "owner": {
        "full_name": "Chloe Navarro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000003c",
    "title": "Cold Brew Iced Caramel Latte (16oz) (Batch #3)",
    "slug": "cold-brew-iced-caramel-latte-16oz-batch-3-60",
    "description": "Rich arabica cold brew coffee layered with salted caramel syrup and creamy fresh milk.",
    "price": 110,
    "stock": 18,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000003c",
      "name": "Gabriel's Tech & 3D Print Hub #60",
      "slug": "gabriel-s-tech-3d-print-hub-60-60",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 72,
      "owner": {
        "full_name": "Gabriel Tan",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000003d",
    "title": "Matcha Cream Cheese Brownies (Box of 6) (Batch #3)",
    "slug": "matcha-cream-cheese-brownies-box-of-6-batch-3-61",
    "description": "Fudgy matcha green tea brownies swirled with decadent cream cheese filling.",
    "price": 200,
    "stock": 25,
    "status": "ACTIVE",
    "prep_time_minutes": 45,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000003d",
      "name": "Maria's Kitchenette #61",
      "slug": "maria-s-kitchenette-61-61",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 18,
      "owner": {
        "full_name": "Maria Santos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000003e",
    "title": "Crispy Siomai with Chili Garlic Oil (6 pcs) (Batch #3)",
    "slug": "crispy-siomai-with-chili-garlic-oil-6-pcs-batch-3-62",
    "description": "Steamed and fried pork siomai served with signature homemade toasted chili garlic sauce and calamansi.",
    "price": 90,
    "stock": 32,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000003e",
      "name": "Ethan's Canvas Studio #62",
      "slug": "ethan-s-canvas-studio-62-62",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 29,
      "owner": {
        "full_name": "Ethan Dela Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000003f",
    "title": "Iced Strawberry Hibiscus Tea (22oz) (Batch #3)",
    "slug": "iced-strawberry-hibiscus-tea-22oz-batch-3-63",
    "description": "Refreshing brewed herbal hibiscus tea with real strawberry puree and chia seeds.",
    "price": 105,
    "stock": 39,
    "status": "ACTIVE",
    "prep_time_minutes": 5,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000003f",
      "name": "Jenna's Notes & Reviewers #63",
      "slug": "jenna-s-notes-reviewers-63-63",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 40,
      "owner": {
        "full_name": "Jenna Flores",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000040",
    "title": "Artisan Ube Cheese Pandesal (Pack of 10) (Batch #3)",
    "slug": "artisan-ube-cheese-pandesal-pack-of-10-batch-3-64",
    "description": "Fluffy purple yam bread stuffed with melting cheddar cheese cubes. Served warm.",
    "price": 120,
    "stock": 6,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000040",
      "name": "Miguel's Bandala & Cold Brews #64",
      "slug": "miguel-s-bandala-cold-brews-64-64",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 51,
      "owner": {
        "full_name": "Miguel Gonzales",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000041",
    "title": "Mango Graham Float Cups (350ml) (Batch #3)",
    "slug": "mango-graham-float-cups-350ml-batch-3-65",
    "description": "Layers of crushed honey grahams, sweet condensed cream, and ripe Guimaras mangoes in convenient cup.",
    "price": 90,
    "stock": 13,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000041",
      "name": "Alyssa's Creative Lab & Prints #65",
      "slug": "alyssa-s-creative-lab-prints-65-65",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 62,
      "owner": {
        "full_name": "Alyssa Rivera",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000042",
    "title": "Gourmet Spam Musubi with Japanese Furikake (Batch #3)",
    "slug": "gourmet-spam-musubi-with-japanese-furikake-batch-3-66",
    "description": "Teriyaki-glazed luncheon meat over seasoned sushi rice wrapped in nori seaweed.",
    "price": 70,
    "stock": 20,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000042",
      "name": "Joshua's Orgs Merch #66",
      "slug": "joshua-s-orgs-merch-66-66",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 8,
      "owner": {
        "full_name": "Joshua Salazar",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000043",
    "title": "Handcrafted Canvas Tote Bag (Laptop Sized) (Batch #3)",
    "slug": "handcrafted-canvas-tote-bag-laptop-sized-batch-3-67",
    "description": "Heavy-duty 14oz cotton canvas tote with zipper and inside pocket. Custom silkscreen printed.",
    "price": 295,
    "stock": 27,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000043",
      "name": "Bea's Cravings Bakery #67",
      "slug": "bea-s-cravings-bakery-67-67",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 19,
      "owner": {
        "full_name": "Bea Pascual",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000044",
    "title": "Crochet Sunflower Keychain & Bag Charm (Batch #3)",
    "slug": "crochet-sunflower-keychain-bag-charm-batch-3-68",
    "description": "Lovingly hand-crocheted milk cotton sunflower with sturdy metal lobster clasp.",
    "price": 115,
    "stock": 34,
    "status": "ACTIVE",
    "prep_time_minutes": 60,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000044",
      "name": "Christian's Stationery Depot #68",
      "slug": "christian-s-stationery-depot-68-68",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 30,
      "owner": {
        "full_name": "Christian Reyes",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000045",
    "title": "Custom Resin Letter Keychain with Gold Flakes (Batch #3)",
    "slug": "custom-resin-letter-keychain-with-gold-flakes-batch-3-69",
    "description": "Crystal clear epoxy resin alphabet keychain embedded with dried baby's breath and foil accents.",
    "price": 135,
    "stock": 41,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000045",
      "name": "Hannah's Creations #69",
      "slug": "hannah-s-creations-69-69",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 41,
      "owner": {
        "full_name": "Hannah Garcia",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000046",
    "title": "Woven Macrame Cup Sleeve & Strap (Batch #3)",
    "slug": "woven-macrame-cup-sleeve-strap-batch-3-70",
    "description": "Eco-friendly handmade cotton cord drink holder for tumblers and boba cups.",
    "price": 160,
    "stock": 8,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000046",
      "name": "Rafael's Tech & 3D Print Hub #70",
      "slug": "rafael-s-tech-3d-print-hub-70-70",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 52,
      "owner": {
        "full_name": "Rafael Bautista",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000047",
    "title": "Beaded Pearl Phone Charm Wristlet (Batch #3)",
    "slug": "beaded-pearl-phone-charm-wristlet-batch-3-71",
    "description": "Durable nylon cord lanyard with iridescent beads and cute pastel stars.",
    "price": 85,
    "stock": 15,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000047",
      "name": "Camille's Kitchenette #71",
      "slug": "camille-s-kitchenette-71-71",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 63,
      "owner": {
        "full_name": "Camille Ramos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000048",
    "title": "Hand-poured Soy Candle (Lavender & Sage) (Batch #3)",
    "slug": "hand-poured-soy-candle-lavender-sage-batch-3-72",
    "description": "100% natural soy wax in 150g amber jar with cotton wick. Burns clean for 30+ hours.",
    "price": 225,
    "stock": 22,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000048",
      "name": "Daniel's Canvas Studio #72",
      "slug": "daniel-s-canvas-studio-72-72",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 9,
      "owner": {
        "full_name": "Daniel Aquino",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000049",
    "title": "LYFJSHS Campus Minimalist Lanyard & Card Case (Batch #3)",
    "slug": "lyfjshs-campus-minimalist-lanyard-card-case-batch-3-73",
    "description": "Thick satin lanyard with leather accent and clear ID badge holder. Official campus colors.",
    "price": 130,
    "stock": 29,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000049",
      "name": "Patricia's Notes & Reviewers #73",
      "slug": "patricia-s-notes-reviewers-73-73",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 20,
      "owner": {
        "full_name": "Patricia Mercado",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000004a",
    "title": "Senior High Strand Embroidered Bucket Hat (Batch #3)",
    "slug": "senior-high-strand-embroidered-bucket-hat-batch-3-74",
    "description": "100% cotton twill bucket hat with minimalist strand initials embroidered on front.",
    "price": 305,
    "stock": 36,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000004a",
      "name": "Angelo's Bandala & Cold Brews #74",
      "slug": "angelo-s-bandala-cold-brews-74-74",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 31,
      "owner": {
        "full_name": "Angelo Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000004b",
    "title": "Oversized 'Puyat for the Future' Graphic Shirt (Batch #3)",
    "slug": "oversized-puyat-for-the-future-graphic-shirt-batch-3-75",
    "description": "220 GSM heavyweight combed cotton tee with breathable screen-printed student art.",
    "price": 400,
    "stock": 43,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000004b",
      "name": "Samantha's Creative Lab & Prints #75",
      "slug": "samantha-s-creative-lab-prints-75-75",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 42,
      "owner": {
        "full_name": "Samantha Lim",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000004c",
    "title": "Matte Vinyl Campus Sticker Pack (10 Pieces) (Batch #3)",
    "slug": "matte-vinyl-campus-sticker-pack-10-pieces-batch-3-76",
    "description": "Waterproof and scratchproof die-cut vinyl stickers for hydroflasks, laptops, and binders.",
    "price": 100,
    "stock": 10,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000004c",
      "name": "Kevin's Orgs Merch #76",
      "slug": "kevin-s-orgs-merch-76-76",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 53,
      "owner": {
        "full_name": "Kevin Mendoza",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000004d",
    "title": "Insulated Stainless Steel Campus Tumbler (750ml) (Batch #3)",
    "slug": "insulated-stainless-steel-campus-tumbler-750ml-batch-3-77",
    "description": "Double-wall vacuum insulated water bottle keeping drinks icy cold for 24 hours.",
    "price": 450,
    "stock": 17,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000004d",
      "name": "Nicole's Cravings Bakery #77",
      "slug": "nicole-s-cravings-bakery-77-77",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 64,
      "owner": {
        "full_name": "Nicole Villanueva",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000004e",
    "title": "Comprehensive Calculus & STEM Review Notes (Digitized) (Batch #3)",
    "slug": "comprehensive-calculus-stem-review-notes-digitized-batch-3-78",
    "description": "High-yield summarized handwritten review notes with step-by-step solved formulas.",
    "price": 120,
    "stock": 24,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000004e",
      "name": "Mark's Stationery Depot #78",
      "slug": "mark-s-stationery-depot-78-78",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 10,
      "owner": {
        "full_name": "Mark Castro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000004f",
    "title": "Hardbound Grid Bullet Journal Notebook (160 Pages) (Batch #3)",
    "slug": "hardbound-grid-bullet-journal-notebook-160-pages-batch-3-79",
    "description": "120 GSM bleed-resistant dotted ivory paper with elastic closure band and ribbon bookmark.",
    "price": 200,
    "stock": 31,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000004f",
      "name": "Chloe's Creations #79",
      "slug": "chloe-s-creations-79-79",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 21,
      "owner": {
        "full_name": "Chloe Navarro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000050",
    "title": "Pastel Gel Ink Retractable Pens (Set of 6) (Batch #3)",
    "slug": "pastel-gel-ink-retractable-pens-set-of-6-batch-3-80",
    "description": "Smooth-writing 0.5mm quick-dry Japanese ink in vintage aesthetic barrel colors.",
    "price": 150,
    "stock": 38,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000050",
      "name": "Gabriel's Tech & 3D Print Hub #80",
      "slug": "gabriel-s-tech-3d-print-hub-80-80",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 32,
      "owner": {
        "full_name": "Gabriel Tan",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000051",
    "title": "Aesthetic Sticky Notes & Index Tabs Bundle (Batch #3)",
    "slug": "aesthetic-sticky-notes-index-tabs-bundle-batch-3-81",
    "description": "6 pads of neutral pastel sticky notes and translucent PET film page flags.",
    "price": 80,
    "stock": 5,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000051",
      "name": "Maria's Kitchenette #81",
      "slug": "maria-s-kitchenette-81-81",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 43,
      "owner": {
        "full_name": "Maria Santos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000052",
    "title": "Accounting & General Mathematics Quick Formula Cards (Batch #3)",
    "slug": "accounting-general-mathematics-quick-formula-cards-batch-3-82",
    "description": "Laminated flashcard ring with essential financial equations and algebra shortcuts.",
    "price": 110,
    "stock": 12,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000052",
      "name": "Ethan's Canvas Studio #82",
      "slug": "ethan-s-canvas-studio-82-82",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 54,
      "owner": {
        "full_name": "Ethan Dela Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000053",
    "title": "Custom Org Poster & Event Layout Design (Batch #3)",
    "slug": "custom-org-poster-event-layout-design-batch-3-83",
    "description": "Professional high-res digital poster, banner, and pubmat design delivered in PSD/PNG.",
    "price": 375,
    "stock": 19,
    "status": "ACTIVE",
    "prep_time_minutes": 180,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000053",
      "name": "Jenna's Notes & Reviewers #83",
      "slug": "jenna-s-notes-reviewers-83-83",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 65,
      "owner": {
        "full_name": "Jenna Flores",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000054",
    "title": "Mechanical Keyboard Lube & Switch Modding Service (Batch #3)",
    "slug": "mechanical-keyboard-lube-switch-modding-service-batch-3-84",
    "description": "Full Krytox 205g0 lubing and stabilizer holee-modding service for buttery smooth typing.",
    "price": 280,
    "stock": 26,
    "status": "ACTIVE",
    "prep_time_minutes": 240,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000054",
      "name": "Miguel's Bandala & Cold Brews #84",
      "slug": "miguel-s-bandala-cold-brews-84-84",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 11,
      "owner": {
        "full_name": "Miguel Gonzales",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000055",
    "title": "Thrifted Vintage Corduroy Jacket (Unisex Oversized) (Batch #3)",
    "slug": "thrifted-vintage-corduroy-jacket-unisex-oversized-batch-3-85",
    "description": "Handpicked, washed, and sanitized retro 90s corduroy button-up jacket. Fits S-L.",
    "price": 390,
    "stock": 33,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000055",
      "name": "Alyssa's Creative Lab & Prints #85",
      "slug": "alyssa-s-creative-lab-prints-85-85",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 22,
      "owner": {
        "full_name": "Alyssa Rivera",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000056",
    "title": "Custom 3D Printed Laptop Stand & Phone Dock (Batch #3)",
    "slug": "custom-3d-printed-laptop-stand-phone-dock-batch-3-86",
    "description": "Ergonomic dual-angle matte black PLA filament desk stand with cable organizer slot.",
    "price": 185,
    "stock": 40,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000056",
      "name": "Joshua's Orgs Merch #86",
      "slug": "joshua-s-orgs-merch-86-86",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 33,
      "owner": {
        "full_name": "Joshua Salazar",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000057",
    "title": "Acoustic Guitar Restringing & Deep Clean Service (Batch #3)",
    "slug": "acoustic-guitar-restringing-deep-clean-service-batch-3-87",
    "description": "Fretboard lemon oil conditioning, truss rod check, and installation of D'Addario strings.",
    "price": 160,
    "stock": 7,
    "status": "ACTIVE",
    "prep_time_minutes": 45,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000057",
      "name": "Bea's Cravings Bakery #87",
      "slug": "bea-s-cravings-bakery-87-87",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 44,
      "owner": {
        "full_name": "Bea Pascual",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000058",
    "title": "Homemade Chocolate Chip Cookies (Dozen) (Batch #4)",
    "slug": "homemade-chocolate-chip-cookies-dozen-batch-4-88",
    "description": "Freshly baked soft-batch chocolate chip cookies with premium butter. Perfect snack during class breaks.",
    "price": 165,
    "stock": 14,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000058",
      "name": "Christian's Stationery Depot #88",
      "slug": "christian-s-stationery-depot-88-88",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 55,
      "owner": {
        "full_name": "Christian Reyes",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000059",
    "title": "Cold Brew Iced Caramel Latte (16oz) (Batch #4)",
    "slug": "cold-brew-iced-caramel-latte-16oz-batch-4-89",
    "description": "Rich arabica cold brew coffee layered with salted caramel syrup and creamy fresh milk.",
    "price": 115,
    "stock": 21,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000059",
      "name": "Hannah's Creations #89",
      "slug": "hannah-s-creations-89-89",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 66,
      "owner": {
        "full_name": "Hannah Garcia",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000005a",
    "title": "Matcha Cream Cheese Brownies (Box of 6) (Batch #4)",
    "slug": "matcha-cream-cheese-brownies-box-of-6-batch-4-90",
    "description": "Fudgy matcha green tea brownies swirled with decadent cream cheese filling.",
    "price": 205,
    "stock": 28,
    "status": "ACTIVE",
    "prep_time_minutes": 45,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000005a",
      "name": "Rafael's Tech & 3D Print Hub #90",
      "slug": "rafael-s-tech-3d-print-hub-90-90",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 12,
      "owner": {
        "full_name": "Rafael Bautista",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000005b",
    "title": "Crispy Siomai with Chili Garlic Oil (6 pcs) (Batch #4)",
    "slug": "crispy-siomai-with-chili-garlic-oil-6-pcs-batch-4-91",
    "description": "Steamed and fried pork siomai served with signature homemade toasted chili garlic sauce and calamansi.",
    "price": 95,
    "stock": 35,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000005b",
      "name": "Camille's Kitchenette #91",
      "slug": "camille-s-kitchenette-91-91",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 23,
      "owner": {
        "full_name": "Camille Ramos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000005c",
    "title": "Iced Strawberry Hibiscus Tea (22oz) (Batch #4)",
    "slug": "iced-strawberry-hibiscus-tea-22oz-batch-4-92",
    "description": "Refreshing brewed herbal hibiscus tea with real strawberry puree and chia seeds.",
    "price": 75,
    "stock": 42,
    "status": "ACTIVE",
    "prep_time_minutes": 5,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000005c",
      "name": "Daniel's Canvas Studio #92",
      "slug": "daniel-s-canvas-studio-92-92",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 34,
      "owner": {
        "full_name": "Daniel Aquino",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000005d",
    "title": "Artisan Ube Cheese Pandesal (Pack of 10) (Batch #4)",
    "slug": "artisan-ube-cheese-pandesal-pack-of-10-batch-4-93",
    "description": "Fluffy purple yam bread stuffed with melting cheddar cheese cubes. Served warm.",
    "price": 125,
    "stock": 9,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000005d",
      "name": "Patricia's Notes & Reviewers #93",
      "slug": "patricia-s-notes-reviewers-93-93",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 45,
      "owner": {
        "full_name": "Patricia Mercado",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000005e",
    "title": "Mango Graham Float Cups (350ml) (Batch #4)",
    "slug": "mango-graham-float-cups-350ml-batch-4-94",
    "description": "Layers of crushed honey grahams, sweet condensed cream, and ripe Guimaras mangoes in convenient cup.",
    "price": 95,
    "stock": 16,
    "status": "ACTIVE",
    "prep_time_minutes": 15,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000005e",
      "name": "Angelo's Bandala & Cold Brews #94",
      "slug": "angelo-s-bandala-cold-brews-94-94",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 56,
      "owner": {
        "full_name": "Angelo Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000005f",
    "title": "Gourmet Spam Musubi with Japanese Furikake (Batch #4)",
    "slug": "gourmet-spam-musubi-with-japanese-furikake-batch-4-95",
    "description": "Teriyaki-glazed luncheon meat over seasoned sushi rice wrapped in nori seaweed.",
    "price": 75,
    "stock": 23,
    "status": "ACTIVE",
    "prep_time_minutes": 10,
    "category": {
      "name": "Food & Drinks",
      "slug": "food-and-drinks"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000005f",
      "name": "Samantha's Creative Lab & Prints #95",
      "slug": "samantha-s-creative-lab-prints-95-95",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 67,
      "owner": {
        "full_name": "Samantha Lim",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000060",
    "title": "Handcrafted Canvas Tote Bag (Laptop Sized) (Batch #4)",
    "slug": "handcrafted-canvas-tote-bag-laptop-sized-batch-4-96",
    "description": "Heavy-duty 14oz cotton canvas tote with zipper and inside pocket. Custom silkscreen printed.",
    "price": 300,
    "stock": 30,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000060",
      "name": "Kevin's Orgs Merch #96",
      "slug": "kevin-s-orgs-merch-96-96",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 13,
      "owner": {
        "full_name": "Kevin Mendoza",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000061",
    "title": "Crochet Sunflower Keychain & Bag Charm (Batch #4)",
    "slug": "crochet-sunflower-keychain-bag-charm-batch-4-97",
    "description": "Lovingly hand-crocheted milk cotton sunflower with sturdy metal lobster clasp.",
    "price": 120,
    "stock": 37,
    "status": "ACTIVE",
    "prep_time_minutes": 60,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000061",
      "name": "Nicole's Cravings Bakery #97",
      "slug": "nicole-s-cravings-bakery-97-97",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 24,
      "owner": {
        "full_name": "Nicole Villanueva",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000062",
    "title": "Custom Resin Letter Keychain with Gold Flakes (Batch #4)",
    "slug": "custom-resin-letter-keychain-with-gold-flakes-batch-4-98",
    "description": "Crystal clear epoxy resin alphabet keychain embedded with dried baby's breath and foil accents.",
    "price": 140,
    "stock": 44,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000062",
      "name": "Mark's Stationery Depot #98",
      "slug": "mark-s-stationery-depot-98-98",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 35,
      "owner": {
        "full_name": "Mark Castro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000063",
    "title": "Woven Macrame Cup Sleeve & Strap (Batch #4)",
    "slug": "woven-macrame-cup-sleeve-strap-batch-4-99",
    "description": "Eco-friendly handmade cotton cord drink holder for tumblers and boba cups.",
    "price": 130,
    "stock": 11,
    "status": "ACTIVE",
    "prep_time_minutes": 30,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000063",
      "name": "Chloe's Creations #99",
      "slug": "chloe-s-creations-99-99",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 46,
      "owner": {
        "full_name": "Chloe Navarro",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000064",
    "title": "Beaded Pearl Phone Charm Wristlet (Batch #4)",
    "slug": "beaded-pearl-phone-charm-wristlet-batch-4-100",
    "description": "Durable nylon cord lanyard with iridescent beads and cute pastel stars.",
    "price": 90,
    "stock": 18,
    "status": "ACTIVE",
    "prep_time_minutes": 20,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000064",
      "name": "Gabriel's Tech & 3D Print Hub #100",
      "slug": "gabriel-s-tech-3d-print-hub-100-100",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 57,
      "owner": {
        "full_name": "Gabriel Tan",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000065",
    "title": "Hand-poured Soy Candle (Lavender & Sage) (Batch #4)",
    "slug": "hand-poured-soy-candle-lavender-sage-batch-4-101",
    "description": "100% natural soy wax in 150g amber jar with cotton wick. Burns clean for 30+ hours.",
    "price": 230,
    "stock": 25,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Handmade Crafts",
      "slug": "handmade-crafts"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000065",
      "name": "Maria's Kitchenette #101",
      "slug": "maria-s-kitchenette-101-101",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 68,
      "owner": {
        "full_name": "Maria Santos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000066",
    "title": "LYFJSHS Campus Minimalist Lanyard & Card Case (Batch #4)",
    "slug": "lyfjshs-campus-minimalist-lanyard-card-case-batch-4-102",
    "description": "Thick satin lanyard with leather accent and clear ID badge holder. Official campus colors.",
    "price": 135,
    "stock": 32,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000066",
      "name": "Ethan's Canvas Studio #102",
      "slug": "ethan-s-canvas-studio-102-102",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 14,
      "owner": {
        "full_name": "Ethan Dela Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000067",
    "title": "Senior High Strand Embroidered Bucket Hat (Batch #4)",
    "slug": "senior-high-strand-embroidered-bucket-hat-batch-4-103",
    "description": "100% cotton twill bucket hat with minimalist strand initials embroidered on front.",
    "price": 310,
    "stock": 39,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000067",
      "name": "Jenna's Notes & Reviewers #103",
      "slug": "jenna-s-notes-reviewers-103-103",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 25,
      "owner": {
        "full_name": "Jenna Flores",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000068",
    "title": "Oversized 'Puyat for the Future' Graphic Shirt (Batch #4)",
    "slug": "oversized-puyat-for-the-future-graphic-shirt-batch-4-104",
    "description": "220 GSM heavyweight combed cotton tee with breathable screen-printed student art.",
    "price": 405,
    "stock": 6,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000068",
      "name": "Miguel's Bandala & Cold Brews #104",
      "slug": "miguel-s-bandala-cold-brews-104-104",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 36,
      "owner": {
        "full_name": "Miguel Gonzales",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000069",
    "title": "Matte Vinyl Campus Sticker Pack (10 Pieces) (Batch #4)",
    "slug": "matte-vinyl-campus-sticker-pack-10-pieces-batch-4-105",
    "description": "Waterproof and scratchproof die-cut vinyl stickers for hydroflasks, laptops, and binders.",
    "price": 105,
    "stock": 13,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000069",
      "name": "Alyssa's Creative Lab & Prints #105",
      "slug": "alyssa-s-creative-lab-prints-105-105",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 47,
      "owner": {
        "full_name": "Alyssa Rivera",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000006a",
    "title": "Insulated Stainless Steel Campus Tumbler (750ml) (Batch #4)",
    "slug": "insulated-stainless-steel-campus-tumbler-750ml-batch-4-106",
    "description": "Double-wall vacuum insulated water bottle keeping drinks icy cold for 24 hours.",
    "price": 420,
    "stock": 20,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Student Merchandise",
      "slug": "student-merchandise"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000001",
      "name": "Maria's Kitchenette",
      "slug": "maria-s-kitchenette-1",
      "logo_url": null,
      "pickup_locations": "Main Library Lobby",
      "rating_avg": 4.3,
      "rating_count": 8,
      "owner": {
        "full_name": "Maria Santos",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000006b",
    "title": "Comprehensive Calculus & STEM Review Notes (Digitized) (Batch #4)",
    "slug": "comprehensive-calculus-stem-review-notes-digitized-batch-4-107",
    "description": "High-yield summarized handwritten review notes with step-by-step solved formulas.",
    "price": 125,
    "stock": 27,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000002",
      "name": "Reyes Canvas Studio",
      "slug": "reyes-canvas-studio-2",
      "logo_url": null,
      "pickup_locations": "Building B Quadrangle",
      "rating_avg": 4.37,
      "rating_count": 19,
      "owner": {
        "full_name": "Ethan Dela Cruz",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000006c",
    "title": "Hardbound Grid Bullet Journal Notebook (160 Pages) (Batch #4)",
    "slug": "hardbound-grid-bullet-journal-notebook-160-pages-batch-4-108",
    "description": "120 GSM bleed-resistant dotted ivory paper with elastic closure band and ribbon bookmark.",
    "price": 205,
    "stock": 34,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000003",
      "name": "Academia Notes & Reviewers",
      "slug": "academia-notes-reviewers-3",
      "logo_url": null,
      "pickup_locations": "Cafeteria Kiosk #3",
      "rating_avg": 4.44,
      "rating_count": 30,
      "owner": {
        "full_name": "Jenna Flores",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000006d",
    "title": "Pastel Gel Ink Retractable Pens (Set of 6) (Batch #4)",
    "slug": "pastel-gel-ink-retractable-pens-set-of-6-batch-4-109",
    "description": "Smooth-writing 0.5mm quick-dry Japanese ink in vintage aesthetic barrel colors.",
    "price": 155,
    "stock": 41,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000004",
      "name": "Cafe Bandala & Cold Brews",
      "slug": "cafe-bandala-cold-brews-4",
      "logo_url": null,
      "pickup_locations": "Student Center 1st Floor",
      "rating_avg": 4.51,
      "rating_count": 41,
      "owner": {
        "full_name": "Miguel Gonzales",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000006e",
    "title": "Aesthetic Sticky Notes & Index Tabs Bundle (Batch #4)",
    "slug": "aesthetic-sticky-notes-index-tabs-bundle-batch-4-110",
    "description": "6 pads of neutral pastel sticky notes and translucent PET film page flags.",
    "price": 85,
    "stock": 8,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000005",
      "name": "MDC Creative Lab & Prints",
      "slug": "mdc-creative-lab-prints-5",
      "logo_url": null,
      "pickup_locations": "Gymnasium Entrance",
      "rating_avg": 4.58,
      "rating_count": 52,
      "owner": {
        "full_name": "Alyssa Rivera",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-00000000006f",
    "title": "Accounting & General Mathematics Quick Formula Cards (Batch #4)",
    "slug": "accounting-general-mathematics-quick-formula-cards-batch-4-111",
    "description": "Laminated flashcard ring with essential financial equations and algebra shortcuts.",
    "price": 115,
    "stock": 15,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "School & Stationery",
      "slug": "school-and-stationery"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000006",
      "name": "Ateneo & Green Orgs Merch",
      "slug": "ateneo-green-orgs-merch-6",
      "logo_url": null,
      "pickup_locations": "Senior High School Pavilion",
      "rating_avg": 4.65,
      "rating_count": 63,
      "owner": {
        "full_name": "Joshua Salazar",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000070",
    "title": "Custom Org Poster & Event Layout Design (Batch #4)",
    "slug": "custom-org-poster-event-layout-design-batch-4-112",
    "description": "Professional high-res digital poster, banner, and pubmat design delivered in PSD/PNG.",
    "price": 380,
    "stock": 22,
    "status": "ACTIVE",
    "prep_time_minutes": 180,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000007",
      "name": "Sweet Cravings Bakery",
      "slug": "sweet-cravings-bakery-7",
      "logo_url": null,
      "pickup_locations": "Gate 2 Guardhouse",
      "rating_avg": 4.72,
      "rating_count": 9,
      "owner": {
        "full_name": "Bea Pascual",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000071",
    "title": "Mechanical Keyboard Lube & Switch Modding Service (Batch #4)",
    "slug": "mechanical-keyboard-lube-switch-modding-service-batch-4-113",
    "description": "Full Krytox 205g0 lubing and stabilizer holee-modding service for buttery smooth typing.",
    "price": 250,
    "stock": 29,
    "status": "ACTIVE",
    "prep_time_minutes": 240,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000008",
      "name": "Campus Stationery Depot",
      "slug": "campus-stationery-depot-8",
      "logo_url": null,
      "pickup_locations": "Science Wing Hallway",
      "rating_avg": 4.79,
      "rating_count": 20,
      "owner": {
        "full_name": "Christian Reyes",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000072",
    "title": "Thrifted Vintage Corduroy Jacket (Unisex Oversized) (Batch #4)",
    "slug": "thrifted-vintage-corduroy-jacket-unisex-oversized-batch-4-114",
    "description": "Handpicked, washed, and sanitized retro 90s corduroy button-up jacket. Fits S-L.",
    "price": 395,
    "stock": 36,
    "status": "ACTIVE",
    "prep_time_minutes": 0,
    "category": {
      "name": "Lifestyle Goods",
      "slug": "lifestyle-goods"
    },
    "store": {
      "id": "00000000-0000-4000-d000-000000000009",
      "name": "Clay & Crochet Creations",
      "slug": "clay-crochet-creations-9",
      "logo_url": null,
      "pickup_locations": "Arts & Design Studio Lounge",
      "rating_avg": 4.86,
      "rating_count": 31,
      "owner": {
        "full_name": "Hannah Garcia",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  },
  {
    "id": "00000000-0000-4000-e000-000000000073",
    "title": "Custom 3D Printed Laptop Stand & Phone Dock (Batch #4)",
    "slug": "custom-3d-printed-laptop-stand-phone-dock-batch-4-115",
    "description": "Ergonomic dual-angle matte black PLA filament desk stand with cable organizer slot.",
    "price": 190,
    "stock": 43,
    "status": "ACTIVE",
    "prep_time_minutes": 120,
    "category": {
      "name": "Tech & Services",
      "slug": "tech-services"
    },
    "store": {
      "id": "00000000-0000-4000-d000-00000000000a",
      "name": "ByteCraft Tech & 3D Print Hub",
      "slug": "bytecraft-tech-3d-print-hub-10",
      "logo_url": null,
      "pickup_locations": "Computer Lab 2 Corridor",
      "rating_avg": 4.93,
      "rating_count": 42,
      "owner": {
        "full_name": "Rafael Bautista",
        "role": "SELLER"
      }
    },
    "images": [
      {
        "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
        "display_order": 1
      }
    ]
  }
];

// 6. MOCK ORDERS (100+ Orders)
export const MOCK_ORDERS: MockOrder[] = [
  {
    "id": "00000000-0000-4000-3300-000000000001",
    "order_number": "KITA-2026-1001",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000001",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 150,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-01T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000002",
    "order_number": "KITA-2026-1002",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000002",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 200,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-02T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000003",
    "order_number": "KITA-2026-1003",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000003",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 570,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-03T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000004",
    "order_number": "KITA-2026-1004",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000004",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 80,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-04T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000005",
    "order_number": "KITA-2026-1005",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000005",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 190,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-05T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000006",
    "order_number": "KITA-2026-1006",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000006",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 435,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-06T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000007",
    "order_number": "KITA-2026-1007",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000007",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 115,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-07T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000008",
    "order_number": "KITA-2026-1008",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000008",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 120,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-08T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000009",
    "order_number": "KITA-2026-1009",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000009",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 855,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-09T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000000a",
    "order_number": "KITA-2026-1010",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000000a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 105,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-10T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000000b",
    "order_number": "KITA-2026-1011",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000000b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 250,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-11T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000000c",
    "order_number": "KITA-2026-1012",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000000c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 450,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-12T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000000d",
    "order_number": "KITA-2026-1013",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000000d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 110,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-13T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000000e",
    "order_number": "KITA-2026-1014",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000000e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 500,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-14T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000000f",
    "order_number": "KITA-2026-1015",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000000f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 360,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-15T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000010",
    "order_number": "KITA-2026-1016",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000010",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 295,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-16T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000011",
    "order_number": "KITA-2026-1017",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000011",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 780,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-17T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000012",
    "order_number": "KITA-2026-1018",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000012",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 270,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-18T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000013",
    "order_number": "KITA-2026-1019",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000013",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 440,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-01T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000014",
    "order_number": "KITA-2026-1020",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000014",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 290,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-02T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000015",
    "order_number": "KITA-2026-1021",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000015",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 675,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-03T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000016",
    "order_number": "KITA-2026-1022",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000016",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 140,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-04T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000017",
    "order_number": "KITA-2026-1023",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000017",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 140,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-05T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000018",
    "order_number": "KITA-2026-1024",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000018",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 300,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-06T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000019",
    "order_number": "KITA-2026-1025",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000019",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 365,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-07T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000001a",
    "order_number": "KITA-2026-1026",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000001a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 540,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-08T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000001b",
    "order_number": "KITA-2026-1027",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000001b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 1245,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-09T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000001c",
    "order_number": "KITA-2026-1028",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000001c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 210,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-10T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000001d",
    "order_number": "KITA-2026-1029",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000001d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 300,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-11T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000001e",
    "order_number": "KITA-2026-1030",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000001e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 465,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-12T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000001f",
    "order_number": "KITA-2026-1031",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000001f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 105,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-13T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000020",
    "order_number": "KITA-2026-1032",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000020",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 390,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-14T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000021",
    "order_number": "KITA-2026-1033",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000021",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 255,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-15T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000022",
    "order_number": "KITA-2026-1034",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000022",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 100,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-16T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000023",
    "order_number": "KITA-2026-1035",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000023",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 300,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-17T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000024",
    "order_number": "KITA-2026-1036",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000024",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 255,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-18T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000025",
    "order_number": "KITA-2026-1037",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000025",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 65,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-01T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000026",
    "order_number": "KITA-2026-1038",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000026",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 580,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-02T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000027",
    "order_number": "KITA-2026-1039",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000027",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 330,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-03T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000028",
    "order_number": "KITA-2026-1040",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000028",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 130,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-04T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000029",
    "order_number": "KITA-2026-1041",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000029",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 310,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-05T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000002a",
    "order_number": "KITA-2026-1042",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000002a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 345,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-06T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000002b",
    "order_number": "KITA-2026-1043",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000002b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 220,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-07T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000002c",
    "order_number": "KITA-2026-1044",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000002c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 250,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-08T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000002d",
    "order_number": "KITA-2026-1045",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000002d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 900,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-09T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000002e",
    "order_number": "KITA-2026-1046",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000002e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 395,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-10T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000002f",
    "order_number": "KITA-2026-1047",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000002f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 190,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-11T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000030",
    "order_number": "KITA-2026-1048",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000030",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 1335,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-12T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000031",
    "order_number": "KITA-2026-1049",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000031",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 150,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-13T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000032",
    "order_number": "KITA-2026-1050",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000032",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 390,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-14T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000033",
    "order_number": "KITA-2026-1051",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000033",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 435,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-15T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000034",
    "order_number": "KITA-2026-1052",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000034",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 75,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-16T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000035",
    "order_number": "KITA-2026-1053",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000035",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 210,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-17T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000036",
    "order_number": "KITA-2026-1054",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000036",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 1110,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-18T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000037",
    "order_number": "KITA-2026-1055",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000037",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 275,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-01T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000038",
    "order_number": "KITA-2026-1056",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000038",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 840,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-02T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000039",
    "order_number": "KITA-2026-1057",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000039",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 540,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-03T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000003a",
    "order_number": "KITA-2026-1058",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000003a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 155,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-04T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000003b",
    "order_number": "KITA-2026-1059",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000003b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 320,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-05T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000003c",
    "order_number": "KITA-2026-1060",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000003c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 330,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-06T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000003d",
    "order_number": "KITA-2026-1061",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000003d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 200,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-07T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000003e",
    "order_number": "KITA-2026-1062",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000003e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 180,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-08T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000003f",
    "order_number": "KITA-2026-1063",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000003f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 315,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-09T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000040",
    "order_number": "KITA-2026-1064",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000040",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 120,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-10T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000041",
    "order_number": "KITA-2026-1065",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000041",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 180,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-11T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000042",
    "order_number": "KITA-2026-1066",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000042",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 210,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-12T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000043",
    "order_number": "KITA-2026-1067",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000043",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 295,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-13T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000044",
    "order_number": "KITA-2026-1068",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000044",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 230,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-14T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000045",
    "order_number": "KITA-2026-1069",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000045",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 405,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-15T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000046",
    "order_number": "KITA-2026-1070",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000046",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 160,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-16T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000047",
    "order_number": "KITA-2026-1071",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000047",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 170,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-17T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000048",
    "order_number": "KITA-2026-1072",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000048",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 675,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-18T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000049",
    "order_number": "KITA-2026-1073",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000049",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 130,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-01T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000004a",
    "order_number": "KITA-2026-1074",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000004a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 610,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-02T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000004b",
    "order_number": "KITA-2026-1075",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000004b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 1200,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-03T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000004c",
    "order_number": "KITA-2026-1076",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000004c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 100,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-04T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000004d",
    "order_number": "KITA-2026-1077",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000004d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 900,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-05T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000004e",
    "order_number": "KITA-2026-1078",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000004e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 360,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-06T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000004f",
    "order_number": "KITA-2026-1079",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000004f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 200,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-07T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000050",
    "order_number": "KITA-2026-1080",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000050",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 300,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-08T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000051",
    "order_number": "KITA-2026-1081",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000051",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 240,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-09T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000052",
    "order_number": "KITA-2026-1082",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000052",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 110,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-10T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000053",
    "order_number": "KITA-2026-1083",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000053",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 750,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-11T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000054",
    "order_number": "KITA-2026-1084",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000054",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 840,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-12T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000055",
    "order_number": "KITA-2026-1085",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000055",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 390,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-13T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000056",
    "order_number": "KITA-2026-1086",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000056",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 370,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-14T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000057",
    "order_number": "KITA-2026-1087",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000057",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 480,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-15T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000058",
    "order_number": "KITA-2026-1088",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000058",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 165,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-16T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000059",
    "order_number": "KITA-2026-1089",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000059",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 230,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-17T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000005a",
    "order_number": "KITA-2026-1090",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000005a",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 615,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-18T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000005b",
    "order_number": "KITA-2026-1091",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000005b",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 95,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-01T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000005c",
    "order_number": "KITA-2026-1092",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000005c",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 150,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-02T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000005d",
    "order_number": "KITA-2026-1093",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000005d",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 375,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-03T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000005e",
    "order_number": "KITA-2026-1094",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000005e",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 95,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-04T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-00000000005f",
    "order_number": "KITA-2026-1095",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-00000000005f",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 150,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-05T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000060",
    "order_number": "KITA-2026-1096",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000060",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 900,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-06T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000061",
    "order_number": "KITA-2026-1097",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000061",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 120,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-07T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000062",
    "order_number": "KITA-2026-1098",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000062",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 280,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-08T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000063",
    "order_number": "KITA-2026-1099",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000063",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 390,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-09T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000064",
    "order_number": "KITA-2026-1100",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000064",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 90,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-10T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000065",
    "order_number": "KITA-2026-1101",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000065",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 460,
    "status": "COMPLETED",
    "cancellation_reason": null,
    "created_at": "2026-08-11T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000066",
    "order_number": "KITA-2026-1102",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000066",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 405,
    "status": "READY_FOR_PICKUP",
    "cancellation_reason": null,
    "created_at": "2026-08-12T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000067",
    "order_number": "KITA-2026-1103",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000067",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 310,
    "status": "PREPARING",
    "cancellation_reason": null,
    "created_at": "2026-08-13T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000068",
    "order_number": "KITA-2026-1104",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000068",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 810,
    "status": "CONFIRMED",
    "cancellation_reason": null,
    "created_at": "2026-08-14T14:30:00Z"
  },
  {
    "id": "00000000-0000-4000-3300-000000000069",
    "order_number": "KITA-2026-1105",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "store_id": "00000000-0000-4000-d000-000000000069",
    "campus_id": "00000000-0000-4000-a000-000000000001",
    "total_amount": 315,
    "status": "PENDING",
    "cancellation_reason": null,
    "created_at": "2026-08-15T14:30:00Z"
  }
];

// 7. MOCK REVIEWS (100+ Reviews)
export const MOCK_REVIEWS: MockReview[] = [
  {
    "id": "00000000-0000-4000-3700-000000000001",
    "order_id": "00000000-0000-4000-3300-000000000001",
    "product_id": "00000000-0000-4000-e000-000000000001",
    "store_id": "00000000-0000-4000-d000-000000000001",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-01T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000002",
    "order_id": "00000000-0000-4000-3300-000000000002",
    "product_id": "00000000-0000-4000-e000-000000000002",
    "store_id": "00000000-0000-4000-d000-000000000002",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-02T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000003",
    "order_id": "00000000-0000-4000-3300-000000000003",
    "product_id": "00000000-0000-4000-e000-000000000003",
    "store_id": "00000000-0000-4000-d000-000000000003",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-03T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000004",
    "order_id": "00000000-0000-4000-3300-000000000004",
    "product_id": "00000000-0000-4000-e000-000000000004",
    "store_id": "00000000-0000-4000-d000-000000000004",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-04T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000005",
    "order_id": "00000000-0000-4000-3300-000000000005",
    "product_id": "00000000-0000-4000-e000-000000000005",
    "store_id": "00000000-0000-4000-d000-000000000005",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-05T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000006",
    "order_id": "00000000-0000-4000-3300-000000000006",
    "product_id": "00000000-0000-4000-e000-000000000006",
    "store_id": "00000000-0000-4000-d000-000000000006",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-06T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000007",
    "order_id": "00000000-0000-4000-3300-000000000007",
    "product_id": "00000000-0000-4000-e000-000000000007",
    "store_id": "00000000-0000-4000-d000-000000000007",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-07T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000008",
    "order_id": "00000000-0000-4000-3300-000000000008",
    "product_id": "00000000-0000-4000-e000-000000000008",
    "store_id": "00000000-0000-4000-d000-000000000008",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-08T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000009",
    "order_id": "00000000-0000-4000-3300-000000000009",
    "product_id": "00000000-0000-4000-e000-000000000009",
    "store_id": "00000000-0000-4000-d000-000000000009",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-09T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000000a",
    "order_id": "00000000-0000-4000-3300-00000000000a",
    "product_id": "00000000-0000-4000-e000-00000000000a",
    "store_id": "00000000-0000-4000-d000-00000000000a",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-10T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000000b",
    "order_id": "00000000-0000-4000-3300-00000000000b",
    "product_id": "00000000-0000-4000-e000-00000000000b",
    "store_id": "00000000-0000-4000-d000-00000000000b",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-11T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000000c",
    "order_id": "00000000-0000-4000-3300-00000000000c",
    "product_id": "00000000-0000-4000-e000-00000000000c",
    "store_id": "00000000-0000-4000-d000-00000000000c",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-12T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000000d",
    "order_id": "00000000-0000-4000-3300-00000000000d",
    "product_id": "00000000-0000-4000-e000-00000000000d",
    "store_id": "00000000-0000-4000-d000-00000000000d",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-13T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000000e",
    "order_id": "00000000-0000-4000-3300-00000000000e",
    "product_id": "00000000-0000-4000-e000-00000000000e",
    "store_id": "00000000-0000-4000-d000-00000000000e",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-14T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000000f",
    "order_id": "00000000-0000-4000-3300-00000000000f",
    "product_id": "00000000-0000-4000-e000-00000000000f",
    "store_id": "00000000-0000-4000-d000-00000000000f",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-15T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000010",
    "order_id": "00000000-0000-4000-3300-000000000010",
    "product_id": "00000000-0000-4000-e000-000000000010",
    "store_id": "00000000-0000-4000-d000-000000000010",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-16T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000011",
    "order_id": "00000000-0000-4000-3300-000000000011",
    "product_id": "00000000-0000-4000-e000-000000000011",
    "store_id": "00000000-0000-4000-d000-000000000011",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-17T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000012",
    "order_id": "00000000-0000-4000-3300-000000000012",
    "product_id": "00000000-0000-4000-e000-000000000012",
    "store_id": "00000000-0000-4000-d000-000000000012",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-18T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000013",
    "order_id": "00000000-0000-4000-3300-000000000013",
    "product_id": "00000000-0000-4000-e000-000000000013",
    "store_id": "00000000-0000-4000-d000-000000000013",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-01T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000014",
    "order_id": "00000000-0000-4000-3300-000000000014",
    "product_id": "00000000-0000-4000-e000-000000000014",
    "store_id": "00000000-0000-4000-d000-000000000014",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-02T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000015",
    "order_id": "00000000-0000-4000-3300-000000000015",
    "product_id": "00000000-0000-4000-e000-000000000015",
    "store_id": "00000000-0000-4000-d000-000000000015",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-03T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000016",
    "order_id": "00000000-0000-4000-3300-000000000016",
    "product_id": "00000000-0000-4000-e000-000000000016",
    "store_id": "00000000-0000-4000-d000-000000000016",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-04T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000017",
    "order_id": "00000000-0000-4000-3300-000000000017",
    "product_id": "00000000-0000-4000-e000-000000000017",
    "store_id": "00000000-0000-4000-d000-000000000017",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-05T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000018",
    "order_id": "00000000-0000-4000-3300-000000000018",
    "product_id": "00000000-0000-4000-e000-000000000018",
    "store_id": "00000000-0000-4000-d000-000000000018",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-06T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000019",
    "order_id": "00000000-0000-4000-3300-000000000019",
    "product_id": "00000000-0000-4000-e000-000000000019",
    "store_id": "00000000-0000-4000-d000-000000000019",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-07T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000001a",
    "order_id": "00000000-0000-4000-3300-00000000001a",
    "product_id": "00000000-0000-4000-e000-00000000001a",
    "store_id": "00000000-0000-4000-d000-00000000001a",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-08T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000001b",
    "order_id": "00000000-0000-4000-3300-00000000001b",
    "product_id": "00000000-0000-4000-e000-00000000001b",
    "store_id": "00000000-0000-4000-d000-00000000001b",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-09T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000001c",
    "order_id": "00000000-0000-4000-3300-00000000001c",
    "product_id": "00000000-0000-4000-e000-00000000001c",
    "store_id": "00000000-0000-4000-d000-00000000001c",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-10T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000001d",
    "order_id": "00000000-0000-4000-3300-00000000001d",
    "product_id": "00000000-0000-4000-e000-00000000001d",
    "store_id": "00000000-0000-4000-d000-00000000001d",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-11T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000001e",
    "order_id": "00000000-0000-4000-3300-00000000001e",
    "product_id": "00000000-0000-4000-e000-00000000001e",
    "store_id": "00000000-0000-4000-d000-00000000001e",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-12T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000001f",
    "order_id": "00000000-0000-4000-3300-00000000001f",
    "product_id": "00000000-0000-4000-e000-00000000001f",
    "store_id": "00000000-0000-4000-d000-00000000001f",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-13T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000020",
    "order_id": "00000000-0000-4000-3300-000000000020",
    "product_id": "00000000-0000-4000-e000-000000000020",
    "store_id": "00000000-0000-4000-d000-000000000020",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-14T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000021",
    "order_id": "00000000-0000-4000-3300-000000000021",
    "product_id": "00000000-0000-4000-e000-000000000021",
    "store_id": "00000000-0000-4000-d000-000000000021",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-15T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000022",
    "order_id": "00000000-0000-4000-3300-000000000022",
    "product_id": "00000000-0000-4000-e000-000000000022",
    "store_id": "00000000-0000-4000-d000-000000000022",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-16T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000023",
    "order_id": "00000000-0000-4000-3300-000000000023",
    "product_id": "00000000-0000-4000-e000-000000000023",
    "store_id": "00000000-0000-4000-d000-000000000023",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-17T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000024",
    "order_id": "00000000-0000-4000-3300-000000000024",
    "product_id": "00000000-0000-4000-e000-000000000024",
    "store_id": "00000000-0000-4000-d000-000000000024",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-18T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000025",
    "order_id": "00000000-0000-4000-3300-000000000025",
    "product_id": "00000000-0000-4000-e000-000000000025",
    "store_id": "00000000-0000-4000-d000-000000000025",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-01T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000026",
    "order_id": "00000000-0000-4000-3300-000000000026",
    "product_id": "00000000-0000-4000-e000-000000000026",
    "store_id": "00000000-0000-4000-d000-000000000026",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-02T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000027",
    "order_id": "00000000-0000-4000-3300-000000000027",
    "product_id": "00000000-0000-4000-e000-000000000027",
    "store_id": "00000000-0000-4000-d000-000000000027",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-03T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000028",
    "order_id": "00000000-0000-4000-3300-000000000028",
    "product_id": "00000000-0000-4000-e000-000000000028",
    "store_id": "00000000-0000-4000-d000-000000000028",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-04T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000029",
    "order_id": "00000000-0000-4000-3300-000000000029",
    "product_id": "00000000-0000-4000-e000-000000000029",
    "store_id": "00000000-0000-4000-d000-000000000029",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-05T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000002a",
    "order_id": "00000000-0000-4000-3300-00000000002a",
    "product_id": "00000000-0000-4000-e000-00000000002a",
    "store_id": "00000000-0000-4000-d000-00000000002a",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-06T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000002b",
    "order_id": "00000000-0000-4000-3300-00000000002b",
    "product_id": "00000000-0000-4000-e000-00000000002b",
    "store_id": "00000000-0000-4000-d000-00000000002b",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-07T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000002c",
    "order_id": "00000000-0000-4000-3300-00000000002c",
    "product_id": "00000000-0000-4000-e000-00000000002c",
    "store_id": "00000000-0000-4000-d000-00000000002c",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-08T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000002d",
    "order_id": "00000000-0000-4000-3300-00000000002d",
    "product_id": "00000000-0000-4000-e000-00000000002d",
    "store_id": "00000000-0000-4000-d000-00000000002d",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-09T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000002e",
    "order_id": "00000000-0000-4000-3300-00000000002e",
    "product_id": "00000000-0000-4000-e000-00000000002e",
    "store_id": "00000000-0000-4000-d000-00000000002e",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-10T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000002f",
    "order_id": "00000000-0000-4000-3300-00000000002f",
    "product_id": "00000000-0000-4000-e000-00000000002f",
    "store_id": "00000000-0000-4000-d000-00000000002f",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-11T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000030",
    "order_id": "00000000-0000-4000-3300-000000000030",
    "product_id": "00000000-0000-4000-e000-000000000030",
    "store_id": "00000000-0000-4000-d000-000000000030",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-12T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000031",
    "order_id": "00000000-0000-4000-3300-000000000031",
    "product_id": "00000000-0000-4000-e000-000000000031",
    "store_id": "00000000-0000-4000-d000-000000000031",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-13T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000032",
    "order_id": "00000000-0000-4000-3300-000000000032",
    "product_id": "00000000-0000-4000-e000-000000000032",
    "store_id": "00000000-0000-4000-d000-000000000032",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-14T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000033",
    "order_id": "00000000-0000-4000-3300-000000000033",
    "product_id": "00000000-0000-4000-e000-000000000033",
    "store_id": "00000000-0000-4000-d000-000000000033",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-15T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000034",
    "order_id": "00000000-0000-4000-3300-000000000034",
    "product_id": "00000000-0000-4000-e000-000000000034",
    "store_id": "00000000-0000-4000-d000-000000000034",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-16T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000035",
    "order_id": "00000000-0000-4000-3300-000000000035",
    "product_id": "00000000-0000-4000-e000-000000000035",
    "store_id": "00000000-0000-4000-d000-000000000035",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-17T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000036",
    "order_id": "00000000-0000-4000-3300-000000000036",
    "product_id": "00000000-0000-4000-e000-000000000036",
    "store_id": "00000000-0000-4000-d000-000000000036",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-18T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000037",
    "order_id": "00000000-0000-4000-3300-000000000037",
    "product_id": "00000000-0000-4000-e000-000000000037",
    "store_id": "00000000-0000-4000-d000-000000000037",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-01T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000038",
    "order_id": "00000000-0000-4000-3300-000000000038",
    "product_id": "00000000-0000-4000-e000-000000000038",
    "store_id": "00000000-0000-4000-d000-000000000038",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-02T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000039",
    "order_id": "00000000-0000-4000-3300-000000000039",
    "product_id": "00000000-0000-4000-e000-000000000039",
    "store_id": "00000000-0000-4000-d000-000000000039",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-03T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000003a",
    "order_id": "00000000-0000-4000-3300-00000000003a",
    "product_id": "00000000-0000-4000-e000-00000000003a",
    "store_id": "00000000-0000-4000-d000-00000000003a",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-04T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000003b",
    "order_id": "00000000-0000-4000-3300-00000000003b",
    "product_id": "00000000-0000-4000-e000-00000000003b",
    "store_id": "00000000-0000-4000-d000-00000000003b",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-05T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000003c",
    "order_id": "00000000-0000-4000-3300-00000000003c",
    "product_id": "00000000-0000-4000-e000-00000000003c",
    "store_id": "00000000-0000-4000-d000-00000000003c",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-06T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000003d",
    "order_id": "00000000-0000-4000-3300-00000000003d",
    "product_id": "00000000-0000-4000-e000-00000000003d",
    "store_id": "00000000-0000-4000-d000-00000000003d",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-07T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000003e",
    "order_id": "00000000-0000-4000-3300-00000000003e",
    "product_id": "00000000-0000-4000-e000-00000000003e",
    "store_id": "00000000-0000-4000-d000-00000000003e",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-08T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000003f",
    "order_id": "00000000-0000-4000-3300-00000000003f",
    "product_id": "00000000-0000-4000-e000-00000000003f",
    "store_id": "00000000-0000-4000-d000-00000000003f",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-09T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000040",
    "order_id": "00000000-0000-4000-3300-000000000040",
    "product_id": "00000000-0000-4000-e000-000000000040",
    "store_id": "00000000-0000-4000-d000-000000000040",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-10T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000041",
    "order_id": "00000000-0000-4000-3300-000000000041",
    "product_id": "00000000-0000-4000-e000-000000000041",
    "store_id": "00000000-0000-4000-d000-000000000041",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-11T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000042",
    "order_id": "00000000-0000-4000-3300-000000000042",
    "product_id": "00000000-0000-4000-e000-000000000042",
    "store_id": "00000000-0000-4000-d000-000000000042",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-12T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000043",
    "order_id": "00000000-0000-4000-3300-000000000043",
    "product_id": "00000000-0000-4000-e000-000000000043",
    "store_id": "00000000-0000-4000-d000-000000000043",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-13T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000044",
    "order_id": "00000000-0000-4000-3300-000000000044",
    "product_id": "00000000-0000-4000-e000-000000000044",
    "store_id": "00000000-0000-4000-d000-000000000044",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-14T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000045",
    "order_id": "00000000-0000-4000-3300-000000000045",
    "product_id": "00000000-0000-4000-e000-000000000045",
    "store_id": "00000000-0000-4000-d000-000000000045",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-15T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000046",
    "order_id": "00000000-0000-4000-3300-000000000046",
    "product_id": "00000000-0000-4000-e000-000000000046",
    "store_id": "00000000-0000-4000-d000-000000000046",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-16T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000047",
    "order_id": "00000000-0000-4000-3300-000000000047",
    "product_id": "00000000-0000-4000-e000-000000000047",
    "store_id": "00000000-0000-4000-d000-000000000047",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-17T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000048",
    "order_id": "00000000-0000-4000-3300-000000000048",
    "product_id": "00000000-0000-4000-e000-000000000048",
    "store_id": "00000000-0000-4000-d000-000000000048",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-18T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000049",
    "order_id": "00000000-0000-4000-3300-000000000049",
    "product_id": "00000000-0000-4000-e000-000000000049",
    "store_id": "00000000-0000-4000-d000-000000000049",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-01T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000004a",
    "order_id": "00000000-0000-4000-3300-00000000004a",
    "product_id": "00000000-0000-4000-e000-00000000004a",
    "store_id": "00000000-0000-4000-d000-00000000004a",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-02T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000004b",
    "order_id": "00000000-0000-4000-3300-00000000004b",
    "product_id": "00000000-0000-4000-e000-00000000004b",
    "store_id": "00000000-0000-4000-d000-00000000004b",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-03T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000004c",
    "order_id": "00000000-0000-4000-3300-00000000004c",
    "product_id": "00000000-0000-4000-e000-00000000004c",
    "store_id": "00000000-0000-4000-d000-00000000004c",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-04T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000004d",
    "order_id": "00000000-0000-4000-3300-00000000004d",
    "product_id": "00000000-0000-4000-e000-00000000004d",
    "store_id": "00000000-0000-4000-d000-00000000004d",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-05T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000004e",
    "order_id": "00000000-0000-4000-3300-00000000004e",
    "product_id": "00000000-0000-4000-e000-00000000004e",
    "store_id": "00000000-0000-4000-d000-00000000004e",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-06T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000004f",
    "order_id": "00000000-0000-4000-3300-00000000004f",
    "product_id": "00000000-0000-4000-e000-00000000004f",
    "store_id": "00000000-0000-4000-d000-00000000004f",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-07T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000050",
    "order_id": "00000000-0000-4000-3300-000000000050",
    "product_id": "00000000-0000-4000-e000-000000000050",
    "store_id": "00000000-0000-4000-d000-000000000050",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-08T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000051",
    "order_id": "00000000-0000-4000-3300-000000000051",
    "product_id": "00000000-0000-4000-e000-000000000051",
    "store_id": "00000000-0000-4000-d000-000000000051",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-09T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000052",
    "order_id": "00000000-0000-4000-3300-000000000052",
    "product_id": "00000000-0000-4000-e000-000000000052",
    "store_id": "00000000-0000-4000-d000-000000000052",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-10T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000053",
    "order_id": "00000000-0000-4000-3300-000000000053",
    "product_id": "00000000-0000-4000-e000-000000000053",
    "store_id": "00000000-0000-4000-d000-000000000053",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-11T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000054",
    "order_id": "00000000-0000-4000-3300-000000000054",
    "product_id": "00000000-0000-4000-e000-000000000054",
    "store_id": "00000000-0000-4000-d000-000000000054",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-12T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000055",
    "order_id": "00000000-0000-4000-3300-000000000055",
    "product_id": "00000000-0000-4000-e000-000000000055",
    "store_id": "00000000-0000-4000-d000-000000000055",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-13T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000056",
    "order_id": "00000000-0000-4000-3300-000000000056",
    "product_id": "00000000-0000-4000-e000-000000000056",
    "store_id": "00000000-0000-4000-d000-000000000056",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-14T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000057",
    "order_id": "00000000-0000-4000-3300-000000000057",
    "product_id": "00000000-0000-4000-e000-000000000057",
    "store_id": "00000000-0000-4000-d000-000000000057",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-15T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000058",
    "order_id": "00000000-0000-4000-3300-000000000058",
    "product_id": "00000000-0000-4000-e000-000000000058",
    "store_id": "00000000-0000-4000-d000-000000000058",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-16T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000059",
    "order_id": "00000000-0000-4000-3300-000000000059",
    "product_id": "00000000-0000-4000-e000-000000000059",
    "store_id": "00000000-0000-4000-d000-000000000059",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-17T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000005a",
    "order_id": "00000000-0000-4000-3300-00000000005a",
    "product_id": "00000000-0000-4000-e000-00000000005a",
    "store_id": "00000000-0000-4000-d000-00000000005a",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-18T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000005b",
    "order_id": "00000000-0000-4000-3300-00000000005b",
    "product_id": "00000000-0000-4000-e000-00000000005b",
    "store_id": "00000000-0000-4000-d000-00000000005b",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-01T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000005c",
    "order_id": "00000000-0000-4000-3300-00000000005c",
    "product_id": "00000000-0000-4000-e000-00000000005c",
    "store_id": "00000000-0000-4000-d000-00000000005c",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-02T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000005d",
    "order_id": "00000000-0000-4000-3300-00000000005d",
    "product_id": "00000000-0000-4000-e000-00000000005d",
    "store_id": "00000000-0000-4000-d000-00000000005d",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-03T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000005e",
    "order_id": "00000000-0000-4000-3300-00000000005e",
    "product_id": "00000000-0000-4000-e000-00000000005e",
    "store_id": "00000000-0000-4000-d000-00000000005e",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-04T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-00000000005f",
    "order_id": "00000000-0000-4000-3300-00000000005f",
    "product_id": "00000000-0000-4000-e000-00000000005f",
    "store_id": "00000000-0000-4000-d000-00000000005f",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-05T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000060",
    "order_id": "00000000-0000-4000-3300-000000000060",
    "product_id": "00000000-0000-4000-e000-000000000060",
    "store_id": "00000000-0000-4000-d000-000000000060",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-06T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000061",
    "order_id": "00000000-0000-4000-3300-000000000061",
    "product_id": "00000000-0000-4000-e000-000000000061",
    "store_id": "00000000-0000-4000-d000-000000000061",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-07T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000062",
    "order_id": "00000000-0000-4000-3300-000000000062",
    "product_id": "00000000-0000-4000-e000-000000000062",
    "store_id": "00000000-0000-4000-d000-000000000062",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Very high quality! Tamang-tama yung fit sa laptop ko.",
    "created_at": "2026-08-08T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000063",
    "order_id": "00000000-0000-4000-3300-000000000063",
    "product_id": "00000000-0000-4000-e000-000000000063",
    "store_id": "00000000-0000-4000-d000-000000000063",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Life saver reviewer bago mag-periodical exam! Very detailed and aesthetic handwriting.",
    "created_at": "2026-08-09T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000064",
    "order_id": "00000000-0000-4000-3300-000000000064",
    "product_id": "00000000-0000-4000-e000-000000000064",
    "store_id": "00000000-0000-4000-d000-000000000064",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Smooth transaction and prompt pickup. Will order again next week!",
    "created_at": "2026-08-10T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000065",
    "order_id": "00000000-0000-4000-3300-000000000065",
    "product_id": "00000000-0000-4000-e000-000000000065",
    "store_id": "00000000-0000-4000-d000-000000000065",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Great customer service! Responsive seller sa chat and on-time meet-up.",
    "created_at": "2026-08-11T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000066",
    "order_id": "00000000-0000-4000-3300-000000000066",
    "product_id": "00000000-0000-4000-e000-000000000066",
    "store_id": "00000000-0000-4000-d000-000000000066",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "10/10 worth every peso. Recommended for all SHS students.",
    "created_at": "2026-08-12T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000067",
    "order_id": "00000000-0000-4000-3300-000000000067",
    "product_id": "00000000-0000-4000-e000-000000000067",
    "store_id": "00000000-0000-4000-d000-000000000067",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Ang bango ng candle and relaxing habang nag-aaral sa gabi.",
    "created_at": "2026-08-13T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000068",
    "order_id": "00000000-0000-4000-3300-000000000068",
    "product_id": "00000000-0000-4000-e000-000000000068",
    "store_id": "00000000-0000-4000-d000-000000000068",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 5,
    "comment": "Super crisp ng prints and legit waterproof stickers.",
    "created_at": "2026-08-14T17:00:00Z"
  },
  {
    "id": "00000000-0000-4000-3700-000000000069",
    "order_id": "00000000-0000-4000-3300-000000000069",
    "product_id": "00000000-0000-4000-e000-000000000069",
    "store_id": "00000000-0000-4000-d000-000000000069",
    "buyer_id": "22222222-2222-4222-8222-222222222222",
    "rating": 4,
    "comment": "Super sarap and freshly made! Dumating nang mainit pa sa meeting spot.",
    "created_at": "2026-08-15T17:00:00Z"
  }
];

// 8. MOCK NOTIFICATIONS (100+ Notifications)
export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    "id": "00000000-0000-4000-4400-000000000001",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1000: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000002",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1001: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000003",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1002: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000004",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1003: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000005",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1004: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000006",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1005: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000007",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1006: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000008",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1007: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000009",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1008: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000000a",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1009: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000000b",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1010: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000000c",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1011: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000000d",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1012: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000000e",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1013: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000000f",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1014: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000010",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1015: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000011",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1016: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000012",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1017: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000013",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1018: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000014",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1019: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000015",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1020: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000016",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1021: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000017",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1022: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000018",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1023: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000019",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1024: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000001a",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1025: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000001b",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1026: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000001c",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1027: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000001d",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1028: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000001e",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1029: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000001f",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1030: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000020",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1031: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000021",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1032: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000022",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1033: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000023",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1034: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000024",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1035: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000025",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1036: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000026",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1037: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000027",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1038: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000028",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1039: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000029",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1040: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000002a",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1041: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000002b",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1042: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000002c",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1043: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000002d",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1044: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000002e",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1045: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000002f",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1046: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000030",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1047: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000031",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1048: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000032",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1049: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000033",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1050: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000034",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1051: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000035",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1052: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000036",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1053: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000037",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1054: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000038",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1055: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000039",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1056: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000003a",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1057: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000003b",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1058: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000003c",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1059: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000003d",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1060: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000003e",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1061: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000003f",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1062: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000040",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1063: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000041",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1064: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000042",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1065: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000043",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1066: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000044",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1067: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000045",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1068: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000046",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1069: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000047",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1070: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000048",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1071: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000049",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1072: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000004a",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1073: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000004b",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1074: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000004c",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1075: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000004d",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1076: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000004e",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1077: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000004f",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1078: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000050",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1079: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000051",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1080: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000052",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1081: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000053",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1082: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000054",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1083: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000055",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1084: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000056",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1085: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000057",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1086: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000058",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1087: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000059",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1088: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000005a",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1089: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000005b",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1090: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000005c",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1091: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000005d",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1092: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-00000000005e",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1093: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-00000000005f",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1094: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000060",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1095: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000061",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1096: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000062",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1097: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000063",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Order Ready for Pickup!",
    "message": "Update for transaction #1098: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000064",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "New Listing from Maria's Kitchenette",
    "message": "Update for transaction #1099: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000065",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Seller Application Approved",
    "message": "Update for transaction #1100: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000066",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Flash Sale on Campus Crafts",
    "message": "Update for transaction #1101: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000067",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "Your Order Has Been Confirmed",
    "message": "Update for transaction #1102: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": true
  },
  {
    "id": "00000000-0000-4000-4400-000000000068",
    "user_id": "11111111-1111-4111-8111-111111111111",
    "title": "Payment Verified via GCash",
    "message": "Update for transaction #1103: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  },
  {
    "id": "00000000-0000-4000-4400-000000000069",
    "user_id": "22222222-2222-4222-8222-222222222222",
    "title": "New Review Received for Your Store",
    "message": "Update for transaction #1104: Please check your dashboard for details.",
    "link_url": "/protected/marketplace",
    "is_read": false
  }
];

// 9. MOCK STUDENT VERIFICATIONS (100+ Verifications)
export const MOCK_VERIFICATIONS: MockVerification[] = [
  {
    "id": "00000000-0000-4000-1100-000000000001",
    "user_id": "00000000-0000-4000-b000-000000000001",
    "student_id_number": "2024-10000",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000002",
    "user_id": "00000000-0000-4000-b000-000000000002",
    "student_id_number": "2024-10037",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000003",
    "user_id": "00000000-0000-4000-b000-000000000003",
    "student_id_number": "2024-10074",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000004",
    "user_id": "00000000-0000-4000-b000-000000000004",
    "student_id_number": "2024-10111",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000005",
    "user_id": "00000000-0000-4000-b000-000000000005",
    "student_id_number": "2024-10148",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000006",
    "user_id": "00000000-0000-4000-b000-000000000006",
    "student_id_number": "2024-10185",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000007",
    "user_id": "00000000-0000-4000-b000-000000000007",
    "student_id_number": "2024-10222",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000008",
    "user_id": "00000000-0000-4000-b000-000000000008",
    "student_id_number": "2024-10259",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000009",
    "user_id": "00000000-0000-4000-b000-000000000009",
    "student_id_number": "2024-10296",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000000a",
    "user_id": "00000000-0000-4000-b000-00000000000a",
    "student_id_number": "2024-10333",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000000b",
    "user_id": "00000000-0000-4000-b000-00000000000b",
    "student_id_number": "2024-10370",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000000c",
    "user_id": "00000000-0000-4000-b000-00000000000c",
    "student_id_number": "2024-10407",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000000d",
    "user_id": "00000000-0000-4000-b000-00000000000d",
    "student_id_number": "2024-10444",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000000e",
    "user_id": "00000000-0000-4000-b000-00000000000e",
    "student_id_number": "2024-10481",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000000f",
    "user_id": "00000000-0000-4000-b000-00000000000f",
    "student_id_number": "2024-10518",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000010",
    "user_id": "00000000-0000-4000-b000-000000000010",
    "student_id_number": "2024-10555",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000011",
    "user_id": "00000000-0000-4000-b000-000000000011",
    "student_id_number": "2024-10592",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000012",
    "user_id": "00000000-0000-4000-b000-000000000012",
    "student_id_number": "2024-10629",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000013",
    "user_id": "00000000-0000-4000-b000-000000000013",
    "student_id_number": "2024-10666",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000014",
    "user_id": "00000000-0000-4000-b000-000000000014",
    "student_id_number": "2024-10703",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000015",
    "user_id": "00000000-0000-4000-b000-000000000015",
    "student_id_number": "2024-10740",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000016",
    "user_id": "00000000-0000-4000-b000-000000000016",
    "student_id_number": "2024-10777",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000017",
    "user_id": "00000000-0000-4000-b000-000000000017",
    "student_id_number": "2024-10814",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000018",
    "user_id": "00000000-0000-4000-b000-000000000018",
    "student_id_number": "2024-10851",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000019",
    "user_id": "00000000-0000-4000-b000-000000000019",
    "student_id_number": "2024-10888",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000001a",
    "user_id": "00000000-0000-4000-b000-00000000001a",
    "student_id_number": "2024-10925",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000001b",
    "user_id": "00000000-0000-4000-b000-00000000001b",
    "student_id_number": "2024-10962",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000001c",
    "user_id": "00000000-0000-4000-b000-00000000001c",
    "student_id_number": "2024-10999",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000001d",
    "user_id": "00000000-0000-4000-b000-00000000001d",
    "student_id_number": "2024-11036",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000001e",
    "user_id": "00000000-0000-4000-b000-00000000001e",
    "student_id_number": "2024-11073",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000001f",
    "user_id": "00000000-0000-4000-b000-00000000001f",
    "student_id_number": "2024-11110",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000020",
    "user_id": "00000000-0000-4000-b000-000000000020",
    "student_id_number": "2024-11147",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000021",
    "user_id": "00000000-0000-4000-b000-000000000021",
    "student_id_number": "2024-11184",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000022",
    "user_id": "00000000-0000-4000-b000-000000000022",
    "student_id_number": "2024-11221",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000023",
    "user_id": "00000000-0000-4000-b000-000000000023",
    "student_id_number": "2024-11258",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000024",
    "user_id": "00000000-0000-4000-b000-000000000024",
    "student_id_number": "2024-11295",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000025",
    "user_id": "00000000-0000-4000-b000-000000000025",
    "student_id_number": "2024-11332",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000026",
    "user_id": "00000000-0000-4000-b000-000000000026",
    "student_id_number": "2024-11369",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000027",
    "user_id": "00000000-0000-4000-b000-000000000027",
    "student_id_number": "2024-11406",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000028",
    "user_id": "00000000-0000-4000-b000-000000000028",
    "student_id_number": "2024-11443",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000029",
    "user_id": "00000000-0000-4000-b000-000000000029",
    "student_id_number": "2024-11480",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000002a",
    "user_id": "00000000-0000-4000-b000-00000000002a",
    "student_id_number": "2024-11517",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000002b",
    "user_id": "00000000-0000-4000-b000-00000000002b",
    "student_id_number": "2024-11554",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000002c",
    "user_id": "00000000-0000-4000-b000-00000000002c",
    "student_id_number": "2024-11591",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000002d",
    "user_id": "00000000-0000-4000-b000-00000000002d",
    "student_id_number": "2024-11628",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000002e",
    "user_id": "00000000-0000-4000-b000-00000000002e",
    "student_id_number": "2024-11665",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000002f",
    "user_id": "00000000-0000-4000-b000-00000000002f",
    "student_id_number": "2024-11702",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000030",
    "user_id": "00000000-0000-4000-b000-000000000030",
    "student_id_number": "2024-11739",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000031",
    "user_id": "00000000-0000-4000-b000-000000000031",
    "student_id_number": "2024-11776",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000032",
    "user_id": "00000000-0000-4000-b000-000000000032",
    "student_id_number": "2024-11813",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000033",
    "user_id": "00000000-0000-4000-b000-000000000033",
    "student_id_number": "2024-11850",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000034",
    "user_id": "00000000-0000-4000-b000-000000000034",
    "student_id_number": "2024-11887",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000035",
    "user_id": "00000000-0000-4000-b000-000000000035",
    "student_id_number": "2024-11924",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000036",
    "user_id": "00000000-0000-4000-b000-000000000036",
    "student_id_number": "2024-11961",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000037",
    "user_id": "00000000-0000-4000-b000-000000000037",
    "student_id_number": "2024-11998",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000038",
    "user_id": "00000000-0000-4000-b000-000000000038",
    "student_id_number": "2024-12035",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000039",
    "user_id": "00000000-0000-4000-b000-000000000039",
    "student_id_number": "2024-12072",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000003a",
    "user_id": "00000000-0000-4000-b000-00000000003a",
    "student_id_number": "2024-12109",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000003b",
    "user_id": "00000000-0000-4000-b000-00000000003b",
    "student_id_number": "2024-12146",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000003c",
    "user_id": "00000000-0000-4000-b000-00000000003c",
    "student_id_number": "2024-12183",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000003d",
    "user_id": "00000000-0000-4000-b000-00000000003d",
    "student_id_number": "2024-12220",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000003e",
    "user_id": "00000000-0000-4000-b000-00000000003e",
    "student_id_number": "2024-12257",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000003f",
    "user_id": "00000000-0000-4000-b000-00000000003f",
    "student_id_number": "2024-12294",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000040",
    "user_id": "00000000-0000-4000-b000-000000000040",
    "student_id_number": "2024-12331",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000041",
    "user_id": "00000000-0000-4000-b000-000000000041",
    "student_id_number": "2024-12368",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000042",
    "user_id": "00000000-0000-4000-b000-000000000042",
    "student_id_number": "2024-12405",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000043",
    "user_id": "00000000-0000-4000-b000-000000000043",
    "student_id_number": "2024-12442",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000044",
    "user_id": "00000000-0000-4000-b000-000000000044",
    "student_id_number": "2024-12479",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000045",
    "user_id": "00000000-0000-4000-b000-000000000045",
    "student_id_number": "2024-12516",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000046",
    "user_id": "00000000-0000-4000-b000-000000000046",
    "student_id_number": "2024-12553",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000047",
    "user_id": "00000000-0000-4000-b000-000000000047",
    "student_id_number": "2024-12590",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000048",
    "user_id": "00000000-0000-4000-b000-000000000048",
    "student_id_number": "2024-12627",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000049",
    "user_id": "00000000-0000-4000-b000-000000000049",
    "student_id_number": "2024-12664",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000004a",
    "user_id": "00000000-0000-4000-b000-00000000004a",
    "student_id_number": "2024-12701",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000004b",
    "user_id": "00000000-0000-4000-b000-00000000004b",
    "student_id_number": "2024-12738",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000004c",
    "user_id": "00000000-0000-4000-b000-00000000004c",
    "student_id_number": "2024-12775",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000004d",
    "user_id": "00000000-0000-4000-b000-00000000004d",
    "student_id_number": "2024-12812",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000004e",
    "user_id": "00000000-0000-4000-b000-00000000004e",
    "student_id_number": "2024-12849",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000004f",
    "user_id": "00000000-0000-4000-b000-00000000004f",
    "student_id_number": "2024-12886",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000050",
    "user_id": "00000000-0000-4000-b000-000000000050",
    "student_id_number": "2024-12923",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000051",
    "user_id": "00000000-0000-4000-b000-000000000051",
    "student_id_number": "2024-12960",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000052",
    "user_id": "00000000-0000-4000-b000-000000000052",
    "student_id_number": "2024-12997",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000053",
    "user_id": "00000000-0000-4000-b000-000000000053",
    "student_id_number": "2024-13034",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000054",
    "user_id": "00000000-0000-4000-b000-000000000054",
    "student_id_number": "2024-13071",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000055",
    "user_id": "00000000-0000-4000-b000-000000000055",
    "student_id_number": "2024-13108",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000056",
    "user_id": "00000000-0000-4000-b000-000000000056",
    "student_id_number": "2024-13145",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000057",
    "user_id": "00000000-0000-4000-b000-000000000057",
    "student_id_number": "2024-13182",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000058",
    "user_id": "00000000-0000-4000-b000-000000000058",
    "student_id_number": "2024-13219",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000059",
    "user_id": "00000000-0000-4000-b000-000000000059",
    "student_id_number": "2024-13256",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000005a",
    "user_id": "00000000-0000-4000-b000-00000000005a",
    "student_id_number": "2024-13293",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000005b",
    "user_id": "00000000-0000-4000-b000-00000000005b",
    "student_id_number": "2024-13330",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000005c",
    "user_id": "00000000-0000-4000-b000-00000000005c",
    "student_id_number": "2024-13367",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000005d",
    "user_id": "00000000-0000-4000-b000-00000000005d",
    "student_id_number": "2024-13404",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-00000000005e",
    "user_id": "00000000-0000-4000-b000-00000000005e",
    "student_id_number": "2024-13441",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-00000000005f",
    "user_id": "00000000-0000-4000-b000-00000000005f",
    "student_id_number": "2024-13478",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000060",
    "user_id": "00000000-0000-4000-b000-000000000060",
    "student_id_number": "2024-13515",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000061",
    "user_id": "00000000-0000-4000-b000-000000000061",
    "student_id_number": "2024-13552",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000062",
    "user_id": "00000000-0000-4000-b000-000000000062",
    "student_id_number": "2024-13589",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "ABM",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000063",
    "user_id": "00000000-0000-4000-b000-000000000063",
    "student_id_number": "2024-13626",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "HUMSS",
    "year_level": "1st Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000064",
    "user_id": "00000000-0000-4000-b000-000000000064",
    "student_id_number": "2024-13663",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-ICT",
    "year_level": "2nd Year College",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000065",
    "user_id": "00000000-0000-4000-b000-000000000065",
    "student_id_number": "2024-13700",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "TVL-HE",
    "year_level": "Grade 11",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000066",
    "user_id": "00000000-0000-4000-b000-000000000066",
    "student_id_number": "2024-13737",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "GAS",
    "year_level": "Grade 12",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000067",
    "user_id": "00000000-0000-4000-b000-000000000067",
    "student_id_number": "2024-13774",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Arts & Design",
    "year_level": "1st Year College",
    "status": "APPROVED",
    "rejection_reason": null,
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  },
  {
    "id": "00000000-0000-4000-1100-000000000068",
    "user_id": "00000000-0000-4000-b000-000000000068",
    "student_id_number": "2024-13811",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "Sports Track",
    "year_level": "2nd Year College",
    "status": "PENDING",
    "rejection_reason": null,
    "reviewed_by": null,
    "reviewed_at": null
  },
  {
    "id": "00000000-0000-4000-1100-000000000069",
    "user_id": "00000000-0000-4000-b000-000000000069",
    "student_id_number": "2024-13848",
    "id_image_url": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
    "program": "STEM",
    "year_level": "Grade 11",
    "status": "REJECTED",
    "rejection_reason": "Student ID photo blurry / School year unreadable.",
    "reviewed_by": "11111111-1111-4111-8111-111111111111",
    "reviewed_at": "2026-08-15T10:00:00Z"
  }
];

// 10. MOCK REPORTS (100+ Reports)
export const MOCK_REPORTS: MockReport[] = [
  {
    "id": "00000000-0000-4000-5500-000000000001",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000001",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000002",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000002",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000003",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000003",
    "reason": "Out of stock item was left as active",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000004",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000004",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000005",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000005",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000006",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000006",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000007",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000007",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000008",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000008",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000009",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000009",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000000a",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000000a",
    "reason": "Duplicate store listing detected",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000000b",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000000b",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000000c",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000000c",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000000d",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000000d",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000000e",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000000e",
    "reason": "Misleading product description for handmade craft",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000000f",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000000f",
    "reason": "Duplicate store listing detected",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000010",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000010",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000011",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000011",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000012",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000012",
    "reason": "Out of stock item was left as active",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000013",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000013",
    "reason": "Misleading product description for handmade craft",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000014",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000014",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000015",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000015",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000016",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000016",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000017",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000017",
    "reason": "Out of stock item was left as active",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000018",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000018",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000019",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000019",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000001a",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000001a",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000001b",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000001b",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000001c",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000001c",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000001d",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000001d",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000001e",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000001e",
    "reason": "Duplicate store listing detected",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000001f",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000001f",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000020",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000020",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000021",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000021",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000022",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000022",
    "reason": "Misleading product description for handmade craft",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000023",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000023",
    "reason": "Duplicate store listing detected",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000024",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000024",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000025",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000025",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000026",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000026",
    "reason": "Out of stock item was left as active",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000027",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000027",
    "reason": "Misleading product description for handmade craft",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000028",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000028",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000029",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000029",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000002a",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000002a",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000002b",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000002b",
    "reason": "Out of stock item was left as active",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000002c",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000002c",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000002d",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000002d",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000002e",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000002e",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000002f",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000002f",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000030",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000030",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000031",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000031",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000032",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000032",
    "reason": "Duplicate store listing detected",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000033",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000033",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000034",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000034",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000035",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000035",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000036",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000036",
    "reason": "Misleading product description for handmade craft",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000037",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000037",
    "reason": "Duplicate store listing detected",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000038",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000038",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000039",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000039",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000003a",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000003a",
    "reason": "Out of stock item was left as active",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000003b",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000003b",
    "reason": "Misleading product description for handmade craft",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000003c",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000003c",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000003d",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000003d",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000003e",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000003e",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000003f",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000003f",
    "reason": "Out of stock item was left as active",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000040",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000040",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000041",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000041",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000042",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000042",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000043",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000043",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000044",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000044",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000045",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000045",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000046",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000046",
    "reason": "Duplicate store listing detected",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000047",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000047",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000048",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000048",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000049",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000049",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000004a",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000004a",
    "reason": "Misleading product description for handmade craft",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000004b",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000004b",
    "reason": "Duplicate store listing detected",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000004c",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000004c",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000004d",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000004d",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000004e",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000004e",
    "reason": "Out of stock item was left as active",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000004f",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000004f",
    "reason": "Misleading product description for handmade craft",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000050",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000050",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000051",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000051",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000052",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000052",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000053",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000053",
    "reason": "Out of stock item was left as active",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000054",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000054",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000055",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000055",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000056",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000056",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000057",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000057",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000058",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000058",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000059",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000059",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000005a",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000005a",
    "reason": "Duplicate store listing detected",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000005b",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000005b",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000005c",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000005c",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000005d",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000005d",
    "reason": "Out of stock item was left as active",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-00000000005e",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000005e",
    "reason": "Misleading product description for handmade craft",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-00000000005f",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-00000000005f",
    "reason": "Duplicate store listing detected",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000060",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000060",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000061",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000061",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000062",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000062",
    "reason": "Out of stock item was left as active",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000063",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000063",
    "reason": "Misleading product description for handmade craft",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000064",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000064",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000065",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000065",
    "reason": "Incorrect price listed vs store pickup agreement",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000066",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000066",
    "reason": "Seller did not arrive at designated campus pickup location",
    "status": "PENDING"
  },
  {
    "id": "00000000-0000-4000-5500-000000000067",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000067",
    "reason": "Out of stock item was left as active",
    "status": "DISMISSED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000068",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000068",
    "reason": "Misleading product description for handmade craft",
    "status": "RESOLVED"
  },
  {
    "id": "00000000-0000-4000-5500-000000000069",
    "reporter_id": "22222222-2222-4222-8222-222222222222",
    "target_type": "PRODUCT",
    "target_id": "00000000-0000-4000-e000-000000000069",
    "reason": "Duplicate store listing detected",
    "status": "RESOLVED"
  }
];
