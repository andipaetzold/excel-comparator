import { Button, Icon, Upload } from "antd";
import { useCallback } from "react";
import XLSX from "xlsx";

interface Props {
    onUpload: (dataUrl: XLSX.WorkSheet) => void;
}

export default function UploadExcel({ onUpload }: Props) {
    const handleUpload = useCallback((object: object) => {
        const { file } = object as { file: File };
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.readyState !== FileReader.DONE) {
                return;
            }

            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            onUpload(sheet);
        };
        reader.readAsArrayBuffer(file);
    }, [onUpload]);

    return (
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <Upload
                accept="application/msexcel,vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                showUploadList={false}
                customRequest={handleUpload}
            >
                <Button>
                    <Icon type="upload" /> Upload
                </Button>
            </Upload>
        </div>
    );
}
