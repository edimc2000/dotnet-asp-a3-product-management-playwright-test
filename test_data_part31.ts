import { ProductPart3 } from "./test_data_part3";

export type ProductAddPart3 = {
  name: string;
  description: string;
  price: number;
  };
export type ProductResponsePart3 = ApiResult<ProductPart3[]>;

export interface ApiResult<T> {
    success: boolean;
    message: string;
        data: T;

}

export const testAddProducts : ProductAddPart3[] = [
  {
    name: "Cotton Blazer",
    description: "Formal navy blue cotton blazer with notched lapel and two-button closure",
    price: 159.99
  },
  {
    name: "Leather Jacket",
    description: "Genuine black leather motorcycle jacket with zipper closure and multiple pockets",
    price: 249.99
  },
  {
    name: "Silk Scarf",
    description: "100% pure silk scarf with floral pattern, 36x36 inches",
    price: 89.50
  },
  {
    name: "Denim Jeans",
    description: "Slim fit dark wash jeans with stretch fabric and distressed details",
    price: 79.99
  },
  {
    name: "Winter Parka",
    description: "Heavy-duty waterproof parka with faux fur hood and thermal insulation",
    price: 299.99
  },
  {
    name: "Linen Shirt",
    description: "Breathable white linen button-down shirt with long sleeves",
    price: 64.95
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioning technology and breathable mesh",
    price: 129.99
  },
  {
    name: "Business Suit",
    description: "Two-piece charcoal gray wool suit with matching trousers",
    price: 399.99
  },
  {
    name: "Knit Beanie",
    description: "Soft acrylic knit beanie in assorted colors, one size fits all",
    price: 19.99
  },
  {
    name: "Swim Trunks",
    description: "Quick-dry swim trunks with drawstring waist and side stripes",
    price: 34.99
  },
  {
    name: "Puffer Vest",
    description: "Lightweight insulated vest with water-resistant finish",
    price: 69.99
  },
  {
    name: "Evening Gown",
    description: "Long black velvet evening gown with off-shoulder design",
    price: 279.99
  },
  {
    name: "Hiking Boots",
    description: "Waterproof leather hiking boots with ankle support and grip soles",
    price: 159.99
  },
  {
    name: "Cashmere Scarf",
    description: "Extra-long cashmere scarf in camel color, exceptionally soft",
    price: 149.99
  },
  {
    name: "Yoga Pants",
    description: "High-waisted yoga pants with moisture-wicking fabric",
    price: 54.99
  },
  {
    name: "Trench Coat",
    description: "Classic beige trench coat with double-breasted front and belt",
    price: 199.99
  }
];




export const validationTestData: {
  [key: string]: {
    testCase: string;
    data: ProductAddPart3;
    expectedStatus: number;
    description: string;
  }
} = {
   // Name validation tests
  emptyName: {
    testCase: "TC 301: Validate name required field - empty name",
    data: {
      name: "",
      description: "Valid description for testing",
      price: 99.99
    },
    expectedStatus: 400,
    description: "Empty name should fail validation"
  },

  nameTooShort: {
    testCase: "TC 302: Validate name length - less than 2 characters",
    data: {
      name: "A", // 1 character
      description: "Valid description for testing",
      price: 99.99
    },
    expectedStatus: 400,
    description: "Name with 1 character should fail"
  },

  nameTooLong: {
    testCase: "TC 303: Validate name length - exceeds 100 characters",
    data: {
      name: "A".repeat(101), // 101 characters
      description: "Valid description for testing",
      price: 99.99
    },
    expectedStatus: 400,
    description: "Name with 101 characters should fail"
  },

  // Description validation tests
  emptyDescription: {
    testCase: "TC 304: Validate description required field - empty description",
    data: {
      name: "Valid Product Name",
      description: "",
      price: 99.99
    },
    expectedStatus: 400,
    description: "Empty description should fail validation"
  },

  descriptionTooShort: {
    testCase: "TC 305: Validate description length - less than 2 characters",
    data: {
      name: "Valid Product Name",
      description: "A", // 1 character
      price: 99.99
    },
    expectedStatus: 400,
    description: "Description with 1 character should fail"
  },

  descriptionTooLong: {
    testCase: "TC 306: Validate description length - exceeds 100 characters",
    data: {
      name: "Valid Product Name",
      description: "A".repeat(101), // 101 characters
      price: 99.99
    },
    expectedStatus: 400,
    description: "Description with 101 characters should fail"
  },

  // Price validation tests
  negativePrice: {
    testCase: "TC 307: Validate price range - negative value",
    data: {
      name: "Valid Product Name",
      description: "Valid product description",
      price: -1.00
    },
    expectedStatus: 400,
    description: "Negative price should fail validation"
  },

  priceTooHigh: {
    testCase: "TC 308: Validate price range - exceeds 999,999",
    data: {
      name: "Valid Product Name",
      description: "Valid product description",
      price: 1000000.00 // Exceeds 999,999
    },
    expectedStatus: 400,
    description: "Price exceeding 999,999 should fail"
  },

  unparsablePrice: {
    testCase: "TC 309: Validate price format - unparsable string",
    data: {
      name: "Valid Product Name",
      description: "Valid product description",
      price: "not-a-number" as any // Type assertion for testing
    },
    expectedStatus: 400,
    description: "Non-numeric price should fail"
  },

  missingPrice: {
    testCase: "TC 310: Validate price required field - missing price",
    data: {
      name: "Valid Product Name",
      description: "Valid product description",
      // price is intentionally omitted
    } as any, // Type assertion since price is missing
    expectedStatus: 400,
    description: "Missing price field should fail"
  },

  // All fields invalid
  allFieldsInvalid: {
    testCase: "TC 311: Validate all fields - multiple validation failures",
    data: {
      name: "", // Empty name
      description: "A", // Too short description
      price: -1000000.00 // Negative and exceeds maximum
    },
    expectedStatus: 400,
    description: "All fields invalid should fail with multiple errors"
  },

  // Edge cases for price
  zeroPrice: {
    testCase: "Edge case: Price at minimum boundary (0)",
    data: {
      name: "Free Product",
      description: "Product with zero price",
      price: 0
    },
    expectedStatus: 200,
    description: "Zero price should be valid (in range)"
  },

  maxPrice: {
    testCase: "Edge case: Price at maximum boundary (999,999)",
    data: {
      name: "Expensive Product",
      description: "Product at maximum price",
      price: 999999.00
    },
    expectedStatus: 200,
    description: "Price at maximum boundary should be valid"
  },

  // Edge cases for name and description length
  minNameLength: {
    testCase: "Edge case: Name at minimum length (2 characters)",
    data: {
      name: "AB", // Exactly 2 characters
      description: "Valid description",
      price: 50.00
    },
    expectedStatus: 200,
    description: "Name with exactly 2 characters should be valid"
  },

  maxNameLength: {
    testCase: "Edge case: Name at maximum length (100 characters)",
    data: {
      name: "A".repeat(100), // Exactly 100 characters
      description: "Valid description",
      price: 50.00
    },
    expectedStatus: 200,
    description: "Name with exactly 100 characters should be valid"
  },

  minDescriptionLength: {
    testCase: "Edge case: Description at minimum length (2 characters)",
    data: {
      name: "Valid Product",
      description: "AB", // Exactly 2 characters
      price: 50.00
    },
    expectedStatus: 200,
    description: "Description with exactly 2 characters should be valid"
  },

  maxDescriptionLength: {
    testCase: "Edge case: Description at maximum length (100 characters)",
    data: {
      name: "Valid Product",
      description: "A".repeat(100), // Exactly 100 characters
      price: 50.00
    },
    expectedStatus: 200,
    description: "Description with exactly 100 characters should be valid"
  },



};

export const malformedJSON = ` data: {
      name: "Valid Product",
      description: "A".repeat(100), // Exactly 100 characters
      price: 50.00
    ,`