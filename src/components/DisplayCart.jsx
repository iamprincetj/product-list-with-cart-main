import "../assets/css/DisplayCart.css";

const DisplayCart = ({ cartItem, setRender }) => {
  if (cartItem) {
    const total = cartItem.price * cartItem.itemCount;
    return (
      <div className='display-cart'>
        <div>
          <h4>{cartItem.name} </h4>
          <p>
            {" "}
            <span>{cartItem.itemCount}x</span> @ ${cartItem.price.toFixed(2)}{" "}
            <span className=''>${total.toFixed(2)}</span>
          </p>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='10'
          height='10'
          fill='none'
          viewBox='0 0 10 10'
          className='remove-icon'
          name={cartItem.name}
          onClick={() => {
            const cart = JSON.parse(localStorage.getItem("cartData"));
            const newCart = cart.filter((item) => item.name !== cartItem.name);
            localStorage.setItem("cartData", JSON.stringify(newCart));
            setRender((prev) => !prev);
          }}
        >
          <path
            fill='#CAAFA7'
            d='M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z'
          />
        </svg>
      </div>
    );
  }
};

export default DisplayCart;
