
const categories = [
  {
    category_id: 1,
    category_name: "Clothes",
    category_thumbnail:
      "https://assets.kiotfpt.store/clothes_category_kiotfpt.jpeg",
    status_id: 12,
  },
  {
    category_id: 2,
    category_name: "Watch",
    category_thumbnail:
      "https://assets.kiotfpt.store/watch_category_kiotfpt.jpeg",
    status_id: 12,
  },
  {
    category_id: 3,
    category_name: "Car",
    category_thumbnail:
      "https://assets.kiotfpt.store/car_category_kiotfpt.jpeg",
    status_id: 12,
  },
  {
    category_id: 4,
    category_name: "Motorcycles and Bicycles",
    category_thumbnail:
      "https://assets.kiotfpt.store/motorcycles_bicycles_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 5,
    category_name: "Trucks & Trailers",
    category_thumbnail:
      "https://assets.kiotfpt.store/trucks_trailers_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 6,
    category_name: "Mobile Phones",
    category_thumbnail:
      "https://assets.kiotfpt.store/mobile_phones_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 7,
    category_name: "TV",
    category_thumbnail: "https://assets.kiotfpt.store/tv_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 8,
    category_name: "Phone",
    category_thumbnail: "https://assets.kiotfpt.store/smartphone.jpeg",
    status_id: 11,
  },
  {
    category_id: 9,
    category_name: "Electronics",
    category_thumbnail:
      "https://assets.kiotfpt.store/electronics_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 10,
    category_name: "Home & Garden",
    category_thumbnail:
      "https://assets.kiotfpt.store/home_garden_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 11,
    category_name: "Books",
    category_thumbnail:
      "https://assets.kiotfpt.store/books_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 12,
    category_name: "Movies & Music",
    category_thumbnail:
      "https://assets.kiotfpt.store/moview_music_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 13,
    category_name: "Sports & Outdoors",
    category_thumbnail:
      "https://assets.kiotfpt.store/sports_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 14,
    category_name: "Toys & Games",
    category_thumbnail:
      "https://assets.kiotfpt.store/toy_game_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 15,
    category_name: "Beauty & Health",
    category_thumbnail:
      "https://assets.kiotfpt.store/beauty_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 16,
    category_name: "Food & Grocery",
    category_thumbnail:
      "https://assets.kiotfpt.store/food_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 17,
    category_name: "Automotive",
    category_thumbnail:
      "https://assets.kiotfpt.store/automotive_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 18,
    category_name: "Sports and Travel",
    category_thumbnail:
      "https://assets.kiotfpt.store/sports_travel_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 19,
    category_name: "Footwear",
    category_thumbnail:
      "https://assets.kiotfpt.store/footwear_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 20,
    category_name: "Mother and baby",
    category_thumbnail:
      "https://assets.kiotfpt.store/mother_baby_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 21,
    category_name: "Pets",
    category_thumbnail:
      "https://assets.kiotfpt.store/pets_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 22,
    category_name: "Men's Fashion",
    category_thumbnail:
      "https://assets.kiotfpt.store/mens_fashion_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 23,
    category_name: "Women's Fashion",
    category_thumbnail:
      "https://assets.kiotfpt.store/womens_fashion_category_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    category_id: 24,
    category_name: "test 2",
    category_thumbnail: "https://cdn-icons-png.flaticon.com/128/595/595067.png",
    status_id: 11,
  },
];

const brands = [
  {
    brand_id: 1,
    brand_name: "Samsung 3",
    brand_thumbnail: "https://assets.kiotfpt.store/samsung_brand_kiotfpt.jpeg",
    status_id: 12,
  },
  {
    brand_id: 2,
    brand_name: "Apple",
    brand_thumbnail: "https://assets.kiotfpt.store/apple_brand_kiotfpt.jpeg",
    status_id: 12,
  },
  {
    brand_id: 3,
    brand_name: "Mercedes",
    brand_thumbnail: "https://assets.kiotfpt.store/mercedes_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 4,
    brand_name: "Xiaomi",
    brand_thumbnail: "https://assets.kiotfpt.store/xiaomi-store-logo.jpeg",
    status_id: 11,
  },
  {
    brand_id: 5,
    brand_name: "Rolex",
    brand_thumbnail: "https://assets.kiotfpt.store/rolex_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 6,
    brand_name: "Casio",
    brand_thumbnail: "https://assets.kiotfpt.store/casio_brand_kiotfpt.png",
    status_id: 11,
  },
  {
    brand_id: 7,
    brand_name: "Gucci",
    brand_thumbnail: "https://assets.kiotfpt.store/gucci_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 8,
    brand_name: "Dior",
    brand_thumbnail: "https://assets.kiotfpt.store/dior_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 9,
    brand_name: "LG",
    brand_thumbnail: "https://assets.kiotfpt.store/lg_brand_kiotfpt.jpg",
    status_id: 11,
  },
  {
    brand_id: 10,
    brand_name: "Sony",
    brand_thumbnail: "https://assets.kiotfpt.store/sony_brand_kiotfpt.png",
    status_id: 11,
  },
  {
    brand_id: 11,
    brand_name: "HP",
    brand_thumbnail: "https://assets.kiotfpt.store/hp_brand_kiotfpt.jpg",
    status_id: 11,
  },
  {
    brand_id: 12,
    brand_name: "Honda 2",
    brand_thumbnail: "https://assets.kiotfpt.store/honda_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 13,
    brand_name: "Yamaha",
    brand_thumbnail: "https://assets.kiotfpt.store/yamaha_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 14,
    brand_name: "Suzuki",
    brand_thumbnail: "https://assets.kiotfpt.store/suzuki_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 33,
    brand_name: "Levents",
    brand_thumbnail: "https://assets.kiotfpt.store/levents_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 34,
    brand_name: "Toys",
    brand_thumbnail:
      "https://assets.kiotfpt.store/kattie_handmade_brand_kiotfpt.jpeg",
    status_id: 11,
  },
  {
    brand_id: 35,
    brand_name: "test brand",
    brand_thumbnail: "https://cdn-icons-png.flaticon.com/128/595/595067.png",
    status_id: 12,
  },
  {
    brand_id: 36,
    brand_name: "Chus",
    brand_thumbnail: "https://assets.kiotfpt.store/chus_category_kiotfpt.jpeg",
    status_id: 12,
  },
];

const sizes = [
  { size_id: 1, size_value: "S" },
  { size_id: 2, size_value: "M" },
  { size_id: 3, size_value: "L" },
  { size_id: 4, size_value: "XL" },
  { size_id: 5, size_value: "XXL" },
  { size_id: 6, size_value: "128GB" },
  { size_id: 7, size_value: "256GB" },
  { size_id: 8, size_value: "512GB" },
  { size_id: 9, size_value: "1TB" },
  { size_id: 10, size_value: "24 inches" },
  { size_id: 11, size_value: "32 inches" },
  { size_id: 12, size_value: "36 inches" },
  { size_id: 13, size_value: "42 inches" },
  { size_id: 14, size_value: "50 inches" },
  { size_id: 15, size_value: "55 inches" },
  { size_id: 16, size_value: "65 inches" },
  { size_id: 17, size_value: "27 inches" },
  { size_id: 18, size_value: "45 mm" },
  { size_id: 19, size_value: "41 mm" },
  { size_id: 20, size_value: "2" },
  { size_id: 21, size_value: "3" },
  { size_id: 22, size_value: "1000XM5" },
  { size_id: 23, size_value: "10cm x 7cm" },
  { size_id: 24, size_value: "Mini" },
  { size_id: 25, size_value: "50 x 50" },
];
;
const colors = [
  { color_id: 1, color_value: "Grey" },
  { color_id: 2, color_value: "Yellow" },
  { color_id: 3, color_value: "Dark Blue" },
  { color_id: 4, color_value: "Red" },
  { color_id: 5, color_value: "Blue" },
  { color_id: 6, color_value: "White" },
  { color_id: 7, color_value: "Black" },
  { color_id: 8, color_value: "Pink" },
  { color_id: 9, color_value: "Green" },
  { color_id: 10, color_value: "Dark Green" },
  { color_id: 11, color_value: "Brown" },
  { color_id: 12, color_value: "Gold" },
  { color_id: 13, color_value: "Multi Color" },
];

export const fakeData = {
  categories,
  brands,
  sizes,
  colors,
}
