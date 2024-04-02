// Modal.jsx
import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import icons from '../../images/icons.svg';
import s from './Modal.module.css';

const Modal = ({ isOpen, onClose, car }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !car) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={s.modalOverlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <div>
          <button className={s.closeButton} onClick={onClose}>
            <svg className={s.icon}>
              <use xlinkHref={`${icons}#crossIcon`} />
            </svg>
          </button>
        </div>
        <div className={s.imgContainer}>
          <img className={s.carImg} src={car.img} alt={`${car.make} ${car.model}`} />
        </div>
        <div className={s.paragraphContainer}>
          <p className={s.carParagraph}>{car.make} <span className={s.carModel}>{car.model}</span>, {car.year}</p>
        </div>
        <div className={s.listContainer}>
          <ul className={s.carList}>
            {car.address.split(',').map((item, index) => (
              <li key={index}>{item.trim()} <span className={s.stick} /></li>
            ))}
            <li>Id: {car.id} <span className={s.stick} /></li>
            <li>Year: {car.year} <span className={s.stick} /></li>
            <li>Type: {car.type} <span className={s.stick} /></li>
            <li>Fuel Consumption: {car.fuelConsumption} <span className={s.stick} /></li>
            <li>Engine Size: {car.engineSize} <span className={s.stick} /></li>
          </ul>
        </div>
        <div className={s.description}>
          <p>{car.description}</p>
        </div>
        <div className={s.accessoriesContainer}>
          <p className={s.accessoriesTitle}>Accessories and functionalities:</p>
          <ul className={s.accessoriesList}>
            {car.accessories.map((accessory, index) => (
              <li key={index}>{accessory} <span className={s.stick} /></li>
            ))}
          </ul>
          <ul className={s.accessoriesList}>
            {car.functionalities.map((functionality, index) => (
              <li key={index}>{functionality} <span className={s.stick} /></li>
            ))}
          </ul>
        </div>
        <div className={s.rentalConditionsContainer}>
          <p className={s.rentalConditionsTitle}>Rental Conditions:</p>
        <ul className={s.rentalConditionsList}>
          <li>
            Minimum age:{' '}
            <span className={s.color}>
              {car.rentalConditions[0].split(':')[1]}
            </span>
          </li>
          <li>{car.rentalConditions[1]}</li>
          <li>{car.rentalConditions[2]}</li>
          <li>
            Mileage:{' '}
            <span className={s.color}>
              {car.mileage.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </li>
          <li>
            Price: <span className={s.color}>{car.rentalPrice}</span>
          </li>
        </ul>
        </div>
        <div className={s.rentalContactContainer}>
          <a className={s.rentalContact} href="tel:+380730000000">Rental car</a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
