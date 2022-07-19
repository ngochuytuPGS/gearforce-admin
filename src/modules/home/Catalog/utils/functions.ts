import { ICreateProductValidation } from '../../../../models/product';
import { priceRegex } from '../../../../utils';
import { PRODUCT_SALE_PRICE_TYPE_DOLLAR_ID, PRODUCT_SALE_PRICE_TYPE_PERCENTAGE_ID } from './constants';

export const validateProductVendor = (vendorId: string) => {
  if (!vendorId) return 'Vendor is required';

  return '';
};

export const validateProductName = (name: string) => {
  if (!name) return 'Name is required';

  return '';
};

export const validateProductBrand = (brandId: string) => {
  if (!brandId) return 'Brand is required';

  return '';
};

export const validateProductCondition = (conditionId: string) => {
  if (!conditionId) return 'Condition is required';

  return '';
};

export const validateProductImages = (images: Array<string>) => {
  if (!images.length) return 'Images is required';

  return '';
};

export const validateProductCategories = (categories: Array<number>) => {
  if (!categories.length) return 'Categories is required';

  return '';
};

export const validateProductDescription = (description: string) => {
  if (!description) return 'Description is required';

  return '';
};

export const validateProductValidNumber = (numberField: string) => {
  if (!priceRegex.test(numberField)) return 'Price must be in correct format (ex: 1.00, 2.5, 2.50, ...)';
};

export const validateProductPrice = (price: string) => {
  const validNumber = validateProductValidNumber(price);

  if (!price) return 'Price is required';
  else if (validNumber) return validNumber;
  else if (+price <= 0) return 'Price must be greater than 0';

  return '';
};

export const validateProductSalePrice = (price: string, salePrice: string, salePriceType: string) => {
  const validNumber = validateProductValidNumber(salePrice);
  if (!salePrice) return 'Discount is required';
  else if (validNumber) return validNumber;
  else if (+salePrice <= 0) return 'Discount must be greater than 0';
  else if (salePriceType === PRODUCT_SALE_PRICE_TYPE_PERCENTAGE_ID) {
    if (+salePrice > 100) return 'Discount must be less than 100';
  } else if (salePriceType === PRODUCT_SALE_PRICE_TYPE_DOLLAR_ID) {
    if (+salePrice >= +price) return 'Discount must be less than price';
  }

  return '';
};

export const validateProductQuantity = (quantity: string) => {
  const validNumber = validateProductValidNumber(quantity);

  if (!quantity) return 'Quantity is required';
  else if (validNumber) return validNumber;
  else if (+quantity <= 0) return 'Quantity must be greater than 0';

  return '';
};

export const validateProductShippingToZonePrice = (shippingToZonePrice: string) => {
  const validNumber = validateProductValidNumber(shippingToZonePrice);

  if (!shippingToZonePrice) return 'Shipping price is required';
  else if (validNumber) return validNumber;

  return '';
};

export const validateCreateProduct = (values: ICreateProductValidation) => {
  return Object.values(values).every((value) => value === '');
};
