export interface StockModel {
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
