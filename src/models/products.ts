export interface IProducts {
  check: boolean;
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  amount: number;
  vendor: string;
  arrivalDate: string;
  checked?: boolean;
}

export interface IProductsFilter {
  searchKey: string;
  category: string;
  stockStatus: string;
  searchIn: string[];
  availability: string;
  vendor: string;
}
