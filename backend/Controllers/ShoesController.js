import axios from "axios";
import { fetchBrandProducts, fetchSearchProducts } from "../api/GetSearch.js";
import { setCache } from "../redis.js";
export const getUserSection = async (req, res) => {
  try {
    const [recentlyViewed, recommendedItems] = await Promise.all([
      fetchBrandProducts("Travis Scott", 1),
      fetchBrandProducts("Jordan", 1),
    ]);

    const data = {
      recentlyViewed: {
        title: "Recently viewed",
        description: "You recently viewed these products.",
        data: recentlyViewed.data.slice(0, 6),
      },
      recommendedItems: {
        title: "Recommended For You",
        description:
          "These products are inspired by your previous browsing history.",
        data: recommendedItems.data.slice(0, 6),
      },
    };

    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getCollectionSection = async (req, res) => {
  try {
    const section = req.params.section;

    const [
      adidas,
      nike,
      balenciaga,
      accessories,
      supreme,
      timberland,
      rickowens,
      controllers,
    ] = await Promise.all([
      fetchBrandProducts("adidas", 1),
      fetchBrandProducts("Nike", 1),
      fetchBrandProducts("Balenciaga", 1),
      fetchSearchProducts("Accessories", 1),
      fetchBrandProducts("Supreme", 1),
      fetchBrandProducts("Timberland", 1),
      fetchBrandProducts("Rick Owens", 1),
      fetchSearchProducts("Controller Wireless", 1),
    ]);

    const data = {
      adidas: {
        title: "Addidas Collection",
        description: "Top styles making waves this season",
        data: adidas.data.slice(0, 6),
      },
      nike: {
        title: "Nike Collection",
        description: "Standout designs for every collection",
        data: nike.data.slice(0, 6),
      },
      balenciaga: {
        title: "Balenciaga Collection",
        description: "Accessories to complete any look",
        data: balenciaga.data.slice(0, 6),
      },
      accessories: {
        title: "Featured Accessories",
        description:
          "'Featured' products are a curated collection of our best selling items",
        data: accessories.data.slice(0, 6),
      },
      supreme: {
        title: "Supreme Collection",
        description:
          "Supreme Collection features a curated selection of iconic streetwear essentials, blending bold style with unparalleled quality",
        data: supreme.data.slice(0, 6),
      },
      timberland: {
        title: "Timberland Collection",
        description:
          "Timberland Collection presents a carefully curated range of rugged essentials, merging outdoor durability with urban style and unmatched craftsmanship",
        data: timberland.data.slice(0, 6),
      },
      rickowens: {
        title: "Rick Owens Collection",
        description:
          "Rick Owens x Collection offers a distinctive blend of avant-garde design and street sophistication, combining cutting-edge fashion with unrivaled quality.",
        data: rickowens.data.slice(0, 6),
      },
      controllers: {
        title: "Controllers Collection",
        description: "Controllers for every taste from ordinary to very rare",
        data: controllers.data.slice(0, 6),
      },
    };

    if (section === "addidas") {
      res.json(data.adidas);
    } else if (section === "nike") {
      res.json(data.nike);
    } else if (section === "balenciaga") {
      res.json(data.balenciaga);
    } else if (section === "accessories") {
      res.json(data.accessories);
    } else if (section === "supreme") {
      res.json(data.supreme);
    } else if (section === "timberland") {
      res.json(data.timberland);
    } else if (section === "rickowens") {
      res.json(data.rickowens);
    } else if (section === "controllers") {
      res.json(data.controllers);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getInstagramSection = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/instagramSection/`;

    const [
      asicsData,
      jordan4Data,
      ounisotkaData,
      newBalanceData,
      lobsterDunkData,
      nikeLd,
      jordan1Retro,
      onitsukaTiger,
      nikeVapor,
      nikeAirMax,
      jordan5First,
      jordan5Second,
      nikeV2K,
      prada,
      nikeSocks,
      newBalanceT500,
      jordan1Travis,
      nikeNocta,
      nikeNoctaSecond,
    ] = await Promise.all([
      fetchSearchProducts(
        "ASICS Novalis Gel-Teremoa Kiko Kostadinov Novalis Java Pewter Purple",
        1
      ),
      fetchSearchProducts("Jordan 4 Retro Military Blue (2024)", 1),
      fetchSearchProducts("Onitsuka Tiger Mexico 66 Kill Bill", 1),
      fetchSearchProducts("New Balance 860v2 Aime Leon Dore Blue", 1),
      fetchSearchProducts("Nike SB Dunk Low Concepts Purple Lobster", 1),
      fetchSearchProducts("Nike LD-1000 SP Stussy Action Green", 1),
      fetchSearchProducts("Jordan 1 Retro Low OG Black Toe (2023)", 1),
      fetchSearchProducts("Onitsuka Tiger Mexico 66 Kill Bill", 1),
      fetchSearchProducts(
        "Nike Vapor Street Off-White Polarized Blue (Women's)",
        1
      ),
      fetchSearchProducts(
        "Nike Air Max 1 '86 OG Big Bubble Air Max Day (2024)",
        1
      ),
      fetchSearchProducts("Jordan 5 Retro A Ma Maniére Dusk", 1),
      fetchSearchProducts("Jordan 5 Retro Off-White Sail", 1),
      fetchSearchProducts(
        "Nike V2K Run Summit White Metallic Silver (Women's)",
        1
      ),
      fetchSearchProducts(
        "Prada Monolith 55mm Pointy Loafer Black Brushed Leather",
        1
      ),
      fetchSearchProducts(
        "Nike Everyday Plus Cushioned Crew Socks (6 Pairs) White",
        1
      ),
      fetchSearchProducts("New Balance T500 Aime Leon Dore White Black", 1),
      fetchSearchProducts(
        "Jordan 1 Retro Low OG SP Travis Scott Canary (Women's)",
        1
      ),
      fetchSearchProducts("Nike NOCTA Glide Drake Bright Crimson", 1),
      fetchSearchProducts(
        "Nike x NOCTA L'Art DRX Long Sleeve Jersey Multicolor",
        1
      ),
    ]);

    const data = [
      {
        image: `${baseUrl}asics.webp`,
        data: [
          asicsData.data.find(
            (el) =>
              el.title ===
              "ASICS Novalis Gel-Teremoa Kiko Kostadinov Novalis Java Pewter Purple"
          ),
        ],
      },
      {
        image: `${baseUrl}jordan4.webp`,
        data: [...jordan4Data.data],
      },
      {
        image: `${baseUrl}ounisotka.webp`,
        data: [
          ounisotkaData.data.find(
            (el) => el.title === "Onitsuka Tiger Mexico 66 Kill Bill"
          ),
        ],
      },
      {
        image: `${baseUrl}newbalance.webp`,
        data: [
          newBalanceData.data.find(
            (el) => el.title === "New Balance 860v2 Aime Leon Dore Blue"
          ),
        ],
      },

      {
        image: `${baseUrl}purpledunk.webp`,
        data: [...lobsterDunkData.data],
      },
      {
        image: `${baseUrl}nikeLd.webp`,
        data: [
          nikeLd.data.find(
            (el) => el.title === "Nike LD-1000 SP Stussy Action Green"
          ),
        ],
      },
      {
        image: `${baseUrl}jordan1old.webp`,
        data: [...jordan1Retro.data],
      },
      {
        image: `${baseUrl}ounisotka2.webp`,
        data: [
          onitsukaTiger.data.find(
            (el) => el.title === "Onitsuka Tiger Mexico 66 Kill Bill"
          ),
        ],
      },
      {
        image: `${baseUrl}nikeVapor.webp`,
        data: [
          nikeVapor.data.find(
            (el) =>
              el.title ===
              "Nike Vapor Street Off-White Polarized Blue (Women's)"
          ),
        ],
      },
      {
        image: `${baseUrl}nikeAirMax.webp`,
        data: [
          nikeAirMax.data.find(
            (el) =>
              el.title === "Nike Air Max 1 '86 OG Big Bubble Air Max Day (2024)"
          ),
        ],
      },
      {
        image: `${baseUrl}jordan5.webp`,
        data: [...jordan5First.data, ...jordan5Second.data],
      },
      {
        image: `${baseUrl}nikev2k.webp`,
        data: [
          nikeV2K.data.find(
            (el) =>
              el.title === "Nike V2K Run Summit White Metallic Silver (Women's)"
          ),
        ],
      },
      {
        image: `${baseUrl}prada.webp`,
        data: [...prada.data, ...nikeSocks.data],
      },

      {
        image: `${baseUrl}newbalance500.webp`,
        data: [
          newBalanceT500.data.find(
            (el) => el.title === "New Balance T500 Aime Leon Dore White Black"
          ),
        ],
      },
      {
        image: `${baseUrl}travis1.webp`,
        data: [
          jordan1Travis.data.find(
            (el) =>
              el.title ===
              "Air Jordan 1 Retro Low OG SP Travis Scott Canary (Women's)"
          ),
        ],
      },
      {
        image: `${baseUrl}nikenokta.webp`,
        data: [...nikeNocta.data, ...nikeNoctaSecond.data],
      },
    ];

    res.json(data);
  } catch (error) {
    console.error("Errors while getting instagram section:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getImageSection = async (req, res) => {
  try {
    const section = req.params.section;
    const baseUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/imageSection/`;
    //add paths
    const firstCardAssets = [
      { img: `${baseUrl}1.webp`, path: "", alt: "Jordan" },
      { img: `${baseUrl}2.webp`, path: "", alt: "Supreme" },
      { img: `${baseUrl}3.webp`, path: "", alt: "Louis Vuitton" },
      { img: `${baseUrl}4.webp`, path: "", alt: "UGG" },
      { img: `${baseUrl}5.webp`, path: "", alt: "Fears Of God Essentials" },
    ];
    const secondCardAssets = [
      { img: `${baseUrl}6.webp`, path: "", alt: "Gifts Under 100" },
      { img: `${baseUrl}7.webp`, path: "", alt: "Gifts Under 250" },
      { img: `${baseUrl}8.webp`, path: "", alt: "Grail Gifts" },
      { img: `${baseUrl}9.webp`, path: "", alt: "Gifts For Him" },
      { img: `${baseUrl}10.webp`, path: "", alt: "Gifts For Her" },
    ];
    const thirdCardAssets = [
      { img: `${baseUrl}12.webp`, path: "", alt: "Hoodies" },
      { img: `${baseUrl}13.webp`, path: "", alt: "Jackets" },
      { img: `${baseUrl}14.webp`, path: "", alt: "HandBags" },
      { img: `${baseUrl}15.webp`, path: "", alt: "Watches" },
      { img: `${baseUrl}16.webp`, path: "", alt: "Lego" },
    ];
    const fourCardAssets = [
      { img: `${baseUrl}17.webp`, path: "", alt: "Nike" },
      { img: `${baseUrl}18.webp`, path: "", alt: "Asics" },
      { img: `${baseUrl}19.webp`, path: "", alt: "New Balance" },
      { img: `${baseUrl}20.webp`, path: "", alt: "Crors" },
      { img: `${baseUrl}21.webp`, path: "", alt: "Adidas" },
    ];
    const data = {
      firstCard: { title: "Popular Brands", data: firstCardAssets },
      secondCard: { title: "Holiday Gift Guides", data: secondCardAssets },
      thirdCard: { title: "Seasonal Favorites", data: thirdCardAssets },
      fourCard: { title: "Browse More Brands", data: fourCardAssets },
    };
    if (section === "popular") {
      res.json(data.firstCard);
    } else if (section === "holiday") {
      res.json(data.secondCard);
    } else if (section === "seasonal") {
      res.json(data.thirdCard);
    } else if (section === "browse") {
      res.json(data.fourCard);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (error) {
    console.error("Errors while getting image section", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getCardSection = async (req, res) => {
  try {
    const section = req.params.section;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/pathSection/`;
    //add paths
    const topAssets = [
      { img: `${baseUrl}holiday.webp`, path: "", alt: "Apparel" },
      { img: `${baseUrl}wallet.webp`, path: "", alt: "Wallets" },
    ];
    const bottAssets = [
      { img: `${baseUrl}dunks.webp`, path: "", alt: "Dunks Retail" },
      { img: `${baseUrl}giftCard.webp`, path: "", alt: "Gift Cards" },
    ];

    const data = {
      firstCard: { sectionName: "top", data: topAssets },
      secondCard: { sectionName: "bott", data: bottAssets },
    };
    if (section === "topCards") {
      res.json(data.firstCard);
    } else if (section === "bottCards") {
      res.json(data.secondCard);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (error) {
    console.error("Errors while getting card section", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getSliderInfo = async (req, res) => {
  try {
    const section = req.params.section;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/Slider/`;
    //add paths

    const getCurrentSliderSet = () => {
      const sliderSets = [
        [
          { img: `${baseUrl}NikeKobe5.webp`, path: "", alt: "Nike Kobe 5" },
          { img: `${baseUrl}SupremeWeek.webp`, path: "", alt: "Supreme" },
          {
            img: `${baseUrl}TrendHodi.webp`,
            path: "",
            alt: "Trending Hoodies",
          },
        ],
        [
          { img: `${baseUrl}NikeKd4.webp`, path: "", alt: "Nike KD 4" },
          { img: `${baseUrl}Aj4.webp`, path: "", alt: "Jordan 4" },
          { img: `${baseUrl}Deals.webp`, path: "", alt: "Hot Deals" },
        ],
      ];

      const today = new Date();

      const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
      );
      const setIndex = dayOfYear % 2;
      return sliderSets[setIndex].map((image) => ({
        img: image.img,
        alt: image.alt,
        path: "",
      }));
    };
    const topSlider = getCurrentSliderSet();

    const bottSlider = [
      { img: `${baseUrl}Design.webp`, path: "", alt: "Designer" },
      { img: `${baseUrl}TNF.webp`, path: "", alt: "TNF" },
    ];
    const data = {
      firstSlider: { sectionName: "top", data: topSlider },
      secondSlider: { sectionName: "bott", data: bottSlider },
    };
    if (section === "topSlider") {
      res.json(data.firstSlider);
    } else if (section === "bottSlider") {
      res.json(data.secondSlider);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (error) {
    console.error("Errors while getting slider info", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getProduct = async (req, res) => {
  try {
    const { title } = req.params;
    const cacheKey = req.originalUrl;

    const response = await axios.get(
      `https://api.sneakersapi.dev/api/v2/products?search=${title}`,
      { headers: { Authorization: process.env.AUTH_KEY } }
    );
    const product = response.data;

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("cacheKey2", cacheKey);

    setCache(cacheKey, JSON.stringify(product));

    res.status(200).json(product);
  } catch (error) {
    console.error("Errors while getting product", error);
    res.status(500).json({ message: "Server Error" });
  }
};
