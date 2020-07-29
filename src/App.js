import React from 'react';
import Todo from './components/Todo';
import Auth from './components/Auth';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { LocaleProvider } from './context/LocaleContext';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mouse from './Mouse';
import Cat from './Cat';
import PrivateRoute from './components/PrivateRoute';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';

function App() {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <LocaleProvider>
          <CartProvider>
            <div className={`app theme-${currentTheme}`}>
              <Header />
              <div className="container-fluid">

                <Switch>
                  <Route path='/auth'>
                    <h4><Auth/>to Access Private Routes</h4>
                  </Route>
                  <PrivateRoute path='/todo' render={() => <Todo />} />
                  <PrivateRoute path='/products'>
                    <ProductList />
                  </PrivateRoute>
                  <PrivateRoute path='/cart'>
                    <Cart />
                  </PrivateRoute>
                  <PrivateRoute path='/'>
                    {/* render prop example */}
                    <Mouse render={(mouse) => <Cat mouse={mouse} />} />
                  </PrivateRoute>
                </Switch>
              </div>
            </div>
          </CartProvider>
        </LocaleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
