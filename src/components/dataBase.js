export const Products = [
  {
    productId: 1,
    productIdPage: "cod_80001",
    productCategoryTypeId: 1,
    productName: "Aceite de oliva x 500cc",
    productBrand: "Olivos del Valle",
    productCount: 1,
    productPrice: 740.88,
    productImage:
      "https://pedidosnurity.com/assets/img/productos/633656da7a79a.png",
    productDescription:
      "Excelente aceite, fabricado con los mejores olivos,aceite de primer prensado",
  },
  {
    productId: 2,
    productIdPage: "cod_80002",
    productCategoryTypeId: 1,
    productName: "Aceite de oliva x 1lt (pack por 6)",
    productBrand: "Olivos del Valle",
    productCount: 1,
    productPrice: 8102.64,
    productImage: "https://pedidosnurity.com/assets/img/productos/63365725749d3.png",
    productDescription: "Excelente aceite, fabricado con los mejores olivos,aceite de primer prensado",
  },
  {
    productId: 3,
    productIdPage: "cod_80008",
    productCategoryTypeId: 1,
    productName: "Aceite de coco 100ml",
    productBrand: "Valle Organico",
    productCount: 1,
    productPrice: 835.38,
    productImage: "https://pedidosnurity.com/assets/img/productos/62b38d3996ebf.png",
    productDescription: "Aceite de coco puro",
  },
  {
    productId: 10,
    productIdPage: "cod_1109",
    productCategoryTypeId: 2,
    productName: "Copos azucarados 2,5kg",
    productBrand: "NutriFood",
    productCount: 0,
    productPrice: 4347.98,
    productImage:
      "https://pedidosnurity.com/assets/img/productos/62b1ac520a53a.png",
    productDescription:
      "La mejor seleccion de cereales con el toque justo de azucar",
  },
  {
    productId: 11,
    productIdPage: "cod_11024",
    productCategoryTypeId: 2,
    productName: "Tutucas azucaradas 2kg",
    productBrand: "Dulcita",
    productCount: 1,
    productPrice: 2285.01,
    productImage:
      "https://pedidosnurity.com/assets/img/productos/62b1afa2b1456.png",
    productDescription:
      "La tutucas mas ricas del país",
  },
  {
    productId: 12,
    productIdPage: "cod_11041",
    productCategoryTypeId: 2,
    productName: "Barra mani y miel 20gr (caja x18 uds)",
    productBrand: "Timon Cruz",
    productCount: 1,
    productPrice: 2575.30,
    productImage:
      "https://pedidosnurity.com/assets/img/productos/62b1b9e01f1e2.png",
    productDescription:
      "Barra nutritiva y riquisima",
  }
];

export const CategoryTable = [
  {
    categoryId: 1,
    categoryName: "Aceites",
    categoryObject: Products.filter(
      (product) => product.productCategoryTypeId === 1
    ),
  },
  {
    categoryTypeId: 2,
    categoryName: "Cereales",
    categoryObject: Products.filter(
      (product) => product.productCategoryTypeId === 2
    ),
  },
];
