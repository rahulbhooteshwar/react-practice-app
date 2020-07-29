import React, { Suspense } from 'react';

import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { LocaleProvider } from './context/LocaleContext';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/CartContext';
// Lazy Loaded routes
const Cat = React.lazy(() => import('./Cat'));
const Mouse = React.lazy(() => import('./Mouse'));
const Cart = React.lazy(() => import('./components/Cart'));
const Todo = React.lazy(() => import('./components/Todo'));
const Auth = React.lazy(() => import('./components/Auth'));
const ProductList = React.lazy(()=> import('./components/ProductList'));
function App() {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <LocaleProvider>
            <CartProvider>
              <div className={`app theme-${currentTheme}`}>
                <Header />
                <div className="container-fluid">

                  <Switch>
                    <Route path='/auth'>
                      <h4><Auth />to Access Private Routes</h4>
                    </Route>
                    <PrivateRoute path='/todo' render={() => <Todo />} />
                    <PrivateRoute path='/products'>
                      <ProductList />
                    </PrivateRoute>
                    <PrivateRoute path='/cart'>
                      <Cart/>
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
    </Suspense>

  );
}

export default App;
