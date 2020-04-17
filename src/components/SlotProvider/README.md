
#使用方法：
定义插槽：
<!-- Table.tsx -->
import React, {Component} from 'react'
import { SlotProvider } from '@/components/SlotProvider/SlotProvider'
import Slot from '@/components/SlotProvider/Slot'
class TableCmpnt extends Component<TableIProps,TableIState>{
  render() {
    return (<div>
      <div>something ... </div>
      <Slot name="tool"></Slot>
    </div>)
  }
}
export const TableComponent:any = SlotProvider(TableCmpnt)
注意：
因为被高阶组件包装一层，在父组件里的方法和值并不是加在TableComponent子组件上，而是加在TableCmpnt上，导致以下错误。   
需要给组件定义一个类型any。
Overload 1 of 2, '(props: Readonly<{}>): (Anonymous class)', gave the following error.
Type '{ children: Element[]; tableColumns: any[]; dataSource: any[]; }' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<(Anonymous class)> & Readonly<{}> & Readonly<{ children?: ReactNode; }>'.
  Property 'tableColumns' does not exist on type 'IntrinsicAttributes & IntrinsicClassAttributes<(Anonymous class)> & Readonly<{}> & Readonly<{ children?: ReactNode; }>'

#外部引用插槽
<!-- Home.tsx -->
import AddOn from '@/components/SlotProvider/AddOn'
import { TableComponent } from '@/components/Table/Index'
class Home extends Component<HomeProps, CurHomeIState> {
  render() {
    return (<div>
      <TableComponent tableColumns={this.state.tableColumns} dataSource={this.state.dataSource}>
          <AddOn slot="tool">
            <div onClick={this.clickHandle}>表格的头部</div>
          </AddOn>
        </TableComponent>
    </div>)
  }
}
