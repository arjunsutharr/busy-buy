import searchStyles from "./Search.module.css";
import { useProductValues } from "../../context/Product.context";

function Search() {
  const { search, searchInput } = useProductValues();
  return (
    <div className={searchStyles.searchContainer}>
      <input
        value={searchInput}
        onChange={(e) => search(e.target.value)}
        placeholder="Search By Name"
      />
    </div>
  );
}

export default Search;
