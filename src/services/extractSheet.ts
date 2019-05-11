import XLSX from "xlsx";
import Sheet from "types/Sheet";
import extractData from "./extractData";
import extractHeaders from "./extractHeaders";

export default function extractSheet(sheet: XLSX.Sheet): Sheet {
    const headers = extractHeaders(sheet);
    const data = extractData(sheet, headers.length);

    return { headers, data };
}
