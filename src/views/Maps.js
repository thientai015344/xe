import React, { useState, useEffect } from "react";

import { createNewmap, getALLMap, deletemap } from '../services/carSevice';

// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";

function Maps() {


  const [showroadmap, setShowroadmap] = useState(false);





  const [to, setto] = useState()
  const [from, setfrom] = useState()



  const [arrmap, setarrmap] = useState()




  const handleCloseroadmap = () => setShowroadmap(false);
  const handleShowroadmap = () => setShowroadmap(true);



  const createNewmaps = async (data) => {
    try {
      let response = await createNewmap(data);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {
        alert('thêm tuyến đường thành công')
        handleCloseroadmap();
        await getAllmaps();

      }

    } catch (error) {
      console.log(error);
    }

  }



  const handleCreatemap = () => {

    let mapp = {
      to: to,
      from: from

    }

    createNewmaps(mapp);


  }


  const handleDelete = async (singer) => {


    try {
      let res = await deletemap(singer.id)
      if (res && res.errCode === 0) {

        await getAllmaps()

        alert('Xóa Thành Công')

      }
      else {
        alert(res.errMessage)
      }

    } catch (error) {
      console.log(error);

    }


  }




  useEffect(() => {


    getAllmaps();

  }, []);



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
                <Card.Title as="h4">Danh sách tuyến đường</Card.Title>

                <Button variant="primary" size="sm" onClick={handleShowroadmap} active>
                  Thêm Quảng Đường
                </Button>


              </Card.Header>
              <Card.Body className="all-icons">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>Nơi đi </th>
                      <th>Nơi đến</th>
                      <th>Ngày tạo</th>


                    </tr>
                  </thead>
                  <tbody>
                    {arrmap && arrmap.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.from}</td>
                          <td>{item.to}</td>
                          <td>{item.createdAt}</td>
                          <td>
                            {/* <button className="btn-edit"  onClick = {() =>{this.handleEdit(item)}} >
                                <i className="fas fa-edit">
                                </i></button> */}
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

                    })
                    }


                  </tbody>
                </Table>


                <Modal show={showroadmap} onHide={handleCloseroadmap}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thêm Quảng đường mới</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nơi đi</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="vd: Đắk Lắk"
                          autoFocus
                          onChange={(e) => setfrom(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Nơi đến</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Đà Nẵng"
                          autoFocus
                          onChange={(e) => setto(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseroadmap}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCreatemap}>
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

export default Maps;
