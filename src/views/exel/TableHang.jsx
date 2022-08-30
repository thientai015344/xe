import { useEffect } from "react";
import { useState } from "react";
import ReactHTMLTableToExcel from './ReactHTMLTableToExcel';
import NumberFormat from 'react-number-format';



function TableHang(props) {

    const { arrhang, to, from } = props;
    const [total, setTotal] = useState(0);
    console.log('hahaa', arrhang)

    const current = new Date();
    const ngay = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;

    useEffect(() => {
        let sum = 0;
        arrhang?.map(item => {
            sum += +item.gia;
        })
        if (sum > 0) {
            setTotal(<NumberFormat
                thousandSeparator={'.'}
                decimalSeparator={false}
                suffix={' VNĐ'}
                value={sum}
                displayType={"text"}
            />)
        }
    }, [arrhang])

    return (
        <div className="App">
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table-to-xls"
                filename={"xuat ngay" + ngay}
                sheet="data chi"
                buttonText="Xuất Excel "
            />
            <table
                id="table-to-xls"
                className="hide"
            >
                <tbody >
                    <tr></tr>
                    <tr style={{ height: "50px", textAlign: 'center' }}>
                        <td></td>
                        <td colSpan={6}
                            style={{
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "16pt",
                                verticalAlign: "middle",
                                whiteSpace: "nowrap",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >NHÀ XE TOÀN THÔNG (Tuyến Đắc Lắk - Đà Nẵng)</td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td></td>
                        <td colSpan={6}
                            style={{
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                color: "#000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11pt",
                                verticalAlign: "middle",
                                whiteSpace: "nowrap",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            Địa chỉ: 128 Hùng Vương, tỉnh lộ 8, Thị trấn Quảng Phú, H. Cư M'gar, T.Đắc LắK
                        </td>
                    </tr>
                    <tr></tr>
                    <tr style={{ height: "33px" }}>
                        <td></td>
                        <td
                            colSpan={6}
                            style={{
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "14pt",
                                verticalAlign: "middle",
                                whiteSpace: "nowrap",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px",
                            }}

                        >
                            THỐNG KÊ DOANH THU NHÀ XE TOÀN THÔNG
                        </td>
                    </tr>
                    <tr style={{ height: "33px", fontFamily: '"Times New Roman"' }}>
                        <td className="s13"></td>
                        <td style={{ textAlign: "right" }}>
                            Từ ngày:
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>{from}</td>


                        <td style={{ textAlign: "right" }}>
                            Đến ngày:
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>{to}</td>
                    </tr>

                    <tr style={{ height: "33px", fontFamily: '"Times New Roman"' }}>
                        <td className="s13"></td>
                        <td style={{ textAlign: "right" }}>
                            Xe:
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}></td>
                    </tr>
                    <tr style={{ height: "33px" }}>
                        <td className="s21"></td>
                        <td className="s21"></td>
                        <td className="s22"></td>
                        <td className="s23"></td>
                        <td className="s23"></td>
                        <td className="s21"></td>
                        <td className="s23"></td>
                    </tr>
                    <tr >
                        <td></td>
                        <td
                            style={{

                                borderCollapse: "collapse",
                                backgroundColor: "#ccc",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11spt",
                                verticalAlign: "middle",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            STT
                        </td>
                        <td
                            style={{

                                borderCollapse: "collapse",
                                backgroundColor: "#ccc",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11pt",
                                verticalAlign: "middle",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            Xe
                        </td>
                        <td
                            style={{

                                borderCollapse: "collapse",
                                backgroundColor: "#ccc",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11pt",
                                verticalAlign: "middle",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            Tên hàng
                        </td>
                        <td
                            style={{

                                borderCollapse: "collapse",
                                backgroundColor: "#ccc",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11pt",
                                verticalAlign: "middle",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            Tên khách hàng
                        </td>
                        <td
                            style={{

                                borderCollapse: "collapse",
                                backgroundColor: "#ccc",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11pt",
                                verticalAlign: "middle",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            Số điện thoại
                        </td>
                        <td
                            style={{

                                borderCollapse: "collapse",
                                backgroundColor: "#ccc",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11pt",
                                verticalAlign: "middle",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            Ngày gửi
                        </td>
                        <td
                            style={{

                                borderCollapse: "collapse",
                                backgroundColor: "#ccc",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#000000",
                                fontFamily: '"Times New Roman"',
                                fontSize: "11pt",
                                verticalAlign: "middle",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                direction: "ltr",
                                padding: "0px 3px 0px 3px"
                            }}
                        >
                            Thành tiền
                        </td>

                    </tr>

                    {arrhang && arrhang.length > 0 && arrhang.map((item, index) => (
                        <tr key={index} >
                            <td></td>
                            <td>{index + 1}</td>
                            <td>{item.platesCar}</td>
                            <td>{item.namehang}</td>
                            <td>{item.nameuser}</td>
                            <td>{item.sdt}</td>
                            <td>{item.date}</td>
                            <td><NumberFormat
                                thousandSeparator={'.'}
                                decimalSeparator={false}
                                suffix={' VNĐ'}
                                value={item.gia}
                                displayType={"text"}
                            /></td>
                        </tr>
                    ))}

                    <tr >
                        <td></td>
                        <td
                            style={{
                                fontWeight: "bold",
                                color: "#000000"
                            }}
                            colSpan="6"
                        >
                            Tổng:
                        </td>
                        <td style={{
                            //
                            // borderCollapse: "collapse",
                            backgroundColor: "#ccc",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#000000",
                            fontFamily: '"Times New Roman"',
                            fontSize: "11pt",
                            verticalAlign: "middle",
                            whiteSpace: "normal",
                            overflow: "hidden",
                            wordWrap: "break-word",
                            direction: "ltr",
                            padding: "0px 3px 0px 3px"
                        }}>
                            {total}

                        </td>

                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{ fontFamily: '"Times New Roman"', fontSize: "11pt", textAlign: "left" }}>  Người in:</td>
                        <td style={{ fontFamily: '"Times New Roman"', fontSize: "11pt", textAlign: "left" }}>admin</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{ fontFamily: '"Times New Roman"', fontSize: "11pt", textAlign: "left" }}> Ngày in:</td>
                        <td style={{ fontFamily: '"Times New Roman"', fontSize: "11pt", textAlign: "left" }}>{ngay}</td>
                    </tr>



                </tbody>
            </table>
        </div>
    );
}

export default TableHang;