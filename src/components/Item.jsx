import { useEffect, useState } from "react";
import "../assets/css/Item.css";

const Item = ({ data, setRender }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const localCartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const inStorage = localCartData.some((item) => item.name === data.name);
  const inStore = localCartData.find((item) => item.name === data.name);
  const [displayBtn, setDisplayBtn] = useState(!inStorage ? "none" : "");
  const [itemCount, setItemCount] = useState(inStore?.itemCount || 0);
  const removeIcon = document.querySelectorAll(".remove-icon");

  removeIcon.forEach((val) => {
    if (val.attributes.name.nodeValue === data.name) {
      val.addEventListener("click", () => {
        const cartData = JSON.parse(localStorage.getItem("cartData")).find(
          (d) => d.name === data.name
        );
        setTimeout(() => {
          const cartData = JSON.parse(localStorage.getItem("cartData")).find(
            (d) => d.name === data.name
          );
          setItemCount(0);
        }, 1000);
      });
    }
  });

  useEffect(() => {
    const addToStorage = () => {
      const cartData = {
        name: data.name,
        price: data.price,
        itemCount,
        img: data.image.thumbnail,
      };
      if (itemCount > 0) {
        const index = localCartData.findIndex(
          (item) => item.name === cartData.name
        );
        if (index === -1) {
          localCartData.push(cartData);
        } else {
          localCartData[index] = cartData;
        }
        localStorage.setItem("cartData", JSON.stringify(localCartData));
      }
      setRender((prev) => !prev);
    };
    addToStorage();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [itemCount]);

  /**useEffect(() => {
    const handleStorageChange = () => {
      console.log(
        JSON.parse(localStorage.getItem("cartData")).find(
          (d) => d.name === data.name
        )
      );
      setTimeout(() => {
        const inStorage = JSON.parse(localStorage.getItem("cartData")).find(
          (d) => d.name === data.name
        );
      }, 2000);
    };
    removeIcon[0]?.addEventListener("click", handleStorageChange);

    return () =>
      removeIcon[0]?.removeEventListener("click", handleStorageChange);
  }, [inStore, removeIcon]);*/

  let imageSize;

  if (windowWidth >= 992) {
    imageSize = data.image.desktop;
  } else if (windowWidth >= 768) {
    imageSize = data.image.tablet;
  } else {
    imageSize = data.image.mobile;
  }

  return (
    <div className='item-container'>
      <div
        className={!inStorage ? "img" : "img click"}
        style={{ backgroundImage: `url('${imageSize}')` }}
      >
        <button
          type='button'
          className='btn-cart add-cart'
          style={{ display: !inStorage ? "" : "none" }}
          onClick={() => {
            setItemCount(1);
          }}
        >
          <img
            src='/images/icon-add-to-cart.svg'
            alt='cart icon'
            className='cart-icon'
          />{" "}
          <span> Add to Cart</span>
        </button>

        <button
          type='button'
          className='btn-cart cart-amount'
          style={{ display: !inStorage ? "none" : "" }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='10'
            height='2'
            fill='none'
            viewBox='0 0 10 2'
            className='decre-icon icon'
            onClick={() => setItemCount(itemCount > 1 ? itemCount - 1 : 1)}
          >
            <path fill='#fff' d='M0 .375h10v1.25H0V.375Z' />
          </svg>
          <span>{itemCount}</span>{" "}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='10'
            height='10'
            fill='none'
            viewBox='0 0 10 10'
            className='incre-icon icon'
            onClick={() => setItemCount(itemCount + 1)}
          >
            <path
              fill='#fff'
              d='M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z'
            />
          </svg>
        </button>
      </div>
      <div className='cart-info'>
        <p className='category'>{data.category}</p>
        <h2 className='item-name'>{data.name}</h2>
        <p className='item-price'>${data.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Item;
