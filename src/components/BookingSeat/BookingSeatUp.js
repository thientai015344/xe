import React from "react";
import { Container } from "react-bootstrap";

import "../../assets/css/sccSeats.scss";

function BookingSeatUp({ arr, handleSendData, dataSeatUp, arrve }) {
  // const [selected, setSelected] = React.useState([]);

  const handleSelectSeat = (e, value) => {
    if (e.target.checked) {
      // setSelected((prev) => [...prev, value]);
      handleSendData([...dataSeatUp, value]);
    } else {
      // const filter = selected.filter((item) => item !== value);
      // setSelected(filter);
      const filter = dataSeatUp.filter((item) => item !== value);
      handleSendData(filter);
    }
  };
  const handleChecked = (key) => {
    return dataSeatUp?.includes(key);
  }
  const handleGetDisabled = (value) => {
    return arrve?.findIndex(item => item.seat === value) >= 0;
  }

  return (
    <Container fluid>
      <ul className="list-seat">
        {arr &&
          arr.map((item, index) => {
            return (
              <li key={index} className="seat">
                <input
                  type="checkbox"
                  id={item.key}
                  disabled={handleGetDisabled(item.value)}
                  checked={handleChecked(item.value)}
                  onChange={(e) => handleSelectSeat(e, item.value)}
                />
                <label htmlFor={item.key}>{item.value}</label>
              </li>
            );
          })}
      </ul>
    </Container>
  );
}

export default BookingSeatUp;
