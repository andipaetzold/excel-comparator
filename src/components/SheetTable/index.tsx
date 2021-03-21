import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import Sheet from "../../types/Sheet";
import Download from "../../components/Download";

interface Props {
    sheet: Sheet;
}

export default function SheetTable({ sheet }: Props) {
    const columns: ColumnProps<any>[] = sheet.headers.map(
        (header, index) =>
            ({
                dataIndex: index.toString(),
                render: ({ value }) => value,
                key: index,
                title: header
            } as ColumnProps<any>)
    );

    return (
        <Table
            columns={columns}
            scroll={{ x: true }}
            size="small"
            dataSource={sheet.data}
            rowKey={(_row, index) => index.toString()}
            footer={() => <Download sheet={sheet} />}
        />
    );
}
