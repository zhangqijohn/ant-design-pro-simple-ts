// 分发组件
import PropTypes from 'prop-types'
const AddOn:any = () => null

AddOn.propTypes = { slot: PropTypes.string }
AddOn.defaultTypes = { slot: '$$default' }
AddOn.displayName = 'AddOn'
export default AddOn