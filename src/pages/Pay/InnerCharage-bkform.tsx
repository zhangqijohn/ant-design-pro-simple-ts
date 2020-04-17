import React, { useEffect, useState } from 'react'
import { getWorld, queryInnerPayList } from '@/services/pay'
// import { simpleFormat } from '@/utils/date'
import { ColumnProps } from 'antd/es/table';
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Card,
  // Popconfirm,
  message,
  Row,
  Col,
  Menu,
  Dropdown,
  Tooltip,
} from 'antd'
import { ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { OptionVal, SizeVal, SizeType, SizeValType, ColumnsType, parmsVal } from './TableList'
import DragSortingTableBk from './components/DragSortingTable'


const { Option } = Select

const queryT = { gameId: 2119, gameVersion: 'ZLTJ' }


export const accountTypeOptions: OptionVal[] = [
  { id: 1, value: 1, label: '引导号' },
  { id: 2, value: 2, label: '福利号' },
  { id: 3, value: 3, label: '外放号' },
]
export const accountStateOptions: OptionVal[] = [
  { id: 1, value: 1, label: '正常' },
  { id: 2, value: 2, label: '停用' },
]
export const accountSelectOptions: SizeVal[] = [
  { value: 'accountId', label: '账号ID' },
  { value: 'actorName', label: '角色名称' },
  { value: 'actorId', label: '角色ID' },
]

export const sizeOptions: SizeValType[] = [
  { value: 'default', label: '默认' },
  { value: 'middle', label: '中等' },
  { value: 'small', label: '紧凑' },
]

// 默认数据，包含不展示列， switch开发控制
const defaultTableData = [
  {
    dataIndex: 'serverId',
    title: '游戏世界',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'actorId',
    title: '角色名(ID)',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'goodsId',
    title: '商品名(ID)',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'awardCount',
    title: '购买钻石数额',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'amount',
    title: '充值金额(元)',
    // sortable: 'custom',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'auditStatus',
    title: '审核状态',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'applicantName',
    title: '申请人',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'applyReason',
    title: '申请理由',
    width: 160,
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'applyTime',
    title: '申请时间',
    width: 160,
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'reviewerName',
    title: '审核人',
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'reviewReason',
    title: '审核原因',
    width: 160,
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'reviewTime',
    title: '审核时间',
    width: 160,
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'action',
    title: '操作',
    width: 120,
    switch: 1,
    align: 'center'
  }
]
// 过滤原始数据，清除switch为0或者不存在的
const defaultTableDataTrans = (defaultTableData.length && defaultTableData.filter(
  (item: any)=> item.switch
)) || []

const InnerAccout = (props: any) => {
  console.log(props);
  const [form] = Form.useForm()
  const [accountS, setAccountS] = useState('accountId')
  const [serverIdOptions, setServerIdOptions] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({})
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [tableSize, setTableSize] = useState<SizeType>('default')
  const columnGroups = defaultTableDataTrans
  const [columns, setColumns] = useState(columnGroups)

  useEffect(() => {
    getWorld(queryT).then((res: never[]) => {
      if(Array.isArray(res)){
        setServerIdOptions(res)
      }
    })
  }, [])

  const serchList = (parms: parmsVal) => {
    setLoadingTable(true)
    queryInnerPayList(queryT, { data: parms })
      .then(res => {
        setDataSource(res.datas)
        setPagination({
          total: res.totalCount,
          current: res.pageIndex,
          pageSize: res.pageSize,
        })
        setLoadingTable(false)
      })
      .catch()
  }
  const onFinish = (values: any) => {
    console.log(values)
    const parms: parmsVal = {
      gameInfoDto: { gameId: 2119, gameVersion: 'ZLTJ' },
      pageFilterDto: {
        filters: [],
        pageIndex: 1,
        pageSize: 10,
        sorts: { applyTime: 'desc' },
      },
    }
    serchList(parms)
  }
  const onReset = () => {
    form.resetFields()
    setAccountS('accountId')
  }
  const serverIdChange = (values: any) => {
    console.log(values)
  }

  const accountTypeChange = (values: any) => {
    console.log(values)
  }

  const accountStateChange = (values: any) => {
    console.log(values)
  }

  const handleTableChange = (page: any, filters: any, sorter: any) => {
    console.log(filters, sorter)
    const pager: any = { ...pagination }
    pager.current = page.current
    setPagination(pager)
    const parms: parmsVal = {
      gameInfoDto: { gameId: 2119, gameVersion: 'ZLTJ' },
      pageFilterDto: {
        filters: [],
        pageIndex: page.current,
        pageSize: page.pageSize,
        sorts: { applyTime: 'desc' },
      },
    }
    serchList(parms)
  }
  const handleDelete = (values: any) => {
    console.log(values)
    message.success('handleDelete ok')
  }

  const sizeSetMenu = (
    <Menu selectedKeys={['default']}>
      {sizeOptions.map(item => (
        <Menu.Item key={item.value}>
          <a
            onClick={() => {
              setTableSize(item.value)
            }}
          >
            {item.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  )
  const columsChange = (val: ColumnProps<ColumnsType>[]) =>{
    setColumns([...val])
  }

  const cloSet = (
    <DragSortingTableBk colums={defaultTableData} colChange={columsChange}/>
  )

  return (
    <>
      <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff' }}>
        <Form layout="inline" name="basic" form={form} onFinish={onFinish}>
          <Form.Item name="serverId">
            <Select
              placeholder="请选择游戏世界"
              onChange={serverIdChange}
              allowClear
              mode="multiple"
              optionLabelProp="label"
              style={{ width: '180px' }}
            >
              {serverIdOptions.map((item: any) => (
                <Option key={item.id} value={item.id} label={item.name + item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="accountType">
            <Select
              placeholder="账号类型"
              onChange={accountTypeChange}
              allowClear
              style={{ width: '180px' }}
            >
              {accountTypeOptions.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="accountState">
            <Select
              placeholder="账号状态"
              onChange={accountStateChange}
              allowClear
              style={{ width: '180px' }}
            >
              {accountStateOptions.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={accountS}>
            <Input.Group compact>
              <Select
                defaultValue={accountS}
                onChange={e => {
                  setAccountS(e)
                }}
              >
                {accountSelectOptions.map(item => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
              <Form.Item name={accountS}>
                <Input style={{ width: '50%' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Row>
          <Col span={20}> </Col>
          <Col span={4}>
            <Tooltip title="密度">
              <Dropdown overlay={sizeSetMenu} trigger={['click']}>
                <ColumnHeightOutlined style={{ fontSize: 16 }} />
              </Dropdown>
            </Tooltip>
            <Tooltip title="列设置">
              <Dropdown overlay={cloSet} trigger={['click']}>
                <SettingOutlined style={{ fontSize: 16 }} />
              </Dropdown>
            </Tooltip>
          </Col>
        </Row>
        <Table<ColumnsType>
          bordered
          size={tableSize}
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          loading={loadingTable}
          onChange={handleTableChange}
        />
      </Card>

    </>
  )
}

export default InnerAccout
