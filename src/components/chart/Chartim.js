import React, { useEffect, useState } from 'react';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";





const Chartim = () => {


    const names = [
        {
            "title": "mr",
            "firstname": "Lawson",
            "lastname": "Luke",
            "age": 28,
            "occupation": "Software Developer",
            "hobby": "coding"
        },
        {
            "title": "mr",
            "firstname": "Michael",
            "lastname": "Jackson",
            "age": 35,
            "occupation": "Singer",
            "hobby": "dancing"
        },
        {
            "title": "mr",
            "firstname": "Janet",
            "lastname": "Jackson",
            "age": 35,
            "occupation": "Singer",
            "hobby": "dancing"
        }
    ]

    const showTable = () => {



        return (

            names && names.map((item, index) => {
                console.log('itemd', item)
                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold" >{index + 1}</td>
                        <td className="text-xs font-weight-bold" >{item.title}</td>
                        <td className="text-xs font-weight-bold" >{item.firstname + ' ' + item.lastname}</td>
                        <td className="text-xs font-weight-bold" >{item.age}</td>
                        <td className="text-xs font-weight-bold" >{item.hobby}</td>
                        <td className="text-xs font-weight-bold" >{item.occupation}</td>

                    </tr>
                )

            }))






    };

    useEffect(() => {


        showTable()

        fets();



        //  ----------------------------------------  


        //  ----------------------------------------  
    }, []);


    const fets = () => {
        if (!$.fn.DataTable.isDataTable("#myTable")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#table").DataTable({
                        paging: false,
                        searching: false,
                        pagingType: "full_numbers",
                        pageLength: 20,
                        processing: true,
                        dom: "Bfrtip",
                        select: {
                            style: "single",
                        },

                        buttons: [
                            {
                                extend: "pageLength",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "copy",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "csv",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "print",
                                customize: function (win) {
                                    $(win.document.body).css("font-size", "10pt");
                                    $(win.document.body)
                                        .find("table")
                                        .addClass("compact")
                                        .css("font-size", "inherit");
                                },
                                className: "btn btn-secondary bg-secondary",
                            },
                        ],

                        fnRowCallback: function (
                            nRow,

                            iDisplayIndexFull
                        ) {
                            var index = iDisplayIndexFull + 1;
                            $("td:first", nRow).html(index);
                            return nRow;
                        },

                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, meta) {
                                    return type === "export" ? meta.row + 1 : data;
                                },
                            },
                        ],
                    });
                }, 1000);
            });
        }
    }




    return (
        <>
            <div className="container-fluid py-4">
                <div className="table-responsive p-0 pb-2">
                    <table id="table" className="table align-items-center justify-content-center mb-0">
                        <thead>
                            <tr>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">S/N</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Title</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Name</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Age</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Hobby</th>
                                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Occupation</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {names && names.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td className="text-xs font-weight-bold" >{index + 1}</td>
                                        <td className="text-xs font-weight-bold" >{item.title}</td>
                                        <td className="text-xs font-weight-bold" >{item.firstname + ' ' + item.lastname}</td>
                                        <td className="text-xs font-weight-bold" >{item.age}</td>
                                        <td className="text-xs font-weight-bold" >{item.hobby}</td>
                                        <td className="text-xs font-weight-bold" >{item.occupation}</td>

                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

};

export default Chartim;