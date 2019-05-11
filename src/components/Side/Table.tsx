import { Table as AntTable } from "antd";
import { ColumnProps } from "antd/lib/table";
import React from "react";
import getColumnName from "services/getColumnName";
import Sheet from "types/Sheet";

interface Props {
    sheet: Sheet;
}

export default function Table({ sheet }: Props) {
    const columns: ColumnProps<any>[] = sheet.headers.map(
        (header, index) =>
            ({
                dataIndex: index.toString(),
                key: index,
                title: header
            } as ColumnProps<any>)
    );

    return <AntTable columns={columns} size="small" dataSource={sheet.data} rowKey={row => row.key} />;
}
