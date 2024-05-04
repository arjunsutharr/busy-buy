import { useProductValues } from "../../context/Product.context";
import filterStyles from "./Filter.module.css";

function Filter(props) {
  const { filterByCategory, filteredPrice, minPrice, maxPrice, filterByPrice } =
    useProductValues();

  const { products } = props;
  const categories = products.map((product) => product.category);
  const uniqueCategories = new Set(categories);
  const uniqueCategoriesArray = [...uniqueCategories];

  return (
    <div className={filterStyles.filterContainer}>
      <h2>Filter</h2>
      <h4>Price: {filteredPrice}</h4>
      <input
        onChange={(e) => filterByPrice(e.target.value)}
        type="range"
        min={minPrice}
        max={maxPrice}
      />

      <div className={filterStyles.categoriesContainer}>
        <h3>Category</h3>
        {uniqueCategoriesArray.map((category, index) => (
          <div key={index} className={filterStyles.checkboxContainer}>
            <p>
              <input
                onChange={() => filterByCategory(category)}
                type="checkbox"
                value={category}
              />
              <label>{category}</label>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
