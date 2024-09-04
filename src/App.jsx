import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Item from "./components/Item";
import "./App.css";
import DisplayCart from "./components/DisplayCart";
import Modal from "./components/Modal";

function App() {
  const [cartData, setCartData] = useState(null);
  const [addedCart, setAddedCart] = useState();
  const [render, setRender] = useState(false);
  const [modalDisplay, setModalDispaly] = useState("none");
  const modalContentRef = useRef(null);

  useEffect(() => {
    setAddedCart(JSON.parse(localStorage.getItem("cartData")) || []);
    const getData = async () => {
      const res = await axios.get("/data.json");
      setCartData(res.data);
    };
    getData();
  }, [render]);
  return (
    <div className='container'>
      <main className='main'>
        <h1 className='heading'>Desserts</h1>
        <div className='img-container'>
          {cartData?.map((data, idx) => (
            <Item key={idx} data={data} setRender={setRender} />
          ))}
        </div>
      </main>
      <aside className='aside'>
        {addedCart?.length > 0 ? (
          <div className='display-cart-container'>
            <h2>
              Your Cart (
              {addedCart.reduce((acc, item) => acc + item.itemCount, 0)})
            </h2>
            <div className='cart-display'>
              {addedCart.map((item, idx) => (
                <DisplayCart key={idx} cartItem={item} setRender={setRender} />
              ))}
              <div className='order-total'>
                <span>Order Total</span>{" "}
                <h1>
                  $
                  {addedCart
                    .reduce((first, last) => {
                      return first + last.price * last.itemCount;
                    }, 0)
                    .toFixed(2)}
                </h1>
              </div>

              <div className='carbon'>
                <img
                  src='/images/icon-carbon-neutral.svg'
                  alt='carbon neutral icon'
                  className='neutral-icon'
                />{" "}
                <p>
                  This is a <span>carbon-neutral</span> delivery
                </p>
              </div>
              <button
                type='button'
                className='confirm-btn'
                onClick={() => setModalDispaly("")}
              >
                Confirm Order
              </button>
            </div>
          </div>
        ) : (
          <div className='display-cart-container'>
            <h2>Your Cart (0)</h2>
            <img
              src='/images/illustration-empty-cart.svg'
              alt='cart empty icon'
              className='empty-icon'
            />
            <p className='empty-para'>Your added items will appear here</p>
          </div>
        )}
      </aside>
      <div
        className='modal-container'
        style={{ display: modalDisplay }}
        onClick={() => {
          if (
            modalContentRef &&
            !modalContentRef.current.contains(event.target)
          ) {
            setModalDispaly("none");
          }
        }}
      >
        <div className='modal-content' ref={modalContentRef}>
          <div className='inner-content'>
            <img
              src='/images/icon-order-confirmed.svg'
              alt='order confirmed icon '
              className='confirm-icon'
            />
            <h1 className='modal-heading'>Order Confirmed</h1>
            <p className='modal-title'>We hope you enjoy your food!</p>
            <div className='item-container'>
              {addedCart?.map((item, idx) => (
                <Modal key={idx} cartItem={item} setRender={setRender} />
              ))}
              <div className='order-total'>
                <span>Order Total</span>{" "}
                <h1>
                  {" "}
                  $
                  {addedCart
                    ?.reduce((first, last) => {
                      return first + last.price * last.itemCount;
                    }, 0)
                    .toFixed(2)}{" "}
                </h1>
              </div>
            </div>
            <button
              type='button'
              className='new-order'
              onClick={() => {
                localStorage.removeItem("cartData");
                setRender((prev) => !prev);
                setModalDispaly("none");
                window.location.reload();
              }}
            >
              Start New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
