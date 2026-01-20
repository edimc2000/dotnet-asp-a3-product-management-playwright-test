export type ProductPart3 = {
  productId: number;
  name: string;
  description: string;
  price: number;
  createdAt: string | null,
  createdBy: string | null,
  updatedAt: string | null,
  updatedBy: string | null,
  lastAccessedAt: string | null,
  lastAccessedBy: string | null,
};
export type ProductResponsePart3 = ApiResult<ProductPart3[]>;

export interface ApiResult<T> {
    success: boolean;
    message: string;
        data: T;

}
export const seedData: ProductPart3[] =
  [
    {
      "productId": 101,
      "name": "Wool Blazer",
      "description": "Formal navy blue wool blazer with notched lapel and two-button closure",
      "price": 159.99,
      "createdAt": "2024-01-20T09:00:00",
      "createdBy": null,
      "updatedAt": "2024-04-10T11:25:00",
      "updatedBy": null,
      "lastAccessedAt": "2026-01-20T17:15:21.6940242",
      "lastAccessedBy": "_search_api"
    },
    {
      "productId": 102,
      "name": "Cashmere Sweater",
      "description": "Luxurious 100% cashmere crew neck sweater in charcoal gray",
      "price": 199.99,
      "createdAt": "2024-02-15T14:30:00",
      "createdBy": null,
      "updatedAt": "2024-03-25T16:50:00",
      "updatedBy": null,
      "lastAccessedAt": "2024-05-13T10:20:00",
      "lastAccessedBy": "store_assistant"
    },
    {
      "productId": 103,
      "name": "Running Shorts",
      "description": "Lightweight athletic shorts with built-in liner and side pockets",
      "price": 34.5,
      "createdAt": "2024-03-01T11:15:00",
      "createdBy": null,
      "updatedAt": "2024-05-01T09:45:00",
      "updatedBy": null,
      "lastAccessedAt": "2024-05-16T08:30:00",
      "lastAccessedBy": "web_admin"
    }
  ]

