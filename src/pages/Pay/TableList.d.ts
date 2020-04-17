export interface SizeVal {
    value: string;
    label: string;
}

export interface SizeVal {
  value: string;
  label: string;
}


export interface OptionVal {
    id?: number;
    value: number;
    label: string;
}

export declare type SizeType = 'default' | 'middle' | 'small';

export interface SizeValType extends SizeVal {
    value: SizeType;
}


export interface ColumnsType {
    key?: string;
    dataIndex?: string;
    title?: string;
    switch?: 0 | 1 | undefined;
    align?: string;
    width?: number;
    fixed?: boolean | 'left' | 'right';
    defaultSortOrder?: 'ascend' | 'descend';
}


export interface parmsVal {
    gameInfoDto: {
        gameId: number;
        gameVersion: string;
    };
    pageFilterDto: {
        filters: any[];
        pageIndex: number;
        pageSize: number;
        sorts: {
            [propName: string]: 'desc' | 'asc'
        };
    };
}
