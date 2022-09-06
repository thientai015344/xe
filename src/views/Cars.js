import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLCar, createNewCar, deleteCar, editCar } from '../services/carSevice';
// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";

function Cars() {
  const [showCar, setShowcar] = useState(false);


  const [car, setcar] = useState('')
  const [carid, setcarid] = useState('')


  const [arrcar, setarrcar] = useState([])

  let initrangtai = 1;

  const [trangthai, settrangthai] = useState(initrangtai)


  const handleClosecar = () => setShowcar(false);
  const handleShowcar = () => setShowcar(true);


  const [showCaredit, setShowcaredit] = useState(false);

  const handleClosecaredit = () => setShowcaredit(false);
  const handleShowcaredit = () => setShowcaredit(true);


  const createNewCars = async (data) => {
    try {
      let response = await createNewCar(data);
      if (response && response.errCode !== 0) {
        alert(' Xe đã tồn tại ')
      } else {
        alert('Thêm xe thành công')
        handleClosecar();
        await getAllCars();

      }
      handleClosecar

    } catch (error) {
      console.log(error);
    }

  }

  const handleDelete = async (singer) => {


    try {
      let res = await deleteCar(singer.id)
      if (res && res.errCode === 0) {

        await getAllCars()

        alert('Xóa Thành Công')

      }
      else {
        alert(res.errMessage)
      }

    } catch (error) {
      console.log(error);

    }


  }







  const handleCreatecar = () => {

    if (car !== '') {

      let ccar = {
        platesCar: car,
        status: trangthai
      }

      createNewCars(ccar);
    }
    else {
      alert('Vui lòng nhập thông tin xe')
    }
  }

  const handlecaredit = (car) => {

    setcarid(car.id)
    setcar(car.platesCar)


    handleShowcaredit()




  }

  const editcasr = async () => {

    if (car !== '') {

      let ccar = {
        id: carid,
        platesCar: car,
        status: trangthai

      }

      Editcar(ccar);
    }
    else {
      alert('Vui lòng nhập thông tin xe')
    }
  }

  const Editcar = async (data) => {
    try {
      let response = await editCar(data);
      if (response && response.errCode !== 0) {
        alert(' Xe đã tồn tại ')
      } else {
        alert('chinh sua thành công')
        handleClosecaredit();
        await getAllCars();

      }
      handleClosecar

    } catch (error) {
      console.log(error);
    }

  }







  useEffect(() => {

    getAllCars();


  }, []);



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
        return { id: track.id, platesCar: track.platesCar, trangthai: track.status, createdAt: createdAt }
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
                      <th>Trạng Thái</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {arrcar && arrcar.map((item, index) => {

                      if (item.trangthai == 1) {
                        return (
                          <tr key={index + 1}>
                            <td>{index}</td>
                            <td>{item.platesCar}</td>
                            <td>{item.createdAt}</td>
                            <td>Hoạt động</td>
                            <td>
                              <button className="btn-edit" onClick={() => { handlecaredit(item) }} >
                                <i className="fas fa-edit">
                                </i></button>
                              <button
                                className="btn-delete"
                                onClick={() => { handleDelete(item) }}
                              >
                                <i
                                  className="fas fa-trash">
                                </i></button>
                            </td>
                          </tr>
                        )
                      } else {
                        return (
                          <tr key={index + 1}>
                            <td>{index}</td>
                            <td>{item.platesCar}</td>
                            <td>{item.createdAt}</td>
                            <td>Đã ẩn</td>
                            <td>
                              <button className="btn-edit" onClick={() => { handlecaredit(item) }} >
                                <i className="fas fa-edit">
                                </i></button>
                              <button
                                className="btn-delete"
                                onClick={() => { handleDelete(item) }}
                              >
                                <i
                                  className="fas fa-trash">
                                </i></button>


                            </td>
                          </tr>
                        )
                      }



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

                <Modal show={showCaredit} onHide={handleClosecaredit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Biển số xe</Form.Label>
                        <Form.Control
                          type="text"
                          value={car}
                          placeholder="47A-xxxx"

                          autoFocus
                          onChange={(e) => setcar(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3 col-6">
                        <Form.Label htmlFor="selectCar">Chọn xe</Form.Label>
                        <Form.Select id="selectCar"
                          value={trangthai}
                          onChange={e => {
                            settrangthai(e.target.value);

                          }}
                        >
                          <option  >Chọn trạng thái</option>
                          <option value="1" >Hiện</option>
                          <option value="0" >ẩn</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosecaredit}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={editcasr}>
                      Cập nhật
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
