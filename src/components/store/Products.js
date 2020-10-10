import React, { useState, useReducer } from 'react';
import "./products.css";


const products = [
  {
    img: '🧦',
    name: 'socks',
    price: 10
  },
  {
    img: '🧤',
    name: 'gloves',
    price: 20
  },
  {
    img: '👗',
    name: 'dress',
    price: 50
  },
]

function getTotal(cart){
  const total = cart.reduce((totalcost, item) => totalcost + item.price, 0);
  return total.toLocaleString(undefined, {minimumFractionDigits:2,maximumFractionDigits:2})
}

function cartReducer(state, action) {
  switch(action.type){
    case 'add':
      return[...state, action.item]
    case 'delete':
      const itemkey = state.findIndex(item => item.name === action.item.name)
      if(itemkey < 0) {
        return state;
      }
      const update = [...state];
      update.splice(itemkey , 1)
      return update
    default:
      return state;
  }
}

export default function Products() {
  const [cart, setCart] = useReducer(cartReducer, []);

  function add(item){
    setCart({item, type: 'add'})
  }

  function remove(item){
    setCart({item, type: 'delete'});
  }

  return (
    <div className="container">
        <div>Total Items:{cart.length}</div>
        <div>Total Cost: {getTotal(cart)}</div>
      <div className="products">
      {products.map(item => (
          <div key={item.name}>
            <div className="product">
              <span role="img" aria-label={item.name}>{item.img}</span>
            </div>
            <button onClick={() => add(item)}>Add</button>
            <button onClick={() => remove(item)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}