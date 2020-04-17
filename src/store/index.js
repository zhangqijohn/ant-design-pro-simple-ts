import React from 'react';
import { observable, action, computed } from "mobx";
import {observer} from 'mobx-react';

@observer
class Store {

  @observable name = 'john';

    @observable price = 6.8;

    @observable amount = 10;

    @computed get total() {
        return this.price * this.amount;
    }

  @action
  changeA() {
    this.a = 0;
    setTimeout(this.changeB, 1000);
  }
}
export default Store;
