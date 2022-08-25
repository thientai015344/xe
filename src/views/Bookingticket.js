import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLManageXe, getALLSeat, createNewticket, seatbook, getve } from '../services/carSevice';

// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import BookingSeatUp from "components/BookingSeat/BookingSeatUp";
import BookingSeatDown from "components/BookingSeat/BookingSeatDown";

function Bookingticket() {
  const [show, setShow] = useState(false);
  const [showfr, setShowfr] = useState(false);

  const [date, setDate] = useState(new Date());
  const [fName, setfName] = useState('');
  const [sdt, setsdt] = useState('');
  const [frice, setfrice] = useState('');
  const [idmanage, setidmanage] = useState('');
  const [arrmanagexe, setarrmanagexep] = useState()
  const [arrve, setarrve] = useState([])

  const [arrseatup, setarrseatup] = useState()
  const [arrseatdow, setarrseatdow] = useState()
  const [arrselect, setarrarrselect] = useState()




  // const [dataseat, setdataseat] = useState([])
  const [seatMode, setSeatMode] = useState('seatDown');

  const dataselected = () => {

    let conve = arrve && arrve.map(track => {

      return { seat: track.seat }
    })

    setarrarrselect(conve)
  }




  const getves = async (id) => {
    if (id) {
      let response = await getve(id)
      if (response && response.errCode === 0) {

        let conve = response.bookingseatxe && response.bookingseatxe.map(track => {
          let num = '';
          if (track.bookingseats.nameClient) {

            num = track.bookingseats.nameClient


          }

          return { namekhach: num, sdt: track.bookingseats.phoneNumber, seat: track.bookingseats.seatbooks.seatId }
        })

        setarrve(conve)


      }
    }
  }

  const getAllManageXes = async (dated) => {
    if (dated) {
      let df = dated + "T00:00:00.000Z"


      let response = await getALLManageXe(df)
      if (response && response.errCode === 0) {
        setarrmanagexep(response.manageCar)
      }
    }
  }

  useEffect(() => {


    getseatdow();
    getseatUP();

  }, []);




  let datainitia = 'Vui lòng chọn tầng'

  const [dataseatget, setdataseatget] = useState(datainitia);
  const [dataSeatUp, setDataSeatUp] = useState([])
  const [dataSeatDown, setDataSeatDown] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => {

    const current = new Date();
    const ngay = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;


    let datecho = new Date(ngay);
    let datenow = new Date(date);

    if (datenow < datecho) {

      alert('không được chọn ngày nhỏ hơn ngày hiện tại')




    } else if (idmanage == '') {
      alert('vui lòng chọn xe để đặt vé')

    }
    else {

      setShow(true)
    }


  };

  const handleClosefr = () => setShowfr(false);
  const handleShowfr = () => setShowfr(true);


  const getfromdatat = () => {
    if (fName != '' && sdt != '') {


      handleShowfr();
      handleClose();


    }


  }


  const saveticket = () => {
    let userId = sessionStorage.getItem("userId");
    let i = dataseatget.length

    let totli = frice * i

    console.log('ddf', totli)





    let ticket = {
      nameClient: fName,
      phoneNumber: sdt,
      price: totli,
      ManegeId: idmanage,
      userId: userId,
    }

    createNewtickets(ticket)
  }




  const createNewtickets = async (data) => {
    try {
      let response = await createNewticket(data);
      if (response && response.errCode !== 0) {
        alert('đã có lỗi xảy ra ')
      } else {

        let result = [];

        let id = response.id;

        if (dataseatget && dataseatget.length > 0) {

          dataseatget.map(key => {
            let seat = {};
            seat.bookingseatsId = id;
            seat.seatId = key;
            result.push(seat)

          })


        }

        try {

          let response = await seatbook(result);
          if (response && response.errCode !== 0) {
            alert('đã có lỗi xảy ra ')
          } else {

            alert('tao ve thanh cong')

            getves();

          }
        } catch (error) {
          console.log(error);
        }








        await this.getAllManageXe();
        handleClosefr();

      }

    } catch (error) {
      console.log(error);
    }

  }


  const getseatdow = async () => {

    let response = await getALLSeat('seat')
    if (response && response.errCode === 0) {
      setarrseatdow(response.allcodes)
    }
  }


  const getseatUP = async () => {

    let response = await getALLSeat('seatup')
    if (response && response.errCode === 0) {
      await setarrseatup(response.allcodes)
    }
  }


  const handleChangeSeatUpSelected = (arrSeatUpData) => {
    setSeatUpSelected(arrSeatUpData);
  }
  const getseatUPw = async () => {
    setSeatMode('seatUp');
    // let data = <BookingSeatUp arr={arrseatup} handleSendData={(data) => handleGetDataSeatUp(data)} dataSeatUp={dataSeatUp} />
    // setdataseat(data)
  }

  const getseatdoww = async () => {
    setSeatMode('seatDown');
    // let data = <BookingSeatDown arr={arrseatdow} handleSendData={(data) => handleGetData(data)} />
    // setdataseat(data)

  }

  const handleGetDataSeatDown = (data) => {
    // setdataseatget(data)
    setDataSeatDown(data)
  }
  

  const handleGetDataSeatUp = (data) => {
    setDataSeatUp(data)
    
  }
  console.log("data seat up test", arrve);


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Quản Lý Vé</Card.Title>
                <Form className="d-flex">
                  <Form.Group className="mb-3 col-6">
                    <Form.Label>Chọn ngày</Form.Label>
                    <Form.Control
                      type="date"
                      name="duedate"

                      placeholder="Due date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value)
                        getAllManageXes(e.target.value)
                      }

                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-6">
                    <Form.Label htmlFor="selectCar">Chọn xe</Form.Label>
                    <Form.Select id="selectCar"
                      value={idmanage}
                      onChange={e => {
                        setidmanage(e.target.value);
                        getves(e.target.value)
                      }}
                    >
                      <option>Chọn xe muốn đặt</option>
                      {arrmanagexe && arrmanagexe.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>{item.car.platesCar}</option>
                        )
                      })
                      }
                    </Form.Select>
                  </Form.Group>

                </Form>

              </Card.Header>
              <Card.Body className="all-icons">
                <Button variant="primary" size="sm" onClick={handleShow} active>
                  Đặt vé
                </Button>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>Tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>vị trí ghế</th>


                    </tr>
                  </thead>
                  <tbody>
                    {arrve && arrve.map((item, index) => {

                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{item.namekhach}</td>
                          <td>{item.sdt}</td>
                          <td>{item.seat}</td>



                          {/* <td>
                            <button className="btn-edit"  onClick = {() =>{this.handleEdit(item)}} >
                                <i className="fas fa-edit">
                                </i></button>
                            <button 
                            className="btn-delete"
                            onClick = {() =>{this.handleDelete(item)}}
                            >
                                <i 
                            className="fas fa-trash">
                                </i></button>
                        </td> */}
                        </tr>
                      )

                    })
                    }
                  </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Đặt vé</Modal.Title>
                  </Modal.Header>
                  <Modal.Body  >

                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên khách hàng <p className="sao">*</p></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="nhập tên ở đây"
                          onChange={e => setfName(e.target.value)}
                          autoFocus
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Số điện thoại <p className="sao">*</p> </Form.Label>
                        <Form.Control
                          type="tel"
                          pattern="[0-9]{10}"
                          onChange={(e) => setsdt(e.target.value)}
                          autoFocus required
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInputfrice">
                        <Form.Label>Giá vé hôm nay</Form.Label>
                        <Form.Control
                          type="text"

                          placeholder="vd: 300000"
                          defaultValue={frice}

                          onChange={e => setfrice(e.target.value)}

                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={getfromdatat}>
                      Tiếp tục
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={showfr} onHide={handleClosefr}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chọn Ghế</Modal.Title>
                  </Modal.Header>
                  <Modal.Body  >

                    <Form>
                      <ButtonGroup className="mb-2">
                        <Button onClick={getseatdoww} >Tầng dưới</Button>
                        <Button onClick={getseatUPw} >Tầng trên</Button>
                        <Button>Ghế sub</Button>
                      </ButtonGroup>
                      <br />
                      <Form.Group className="mb-3  d-flex justify-content-end" controlId="exampleForm.ControlInput1">
                        <div className=" ladd d-flex">
                          <div className="dangchon"></div>
                          <Form.Label>Đang chọn</Form.Label>

                        </div>
                        <div className=" ladd d-flex">
                          <div className="dadat"></div>
                          <Form.Label>Đã đặt </Form.Label>

                        </div>
                        <div className=" ladd d-flex">
                          <div className="controng"></div>
                          <Form.Label>Còn chổ</Form.Label>

                        </div>

                      </Form.Group>


                      {/* {dataseat} */}
                      {seatMode === 'seatUp' && (
                        <BookingSeatUp 
                          arr={arrseatup} 
                          handleSendData={(data) => handleGetDataSeatUp(data)} 
                          dataSeatUp={dataSeatUp} 
                          arrve={arrve}
                        />
                      )}
                      {seatMode === 'seatDown' && (
                        <BookingSeatDown 
                          arr={arrseatdow} 
                          handleSendData={(data) => handleGetDataSeatDown(data)} 
                          dataSeatDown={dataSeatDown} 
                          arrve={arrve} 
                        />
                      )}
                    </Form>

                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosefr}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={saveticket}>
                      Lưu
                    </Button>
                  </Modal.Footer>
                </Modal>

              </Card.Body>
            </Card>
          </Col>
        </Row>



      </Container>
    </>
  );
}



export default Bookingticket;
