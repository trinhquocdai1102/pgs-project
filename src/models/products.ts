export interface IProducts {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: string;
  amount: string;
  vendor: string;
  arrivalDate: string;
  checked?: boolean;
  delete?: boolean;
  enabled?: string;
}

export interface IProductsFilter {
  search?: string;
  category?: string;
  stock_status?: string;
  search_type?: string;
  availability?: string;
  vendor?: string;
}

export interface ProductItemWithUpdateButton {
  id: string;
  price: string;
  amount: string;
}

export interface Category {
  id: string;
  parentId: string;
  name: string;
  path: string;
  pos: string;
}

export interface Brand {
  id: string | number;
  name: string;
}

export interface Vendor {
  id: string | number;
  login: string;
  companyName: string;
  name: string;
}

export interface Condition {
  id: string | null;
  value: string | null;
  name: string;
}

export interface Shipping {
  id: string;
  zone_name?: string;
  price: string;
}

export interface Memberships {
  label: string;
  value: number | null;
}

export interface Images {
  id: string;
  file: string;
  thumbs: string[];
}

export interface CreateProduct {
  id: string;
  vendor_id: Vendor;
  name: string;
  brand_id: Brand;
  condition_id: Condition;
  sku?: string;
  images: Images[];
  imagesOrder: string[];
  imagesUpload: File[];
  remove_images: number[];
  categories: number[];
  description: any;
  enabled?: number;
  participate_sale: number;
  memberships?: number[] | null;
  tax_exempt?: number;
  price: string;
  sale_price_type?: string;
  sale_price?: string;
  arrival_date?: string;
  quantity: string;
  shipping: Shipping[];
  og_tags_type?: string;
  og_tags?: string;
  meta_description?: string;
  meta_desc_type?: string;
  meta_keywords?: string;
  product_page_title?: string;
  facebook_marketing_enabled?: number;
  google_feed_enabled?: number;
}
