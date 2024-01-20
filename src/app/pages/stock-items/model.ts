export interface StockItemsModel {
  id: number;
  product: Product;
  stock: Stock;
  description: string;
  qty: number;
  qty_in: string;
  unit_price: string;
  unit_selling_price: string;
  unit_estmated_profit: string;
  total_estmated_profit?: string;
  total_selling_price: string;
  status: string;
  date_created: string;
  date_updated: string;
}

export interface Product {
  id: number;
  category: number;
  name: string;
  code: string;
  description: string;
  status: string;
}

export interface Stock {
  id: number;
  name: string;
  status: string;
  date_created: string;
  date_updated: string;
}
