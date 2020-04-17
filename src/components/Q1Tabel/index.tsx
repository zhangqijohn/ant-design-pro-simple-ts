import React, {useState} from 'react'
import {Col, Dropdown, Menu, Row, Table, Tooltip,} from 'antd'
import {ColumnHeightOutlined, SettingOutlined,} from '@ant-design/icons'
import {ColumnPropsSwith, Q1TablePropsType, SizeType, SizeValType,} from './Q1Table'
import DragSortingTable from './DragSortingTable'

export const sizeOptions: SizeValType[] = [
  {value: 'large', label: '默认'},
  {value: 'middle', label: '中等'},
  {value: 'small', label: '紧凑'},
]


const Q1Tabel = (props: Q1TablePropsType) => {
  // 过滤原始数据，清除switch为0或者不存在的
  const {columns, size, dataSource, showHeaderRightTool} = {...props}
  const columnsQ1Trans = (columns && columns.length && columns.filter(
    (item: any) => item.switch)) || []
  const [columnsQ1, setColumnsQ1] = useState(columnsQ1Trans)
  const [sizeQ1, setSizeQ1] = useState<SizeType>(size || 'large')
  const [cloSetVisible, setCloSetVisible] = useState<boolean>(false)
  const [showHRTool] = useState(showHeaderRightTool === undefined ? true : showHeaderRightTool )
  const handleTableChange = (page: any, filters: any, sorter: any) => {
    console.log(page, filters, sorter)
  }

  const sizeSetMenu = (
    <Menu selectedKeys={[sizeQ1]}>
      {sizeOptions.map(item => (
        <Menu.Item key={item.value}>
          <a
            onClick={() => {
              setSizeQ1(item.value)
            }}
          >
            {item.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  )
  const columsChange = (val: ColumnPropsSwith[]): void => {
    const data = val.filter(item => item.switch)
    setColumnsQ1(data)
  }

  const cloSet = (
    <div>
      <DragSortingTable columns={columns || []} colChange={columsChange}/>
    </div>

  )

  const handleVisibleChange = (bool: boolean) => {
    setCloSetVisible(bool)
  }

  return (
    <>
      {/* <!-- 工具栏 --> */}
      <Row style={{marginBottom: 8,}}>
        {/* <!-- 自定义工具栏 --> */}
        <Col span={22}>
          {props.tableTools}
        </Col>
        {/* <!-- 基础的工具栏 --> */}
        {showHRTool ?
          (<Col span={2} style={{textAlign: 'right', paddingRight: 16}}>
            <Tooltip title="密度">
              <Dropdown overlay={sizeSetMenu} trigger={['click']} placement="bottomCenter">
                <ColumnHeightOutlined style={{fontSize: 16, marginRight: 16, paddingTop: 8}}/>
              </Dropdown>
            </Tooltip>
              <Tooltip title="列设置">
                <Dropdown
                  overlay={cloSet}
                  trigger={['click']}
                  placement="bottomRight"
                  onVisibleChange={handleVisibleChange}
                  visible={cloSetVisible}>
                  <SettingOutlined style={{fontSize: 16}}/>
                </Dropdown>
              </Tooltip>
          </Col>
        ) : null}
      </Row>

      <Table
        rowClassName="editable-row"
        {...props}
        size={sizeQ1}
        dataSource={dataSource}
        columns={columnsQ1}
        onChange={handleTableChange}
      />
    </>
  )
}

export default Q1Tabel
