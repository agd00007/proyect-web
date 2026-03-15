export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // LIPSTICK
        {
          id: 1,
          product_type: "lipstick",
          name: "Matte Red Lipstick",
          brand: "Maybelline",
          price: 12.99,
          description: "Long-lasting matte lipstick with intense red pigment.",
          image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
        },
        {
          id: 2,
          product_type: "lipstick",
          name: "Nude Cream Lipstick",
          brand: "MAC",
          price: 19.99,
          description: "Smooth creamy lipstick with a natural nude finish.",
          image: "https://images.pexels.com/photos/3373748/pexels-photo-3373748.jpeg",
        },
        {
          id: 3,
          product_type: "lipstick",
          name: "Pink Velvet Lipstick",
          brand: "L'Oréal",
          price: 14.5,
          description: "Soft velvet lipstick with vibrant pink color.",
          image: "https://images.pexels.com/photos/2693644/pexels-photo-2693644.jpeg",
        },

        // LIP GLOSS
        {
          id: 4,
          product_type: "lip-gloss",
          name: "Crystal Shine Lip Gloss",
          brand: "NYX",
          price: 9.99,
          description: "Glossy lip shine that adds volume and sparkle.",
          image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg",
        },
        {
          id: 5,
          product_type: "lip-gloss",
          name: "Peach Glow Lip Gloss",
          brand: "Dior",
          price: 22.0,
          description: "Peach toned gloss that hydrates and brightens lips.",
          image: "https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg",
        },

        // FOUNDATION
        {
          id: 6,
          product_type: "foundation",
          name: "Natural Finish Foundation",
          brand: "Estée Lauder",
          price: 34.99,
          description: "Lightweight foundation for a natural skin finish.",
          image: "https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg",
        },
        {
          id: 7,
          product_type: "foundation",
          name: "Matte Coverage Foundation",
          brand: "Maybelline",
          price: 15.99,
          description: "High coverage matte foundation for oily skin.",
          image: "https://images.pexels.com/photos/3373738/pexels-photo-3373738.jpeg",
        },

        // BLUSH
        {
          id: 8,
          product_type: "blush",
          name: "Soft Pink Blush",
          brand: "MAC",
          price: 21.5,
          description: "Soft pink blush that gives a natural glow.",
          image: "https://images.pexels.com/photos/2693643/pexels-photo-2693643.jpeg",
        },
        {
          id: 9,
          product_type: "blush",
          name: "Coral Glow Blush",
          brand: "Charlotte Tilbury",
          price: 29.99,
          description: "Warm coral blush perfect for summer makeup.",
          image: "https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg",
        },

        // MASCARA
        {
          id: 10,
          product_type: "mascara",
          name: "Volume Lash Mascara",
          brand: "Maybelline",
          price: 11.99,
          description: "Mascara designed to give extreme lash volume.",
          image: "https://images.pexels.com/photos/3373726/pexels-photo-3373726.jpeg",
        },
        {
          id: 11,
          product_type: "mascara",
          name: "Waterproof Black Mascara",
          brand: "Dior",
          price: 27.0,
          description: "Waterproof mascara with deep black color.",
          image: "https://images.pexels.com/photos/3737594/pexels-photo-3737594.jpeg",
        },

        // EYESHADOW
        {
          id: 12,
          product_type: "eyeshadow",
          name: "Nude Eyeshadow Palette",
          brand: "Urban Decay",
          price: 39.99,
          description: "Neutral shades palette for everyday makeup.",
          image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
        },
        {
          id: 13,
          product_type: "eyeshadow",
          name: "Smokey Eyes Palette",
          brand: "Huda Beauty",
          price: 44.99,
          description: "Dark tones palette perfect for smokey eyes.",
          image: "https://images.pexels.com/photos/3373737/pexels-photo-3373737.jpeg",
        },
      ]);
    }, 500);
  });
}