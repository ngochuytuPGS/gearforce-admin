export interface IProduct {
  id: string;
  sku: string;
  price: string;
  enabled: string;
  weight: string;
  arrivalDate: string;
  name: string;
  description: string;
  created: string;
  vendor: string;
  vendorID: string;
  amount: string;
  participateSale: string;
  category: string;
  condition: string;
}

export interface ICategory {
  id: string;
  parentId: string;
  name: string;
  path: string;
  pos: string;
}

export interface IStock {
  id: string;
  name: string;
}

export interface IAvailability {
  id: string;
  name: string;
}

export interface ISearchIn {
  id: string;
  name: string;
}

export interface IGetProductFilterParams {
  availability: string;
  category: string;
  search: string;
  search_type: string;
  stock_status: string;
  vendor: string;
}

export interface IGetProductSortParams {
  sort: string;
  order_by: 'ASC' | 'DESC' | '';
}

export interface IGetProductPagingParams {
  page: number;
  count: number;
}

export interface IGetProductParams extends IGetProductFilterParams, IGetProductSortParams, IGetProductPagingParams {}

export interface IDeleteProductParams {
  params: Array<{ id: string; delete: 1 }>;
}

export interface IBrand {
  id: string | null;
  name: string;
}

export interface ICondition {
  id: number;
  name: string;
}

export interface IShipping {
  id: string | null;
  name: string;
}

export interface ICreateProductShippingToZone {
  id: number;
  price: string;
}

export interface ICreateProductParams {
  images: Array<File>;
  productDetail: {
    vendor_id: string;
    name: string;
    brand_id: string;
    condition_id: string;
    categories: Array<number>;
    description: string;
    enabled: number;
    memberships: Array<number>;
    shipping_to_zones: Array<ICreateProductShippingToZone>;
    tax_exempt: number;
    price: string;
    sale_price_type: string;
    arrival_date: string;
    inventory_tracking: number;
    quantity: string;
    sku: string;
    participate_sale: number;
    sale_price: string;
    og_tags_type: string;
    og_tags: string;
    meta_desc_type: string;
    meta_description: string;
    meta_keywords: string;
    product_page_title: string;
    facebook_marketing_enabled: number;
    google_feed_enabled: number;
    imagesOrder: Array<string>;
    deleted_images: Array<number>;
  };
}

export interface IUpdateProductParams extends ICreateProductParams {
  productDetail: ICreateProductParams['productDetail'] & {
    id: string;
  };
}

export interface ICreateProductValidation {
  vendor: string | null;
  name: string | null;
  brand_id: string | null;
  condition_id: string | null;
  images: string | null;
  categories: string | null;
  description: string | null;
  price: string | null;
  sale_price: string | null;
  quantity: string | null;
  shipping_to_zones: string | null;
}

export interface IGetProductDetailParams {
  id: string;
}

export interface IProductDetailShippingToZone {
  id: number;
  price: string;
  zone_name: string;
}

export interface IProductDetailImage {
  file: string;
  id: string;
  thumbs: Array<string>;
}

export interface IProductDetailCategory {
  category_id: string;
  name: string;
}

export interface IProductDetail {
  shipping_to_zones: any;
  arrival_date: string;
  brand_id: string;
  categories: Array<IProductDetailCategory>;
  cleanURL: string;
  code: string;
  condition_id: string;
  description: string;
  enabled: string;
  facebook_marketing_enabled: string;
  google_feed_enabled: string;
  id: string;
  images: Array<IProductDetailImage>;
  inventory_tracking: string;
  memberships: Array<{ membership_id: string }>;
  meta_desc_type: string;
  meta_description: string;
  meta_keywords: string;
  name: string;
  og_tags: string;
  og_tags_type: string;
  participate_sale: string;
  price: string;
  product_page_title: string;
  quantity: string;
  sale_price: string;
  sale_price_type: string;
  shipping: Array<IProductDetailShippingToZone>;
  sku: string;
  sort_description: string;
  tax_exempt: string;
  vendor_id: string;
  weight: string;
}

export interface ISalePriceType {
  id: string;
  name: string;
}

export interface IOpenGraphTagsType {
  id: string;
  name: string;
}

export interface IMetaDescriptionType {
  id: string;
  name: string;
}

export interface IExportProductCsvParams {
  id: Array<string>;
}
