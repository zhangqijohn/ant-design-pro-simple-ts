// 获取公共的context
import React, {Component} from 'react'
import PropTypes from 'prop-types'

function getDisplayName(component: any) {
  return component.displayName || component.name || 'compontent'
}

export const SlotContext: any = React.createContext({
  requestAddOnRenderer: () => {
  }
})

const slotProviderHoC = (WrappedComponent: any) => {
  return class extends Component {
    static displayName = `SlotProvider(${getDisplayName(WrappedComponent)})`

    static childContextTypes = {
      requestAddOnRenderer: PropTypes.func
    }

    // 缓存每个<AddOn/>的内容
    addOnRenderers: any = {}

    // 通过Context为子节点提供接口
    getChildContext() {
      return (name: any) => {
        if (!this.addOnRenderers[name]) {
          return undefined
        }
        return this.addOnRenderers[name]
      }
    }

    // render：在return前先获取子节点
    render() {
      const {children, ...restProps} = this.props
      // 通过Context为子节点提供接口
      if (children) {
        const arr = React.Children.toArray(children)
        const nameChecked: Array<any> = []
        this.addOnRenderers = {}
        arr.forEach((item: any) => {
          if (item.type && item.type.displayName === 'AddOn') {
            const slotName: string = item.props.slot || '$$default'
            // 确保内容唯一性
            if (nameChecked.findIndex(item => item === slotName) !== -1) {
              throw new Error(`Slot(${slotName}) has been occupied`)
            }
            this.addOnRenderers[slotName] = item.props.children
            nameChecked.push(slotName)
          }

        })
      }
      return (
        <SlotContext.Provider value={{addOnRenderers: this.getChildContext()}}>
          <WrappedComponent {...restProps}/>
        </SlotContext.Provider>)
    }

  }
}
export const SlotProvider = slotProviderHoC
