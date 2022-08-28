import React from "react";
import { Container } from "react-bootstrap";

import "../../assets/css/sccSeatsub.scss";

function BookingSeatSub({ arr, handleSendData, dataSeatSub, arrve }) {
  // const [selected, setSelected] = React.useState([]);

  const handleSelectSeat = (e, value) => {
    if (e.target.checked) {
      // setSelected((prev) => [...prev, value]);
      handleSendData([...dataSeatSub, value]);
    } else {
      // const filter = selected.filter((item) => item !== value);
      // setSelected(filter);
      const filter = dataSeatSub.filter((item) => item !== value);
      handleSendData(filter);
    }
  };
  const handleChecked = (key) => {
    return dataSeatSub?.includes(key);
  }

  const handleGetDisabled = (value) => {
    return arrve?.findIndex(item => item.seat === value) >= 0;
  }

  return (
    <Container fluid>
      <ul className="list-seatsub">
        {arr &&
          arr.map((item, index) => {
            return (
              <li key={index} className="seatsub">
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

export default BookingSeatSub;
