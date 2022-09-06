import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLManageXe } from '../services/carSevice';
import NumberFormat from 'react-number-format';
import { Card, Container, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { CreateNewsigns, getALLTypeHang, CreateNewsignments, getAllsignments, deletehnag, editaddhang } from '../services/carSevice';


function Hang() {
  const [showHang, setShowHang] = useState(false);

  const [showGuiHang1, setShowGuiHang1] = useState(false);



  const [date, setDate] = useState(new Date());
  const [idupdate, setidupdate] = useState()
  const [dategui, setDategui] = useState(new Date());

  const [dateold, setdateold] = useState();
  const [loaihang, setloaihang] = useState('');
  const [idloaihang, setidloaihang] = useState();

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


  const [showGuiHangedit, setShowGuiHangedit] = useState(false);
  const handleCloseGuiHangedit = () => { setShowGuiHangedit(false) };
  const handleShowGuiHangedit = () => {
    setShowGuiHangedit(true)
    getALLTypeHangs();
  };


  const handleEdit = async (hang) => {

    const str = hang.date;

    const [day, month, year] = str.split('-');

    let adddd = year + '-' + month + '-' + day

    if (adddd) {

      getAllxehang(adddd)

      await setdateold(adddd)
    }


    await setidcarhang(hang.idcar)
    await setidloaihang(hang.idhang)

    setnamehang(hang.name)
    setnamesend(hang.nameUserSend)
    setsdtsend(hang.phonenumberUserSend)
    setnameget(hang.nameUserGet)
    setsdtget(hang.phonenumberUserGet)
    setidupdate(hang.id)

    let gia = hang.price
    await setprice(+gia)






    handleShowGuiHangedit();




  }




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


  const handleDelete = async (hang) => {

    try {
      let res = await deletehnag(hang.id)
      if (res && res.errCode === 0) {

        await getAllsignment()

        alert('Xóa Thành Công')

      }
      else {
        alert(res.errMessage)
      }

    } catch (error) {
      console.log(error);

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


      let response = await getALLManageXe(df)
      if (response && response.errCode === 0) {
        setarrxehang(response.manageCar)
      }


    }


  }







  const getAllsignment = async (e) => {
    if (!e) {
      let response = await getAllsignments('ALL')
      if (response && response.errCode === 0) {
        let data = response.consignments.reverse();

        let convert = data && data.map(track => {
          let date = '';

          if (track.date) {

            let num = track.date
            let arr = num.toString().split("T")
            date = arr[0].split("-").reverse().join("-");
          }
          return { id: track.id, name: track.name, nameUserGet: track.nameUserGet, nameUserSend: track.nameUserSend, date: date, phonenumberUserGet: track.phonenumberUserGet, phonenumberUserSend: track.phonenumberUserSend, price: track.price, carname: track.managecar.car.platesCar }

        })

        setarrguihang(convert)


      }

    }
    else {
      let df = e + "T00:00:00.000Z"
      let response = await getAllsignments(df)
      if (response && response.errCode === 0) {
        let data = response.consignments.reverse();

        let convert = data && data.map(track => {
          let date = '';

          if (track.date) {

            let num = track.date
            let arr = num.toString().split("T")

            date = arr[0].split("-").reverse().join("-");
          }
          return { id: track.id, name: track.name, nameUserGet: track.nameUserGet, nameUserSend: track.nameUserSend, date: date, phonenumberUserGet: track.phonenumberUserGet, phonenumberUserSend: track.phonenumberUserSend, price: track.price, carname: track.managecar.car.platesCar }
        })

        setarrguihang(convert)


      }
    }
  }



  const updadesedhang = async () => {
    if (!idcarhang) {
      alert('Vui lòng chọn xe ')
    } else {
      if (idloaihang == '') {
        alert('Vui lòng chọn loại hàng')
      }
      else {
        const current = new Date();
        const ngay = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
        let datecho = new Date(ngay);
        let datenow = new Date(dategui);

        if (datenow < datecho) {
          alert('Không được chọn ngày nhỏ hơn ngày hiện tại')
        }
        else {
          CreateNewsignment();
        }
      }
    }
  }

  useEffect(() => {
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const datenow = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(datenow).toISOString().split('T')[0] // yyyy-mm-dd

    getAllsignment(defaultValue);

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
        if (idupdate) {
          editsenthang();
        }
        else {

          creatsenthang();
        }

      }
    }
  }
  const editsenthang = async () => {


    let userId = sessionStorage.getItem("userId");
    let edithang = {

      id: idupdate,
      name: namehang,
      nameUserSend: namesend,
      phonenumberUserSend: sdtsend,
      nameUserGet: nameget,
      phonenumberUserGet: sdtget,
      typecommoditiesId: idloaihang,
      carhangId: idcarhang,
      price: price,
      date: dategui,
      userId: userId,
    }
    try {
      let response = await editaddhang(edithang);
      if (response && response.errCode !== 0) {
        alert(' xa da ton tai ')
      } else {
        alert('Cập nhật thành công')
        await getAllsignment();
        handleCloseGuiHangedit();
        setidupdate('')

      }
    } catch (error) {
      console.log(error);
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
      carhangId: idcarhang,
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


  const todayd = new Date();
  const numberOfDaysToAdd = 0;
  const datenoww = todayd.setDate(todayd.getDate() + numberOfDaysToAdd);
  const defaultValuwe = new Date(datenoww).toISOString().split('T')[0] // yyyy-mm-dd
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
                    defaultValue={defaultValuwe}
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
                      <th>Xe gửi</th>
                      <th>Tên hàng</th>
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
                          <td>{item.carname}</td>
                          <td>{item.name}</td>
                          <td> <NumberFormat
                            thousandSeparator={'.'}
                            decimalSeparator={false}
                            suffix={' đ'}
                            value={item.price}
                            displayType={"text"}
                          /></td>
                          <td>{item.nameUserSend}</td>
                          <td>{item.phonenumberUserSend}</td>
                          <td>{item.nameUserGet}</td>
                          <td>{item.phonenumberUserGet}</td>

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

                              if (item.status === 1) {
                                return (
                                  <option key={index} value={item.id} >{item.car.platesCar}</option>
                                )
                              }

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
                        <NumberFormat
                          thousandSeparator={'.'}
                          decimalSeparator={false}
                          suffix={' đ'}
                          className="form-control"
                          value={price}
                          onValueChange={values => {
                            const { formattedValue, floatValue } = values;
                            setprice(floatValue)//bad code
                          }}
                          placeholder="vd: 100.000.000"
                        />
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




                <Modal size="lg" show={showGuiHangedit} onHide={handleCloseGuiHangedit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa</Modal.Title>

                  </Modal.Header>

                  <Modal.Body>

                    <Form>
                      <div className="d-flex">

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Chọn ngày gửi</Form.Label>
                          <Form.Control
                            type="date"
                            defaultValue={dateold}
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
                            value={idcarhang}
                            onChange={e => {
                              setidcarhang(e.target.value);

                            }}
                          >
                            <option>Chọn xe gửi</option>
                            {arrxehang && arrxehang.map((item, index) => {

                              if (item.status === 1) {

                                return (

                                  <option key={index} value={item.id} >{item.car.platesCar}</option>
                                )
                              }

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
                            value={namehang}
                            onChange={(e) => setnamehang(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6">
                          <Form.Label htmlFor="selecttypehang">Loại Hàng</Form.Label>
                          <Form.Select id="selecttypehang"
                            value={idloaihang}
                            onChange={e => {
                              setidloaihang(e.target.value);
                            }}
                          >
                            <option>Chọn loại hàng</option>
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
                        <NumberFormat
                          thousandSeparator={'.'}
                          decimalSeparator={false}
                          suffix={' đ'}
                          className="form-control"
                          value={price}
                          onValueChange={values => {
                            const { formattedValue, floatValue } = values;
                            setprice(floatValue)//bad code
                          }}
                          placeholder="vd: 100.000.000"
                        />
                      </Form.Group>
                      <div className="d-flex">
                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Người gửi <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            value={namesend}
                            onChange={(e) => setnamesend(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Sđt người gửi <p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="number"
                            value={sdtsend}

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
                            value={nameget}
                            onChange={(e) => setnameget(e.target.value)}
                            autoFocus
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Sđt người nhận<p className="sao">*</p></Form.Label>
                          <Form.Control
                            type="text"
                            value={sdtget}
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
                    <Button variant="primary" onClick={updadesedhang}>
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
