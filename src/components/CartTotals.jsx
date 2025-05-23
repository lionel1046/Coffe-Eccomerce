import React from "react";
import { useSelector } from "react-redux";

const CartTotals = () => {
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const tax = total / 5;
  const shipping = 10;
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content">
          <span>Subtotal</span>
          <span className="font-medium">IDR {Math.round(total)}</span>
        </p>
        {/* SHIPPING */}
        {/* Tax */}
        {/* <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Tax 10%</span>
          <span className='font-medium'>IDR {Math.round(tax)}</span>
        </p> */}
        {/* Order Total */}
        <p className="flex justify-between text-sm mt-4 pb-2 text-accent-content">
          <span>Order Total</span>
          <span className="font-medium">
            IDR {Math.round(total)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
