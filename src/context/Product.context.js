import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../firebaseInit";

const productContext = createContext();

const reducer = (state, action) => {
  const { data } = action;

  switch (action.type) {
    case "ALL_PRODUCTS": {
      return {
        ...state,
        products: data,
        loader: false,
      };
    }
    case "FILTERED_PRODUCTS": {
      return {
        ...state,
        filteredProducts: data,
      };
    }
    case "SET_LOADER": {
      return {
        ...state,
        loader: data,
      };
    }
    case "MIN_PRICE": {
      return {
        ...state,
        minPrice: data,
      };
    }
    case "MAX_PRICE": {
      return {
        ...state,
        maxPrice: data,
      };
    }
    case "FILTERED_PRICE": {
      return {
        ...state,
        filteredPrice: data,
      };
    }
    case "SELECTED_CATOGORIES": {
      return {
        ...state,
        selectedCatogories: data,
      };
    }
    case "SEARCH_INPUT": {
      return {
        ...state,
        searchInput: data,
      };
    }
    case "NOT_FOUND": {
      return {
        ...state,
        notFound: data,
      };
    }
    default:
      return state;
  }
};

//custom hook
const useProductValues = () => {
  return useContext(productContext);
};

// custom context
function ProductContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    filteredProducts: [],
    loader: true,
    filteredPrice: undefined,
    minPrice: null,
    maxPrice: null,
    selectedCatogories: [],
    searchInput: "",
    notFound: undefined,
  });

  const { products, selectedCatogories } = state;

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    dispatch({
      type: "SET_LOADER",
      data: true,
    });

    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const minPrice = Math.min(
      ...products.map((product) => Number(product.price))
    );
    const maxPrice = Math.max(
      ...products.map((product) => Number(product.price))
    );

    dispatch({ type: "ALL_PRODUCTS", data: products });
    dispatch({ type: "MIN_PRICE", data: minPrice });
    dispatch({ type: "MAX_PRICE", data: maxPrice });
  };

  const filterByPrice = (price) => {
    let priceFilteredProducts;
    if (selectedCatogories.length > 0) {
      priceFilteredProducts = products.filter(
        (product) =>
          Number(product.price) <= Number(price) &&
          selectedCatogories.filter((category) => product.category === category)
      );
    } else {
      priceFilteredProducts = products.filter(
        (product) => Number(product.price) <= Number(price)
      );
    }

    dispatch({ type: "FILTERED_PRODUCTS", data: priceFilteredProducts });
    dispatch({ type: "FILTERED_PRICE", data: price });
  };

  const search = (name) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      dispatch({
        type: "NOT_FOUND",
        data: `${name} not found.`,
      });
      dispatch({
        type: "SEARCH_INPUT",
        data: name,
      });
      return;
    }
    dispatch({
      type: "SEARCH_INPUT",
      data: name,
    });

    dispatch({
      type: "NOT_FOUND",
      data: undefined,
    });

    dispatch({
      type: "FILTERED_PRODUCTS",
      data: filteredProducts,
    });
  };

  const filterByCategory = (category) => {
    const isSelected = selectedCatogories.includes(category);

    const updatedSelectedCategories = isSelected
      ? [...selectedCatogories.filter((cat) => cat !== category)]
      : [...selectedCatogories, category];

    const categoryFilteredProducts = products.filter((product) =>
      updatedSelectedCategories.includes(product.category)
    );

    dispatch({ type: "FILTERED_PRODUCTS", data: categoryFilteredProducts });
    dispatch({ type: "SELECTED_CATOGORIES", data: updatedSelectedCategories });
  };

  return (
    <productContext.Provider
      value={{ ...state, filterByCategory, filterByPrice, search }}
    >
      {children}
    </productContext.Provider>
  );
}

export { productContext, useProductValues };
export default ProductContextProvider;
