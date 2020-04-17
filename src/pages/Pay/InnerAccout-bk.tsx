import React, { useEffect, useState } from 'react';
import { getWorld, queryInnerAccountList } from '@/services/pay';
import { Button, Form, Input, Select, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { SizeVal, OptionVal, ColumnsType } from './TableList';

const { Option } = Select;

const queryT = { gameId: 2119, gameVersion: "ZLTJ" }

export const accountTypeOptions: OptionVal[] = [
  { id: 1, value: 1, label: '引导号' },
  { id: 2, value: 2, label: '福利号' },
  { id: 3, value: 3, label: '外放号' }
]
export const accountStateOptions: OptionVal[] = [
  { id: 1, value: 1, label: '正常' },
  { id: 2, value: 2, label: '停用' }
]
export const accountSelectOptions: SizeVal[] = [
  { value: 'accountId', label: '账号ID' },
  { value: 'actorName', label: '角色名称' },
  { value: 'actorId', label: '角色ID' }
]


const columns:ColumnProps<ColumnsType>[] = [
  {
    dataIndex: 'accountId',
    title: '账号',
    align: "center"
  },
  {
    dataIndex: 'actorId',
    title: '角色(ID)',

    align: "center"
  },
  {
    dataIndex: 'serverId',
    title: '游戏世界(ID)',

    align: "center"
  },
  {
    dataIndex: 'accountType',
    title: '账号类型',

    align: "center"
  },
  {
    dataIndex: 'amounts',
    title: '角色内部充值总额(元)',

    align: "center"
  },
  {
    dataIndex: 'accountStatus',
    title: '账号状态',

    align: "center"
  },
  {
    dataIndex: 'remark',
    title: '备注',

    align: "center"
  },
  {
    dataIndex: 'creatorName',
    title: '添加人',

    align: "center"
  },
  {
    dataIndex: 'createTime',
    title: '添加时间',
    width: 160,

    align: "center"
  },
  {
    dataIndex: 'action',
    title: '操作',
    width: 100,

    align: "center"
  }
]

const InnerAccout = () => {
  const [form] = Form.useForm();
  const [accountS, setAccountS] = useState('accountId')
  const [serverIdOptions, setServerIdOptions] = useState([])
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    getWorld(queryT).then((res: never[]) => {
      if(Array.isArray(res)){
        setServerIdOptions(res)
      }
    })

  }, [])
  const serchList = (parms: any) => {
    queryInnerAccountList(queryT, { data: parms }).then((res: any) => {
      setDataSource(res.datas)
    }).catch()
  }
  const onFinish = (values: any) => {
    console.log(values)
    const parms = {
      "gameInfoDto": { "gameId": 2119, "gameVersion": "ZLTJ" },
      "pageFilterDto": {
        "filters": [{ "filterType": 5, "fieldName": "accountStatus", "value": "1" }],
        "pageIndex": 1,
        "pageSize": 20,
        "sorts": { "createTime": "desc" }
      }
    }
    serchList(parms)

  };
  const onReset = () => {
    form.resetFields();
    setAccountS('accountId')
  };
  const serverIdChange = (values: any) => {
    console.log(values)
  }

  const accountTypeChange = (values: any) => {
    console.log(values)
  }

  const accountStateChange = (values: any) => {
    console.log(values)
  }

  return (
    <>
      <div style={{ "marginBottom": '10px', 'padding': '10px', 'backgroundColor': '#fff' }}>
        <Form
          layout="inline"
          name="basic"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name="serverId">
            <Select placeholder="请选择游戏世界" onChange={serverIdChange} allowClear mode="multiple"
              optionLabelProp='label'
              style={{ width: '180px' }}>
              {serverIdOptions.map((item: any) =>
                <Option key={item.id} value={item.id} label={item.name + item.id}>
                  {item.name}
                </Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name="accountType">
            <Select placeholder="账号类型" onChange={accountTypeChange} allowClear style={{ width: '180px' }}>
              {accountTypeOptions.map((item: any) =>
                <Option key={item.id} value={item.id}>
                  {item.label}
                </Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name="accountState">
            <Select placeholder="账号状态" onChange={accountStateChange} allowClear style={{ width: '180px' }}>
              {accountStateOptions.map((item: any) =>
                <Option key={item.id} value={item.id}>
                  {item.label}
                </Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name={accountS}>
            <Input.Group compact>
              <Select defaultValue={accountS} onChange={e => {
                setAccountS(e)
              }}>
                {accountSelectOptions.map((item) =>
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                )}
              </Select>
              <Form.Item name={accountS}>
                <Input style={{ width: '50%' }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onReset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Table<ColumnsType> bordered rowKey='id' columns={columns} dataSource={dataSource} />;
      </div>
    </>
  );
};



export default InnerAccout
