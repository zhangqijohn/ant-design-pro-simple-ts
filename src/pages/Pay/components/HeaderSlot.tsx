import React, {Component} from 'react'
import { SlotProvider } from '@/components/SlotProvider/SlotProvider'
import Slot from '@/components/SlotProvider/Slot'

class TableCmpnt extends Component{
  render() {
    return (<div>
      <div>something ... </div>
      <Slot name="tool" />
    </div>)
  }
}

const TableComponent:any = SlotProvider(TableCmpnt)

export default  TableComponent
