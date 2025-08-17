import { get } from "./api";
import type { MenuItem, ProcessedMenuItem, MenuCategory } from "../index.types";

// Constants
const BASE_ENDPOINT = "/menu";

// Define custom category order - modify this array to change the order
const CATEGORY_ORDER = [
  "Aguas",
  "Agua saborizada",
  "Energizante",
  "Gaseosas",
  "Jugos y Licuados",
  "Cerveza artesanal",
  "Cervezas",
  "Tragos",
  "Vinos",
  "Promos",
];

// Helper function to process raw menu items from backend
const processMenuItem = (item: MenuItem): ProcessedMenuItem => {
  return {
    id: item.id,
    category: item.categoria,
    name: item.producto.trim(), // Remove extra spaces
    price: parseFloat(item.precio.replace(/[^\d.-]/g, "")) || 0, // Remove non-numeric characters and convert to number
    description: item.descripcion || "Sin descripción disponible", // Handle empty descriptions
    imageUrl: item.img || "", // Handle empty image URLs
    stock: parseInt(item.stock) || 0, // Convert string to number, default to 0 if invalid
  };
};

// Get all menu items (raw format from backend)
export const getAllItems = async (): Promise<MenuItem[]> => {
  return get<MenuItem[]>(BASE_ENDPOINT);
};

// Get all processed menu items
export const getAllProcessedItems = async (): Promise<ProcessedMenuItem[]> => {
  const rawItems = await getAllItems();
  return rawItems.map((item) => processMenuItem(item));
};

// Get all categories with their processed items
export const getCategories = async (): Promise<MenuCategory[]> => {
  const processedItems = await getAllProcessedItems();

  // Group items by category
  const categoriesMap = new Map<string, ProcessedMenuItem[]>();

  processedItems.forEach((item) => {
    if (!categoriesMap.has(item.category)) {
      categoriesMap.set(item.category, []);
    }
    categoriesMap.get(item.category)!.push(item);
  });

  // Convert map to array of categories
  const categories = Array.from(categoriesMap.entries()).map(
    ([name, items]) => ({
      name,
      items: items.sort((a, b) => a.name.localeCompare(b.name)), // Sort items alphabetically
    })
  );

  // Sort categories by custom order, then alphabetically for unlisted categories
  return categories.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a.name);
    const indexB = CATEGORY_ORDER.indexOf(b.name);

    // If both categories are in the custom order, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only one category is in the custom order, prioritize it
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    // If neither category is in the custom order, sort alphabetically
    return a.name.localeCompare(b.name);
  });
};

// Get items by category
export const getItemsByCategory = async (
  categoryName: string
): Promise<ProcessedMenuItem[]> => {
  const categories = await getCategories();
  const category = categories.find((cat) => cat.name === categoryName);
  return category ? category.items : [];
};

// Get a single menu item by ID
export const getItemById = async (
  id: string
): Promise<ProcessedMenuItem | null> => {
  const items = await getAllProcessedItems();
  return items.find((item) => item.id === id) || null;
};
