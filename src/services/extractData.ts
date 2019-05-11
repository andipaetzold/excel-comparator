import XLSX from "xlsx";
import getColumnName from "./getColumnName";

export default function extractData(sheet: XLSX.Sheet, headerCount: number) {
    const result = [];

    let i = 2;
    while (true) {
        const row: any = {};
        for (let headerIndex = 0; headerIndex < headerCount; ++headerIndex) {
            const headerChar = getColumnName(headerIndex);
            const cellRef = `${headerChar}${i}`;
            const cell = sheet[cellRef];
            row[headerIndex] = cell && cell.v.toString().trim();
        }

        if (Object.values(row).filter(v => v !== undefined).length === 0) {
            break;
        }

        result.push({ ...row, key: i });
        ++i;
    }

    return result;
}
