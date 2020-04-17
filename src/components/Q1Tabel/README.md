# Q1Tabel组件说明
## 使用方法：
定义插槽：
```javascript
<!-- Table.tsx -->
import React from 'react';
import Q1Tabel from '@/components/Q1Tabel' //引入Q1Tabel组件
import {ColumnPropsSwith} from "@/components/Q1Tabel/Q1Table"; //引入类型验证

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
        showHeaderRightTool={false}
        tableTools={headerTop}
        dataSource={datas}
      />
    </>
  );
}

export default TableDemo
```

## 参数说明
以下为新增参数，其他请参照[官网api](https://ant.design/components/table-cn/#API)
1. columns 参数

|  参数    |   说明   |   类型   |  默认值  |
|:--------:|:--------:|:--------:|:--------:|
|switch    |是否展示列| 0/ 1/ undefined| undefined|

> 注意：若使用TS，则需扩展ColumnProps参数，这里使用ColumnPropsSwith

2. showHeaderRightTool 参数

|  参数    |   说明   |   类型   |  默认值  |
|:--------:|:--------:|:--------:|:--------:|
|showHeaderRightTool|是否头部右侧基础工具|boolean| true|

3. tableTools参数

|  参数    |   说明   |   类型   |  默认值  |
|:--------:|:--------:|:--------:|:--------:|
|tableTools|是否扩展头部功能|React.ReactNode| - |

## 单元格默认占位符
在全局样式下新增以下css
```
/* table 组件空单元格自动填充占位符‘–’*/
.ant-table-tbody > tr > td:empty:before {
  content: '-';
}
.ant-table-tbody > tr > td *:empty:before {
  content: '-';
}
```
