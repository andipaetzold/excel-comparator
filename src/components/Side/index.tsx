import Sheet from "../../types/Sheet";
import XLSX from "xlsx";
import UploadExcel from "./UploadExcel";
import SheetTable from "../SheetTable";

interface Props {
    onSheet: (sheet: XLSX.Sheet) => void;
    sheet: Sheet | undefined;
}

export default function Side({ sheet, onSheet }: Props) {
    return (
        <>
            <UploadExcel onUpload={onSheet} />
            {sheet && <SheetTable sheet={sheet} />}
        </>
    );
}
