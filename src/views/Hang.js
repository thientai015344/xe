import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";

// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form, } from "react-bootstrap";
import { CreateNewsigns, getALLTypeHang, CreateNewsignments, getAllsignments } from '../services/carSevice';


function Hang() {
  const [showHang, setShowHang] = useState(false);

  const [showGuiHang, setShowGuiHang] = useState(false);


  const [date, setDate] = useState(new Date());
  const [loaihang, setloaihang] = useState('');
  const [idloaihang, setidloaihang] = useState('');

  const [arrloaihang, setarrloaihang] = useState()
  const [namehang, setnamehang] = useState('');

  const [namesend, setnamesend] = useState('');
  const [sdtsend, setsdtsend] = useState('');
  const [nameget, setnameget] = useState('');
  const [sdtget, setsdtget] = useState('');
  const [price, setprice] = useState('');

  const [arrguihang, setarrguihang] = useState()




  const handleCloseHang = () => setShowHang(false);
  const handleShowHang = () => setShowHang(true);

  const handleCloseGuiHang = () => setShowGuiHang(false);
  const handleShowGuiHang = () => {


    setShowGuiHang(true)
    getALLTypeHangs();

  };





  const getALLTypeHangs = async () => {
    let response = await getALLTypeHang('ALL')
    if (response && response.errCode === 0) {
      setarrloaihang(response.signs)

    }
  }



  const saveloaihang = async () => {
    let hang = {
      nametypecommodities: loaihang
    }
    try {
      let response = await CreateNewsigns(hang);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {
        alert('thêm loai hang thanh cong')
        handleCloseHang();
      }
    } catch (error) {
      console.log(error);
    }

  }





  const getAllsignment = async () => {

    var ob = typeof (date);

    if (ob === "object") {


      let response = await getAllsignments('ALL')
      if (response && response.errCode === 0) {

        let convert = response.consignments && response.consignments.map(track => {
          let date = '';

          if (track.date) {

            let num = track.date
            let arr = num.toString().split("T")

            console.log(arr[0])

            date = arr[0].split("-").reverse().join("-");
          }
          return { id: track.id, name: track.name, nameUserGet: track.nameUserGet, nameUserSend: track.nameUserSend, date: date, phonenumberUserGet: track.phonenumberUserGet, phonenumberUserSend: track.phonenumberUserSend, price: track.price, nametypecommodities: track.typecommodity.nametypecommodities }
        })

        setarrguihang(convert)


      }

    }
    else {
      let df = date + "T00:00:00.000Z"
      console.log('djaeeeeeeehd', df)

      let response = await getAllsignments(df)
      if (response && response.errCode === 0) {

        let convert = response.consignments && response.consignments.map(track => {
          let date = '';

          if (track.date) {

            let num = track.date
            let arr = num.toString().split("T")

            console.log(arr[0])

            date = arr[0].split("-").reverse().join("-");
          }
          return { id: track.id, name: track.name, nameUserGet: track.nameUserGet, nameUserSend: track.nameUserSend, date: date, phonenumberUserGet: track.phonenumberUserGet, phonenumberUserSend: track.phonenumberUserSend, price: track.price, nametypecommodities: track.typecommodity.nametypecommodities }
        })

        setarrguihang(convert)


      }
    }
  }

  useEffect(() => {

    getAllsignment();

  });







  const CreateNewsignment = async () => {
    let userId = sessionStorage.getItem("userId");

    let datahang = {


      name: namehang,
      nameUserSend: namesend,
      phonenumberUserSend: sdtsend,
      nameUserGet: nameget,
      phonenumberUserGet: sdtget,
      typecommoditiesId: idloaihang,
      price: price,
      date: date,
      userId: userId,
    }
    try {
      let response = await CreateNewsignments(datahang);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {
        alert('thêm loai hang thanh cong')
        getAllsignment();
        handleCloseGuiHang();

      }
    } catch (error) {
      console.log(error);
    }

  }










  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Quản Loại Hàng</Card.Title>

              </Card.Header>
              <Card.Body className="all-icons">



                <Button variant="primary" className="mr-3" size="sm" onClick={handleShowHang}  >
                  Thêm Loại Hàng
                </Button>

                <Button variant="primary" size="sm" className="mr-3" onClick={handleShowGuiHang}  >
                  Gửi Hàng
                </Button>


                <Form.Group className="mb-3">
                  <Form.Label>Chọn ngày</Form.Label>
                  <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"

                    onChange={(e) => {
                      setDate(e.target.value)
                      getAllsignment();

                    }

                    }
                  />
                </Form.Group>


                <Table striped bordered hover size="sm">
                  {/* arrguihang */}
                  <thead>
                    <tr>

                      <th>Ngày gửi</th>
                      <th>Tên hàng</th>
                      <th>loại hàng</th>
                      <th>giá gửi</th>
                      <th>người gửi </th>
                      <th>sdt</th>
                      <th>Người nhận</th>
                      <th>sdt</th>



                    </tr>
                  </thead>
                  <tbody>
                    {arrguihang && arrguihang.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{item.date}</td>
                          <td>{item.name}</td>
                          <td>{item.nametypecommodities}</td>
                          <td>{item.price}</td>
                          <td>{item.nameUserSend}</td>
                          <td>{item.phonenumberUserSend}</td>
                          <td>{item.nameUserGet}</td>
                          <td>{item.phonenumberUserGet}</td>

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

                <Modal show={showHang} onHide={handleCloseHang}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thêm loại hàng</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Loại hàng</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setloaihang(e.target.value)}
                          autoFocus
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseHang}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={saveloaihang}>
                      Lưu
                    </Button>
                  </Modal.Footer>
                </Modal>



                <Modal show={showGuiHang} onHide={handleCloseGuiHang}>
                  <Modal.Header closeButton>
                    <Modal.Title>Gửi Hàng</Modal.Title>

                  </Modal.Header>

                  <Modal.Body>

                    <Form>
                      <Form.Group className="mb-3 col-12">
                        <Form.Label>Chọn ngày gửi</Form.Label>
                        <Form.Control
                          type="date"
                          name="duedate"

                          placeholder="Due date"
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value)

                            getAllsignment()

                          }

                          }
                        />
                      </Form.Group>

                      <div className="d-flex">

                        <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                          <Form.Label>Tên hàng <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setnamehang(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                          <Form.Label htmlFor="selecttypehang">Loại Hàng</Form.Label>
                          <Form.Select as="select"
                            value={idloaihang}
                            onChange={e => {
                              setidloaihang(e.target.value);
                            }} id="selecttypehang"
                          >
                            <option>Chon loại hàng</option>
                            {arrloaihang && arrloaihang.map((item, index) => {
                              return (
                                <option key={index} value={item.id}>{item.nametypecommodities}</option>
                              )
                            })
                            }
                          </Form.Select>
                        </Form.Group>

                      </div>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInputfrice">
                        <Form.Label>Giá tiền</Form.Label>
                        <Form.Control
                          type="text"

                          placeholder="vd: 300000"
                          defaultValue={price}

                          onChange={e => setprice(e.target.value)}

                        ></Form.Control>

                      </Form.Group>
                      <div className="d-flex">
                        <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                          <Form.Label>Người gửi <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setnamesend(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                          <Form.Label>Sđt người gửi <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setsdtsend(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                      </div>

                      <div className="d-flex">

                        <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                          <Form.Label>Người nhận<p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setnameget(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                          <Form.Label>Sđt người nhận<p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setsdtget(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>
                      </div>


                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseGuiHang}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={CreateNewsignment}>
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


export default Hang;
