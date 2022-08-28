import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLManageXe } from '../services/carSevice';
// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form, } from "react-bootstrap";
import { CreateNewsigns, getALLTypeHang, CreateNewsignments, getAllsignments } from '../services/carSevice';


function Hang() {
  const [showHang, setShowHang] = useState(false);

  const [showGuiHang1, setShowGuiHang1] = useState(false);



  const [date, setDate] = useState(new Date());

  const [dategui, setDategui] = useState(new Date());


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
  const [arrxehang, setarrxehang] = useState()
  const [idcarhang, setidcarhang] = useState()






  const handleCloseHang = () => setShowHang(false);
  const handleShowHang = () => setShowHang(true);

  const handleCloseGuiHang1 = () => { setShowGuiHang1(false) };
  const handleShowGuiHang1 = () => {


    setShowGuiHang1(true)
    getALLTypeHangs();

  };




  const tieptuc = async () => {

    if (!idcarhang) {
      alert('Vui lòng chọn xe ')



    } else {
      if (idloaihang == '') {
        alert('Vui lòng chọn loại hàng')
      }
      else {
        CreateNewsignment();
      }
    }
  }
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
        alert(' Loại hàng đã Tồn Tại ')
      } else {
        alert('Thêm loại hàng thành công')
        handleCloseHang();
      }
    } catch (error) {
      console.log(error);
    }

  }



  const getAllxehang = async (xeww) => {


    const current = new Date();
    const ngay = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;


    let datecho = new Date(ngay);
    let datenow = new Date(xeww);

    if (datenow < datecho) {


      alert('Không được chọn ngày nhỏ hơn ngày hiện tại')

    }

    else {

      let df = xeww + "T00:00:00.000Z"
      console.log('djaeeeeeeehd', df)

      let response = await getALLManageXe(df)
      if (response && response.errCode === 0) {
        setarrxehang(response.manageCar)
      }


    }


  }







  const getAllsignment = async (e) => {

    console.log('fff', e)



    if (!e) {


      let response = await getAllsignments('ALL')
      if (response && response.errCode === 0) {

        let convert = response.consignments && response.consignments.map(track => {
          let date = '';

          if (track.date) {

            let num = track.date
            let arr = num.toString().split("T")
            date = arr[0].split("-").reverse().join("-");
          }
          return { id: track.id, name: track.name, nameUserGet: track.nameUserGet, nameUserSend: track.nameUserSend, date: date, phonenumberUserGet: track.phonenumberUserGet, phonenumberUserSend: track.phonenumberUserSend, price: track.price, nametypecommodities: track.typecommodity.nametypecommodities }
        })

        setarrguihang(convert)


      }

    }
    else {
      let df = e + "T00:00:00.000Z"
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

  }, []);

  function isNumeric(val) {
    return /^-?\d+$/.test(val);
  }



  const CreateNewsignment = async () => {

    if (namehang == '' || price == '' || namesend == '' || sdtsend == '' || nameget == '' || sdtget == '') {
      alert('Vui lòng nhập đầy đủ thông tin')
    }
    else {



      let checkfrice = isNumeric(price)
      let checksdtsent = isNumeric(sdtsend)
      let checksdtget = isNumeric(sdtget)



      if (checkfrice == false) {
        alert('Giá tiền chưa đúng ')
      }
      else if (checksdtsent == false) {
        alert('Số điện thoại người gửi chưa đúng ')
      } else if (checksdtget == false) {
        alert('Số điện thoại người nhận chưa đúng ')
      } else {
        creatsenthang();
      }
    }
  }


  const creatsenthang = async () => {
    let userId = sessionStorage.getItem("userId");
    let datahang = {


      name: namehang,
      nameUserSend: namesend,
      phonenumberUserSend: sdtsend,
      nameUserGet: nameget,
      phonenumberUserGet: sdtget,
      typecommoditiesId: idloaihang,
      price: price,
      date: dategui,
      userId: userId,
    }
    try {
      let response = await CreateNewsignments(datahang);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {
        alert('Thêm hàng thành công')
        getAllsignment();
        handleCloseGuiHang1();

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

                <Button variant="primary" size="sm" className="mr-3" onClick={handleShowGuiHang1}  >
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
                      getAllsignment(e.target.value);

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
                      <Form.Group className="mb-3">
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



                <Modal size="lg" show={showGuiHang1} onHide={handleCloseGuiHang1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Gửi Hàng</Modal.Title>

                  </Modal.Header>

                  <Modal.Body>

                    <Form>
                      <div className="d-flex">

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Chọn ngày gửi</Form.Label>
                          <Form.Control
                            type="date"
                            name="duedate"
                            value={location.release_date}
                            placeholder="Due date"

                            onChange={(e) => {
                              setDategui(e.target.value)

                              getAllxehang(e.target.value)

                            }

                            }
                          />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6 ">
                          <Form.Label htmlFor="selectCar">Chọn xe</Form.Label>
                          <Form.Select id="selectCar"

                            onChange={e => {
                              setidcarhang(e.target.value);

                            }}
                          >
                            <option>Chọn xe gửi</option>
                            {arrxehang && arrxehang.map((item, index) => {
                              return (
                                <option key={index} value={item.id}>{item.car.platesCar}</option>
                              )
                            })
                            }
                          </Form.Select>
                        </Form.Group>


                      </div>

                      <div className="d-flex">

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Tên hàng <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setnamehang(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6">
                          <Form.Label htmlFor="selecttypehang">Loại Hàng</Form.Label>
                          <Form.Select as="select"

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
                      <Form.Group className="mb-3 col-12" controlId="exampleForm.ControlInputfrice">
                        <Form.Label>Giá tiền<p className="sao">*</p></Form.Label>
                        <Form.Control
                          type="number"

                          placeholder="vd: 300000"


                          onChange={e => setprice(e.target.value)}

                        ></Form.Control>

                      </Form.Group>
                      <div className="d-flex">
                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Người gửi <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setnamesend(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Sđt người gửi <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="number"
                            onChange={(e) => setsdtsend(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                      </div>

                      <div className="d-flex">

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Người nhận<p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setnameget(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3 col-6">
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
                    <Button variant="secondary" onClick={handleCloseGuiHang1}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={tieptuc}>
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
