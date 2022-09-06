import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLCar, getALLManageXe, createNewManageXe, getALLMap, editmanage, deletemanage, getmanagecon } from '../services/carSevice';
// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";

function ManageXe() {


  const [datenox, setDate] = useState(new Date());
  let initrangtai = 1;
  const [trangthai, settrangthai] = useState(initrangtai)
  const [arrcarr, setarrcarr] = useState()
  const [dateold, setdateold] = useState()
  const [idmanage, setidmanage] = useState()
  const [dataa, setdataa] = useState()

  const [arrmap, setarrmap] = useState()
  const [arrmanagexe, setarrmanagexep] = useState()
  const [idlacation, setidlacation] = useState()
  const [idcar, setidcar] = useState()
  const [showmanagecar, setShowmanagecar] = useState(false);
  const handleClosemanagecar = () => setShowmanagecar(false);

  const handleShowmanagecar = () => {
    setShowmanagecar(true);
    getAllCars();
    getAllmaps();

  }




  const handleDelete = async (singer) => {


    try {
      let res = await deletemanage(singer.id)
      if (res && res.errCode === 0) {

        await getAllManageXes()

        alert('Xóa Thành Công')

      }
      else {
        alert(res.errMessage)
      }

    } catch (error) {
      console.log(error);

    }


  }



  const [showmanagecaredit, setShowmanagecaredit] = useState(false);
  const handleClosemanagecaredit = () => setShowmanagecaredit(false);
  const handleShowmanagecaredit = () => {
    setShowmanagecaredit(true);

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
        await getmanagecons();
        setDate(new Date())

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
        status: trangthai,
        userId: userId,
      }

      createNewManageXes(managecar);

    }






  }




  const handleEdit = async (manaeXe) => {

    const str = manaeXe.date;

    const [day, month, year] = str.split('-');

    let adddd = year + '-' + month + '-' + day

    if (adddd) {

      await setdateold(adddd)
    }


    setidlacation(manaeXe.idmap)
    setidcar(manaeXe.idcar)
    setidmanage(manaeXe.id)


    handleShowmanagecaredit();

  }


  const handleeditmanagecar = async () => {
    let userId = sessionStorage.getItem("userId");
    let managecar = {
      id: idmanage,
      date: datenox,
      carId: idcar,
      roadmapsId: idlacation,
      status: trangthai,
      userId: userId,
    }
    editmanaged(managecar);

  }



  const editmanaged = async (data) => {

    try {
      let response = await editmanage(data);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {

        alert(' Chỉnh sửa thành công')
        await getmanagecons();

        handleClosemanagecaredit();
        setDate(new Date())

      }

    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {

    getmanagecons();

  }, []);


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
        return { id: track.id, idcar: track.car.id, status: track.status, platesCar: track.car.platesCar, idmap: track.roadmap.id, from: track.roadmap.from, to: track.roadmap.to, date: date }
      })
      setarrmanagexep(convert)
    }
  }




  const getmanagecons = async () => {
    let response = await getmanagecon(trangthai)
    if (response && response.errCode === 0) {
      let convert = response.manageCar && response.manageCar.map(track => {
        let date = '';
        if (track.date) {
          let num = track.date
          let arr = num.toString().split("T")
          date = arr[0].split("-").reverse().join("-");
        }
        return { id: track.id, idcar: track.car.id, status: track.status, platesCar: track.car.platesCar, idmap: track.roadmap.id, from: track.roadmap.from, to: track.roadmap.to, date: date }
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
                <div className="d-flex">
                  <Button variant="primary" size="sm" onClick={handleShowmanagecar} active>
                    Lên lịch xe
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => { getAllManageXes() }} active>
                    Hện tất cả
                  </Button>
                </div>


              </Card.Header>
              <Card.Body className="all-icons">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>ngày</th>
                      <th>xe</th>
                      <th>tuyến đường</th>
                      <th>Trạng thái</th>
                      <th>Action</th>


                    </tr>
                  </thead>
                  <tbody>
                    {arrmanagexe && arrmanagexe.map((item, index) => {

                      if (item.status == 1) {
                        return (
                          <tr key={index + 1}>
                            <td>{index}</td>
                            <td>{item.date}</td>
                            <td>{item.platesCar}</td>
                            <td>{item.from}-{item.to}</td>
                            <td>{'hiện'}</td>

                            <td>
                              <button className="btn-edit" onClick={() => { handleEdit(item) }} >
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
                            <td>{item.date}</td>
                            <td>{item.platesCar}</td>
                            <td>{item.from}-{item.to}</td>
                            <td>{'đã ẩn'}</td>

                            <td>
                              <button className="btn-edit" onClick={() => { handleEdit(item) }} >
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
                            if (item.status == 1) {

                              return (
                                <option key={index} value={item.id}>{item.platesCar}</option>
                              )
                            }
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





                <Modal show={showmanagecaredit} onHide={handleClosemanagecaredit}>
                  <Modal.Header closeButton>
                    <Modal.Title> Chỉnh sửa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>


                      <Form.Group className="mb-3">
                        <Form.Label>Chọn ngày</Form.Label>
                        <Form.Control
                          type="date"
                          name="duedate"
                          placeholder="Due date"
                          defaultValue={dateold}
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
                            if (item.status == 1) {

                              return (
                                <option key={index} value={item.id}>{item.platesCar}</option>
                              )
                            }
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
                      <Form.Group className="mb-3 col-6">
                        <Form.Label htmlFor="checktrefalse">Trạng thái</Form.Label>
                        <Form.Select id="checktrefalse"
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
                    <Button variant="secondary" onClick={handleClosemanagecaredit}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={handleeditmanagecar}>
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
