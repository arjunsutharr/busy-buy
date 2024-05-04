import { useNavigate } from "react-router-dom";
import { useAuthValues } from "../../context/Authentication.context";
import { useCartValues } from "../../context/Cart.context";
import cardStyles from "./Card.module.css";

function Card(props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthValues();
  const { addToCart } = useCartValues();
  const { product } = props;

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      addToCart(product);
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className={cardStyles.cardContainer}>
      <div className={cardStyles.imgContainer}>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={cardStyles.details}>
        <h4>{product.name}</h4>
        <h4>Rs. {product.price}</h4>
        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </div>
    </div>
  );
}

export default Card;
