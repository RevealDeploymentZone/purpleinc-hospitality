export const cafeData = {
  name: "Krystal Cafe",
  tagline: "Where Every Meal Tells a Story",
  address: "Near Heera Grand, Charbagh, Lucknow, UP 226004",
  phone: "+91 98765 43211",
  email: "hello@krystalcafe.in",
  whatsapp: "+919876543211",
  hours: "11:00 AM – 11:00 PM (All Days)",
  rating: 4.4,
  reviewCount: 1240,
};

export const menuCategories = [
  { id: "starters", label: "Starters", icon: "🍢" },
  { id: "soups", label: "Soups", icon: "🍲" },
  { id: "chinese", label: "Chinese Mains", icon: "🥢" },
  { id: "northindian", label: "North Indian Mains", icon: "🍛" },
  { id: "breads", label: "Breads & Rice", icon: "🍚" },
  { id: "beverages", label: "Beverages", icon: "🥤" },
  { id: "desserts", label: "Desserts", icon: "🍮" },
];

export const menuItems = [
  { id: "1", category: "starters", name: "Paneer Tikka", price: 280, veg: true, spice: 2, desc: "Cottage cheese marinated in yoghurt & spices, char-grilled to perfection.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
  { id: "2", category: "starters", name: "Chicken 65", price: 320, veg: false, spice: 3, desc: "Crispy deep-fried chicken with South Indian spices, curry leaves & green chillies.", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&q=80" },
  { id: "3", category: "starters", name: "Crispy Corn", price: 220, veg: true, spice: 1, desc: "Sweet corn tossed with herbs, spices and a hint of lime.", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
  { id: "4", category: "soups", name: "Hot & Sour Soup", price: 180, veg: true, spice: 2, desc: "Classic Chinese soup with vegetables, vinegar & white pepper.", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { id: "5", category: "soups", name: "Chicken Sweet Corn Soup", price: 200, veg: false, spice: 1, desc: "Silky chicken broth with sweet corn kernels.", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { id: "6", category: "chinese", name: "Veg Fried Rice", price: 260, veg: true, spice: 1, desc: "Wok-tossed rice with vegetables, soy sauce & sesame oil.", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80" },
  { id: "7", category: "chinese", name: "Chilli Chicken", price: 380, veg: false, spice: 3, desc: "Tender chicken tossed in fiery chilli-garlic sauce with capsicum & onions.", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80" },
  { id: "8", category: "chinese", name: "Hakka Noodles", price: 280, veg: true, spice: 2, desc: "Stir-fried noodles with seasonal vegetables in authentic Hakka style.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80" },
  { id: "9", category: "northindian", name: "Butter Chicken", price: 440, veg: false, spice: 2, desc: "Slow-cooked chicken in a velvety tomato-butter-cream gravy.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80" },
  { id: "10", category: "northindian", name: "Paneer Lababdar", price: 360, veg: true, spice: 2, desc: "Paneer cubes in a rich onion-tomato gravy with kasuri methi.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
  { id: "11", category: "northindian", name: "Lucknowi Biryani", price: 480, veg: false, spice: 2, desc: "Fragrant long-grain rice slow-cooked with tender mutton in Nawabi dum style.", image: "https://images.unsplash.com/photo-1563379091339-03246963d14e?w=400&q=80" },
  { id: "12", category: "breads", name: "Butter Naan", price: 60, veg: true, spice: 0, desc: "Soft leavened bread baked in a tandoor and brushed with butter.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80" },
  { id: "13", category: "beverages", name: "Masala Chai", price: 80, veg: true, spice: 1, desc: "Freshly brewed tea with ginger, cardamom & spices.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80" },
  { id: "14", category: "beverages", name: "Mango Lassi", price: 150, veg: true, spice: 0, desc: "Thick, refreshing yoghurt-based mango drink.", image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80" },
  { id: "15", category: "desserts", name: "Gulab Jamun", price: 120, veg: true, spice: 0, desc: "Soft milk-solid dumplings soaked in rose-flavoured sugar syrup.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
  { id: "16", category: "desserts", name: "Kulfi Falooda", price: 180, veg: true, spice: 0, desc: "Traditional Indian ice cream with rose syrup, falooda sev & basil seeds.", image: "https://images.unsplash.com/photo-1557142796-9fd8d73acb97?w=400&q=80" },
];

export const cafeReviews = [
  { name: "Neha Gupta", rating: 5, text: "Best Butter Chicken in Lucknow! The ambience is cozy and the staff is so warm.", date: "Jan 2025", avatar: "NG" },
  { name: "Arjun Khanna", rating: 5, text: "Came for the biryani, stayed for the desserts. The kulfi falooda is an absolute must!", date: "Dec 2024", avatar: "AK" },
  { name: "Sneha Patel", rating: 4, text: "Great place for a family dinner. The Chinese menu is surprisingly authentic.", date: "Nov 2024", avatar: "SP" },
];
