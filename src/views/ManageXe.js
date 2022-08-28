import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLCar, getALLManageXe, createNewManageXe, getALLMap } from '../services/carSevice';
// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { data } from "jquery";

function ManageXe() {

  const [showmanagecar, setShowmanagecar] = useState(false);
  const [datenox, setDate] = useState(new Date());

  const [arrcarr, setarrcarr] = useState()
  const [arrmap, setarrmap] = useState()

  const [arrmanagexe, setarrmanagexep] = useState()



  const [idlacation, setidlacation] = useState()

  const [idcar, setidcar] = useState()








  const handleClosemanagecar = () => setShowmanagecar(false);
  const handleShowmanagecar = () => {
    setShowmanagecar(true);

    getAllCars();
    getAllmaps();

  }


  const createNewManageXes = async (data) => {
    try {
      let response = await createNewManageXe(data);
      if (response && response.errCode !== 0) {
        alert('đã có lỗi xảy ra ')
      } else {
        handleClosemanagecar();
        await getAllManageXes();

      }
      handleClosemanagecar();


    } catch (error) {
      console.log(error);
    }

  }


  const handleCreamanagecar = () => {

    let userId = sessionStorage.getItem("userId");
    const current = new Date();
    const ngay = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;


    let datecho = new Date(ngay);
    let datenow = new Date(datenox);

    if (datenow < datecho) {

      alert('không được chọn ngày nhỏ hơn ngày hiện tại')

    }
    else {
      let managecar = {
        date: datenox,
        carId: idcar,
        roadmapsId: idlacation,
        userId: userId,
      }

      createNewManageXes(managecar);

    }



    // let managecar = {
    //   date: datenox,
    //   carId: idcar,
    //   roadmapsId: idlacation,
    //   userId: userId,



    // }




    // createNewManageXes(managecar);


  }




  useEffect(() => {

    getAllManageXes();


  });


  const getAllCars = async () => {
    let response = await getALLCar('ALL')
    if (response && response.errCode === 0) {
      setarrcarr(response.cars)

    }
  }



  const getAllManageXes = async () => {
    let response = await getALLManageXe('ALL')
    if (response && response.errCode === 0) {

      let convert = response.manageCar && response.manageCar.map(track => {
        let date = '';

        if (track.date) {

          let num = track.date
          let arr = num.toString().split("T")



          date = arr[0].split("-").reverse().join("-");
        }
        return { id: track.id, platesCar: track.car.platesCar, from: track.roadmap.from, to: track.roadmap.to, date: date }
      })

      setarrmanagexep(convert)

    }
  }

  const getAllmaps = async () => {
    let response = await getALLMap('ALL')
    if (response && response.errCode === 0) {
      setarrmap(response.roadmaps)

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


                <Button variant="primary" size="sm" onClick={handleShowmanagecar} active>
                  Lên lịch xe
                </Button>

              </Card.Header>
              <Card.Body className="all-icons">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>ngày</th>
                      <th>xe</th>
                      <th>tuyến đường</th>


                    </tr>
                  </thead>
                  <tbody>
                    {arrmanagexe && arrmanagexe.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{item.date}</td>
                          <td>{item.platesCar}</td>
                          <td>{item.from}-{item.to}</td>

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



                <Modal show={showmanagecar} onHide={handleClosemanagecar}>
                  <Modal.Header closeButton>
                    <Modal.Title> Lên lịch xe</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>


                      <Form.Group className="mb-3">
                        <Form.Label>Chọn ngày</Form.Label>
                        <Form.Control
                          type="date"
                          name="duedate"
                          placeholder="Due date"
                          value={datenox}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Form.Group>



                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="selectCar">Chọn xe</Form.Label>
                        <Form.Select as="select"
                          value={idcar}
                          onChange={e => {
                            setidcar(e.target.value);
                          }} id="selectCar"
                        >
                          <option>Chon xe</option>
                          {arrcarr && arrcarr.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.platesCar}</option>
                            )
                          })
                          }
                        </Form.Select>
                      </Form.Group>




                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">chọn địa điểm </Form.Label>
                        <Form.Select as="select"
                          value={idlacation}
                          onChange={e => {
                            setidlacation(e.target.value);
                          }} id="disabledSelect">
                          <option>chọn tuyến đường</option>
                          {arrmap && arrmap.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.from}-{item.to}</option>
                            )
                          })
                          }
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosemanagecar}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCreamanagecar}>
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

export default ManageXe;
