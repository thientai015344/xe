import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLCar, createNewCar, } from '../services/carSevice';
// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";

function Cars() {
  const [showCar, setShowcar] = useState(false);


  const [car, setcar] = useState()

  const [arrcar, setarrcar] = useState()

  const handleClosecar = () => setShowcar(false);
  const handleShowcar = () => setShowcar(true);


  const createNewCars = async (data) => {
    try {
      let response = await createNewCar(data);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {
        alert('thêm xe thành công')
        handleClosecar();
        await this.getAllCars();

      }
      handleClosecar

    } catch (error) {
      console.log(error);
    }

  }







  const handleCreatecar = () => {

    let ccar = {
      platesCar: car
    }

    createNewCars(ccar);


  }







  useEffect(() => {

    getAllCars();


  });



  const getAllCars = async () => {
    let response = await getALLCar('ALL')
    if (response && response.errCode === 0) {

      let convert = response.cars && response.cars.map(track => {
        let createdAt = '';

        if (track.createdAt) {

          let num = track.createdAt
          let arr = num.toString().split("T")



          createdAt = arr[0].split("-").reverse().join("-");
        }
        return { id: track.id, platesCar: track.platesCar, createdAt: createdAt }
      })

      setarrcar(convert);

    }
  }



  return (
    <>

      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Danh sách xe đang hoạt động</Card.Title>

                <Button variant="primary" size="sm" onClick={handleShowcar} active>
                  Thêm Xe Mới
                </Button>
              </Card.Header>
              <Card.Body className="all-icons">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>Biển Số</th>
                      <th>Ngày tạo</th>

                    </tr>
                  </thead>
                  <tbody>
                    {arrcar && arrcar.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{item.platesCar}</td>
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
                    <Modal.Title>Thêm Xe mới</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Biển số xe</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="47A-xxxx"
                          autoFocus
                          onChange={(e) => setcar(e.target.value)}
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

export default Cars;
