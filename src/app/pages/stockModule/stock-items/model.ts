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
  create_by: CreateBy;
  date_updated: string;
  image: string;
  total_products: number;
  total_estmated_profit: number;
  total_sales_revenue: number;
  total_sales: number;
  total_stock_cost: number;
}

export interface CreateBy {
  url: string;
  username: string;
  email: string;
  is_staff: boolean;
}

export type StockItemSales = Sales[];

export interface Sales {
  id: number;
  stock_item: StockItem;
  quantity_sold: number;
  total_price: string;
  sold_by: number;
  sales_date: string;
  product_price_changed: boolean;
  reason_for_change: string;
}

export interface StockItem {
  id: number;
  product: Product;
  stock: Stock;
  description: string;
  qty: number;
  qty_in: string;
  unit_price: string;
  unit_selling_price: string;
  unit_estmated_profit: string;
  total_estmated_profit: string;
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
  create_by: CreateBy;
  date_updated: string;
  image: string;
  total_products: number;
  total_estmated_profit: number;
}

export interface CreateBy {
  url: string;
  username: string;
  email: string;
  is_staff: boolean;
}
