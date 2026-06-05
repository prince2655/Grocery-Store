import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../contex/StoreContex'
import './Fooditem.css'

const Fooditem = ({name,description,id,imageUrl,price}) => {
    const {increaseQty,decreaseQty,quantities} = useContext(StoreContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showAddedNotif, setShowAddedNotif] = useState(false);
    const [cardHover, setCardHover] = useState(false);

    const handleAddItem = () => {
        setIsAnimating(true);
        setShowAddedNotif(true);
        increaseQty(id);
        setTimeout(() => setIsAnimating(false), 300);
        setTimeout(() => setShowAddedNotif(false), 1500);
    };

    const handleRemoveItem = () => {
        setIsAnimating(true);
        decreaseQty(id);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div 
                className="card fooditem-card" 
                style={{ maxWidth: '350px' }}
                onMouseEnter={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
            >
                {/* Cart Badge */}
                {quantities[id] > 0 && (
                    <span className="cart-badge">{quantities[id]}</span>
                )}

                {/* Added Notification */}
                {showAddedNotif && (
                    <div className="added-notification">
                        <i className="bi bi-check-circle"></i> Added!
                    </div>
                )}

                <div className="fooditem-image-container">
                    <Link to={`/food/${id}`} style={{ textDecoration: 'none' }}>
                        <img 
                            src={imageUrl} 
                            className="fooditem-img" 
                            alt={name}
                            height={180} 
                            width={200}
                        />
                    </Link>
                    {cardHover && (
                        <div className="image-overlay">
                            <p>Click to view details →</p>
                        </div>
                    )}
                </div>

                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <div className="price-section">
                        <span className="price-tag">&#8377;{price}</span>
                        <div className="stars-container">
                            <i className="bi bi-star-fill text-warning star"></i>
                            <i className="bi bi-star-fill text-warning star"></i>
                            <i className="bi bi-star-fill text-warning star"></i>
                            <i className="bi bi-star-fill text-warning star"></i>
                            <i className="bi bi-star-half text-warning star"></i>
                            <small className="rating-text">(4.5)</small>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <Link to={`/food/${id}`} className="btn btn-primary btn-sm">
                        <i className="bi bi-eye"></i> View
                    </Link>
                    {quantities[id]>0 ? (
                        <div className={`quantity-controls ${isAnimating ? 'animating' : ''}`}>
                            <button 
                                className="btn btn-danger btn-sm quantity-btn" 
                                onClick={handleRemoveItem}
                                title="Decrease quantity"
                            >
                                <i className="bi bi-dash-circle"></i>
                            </button>
                            <span className={`quantity-display ${isAnimating ? 'bounce' : ''}`}>{quantities[id]}</span>
                            <button 
                                className="btn btn-success btn-sm quantity-btn" 
                                onClick={handleAddItem}
                                title="Increase quantity"
                            >
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                    ) : (
                        <button 
                            className="btn btn-primary btn-sm add-btn" 
                            onClick={handleAddItem}
                            title="Add to cart"
                        >
                            <i className="bi bi-plus-circle"></i> Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    )

    
}

export default Fooditem