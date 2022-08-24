import React, { useEffect, useState } from "react";
import "../assets/css/_customModal.scss";
import { getALLCar, taochi, getchi } from '../services/carSevice';

import {
  Button,
  Card,
  Modal,
  Container,
  Row,
  Col,
  Table,
  Form,
} from "react-bootstrap";

function Notifications() {
  const [showCar, setShowcar] = useState(false);
  const handleClosecar = () => setShowcar(false);
  const handleShowcar = () => {
    setShowcar(true)
    getAllCars();
  };
  const [arrchi, setarrchi] = useState('');
  const [arrcarchi, setarrcarchi] = useState('');


  const [idcar, setidcar] = useState('');
  const [descrtpt, setdescrtpt] = useState('');
  const [price, setprice] = useState('');


  const handleCreatecar = () => {




    if (idcar == '' || descrtpt == '' || price == '') {
      alert('chọn đầy đủ thông tin ạ')
    }
    else {

      let chi = {
        descriptioncommodities: descrtpt,
        price: price,
        commonCarId: idcar
      }

      taochis(chi);

    }


  }


  const taochis = async (data) => {
    try {
      let response = await taochi(data);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {
        alert(' them phieu chi thanh cong')
        handleClosecar();
        await this.getchis();

      }
      handleClosecar

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {

    getchis();


  });



  const getAllCars = async () => {
    let response = await getALLCar('ALL')
    if (response && response.errCode === 0) {
      console.log('ddd', response.cars)

      let convert = response.cars && response.cars.map(track => {
        let createdAt = '';

        if (track.createdAt) {

          let num = track.createdAt
          let arr = num.toString().split("T")


          createdAt = arr[0].split("-").reverse().join("-");
        }
        return { id: track.id, platesCar: track.platesCar, createdAt: createdAt }
      })

      setarrcarchi(convert);

    }
  }


  const getchis = async () => {
    let response = await getchi('ALL')
    if (response && response.errCode === 0) {


      let convert = response.commoditys && response.commoditys.map(track => {
        console.log('cut', track)
        let createdAt = '';

        if (track.createdAt) {

          let num = track.createdAt
          let arr = num.toString().split("T")


          createdAt = arr[0].split("-").reverse().join("-");
        }
        return { id: track.id, descriptioncommodities: track.descriptioncommodities, price: track.price, namecar: track.car.platesCar, createdAt: createdAt }
      })

      setarrchi(convert);

    }
  }






  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Phiếu chi</Card.Title>

                <Button variant="primary" size="sm" onClick={handleShowcar} active>
                  Tạo phiếu chi
                </Button>
              </Card.Header>
              <Card.Body className="all-icons">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>nội dung chi</th>
                      <th>số tiền</th>
                      <th>Xe</th>
                      <th>Ngày tạo</th>

                    </tr>
                  </thead>
                  <tbody>
                    {arrchi && arrchi.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{item.descriptioncommodities}</td>
                          <td>{item.price}</td>
                          <td>{item.namecar}</td>
                          <td>{item.createdAt}</td>
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

                <Modal show={showCar} onHide={handleClosecar}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thêm phiếu chi</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3 ">
                        <Form.Label htmlFor="selectCar">Chọn xe</Form.Label>
                        <Form.Select id="selectCar"
                          value={idcar}
                          onChange={e => {
                            setidcar(e.target.value);
                            getAllManageXes(e.target.value)
                          }}
                        >
                          <option>Chọn xe </option>
                          {arrcarchi && arrcarchi.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.platesCar}</option>
                            )
                          })
                          }
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>nội dung chi tiền</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="vd: đổ xăng , ... , ...."
                          autoFocus
                          onChange={(e) => setdescrtpt(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá tiền</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="2000000"
                          autoFocus
                          onChange={(e) => setprice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosecar}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCreatecar}>
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

export default Notifications;
