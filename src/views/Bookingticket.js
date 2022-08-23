import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLManageXe, getALLSeat, createNewticket } from '../services/carSevice';

// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import BookingSeat from "components/BookingSeat/BookingSeat";

function Bookingticket() {
  const [show, setShow] = useState(false);
  const [showfr, setShowfr] = useState(false);

  const [date, setDate] = useState(new Date());
  const [fName, setfName] = useState('');
  const [sdt, setsdt] = useState('');
  const [frice, setfrice] = useState('');
  const [tofrice, settofrice] = useState('');
  const [idmanage, setidmanage] = useState('');
  const [arrmanagexe, setarrmanagexep] = useState()
  const [arrseatup, setarrseatup] = useState()
  const [arrseatdow, setarrseatdow] = useState()




  const getAllManageXes = async () => {

    var ob = typeof (date);

    if (ob === "object") {


      let response = await getALLManageXe('ALL')
      if (response && response.errCode === 0) {
        setarrmanagexep(response.manageCar)


      }

    }
    else {
      let df = date + "T00:00:00.000Z"
      console.log('djaeeeeeeehd', df)

      let response = await getALLManageXe(df)
      if (response && response.errCode === 0) {
        setarrmanagexep(response.manageCar)


      }
    }
  }

  useEffect(() => {


    getseatdow();
    getseatUP();

    getAllManageXes();

  });




  let datainitia = 'Vui lòng chọn tầng'

  const [dataseat, setdataseat] = useState(datainitia);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    let ticket = {
      nameClient: fName,
      phoneNumber: sdt,
      price: frice,
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



  const getseatUPw = async () => {

    let data = <BookingSeat arr={arrseatup} />



    setdataseat(data)
  }

  const getseatdoww = async () => {

    let data = <BookingSeat arr={arrseatdow} />

    setdataseat(data)

  }

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

                        getAllManageXes()

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
                      <th>Biển Số</th>
                      <th>Tuyến đường</th>

                    </tr>
                  </thead>
                  <tbody>
                    {arrmanagexe && arrmanagexe.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{item.car.platesCar}</td>
                          <td>{item.roadmap.from}-{item.roadmap.to}</td>

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


                      {dataseat}
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
