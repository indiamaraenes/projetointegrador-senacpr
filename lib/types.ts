export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  original_price: number | null
  image_url: string | null
  category_id: string | null
  stock: number
  is_featured: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  total: number
  shipping_address: string | null
  shipping_city: string | null
  shipping_state: string | null
  shipping_zip: string | null
  payment_method: string | null
  notes: string | null
  created_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  created_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string | null
  content: string
  rating: number
  is_active: boolean
  created_at: string
}

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}
