import {
  getProducts as getProductsService,
} from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
      const { page = 1, limit = 10, sort, category, availability } = req.query;

      // Construir el query de filtrado
      const query = {};
      if (category) query.category = category;
      if (availability) query.stock = { $gt: 0 }; // Filtra productos con stock > 0

      // Opciones de paginación y ordenamiento
      const options = {
          page: parseInt(page),
          limit: parseInt(limit),
          sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
          lean: true,
      };

      // Realizar la consulta con paginación usando el servicio
      const products = await getProductsService(query, options);

      // Construir la respuesta
      const response = {
          status: "success",
          payload: products.docs,
          totalPages: products.totalPages,
          prevPage: products.prevPage,
          nextPage: products.nextPage,
          page: products.page,
          hasPrevPage: products.hasPrevPage,
          hasNextPage: products.hasNextPage,
          prevLink: products.hasPrevPage
              ? `/api/products?page=${products.prevPage}&limit=${limit}&sort=${sort}&category=${category}&availability=${availability}`
              : null,
          nextLink: products.hasNextPage
              ? `/api/products?page=${products.nextPage}&limit=${limit}&sort=${sort}&category=${category}&availability=${availability}`
              : null,
      };

      res.json(response);
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
};