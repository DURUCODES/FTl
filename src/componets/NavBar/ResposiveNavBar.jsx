import React, { useState } from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";
import MobileSearchBar from "../SearchBarcom/MobileSearchBar";
import CartSide from "../SideCartOpening/CartSide";
import LoginSlide from "../LoginSlide/LoginSlide";
import ModalForDetails from "../Modal/ModalForDetails";
import QuickView from "../QuickView/QuickView";
import ProductPage from "../../pages/ProductPage";

const ResposiveNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const openSearchHandle = () => {
    setOpenSearch(true);
  };

  const closeSearchHandle = () => {
    setOpenSearch(false);
  };
  const openMenuHandle = () => {
    setIsOpen(true);
  };

  const closeMenuHandle = () => {
    setIsOpen(false);
  };

  const handleCartOpen = () => {
    setOpenCart(true);
  };

  const handleCartClose = () => {
    setOpenCart(false);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };
  const handleLoginOpen = () => {
    setOpenLogin(true);
  };
  return (
    <div>
      <DesktopNavBar
        openMenuHandle={openMenuHandle}
        open={open}
        handleCartOpen={handleCartOpen}
        openSearchHandle={openSearchHandle}
        handleLoginOpen={handleLoginOpen}
      />
      <MobileNavBar closeMenuHandle={closeMenuHandle} isOpen={isOpen} />
      <MobileSearchBar
        closeSearchHandle={closeSearchHandle}
        openSearch={openSearch}
      />

      <CartSide
        handleCartClose={handleCartClose}
        openCart={openCart}
        handleLoginClose={handleLoginClose}
        openLogin={openLogin}
        handleLoginOpen={handleLoginOpen}
      />
      <LoginSlide handleLoginClose={handleLoginClose} openLogin={openLogin} />
      <ModalForDetails
        handleCartClose={handleCartClose}
        openCart={openCart}
        handleLoginClose={handleLoginClose}
        openLogin={openLogin}
        handleLoginOpen={handleLoginOpen}
        handleCartOpen={handleCartOpen}
        setOpenCart={setOpenCart}
      />
    </div>
  );
};

export default ResposiveNavBar;
