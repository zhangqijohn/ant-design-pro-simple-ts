// 插槽组件
import React from 'react'
import PropTypes from 'prop-types'

import { SlotContext } from './SlotProvider'
interface SlotTpye {
  name?: any;
  children?: any
}
const Slot = ({ name, children }:SlotTpye) => {
  return (
    <SlotContext.Consumer>
      {(context:any) => {
        const addOnRenderer = context.addOnRenderers(name)
        return (name && addOnRenderer) ||
          children ||
          null
      }}
    </SlotContext.Consumer>
  )
}

Slot.displayName = 'Slot'
Slot.propTypes = { name: PropTypes.string }
Slot.defaultProps = { name: '$$default' }
export default Slot
