export interface ProductsModel {
  count: number;
  next: any;
  previous: any;
  results: Result[];
  page_size: number;
}

export interface Result {
  id: number;
  category: number;
  name: string;
  code: string;
  description: string;
  status: string;
}
