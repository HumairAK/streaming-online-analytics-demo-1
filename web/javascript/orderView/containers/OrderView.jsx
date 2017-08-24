import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateTotal } from "../orderActions"
import { setTotal } from "../orderActions"
import { checkout } from "../orderActions"
import { toggleItem } from "../orderActions"
import { clearToggle } from "../orderActions"
import { removeProduct } from "../../productView/productActions";
import { updateQuant } from "../../productView/productActions";
import CheckoutItem from "../components/CheckoutItem.jsx";

class OrderView extends Component {

  static get propTypes() {
    return {
      cart: PropTypes.object,
      selected: PropTypes.array,
      updateTotal: PropTypes.func,
      updateQuant: PropTypes.func,
      clearToggle: PropTypes.func,
      toggleItem: PropTypes.func,
      setTotal: PropTypes.func,
      checkout: PropTypes.func,
      removeProduct: PropTypes.func,
      total: PropTypes.number,
      name: PropTypes.string,
      category: PropTypes.string,
      image: PropTypes.string,
      quant: PropTypes.number,
      price: PropTypes.number
    }
  }

  checkout() {
    this.props.checkout(this.props.cart);
  }

  deleteSelected() {
    this.props.selected.forEach((id) => {
      var item = this.props.cart[id];
      this.props.updateTotal(-(item.quantity * item.productPrice))
      this.props.clearToggle();
      this.props.removeProduct(id);
    });
  }

  componentWillMount(){
    let total = 0;
    if(this.props.cart) {
      for(var id in this.props.cart) {
          var item = this.props.cart[id]
          total += item.pprice * item.pquant;
      }
      this.props.setTotal(total);
    }
  }

  render() {
    let items = [];
    if(this.props.cart) {
      for(var id in this.props.cart) {
          var item = this.props.cart[id]
          items.push(
            <CheckoutItem key={id} id={id} item={item} name={item.pname}
            price={item.pprice} category={item.ptype} image={item.image}
            quant={item.pquant} removeProduct={this.props.removeProduct}
            updateTotal={this.props.updateTotal}
            updateQuant={this.props.updateQuant}
            toggleItem={this.props.toggleItem}/>
          );
      }
    }
    return (
      <div className="col col-cards-pf container-cards-pf">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            <div className="card-pf-heading">
              <h2 className="card-pf-title">
                Your order
              </h2>
            </div>
            <div className="card-pf-body">
              <div className="list-group list-view-pf list-view-pf-view">
                {items}
              </div>
              <div> {"Total: $" + this.props.total}</div>
              <button className="btn btn-default" onClick={this.checkout.bind(this)}>Checkout</button>
              <button className="btn btn-default" onClick={this.deleteSelected.bind(this)}>Delete Selected</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart,
    total: state.orderReducer.total,
    selected: state.orderReducer.selected
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTotal: (amountBy) => {
      dispatch(updateTotal(amountBy))
    },
    setTotal: (total) => {
      dispatch(setTotal(total))
    },
    checkout: (cart) => {
      dispatch(checkout(cart))
    },
    removeProduct: (id) => {
      dispatch(removeProduct(id))
    },
    updateQuant: (id, quant) => {
      dispatch(updateQuant(id, quant))
    },
    toggleItem: (id, isSelected) => {
      dispatch(toggleItem(id, isSelected))
    },
    clearToggle: () => {
      dispatch(clearToggle())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
