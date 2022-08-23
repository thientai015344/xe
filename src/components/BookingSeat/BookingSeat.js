
import React from "react";
import { Container } from "react-bootstrap";

import '../../assets/css/sccSeats.scss'

function BookingSeat(props) {

    const arrseat = props.arr;




    return (

        <Container fluid>

            <ul className="list-seat">

                {arrseat && arrseat.map((item, index) => {
                    return (
                        <li key={index} className="seat">
                            <input type="checkbox" id={item.key} />
                            <label htmlFor={item.key}>{item.value}</label>
                        </li>

                    )
                })}

            </ul>






        </Container>

    );
}


export default BookingSeat;
