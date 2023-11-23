import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { CartProvider } from "./context/CartContext";
import AppDesktop from "./componentsUI/AppDesktop";
import AppMobile from "./componentsUI/AppMobile";

function App() {

  return (
    <>
      <CartProvider>
        <BrowserRouter>
        {isMobile ? <AppMobile />: <AppDesktop /> }
        {/* {isMobile ? <AppMobile />: <AppDesktop /> } */}
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
