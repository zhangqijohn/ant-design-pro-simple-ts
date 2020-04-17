import React from "react";
import { observer } from "mobx-react";
import { observable, computed } from "mobx";

class MobxClass extends  React.Component{
  @observable price = 10;

  @observable amount = 7.6;

  @computed get total() {
    return this.price * this.amount;
  }

  render(){
    return (
      <div>
        <p>price: {this.price}</p>
        <p>amount: {this.amount}</p>
        <p>price*amount:{this.total}</p>
      </div>
    )
  }
}

export default MobxClass
