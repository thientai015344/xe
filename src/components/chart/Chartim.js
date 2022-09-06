import React, { useEffect, useRef, useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import NumberFormat from 'react-number-format';

const Chsrtim = (props) => {

    const [total, setTotal] = useState(0);

    const { arrayseatloop } = props;

    console.log(arrayseatloop)


    useEffect(() => {
        let sum = 0;
        arrayseatloop?.map(item => {
            sum += +item.gia;
        })
        if (sum > 0) {
            setTotal(sum)
        }
    }, [arrayseatloop])



    const [d, setD] = useState({
        columns: [

            {
                label: 'Xe',
                field: 'bienso',
                width: 150,
            },
            {
                label: 'Gế',
                field: 'seatbook',
                width: 200,
            },
            {
                label: 'Tên khách hàng',
                field: 'name',
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
                label: 'Ngày đi ',
                field: 'createdAt',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Giá tiền ',
                field: 'giacol',
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
            rows: arrayseatloop
        })

    }, [arrayseatloop])


    useEffect(() => {
        console.log(">>>> check d: ", d)
    }, [d])





    const componentRef = useRef();







    return (
        < div ref={componentRef}>
            {<span className="tongtien">Tổng tiền Thu vé = {total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </span>}
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

export default Chsrtim;