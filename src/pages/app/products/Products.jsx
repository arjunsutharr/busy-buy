import { InfinitySpin } from "react-loader-spinner";
import { useProductValues } from "../../../context/Product.context";
import Card from "../../../Components/card/Card";
import Search from "../../../Components/search/Search";
import Filter from "../../../Components/filter/Filter";
import productStyles from "./Products.module.css";

function Products() {
  const { products, loader, filteredProducts, notFound } = useProductValues();
  // console.log(notFound);

  return (
    <div className={loader ? productStyles.topLevelContainer : null}>
      {loader ? (
        <div className={productStyles.loaderContainer}>
          <InfinitySpin
            visible={true}
            width="200"
            color="salmon"
            ariaLabel="infinity-spin-loading"
            className={productStyles.loader}
          />
        </div>
      ) : (
        <div className={productStyles.container}>
          <Search products={products} />
          <div className={productStyles.subContainer}>
            <Filter products={products} />
            <div className={productStyles.productsContainer}>
              {notFound ? (
                <div>{notFound}</div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))
              ) : (
                products.map((product) => (
                  <Card key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
