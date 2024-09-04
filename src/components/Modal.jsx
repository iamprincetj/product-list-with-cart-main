import "../assets/css/Modal.css";

const Modal = ({ cartItem, setRender }) => {
  if (cartItem) {
    const total = cartItem.price * cartItem.itemCount;
    return (
      <div className='modal-item-container'>
        <img src={cartItem.img} alt={cartItem.name} className='item-img' />
        <div className='item-info'>
          <div>
            <h4>{cartItem.name}</h4>
            <p>
              {" "}
              <span>{cartItem.itemCount}x</span> @ ${cartItem.price.toFixed(2)}{" "}
            </p>
          </div>
          <h4 className='item-total'>${total.toFixed(2)}</h4>
        </div>
      </div>
    );
  }
};

export default Modal;
