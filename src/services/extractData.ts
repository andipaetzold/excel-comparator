import XLSX, { CellObject } from "xlsx";
import getColumnName from "./getColumnName";

export default function extractData(sheet: XLSX.Sheet, headerCount: number) {
    const result = [];
    let i = 2;
    while (true) {
        const row: { [ref: string]: { cell: CellObject; value: string } } = {};
        for (let headerIndex = 0; headerIndex < headerCount; ++headerIndex) {
            const headerChar = getColumnName(headerIndex);
            const cellRef = `${headerChar}${i}`;

            const cell: CellObject = sheet[cellRef];
            row[headerIndex] = {
                cell,
                value: getValue(cell)
            };
        }

        if (Object.values(row).filter(cell => cell.value !== "").length === 0) {
            break;
        }

        result.push(row);
        ++i;
    }

    return result;
}

function getValue(cell: any): string {
    if (!cell) {
        return "";
    } else if (cell.w) {
        return cell.w.toString().trim();
    } else if (cell.v) {
        return cell.v.toString().trim();
    } else {
        return "";
    }
}
