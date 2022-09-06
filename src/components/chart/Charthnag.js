import React, { useEffect, useRef, useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';

const ChartHnag = (props) => {

    const [total, setTotal] = useState(0);

    const { arrhang } = props;



    useEffect(() => {
        let sum = 0;
        arrhang?.map(item => {
            sum += +item.gia;
        })
        if (sum > 0) {
            setTotal(sum)
        }
    }, [arrhang])



    const [d, setD] = useState({
        columns: [

            {
                label: 'Xe',
                field: 'platesCar',
                width: 150,
            },
            {
                label: 'Tên hàng',
                field: 'namehang',
                width: 200,
            },
            {
                label: 'Tên khách hàng',
                field: 'nameuser',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Số điện thoại ',
                field: 'sdt',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'Ngày gửi',
                field: 'date',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Giá tiền ',
                field: 'friceformate',
                sort: 'disabled',
                width: 150,
            },

        ],
        rows: [

        ],
    });


    useEffect(() => {

        setD({
            columns: [...d.columns],
            rows: arrhang
        })

    }, [arrhang])


    useEffect(() => {
        console.log(">>>> check d: ", d)
    }, [d])





    const componentRef = useRef();







    return (
        < div ref={componentRef}>
            {<span className="tongtien">Tổng tiền hàng = {total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </span>}
            <CDBContainer>
                <CDBCard>
                    <CDBCardBody>

                        <CDBDataTable
                            striped
                            bordered
                            hover
                            scrollX
                            scrollY
                            maxHeight="300xp"
                            data={d}
                            materialSearch
                            fullPagination
                            exportToCSV={true}
                        />
                    </CDBCardBody>
                </CDBCard>
            </CDBContainer>
        </div>
    );
};

export default ChartHnag;