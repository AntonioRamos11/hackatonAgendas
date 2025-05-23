export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitCost: number;
  description?: string;
}

export interface CreateInventoryItem {
  name: string;
  category: string;
  quantity: number;
  unitCost: number;
  description?: string;
}

export interface UpdateInventoryItem {
  name?: string;
  category?: string;
  quantity?: number;
  unitCost?: number;
  description?: string;
}