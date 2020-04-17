import React, { useState } from 'react'
import { ColumnProps } from 'antd/es/table';
import {
  Table,
  Row,
  Col,
  Menu,
  Dropdown,
  Tooltip,
} from 'antd'
import { ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import {SizeType, ColumnsType, SizeValType} from './TableList'
import DragSortingTableBk from '@/components/Q1Tabel/DragSortingTable'


const res = {"pageSize":10,"pageIndex":1,"totalCount":64,"datas":[{"id":"696626993004806144","serverId":1,"serverName":"1服","accountId":0,"actorId":104792065,"actorName":"妃非妃","goodsId":1,"goodsName":"1000","awardCount":1000,"amount":1000,"auditStatus":1,"applicantId":"bc7bf732-c4bb-4b00-99b4-905ddcc260ae","applicantName":"章琪","applyReason":"1","applyTime":"2020-03-30T07:40:37Z","reviewerId":null,"reviewerName":null,"reviewReason":"","reviewTime":null,"updateTime":"2020-03-30T07:40:37Z","deleteTime":null},{"id":"694457987963551744","serverId":1,"serverName":"1服","accountId":0,"actorId":104792065,"actorName":"妃非妃","goodsId":4,"goodsName":"10000","awardCount":10000,"amount":10000,"auditStatus":3,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"100","applyTime":"2020-03-27T08:00:04Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"2","reviewTime":"2020-03-27T08:00:20Z","updateTime":"2020-03-27T08:00:20Z","deleteTime":null},{"id":"694457479173505024","serverId":1,"serverName":"1服","accountId":0,"actorId":104792065,"actorName":"妃非妃","goodsId":3,"goodsName":"5000","awardCount":5000,"amount":5000,"auditStatus":3,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"50","applyTime":"2020-03-27T07:59:04Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"50","reviewTime":"2020-03-27T07:59:20Z","updateTime":"2020-03-27T07:59:20Z","deleteTime":null},{"id":"694456899076096000","serverId":1,"serverName":"1服","accountId":0,"actorId":104792065,"actorName":"妃非妃","goodsId":2,"goodsName":"2000","awardCount":2000,"amount":2000,"auditStatus":2,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"1 20","applyTime":"2020-03-27T07:57:54Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"20","reviewTime":"2020-03-27T07:58:05Z","updateTime":"2020-03-27T07:58:05Z","deleteTime":null},{"id":"691626495533121536","serverId":1,"serverName":"1服","accountId":0,"actorId":104792065,"actorName":"妃非妃","goodsId":1,"goodsName":"1000","awardCount":1000,"amount":1000,"auditStatus":2,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"10","applyTime":"2020-03-23T10:14:24Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"10","reviewTime":"2020-03-23T10:14:31Z","updateTime":"2020-03-23T10:14:31Z","deleteTime":null},{"id":"691556742277890048","serverId":1,"serverName":"1服","accountId":0,"actorId":131073,"actorName":"笨笨生活","goodsId":4,"goodsName":"10000","awardCount":10000,"amount":10000,"auditStatus":3,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"100？","applyTime":"2020-03-23T07:55:49Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"??","reviewTime":"2020-03-23T07:56:36Z","updateTime":"2020-03-23T07:56:36Z","deleteTime":null},{"id":"691556314521796608","serverId":1,"serverName":"1服","accountId":0,"actorId":131073,"actorName":"孤狼无敌","goodsId":3,"goodsName":"5000","awardCount":5000,"amount":5000,"auditStatus":2,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"50？","applyTime":"2020-03-23T07:54:58Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"+50","reviewTime":"2020-03-23T07:55:05Z","updateTime":"2020-03-23T07:55:05Z","deleteTime":null},{"id":"691555541394128896","serverId":1,"serverName":"1服","accountId":0,"actorId":131073,"actorName":"孤狼无敌","goodsId":3,"goodsName":"5000","awardCount":5000,"amount":5000,"auditStatus":3,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"60+50","applyTime":"2020-03-23T07:53:26Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"？","reviewTime":"2020-03-23T07:54:33Z","updateTime":"2020-03-23T07:54:33Z","deleteTime":null},{"id":"691554837774467072","serverId":1,"serverName":"1服","accountId":0,"actorId":131073,"actorName":"笨笨生活","goodsId":2,"goodsName":"2000","awardCount":2000,"amount":2000,"auditStatus":2,"applicantId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","applicantName":"汤芳","applyReason":"40+20   ","applyTime":"2020-03-23T07:52:02Z","reviewerId":"c117c12b-2d5b-451f-88a4-d9774cbc1638","reviewerName":"汤芳","reviewReason":"60","reviewTime":"2020-03-23T07:52:13Z","updateTime":"2020-03-23T07:52:13Z","deleteTime":null},{"id":"691553664875102208","serverId":2,"serverName":"2服","accountId":0,"actorId":29556738,"actorName":"也是雨天","goodsId":2,"goodsName":"2000","awardCount":2000,"amount":2000,"auditStatus":2,"applicantId":"436abdc4-1f1d-48bc-a468-59567f8d50e7","applicantName":"刘奕良","applyReason":"30","applyTime":"2020-03-23T07:40:49Z","reviewerId":"436abdc4-1f1d-48bc-a468-59567f8d50e7","reviewerName":"刘奕良","reviewReason":"888","reviewTime":"2020-03-23T07:41:01Z","updateTime":"2020-03-23T07:41:01Z","deleteTime":null}]}


export const sizeOptions: SizeValType[] = [
  { value: 'default', label: '默认' },
  { value: 'middle', label: '中等' },
  { value: 'small', label: '紧凑' },
]

const defaultTableData = [
  {
    dataIndex: 'serverId',
    title: '游戏世界',
    switch: 1,
    align: 'center',
    fixed: 'left',
  },
  {
    dataIndex: 'actorId',
    title: '角色名(ID)',
    switch: 1,
    align: 'center',
    fixed: 'left',
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
    width: 260,
    switch: 1,
    align: 'center'
  },
  {
    dataIndex: 'action',
    title: '操作',
    width: 120,
    switch: 1,
    align: 'center',
    fixed: 'right',
  },
]

const InnerAccout = (props: any) => {
  // 过滤原始数据，清除switch为0或者不存在的
  const defaultTableDataTrans = (defaultTableData.length && defaultTableData.filter(
    (item: any) => item.switch)) || []
  const [dataSource, setDataSource] = useState(res.datas)
  const [columns, setColumns] = useState(defaultTableDataTrans)
  const [pagination, setPagination] = useState({})
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [tableSize, setTableSize] = useState<SizeType>('default')
  const [cloSetVisible, setCloSetVisible] = useState<boolean>(false)


  const handleTableChange = (page: any, filters: any, sorter: any) => {
    console.log(page, filters, sorter)
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
    const data = val.filter(item => item.switch)
    console.log(data);
    setColumns(data)
  }

  const cloSet = (
      <div>
        <DragSortingTableBk colums={defaultTableData} colChange={columsChange}/>
      </div>

  )
  // const batchBtn = () => {
  //   console.log('batchBtn')
  // }
  // const tableTitle = () => {
  //   return (
  //     <button onClick={batchBtn}>'Here is title'</button>
  //   )
  // };
  const handleVisibleChange = (e) => {
    setCloSetVisible(e)
  }

  return (
    <>
      <Row>
        <Col span={20}> </Col>
        <Col span={4}>
          <Tooltip title="密度">
            <Dropdown overlay={sizeSetMenu} trigger={['click']}>
              <ColumnHeightOutlined style={{ fontSize: 16 }} />
            </Dropdown>
          </Tooltip>
          <Tooltip title="列设置">
            <Dropdown
              overlay={cloSet}
              trigger={['click']}
              placement="bottomRight"
              onVisibleChange={handleVisibleChange}
              visible={cloSetVisible}>
              <SettingOutlined style={{ fontSize: 16 }} />
            </Dropdown>
          </Tooltip>
        </Col>
      </Row>
      <Table<ColumnsType>
        // title={tableTitle}
        bordered
        scroll={{ x: 1300 }}
        size={tableSize}
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        loading={loadingTable}
        onChange={handleTableChange}
      />
    </>
  )
}

export default InnerAccout
