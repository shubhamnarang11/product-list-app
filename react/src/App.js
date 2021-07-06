import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState({});

  const toggleStatus = (productName, status) => {
    const orderIds = orders.map((order) => order.id);

    fetch(`http://localhost:4002/product`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        status: status === 'Processing' ? 'Done' : 'Processing',
        orderIds,
        productName,
      }),
    }).then(() => {
      fetch(`http://localhost:4002/customer/${selectedCustomer}`)
        .then((response) => response.json())
        .then((orders) => {
          setOrders(orders.data);
          setProducts(mapProductsData(orders.data));
        });
    });
  };

  // Add quantity and price for all the products available in different orders
  const mapProductsData = (data) => {
    const products = {};

    data.forEach((order) => {
      if (order.products.length > 0) {
        order.products.forEach((product) => {
          if (products[product.name]) {
            products[product.name].price += product.price;
            products[product.name].quantity += product.quantity;

            if (product.status === 'Processing' && product[product.name]) {
              product[product.name].status = product.status;
            }
          } else {
            products[product.name] = {};
            products[product.name].price = product.price;
            products[product.name].quantity = product.quantity;
            products[product.name].status = product.status;
          }
        });
      }
    });

    return products;
  };

  const changeCustomer = (event) => {
    const {
      target: { value },
    } = event;

    if (value !== 'all') {
      setSelectedCustomer(value);

      fetch(`http://localhost:4002/customer/${value}`)
        .then((response) => response.json())
        .then((orders) => {
          setOrders(orders.data);
          setProducts(mapProductsData(orders.data));
        });
    } else {
      setSelectedCustomer(value);

      fetch(`http://localhost:4002/order`)
        .then((response) => response.json())
        .then((orders) => {
          setOrders(orders.data);
          setProducts(mapProductsData(orders.data));
        });
    }
  };

  // Updates the quanity to latest or available order
  const changeQuantity = (productName, changeType = 'inc') => {
    const latestOrders = JSON.parse(JSON.stringify(orders.reverse()));
    let selectedProduct;
    latestOrders.some((order) => {
      const result = order.products.find(
        (product) => product.name === productName
      );

      if (result) {
        selectedProduct = result;
        return true;
      }
    });

    let updatedQuantity =
      changeType === 'inc'
        ? selectedProduct.quantity + 1
        : selectedProduct.quantity - 1;
    updatedQuantity = updatedQuantity < 0 ? 0 : updatedQuantity;
    fetch(
      `http://localhost:4002/product/${selectedProduct.order_id}/${selectedProduct.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({
          price:
            (selectedProduct.price * updatedQuantity) /
            selectedProduct.quantity,
          quantity: updatedQuantity,
        }),
      }
    ).then(() => {
      fetch(`http://localhost:4002/customer/${selectedCustomer}`)
        .then((response) => response.json())
        .then((orders) => {
          setOrders(orders.data);
          setProducts(mapProductsData(orders.data));
        });
    });
  };

  useEffect(() => {
    fetch('http://localhost:4002/customer')
      .then((res) => res.json())
      .then((result) => {
        setCustomers(result.data);
        setSelectedCustomer(result.data[0].id);

        fetch(`http://localhost:4002/customer/${result.data[0].id}`)
          .then((response) => response.json())
          .then((orders) => {
            setOrders(orders.data);
            setProducts(mapProductsData(orders.data));
          });
      });
  }, []);

  return (
    <div className="app-background">
      <div className="main-container">
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <p>Select Customer: </p>
          <select
            style={{ marginLeft: '10px' }}
            value={selectedCustomer}
            onChange={changeCustomer}
          >
            <option value="all">All</option>
            {customers.map((customer) => (
              <option value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>
        <div classNam e="item-list">
          {Object.keys(products).map((product) => (
            <div className="item-container">
              <div
                className="item-name"
                onClick={() =>
                  toggleStatus(product, products[product].status)
                }
              >
                <i
                  className={
                    products[product].status === 'Processing'
                      ? 'fa fa-circle'
                      : 'fa fa-check-circle'
                  }
                  style={{ marginRight: '10px' }}
                ></i>
                <span>{product}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                  className={`${products[product].status.toLowerCase()} status`}
                >
                  {products[product].status}
                </p>
              </div>{' '}
              <p style={{ fontSize: '14px' }}>Quantity: </p>
              <div className="quantity" style={{ flex: 0 }}>
                <button
                  style={{ fontSize: '16px' }}
                  onClick={() => changeQuantity(product, 'dec')}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <span style={{ fontSize: '14px' }}>
                  {' '}
                  {products[product].quantity}{' '}
                </span>
                <button
                  style={{ fontSize: '14px' }}
                  onClick={() => changeQuantity(product)}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <i className="fa fa-inr"></i>
                <p className="status" style={{ marginLeft: '5px' }}>
                  {products[product].price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
