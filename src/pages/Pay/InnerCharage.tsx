import React from 'react';
import Q1Tabel from '@/components/Q1Tabel'
import {ColumnPropsSwith} from "@/components/Q1Tabel/Q1Table";

const datas = [{
  "id": "1",
  "serverId": 1,
  "actorId": 1001,
  "goodsName": "1服1000",
}, {
  "id": "2",
  "serverId": 1,
  "actorId": 1002,
  "goodsName": "妃非1",
}, {
  "id": "3",
  "actorId": 104792065,
  "goodsName": "妃非妃",
}
]

const defaultColumnsData: ColumnPropsSwith[] = [
  {
    dataIndex: 'serverId',
    title: '游戏世界',
    switch: 1,
    align: 'center',
    fixed: 'left',
  },
  {
    dataIndex: 'goodsName',
    title: '商品名',
    switch: 0,
    align: 'center',
  },
  {
    dataIndex: 'actorId',
    title: '角色名(ID)',
    switch: 1,
    align: 'center',
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

const TableDemo = () => {
  const headerTop = (
    <div>
      <button onClick={()=>{ window.alert('批量删除')}}>批量删除</button>
      <button onClick={()=>{ window.alert('批量通过')}}>批量通过</button>
    </div>
  )
  return (
    <>
      <Q1Tabel
        bordered
        size='small'
        rowKey="id"
        columns={defaultColumnsData}
        tableTools={headerTop}
        dataSource={datas}
      />
    </>
  );
}

export default TableDemo
