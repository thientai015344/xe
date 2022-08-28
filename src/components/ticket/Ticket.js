import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../../assets/css/ve.css'
import { Button } from "react-bootstrap";


const Ticket = () => {

    const componentRef = useRef();
    const pageStyle = `{ size: 3.8in 5.3in }`;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
        pageStyle: pageStyle

    });




    return (
        <>
            <Button onClick={handlePrint} >dd</Button>


            <div ref={componentRef} className='kichthuoc'>
                <style>{pageStyle}</style>
                <h5 className='namenx'>NHÀ XE TOÀN THÔNG</h5><span className='tuyen'>Tuyến (ĐắkLắk - Đà Nẵng)</span>
                <p className='diachi'> Địa chỉ: 128 Hừng Vương, tỉnh lộ 8, thị trấn Quảng Phú, h. Cư M'gar, t.ĐắkLắk </p>
                <h4 className='thexe' > THẺ LÊN XE</h4>

                <p className='bienso'>Xe: 47A-55621</p>
                <div className='d-flex'>

                    <div className='d-flex col-6 '>
                        <p className='nl'>Nơi đi:</p>
                        <h6>ĐắkLắk</h6>
                    </div>
                    <div className='d-flex col-6 '>
                        <p className='nl'>Nơi đến</p>
                        <h6>Đà Nẵng</h6>
                    </div>
                </div>
                <div className='d-flex'>

                    <div className='d-flex col-6 '>
                        <p className='nl'>Ngày xuất phát</p>
                        <h6>27/08/2022</h6>
                    </div>
                    <div className='d-flex col-6 '>
                        <p className='nl'>Số Ghế</p>
                        <h6>A1,A5</h6>
                    </div>
                </div>
                <div className='d-flex'>

                    <div className='d-flex col-6 '>
                        <p className='nl'>Tên khách hàng</p>
                        <h6>Tài</h6>
                    </div>
                    <div className='d-flex col-6 '>
                        <p className='nl'>Tổng tiền</p>
                        <h6>360.000 VND</h6>
                    </div>
                </div>
                <div className='d-flex'>

                    <div className='d-flex col-6 '>
                        <p className='nl'>Số điện thoại</p>
                        <h6>0333301292</h6>
                    </div>
                    {/* <div className=''>
                   <p className='nl'></p>
                    <h6></h6>
                </div> */}
                </div>

            </div>


        </>

    );
};

export default Ticket;