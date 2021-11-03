import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, Navbar, Cart ,Checkout} from './components';
import { CssBaseline } from '@material-ui/core';
import { commerce } from './lib/commerce';
const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const fetchProductsFromAPI = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCartItemsFromAPI = async () => {
     /* eslint-disable no-debugger, no-console */
   debugger;
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
  
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }
 
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  useEffect(() => {
    fetchProductsFromAPI();
    fetchCartItemsFromAPI()
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  return (
    <Router>
      <div style={{ display: 'flex' }}>
      <CssBaseline />
        <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path='/'>
            <Products products={products}  onAddToCart={handleAddToCart}  />
          </Route>
          <Route exact path="/cart"> 
          <Cart cart={ cart }  onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route exact path="/checkout"> 
          <Checkout />
          </Route>

        </Switch>

      </div></Router>
  )
}

export default App


