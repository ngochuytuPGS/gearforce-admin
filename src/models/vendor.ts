export interface IVendor {
  id: string;
  name: string;
  companyName: string;
  login: string;
}

export interface IGetVendorListParams {
  search?: string;
}
