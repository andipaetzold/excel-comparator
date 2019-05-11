import { Col, Row } from "antd";
import CompareOptions from "components/CompareOptions";
import Result from "components/Result";
import Side from "components/Side";
import React, { useMemo, useState } from "react";
import extractSheet from "services/extractSheet";
import CompareOption from "types/CompareOption";
import XLSX from "xlsx";

export default function App() {
    const [excelSheetLeft, setSheetLeft] = useState<XLSX.WorkSheet | undefined>();
    const [excelSheetRight, setSheetRight] = useState<XLSX.WorkSheet | undefined>();
    const [options, setOptions] = useState<CompareOption[]>([]);

    const sheetLeft = useMemo(() => {
        if (!excelSheetLeft) {
            return undefined;
        }
        return extractSheet(excelSheetLeft);
    }, [excelSheetLeft]);

    const sheetRight = useMemo(() => {
        if (!excelSheetRight) {
            return undefined;
        }
        return extractSheet(excelSheetRight);
    }, [excelSheetRight]);

    return (
        <div style={{ margin: "5px" }}>
            <Row>
                <Col span={24}>
                    {sheetLeft && sheetRight && (
                        <CompareOptions headersLeft={sheetLeft.headers} headersRight={sheetRight.headers} onChange={setOptions} />
                    )}
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={12}>
                    <Side sheet={sheetLeft} onSheet={setSheetLeft} />
                </Col>
                <Col span={12}>
                    <Side sheet={sheetRight} onSheet={setSheetRight} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>{sheetLeft && sheetRight && <Result options={options} sheetLeft={sheetLeft} sheetRight={sheetRight} />}</Col>
            </Row>
        </div>
    );
}
