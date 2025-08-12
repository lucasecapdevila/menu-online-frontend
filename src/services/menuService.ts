import { ApiService } from './api';
import type { MenuItem, ProcessedMenuItem, MenuCategory } from '../index.types';



// Menu service class
export class MenuService {
  private static readonly BASE_ENDPOINT = '/menu';

  // Helper function to process raw menu items from backend
  private static processMenuItem(item: MenuItem): ProcessedMenuItem {
    return {
      id: item.id,
      category: item.categoria,
      name: item.producto.trim(), // Remove extra spaces
      price: parseFloat(item.precio.replace(/[^\d.-]/g, '')) || 0, // Remove non-numeric characters and convert to number
      description: item.descripcion || 'Sin descripción disponible', // Handle empty descriptions
      imageUrl: item.img || '', // Handle empty image URLs
      available: true // Assuming all items are available unless specified otherwise
    };
  }

  // Get all menu items (raw format from backend)
  static async getAllItems(): Promise<MenuItem[]> {
    return ApiService.get<MenuItem[]>(`${this.BASE_ENDPOINT}`);
  }

  // Get all processed menu items
  static async getAllProcessedItems(): Promise<ProcessedMenuItem[]> {
    const rawItems = await this.getAllItems();
    return rawItems.map(item => this.processMenuItem(item));
  }

  // Get all categories with their processed items
  static async getCategories(): Promise<MenuCategory[]> {
    const processedItems = await this.getAllProcessedItems();
    
    // Group items by category
    const categoriesMap = new Map<string, ProcessedMenuItem[]>();
    
    processedItems.forEach(item => {
      if (!categoriesMap.has(item.category)) {
        categoriesMap.set(item.category, []);
      }
      categoriesMap.get(item.category)!.push(item);
    });

    // Convert map to array of categories
    return Array.from(categoriesMap.entries()).map(([name, items]) => ({
      name,
      items: items.sort((a, b) => a.name.localeCompare(b.name)) // Sort items alphabetically
    })).sort((a, b) => a.name.localeCompare(b.name)); // Sort categories alphabetically
  }

  // Get items by category
  static async getItemsByCategory(categoryName: string): Promise<ProcessedMenuItem[]> {
    const categories = await this.getCategories();
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.items : [];
  }

  // Get a single menu item by ID
  static async getItemById(id: string): Promise<ProcessedMenuItem | null> {
    const items = await this.getAllProcessedItems();
    return items.find(item => item.id === id) || null;
  }
}
