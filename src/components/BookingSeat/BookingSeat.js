
import React, {useEffect} from "react";
import { Container } from "react-bootstrap";

import '../../assets/css/sccSeats.scss'

function BookingSeat({arr,handleSendData}) {

    const [selected, setSelected] = React.useState([]);
    const [arrIdSelect, setArrIdSelect] = React.useState(selected);

    const handleSelectSeat = (e,value) => {
        if(e.target.checked) {
            setSelected(prev => [...prev,value]);
        } else {
            const filter = selected.filter(item => item !== value)
            setSelected(filter)
            // console.log("test",selected,filter);
        }
    }
    useEffect(() => {
        handleSendData(selected)
    },[selected])
    return (

        <Container fluid>

            <ul className="list-seat">

                {arr && arr.map((item, index) => {
                    return (
                        <li key={index} className="seat">
                            <input type="checkbox" id={item.key} onChange={(e)=>handleSelectSeat(e,item.key)} />
                            <label htmlFor={item.key}>{item.value}</label>
                        </li>

                    )
                })}

            </ul>






        </Container>

    );
}


export default BookingSeat;
