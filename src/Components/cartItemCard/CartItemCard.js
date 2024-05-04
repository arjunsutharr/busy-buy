import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import cartItemStyle from "./CartItemCard.module.css";
import { useCartValues } from "../../context/Cart.context";

function CartItemCard(props) {
  const { cartItems } = props;
  const { increaseCartItemQuantity, decreaseCartItemQuantity, removeCartItem } =
    useCartValues();

  return (
    <>
      {cartItems.map((item) => (
        <div key={item.id} className={cartItemStyle.container}>
          <div className={cartItemStyle.imgContainer}>
            <img src={item.img} alt={item.name} />
          </div>
          <div className={cartItemStyle.itemDetailsContainer}>
            <div>
              <h4>{item.name}</h4>
              <p>Price: {item.price}</p>
            </div>
            <div className={cartItemStyle.cardFooter}>
              <div className={cartItemStyle.qtyControlContainer}>
                <FiMinusCircle
                  onClick={() => decreaseCartItemQuantity(item)}
                  className={cartItemStyle.icons}
                />
                <p>{item.qty}</p>
                <FiPlusCircle
                  onClick={() => increaseCartItemQuantity(item)}
                  className={cartItemStyle.icons}
                />
              </div>
              <p>{item.amount}</p>
            </div>
          </div>
          <div
            onClick={() => removeCartItem(item)}
            className={cartItemStyle.crossIcon}
          >
            <RxCross2 className={cartItemStyle.icons} />
          </div>
        </div>
      ))}
    </>
  );
}

export default CartItemCard;
