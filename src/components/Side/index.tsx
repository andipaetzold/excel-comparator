import React from "react";
import Sheet from "types/Sheet";
import XLSX from "xlsx";
import Table from "./Table";
import UploadExcel from "./UploadExcel";

interface Props {
    onSheet: (sheet: XLSX.Sheet) => void;
    sheet: Sheet | undefined;
}

export default function Side({ sheet, onSheet }: Props) {
    return (
        <>
            <UploadExcel onUpload={onSheet} />
            {sheet && <Table sheet={sheet} />}
        </>
    );
}
