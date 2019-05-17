import { Button } from "antd";
import React, { useCallback } from "react";
import getColumnName from "services/getColumnName";
import Sheet from "types/Sheet";
import XLSX, { CellObject } from "xlsx";

interface Props {
    sheet: Sheet;
}

export default function Download({ sheet }: Props) {
    const handleClick = useCallback(() => {
        createPDF(sheet);
    }, [sheet]);

    return <Button onClick={handleClick}>Download</Button>;
}

function createPDF(sheet: Sheet) {
    const data: { [ref: string]: CellObject | string } = {};

    for (let i = 0; i < sheet.headers.length; ++i) {
        const column = getColumnName(i);
        const headerCell = `${column}1`;

        data[headerCell] = { v: sheet.headers[i], t: "s" };
    }

    for (let i = 0; i < sheet.data.length; ++i) {
        for (const [columnIndex, item] of Object.entries(sheet.data[i])) {
            const ref = `${getColumnName(+columnIndex)}${i + 1}`;
            data[ref] = item.cell;
        }
    }

    data["!ref"] = `A1:${getColumnName(sheet.headers.length - 1)}${sheet.data.length + 1}`;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, data, "Export");
    XLSX.writeFile(workbook, "download.xlsx");
}
