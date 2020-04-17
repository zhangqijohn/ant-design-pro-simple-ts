import React, {useEffect, useState} from 'react'
import {Table, Tooltip,} from 'antd';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {PushpinOutlined} from '@ant-design/icons'
import {sortArr} from './js/sortArr'
import {ColumnPropsSwith, fixedType, PropsType} from './Q1Table'

const type = 'DragbleBodyRow';

const DragableBodyRow = ({index, moveRow, className, style, ...restProps}: any): any => {
  const ref = React.useRef();
  const [{isOver, dropClassName}, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const {index: dragIndex} = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: {type, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{cursor: 'move', ...style}}
      {...restProps}
    />
  );
};


function DragSortingTable(props: PropsType) {
  const originDate = props.columns // 保存原始数据
  const originDateKeys = originDate.length && originDate.map((item: any) => {
    if (item.switch) {
      return item.dataIndex
    }
    return []
  }) || [] // 获取原始数据已选中的值
  const [data, setData] = useState(originDate)
  const [selectedRowKeys, setSelectedRowKeys] = useState(originDateKeys)


  // 改变父级table排序
  useEffect(() => {
    if (props && props.colChange)
      props.colChange(data)
  }, [data])


  // 拖动组件
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  // 拖动排序
  const moveRow = (dragIndex: any, hoverIndex: any) => {
    const dragRow = data[dragIndex];
    setData(sortArr(update(
      data,
      {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      }
      )
    ))
  };

  // 列展示显示与隐藏
  const rowSelection: any = {
    selectedRowKeys,
    columnWidth: 30,
    onChange: (selectedRowKeys: Array<string | number>): void => {
      setSelectedRowKeys(selectedRowKeys);
      const modifyData = data.map(orig => {
        orig.switch = 0
        selectedRowKeys.map(modify => {
          if (orig.dataIndex === modify) {
            orig.switch = 1
          }
        })
        return orig
      })
      setData(modifyData)
    },
  }

  // 固定到左侧
  const fixedChange = (rowIndex: number, direction: fixedType) => {
    let originDateS = [...data]
    let dataChange = originDateS[rowIndex]
    // 取消固定
    if (dataChange.fixed && dataChange.fixed === direction) {
      delete originDateS[rowIndex].fixed
      sortArr(originDateS)  // 需要重新排序
    } else {
      // 新增固定 或者 变更固定位置
      dataChange = Object.assign(dataChange, {fixed: direction})
      originDateS.splice(rowIndex, 1)
      originDateS = direction === 'left' ? [dataChange, ...originDateS] : [...originDateS, dataChange]
    }

    setData(originDateS)
  }

  // 固定样式
  const fixedStyle = (recored: ColumnPropsSwith, direction: fixedType) => {
    const reslut = {cursor: 'pointer', marginRight: 8}
    if ((recored.fixed === true || recored.fixed === 'left') && direction === 'left') {
      Object.assign(reslut, {color: '#096dd9'})
    }
    if (recored.fixed === 'right' && direction === 'right') {
      Object.assign(reslut, {color: '#096dd9'})
    }
    return reslut
  }

  // 重置
  const resetSortTable = () => {
    const resetKeys: any[] = []
    const resetArr: ColumnPropsSwith[] = originDate.length && originDate.map(item => {
      resetKeys.push(item.dataIndex)
      return {
        ...item,
        switch: 1,
        fixed: undefined
      }
    }) || []
    setSelectedRowKeys(resetKeys)
    setData(resetArr)
  }

  const columns = [
    {
      title: '列展示',
      dataIndex: 'title',
      key: 'dataIndex',
    },
    {
      dataIndex: 'action',
      title: () => {
        return (<a onClick={resetSortTable}>重置</a>)
      },
      render: (text: any, recored: ColumnPropsSwith, rowIndex: number) =>
        <>
          <Tooltip title="固定到左侧">
            <span onClick={() => fixedChange(rowIndex, 'left')} style={fixedStyle(recored, 'left')}>
              <PushpinOutlined/>
            </span>
          </Tooltip>
          <Tooltip title="固定到右侧">
            <span onClick={() => fixedChange(rowIndex, 'right')} style={fixedStyle(recored, 'right')}>
              <PushpinOutlined style={{transform: 'rotate(-90deg)'}}/>
            </span>
          </Tooltip>
        </>
    }
  ];
  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        size='small'
        rowKey="dataIndex"
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        components={components}
        pagination={false}
        onRow={(record: any, index: any): any => ({
          index,
          moveRow,
        })}
      />
    </DndProvider>
  );

}

export default DragSortingTable
