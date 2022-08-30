import React, { useEffect, useRef, useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';

const Chartex = (props) => {

    const { arrchi } = props;

    console.log('checkarrchi', arrchi)

    const [d, setD] = useState({
        columns: [

            {
                label: 'Xe',
                field: 'platesCar',
                width: 100,
            },
            {
                label: 'Nội dung chi',
                field: 'title',
                width: 150,
            },
            {
                label: 'Ngày chi',
                field: 'date',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Tiền chi',
                field: 'gia',
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
            rows: arrchi
        })

    }, [arrchi])


    useEffect(() => {
        console.log(">>>> check d: ", d)
    }, [d])





    const componentRef = useRef();







    return (
        < div ref={componentRef}>

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

export default Chartex;