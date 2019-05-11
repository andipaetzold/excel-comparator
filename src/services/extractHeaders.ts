import XLSX from "xlsx";
import getColumnName from "./getColumnName";

export default function extractHeaders(sheet: XLSX.Sheet) {
    const result = [];

    let i = 0;
    while (true) {
        const column = getColumnName(i);
        const headerCell = `${column}1`;

        if (sheet[headerCell] === undefined) {
            break;
        }
        result.push(sheet[headerCell].v);

        ++i;
    }

    return result;
}
