import React, { useState, useEffect } from "react";
import "../assets/css/_customModal.scss";
import { getALLManageXe, getALLSeat, createNewticket, seatbook, getve, getveid, deletboking, edidtbokkve } from '../services/carSevice';
// react-bootstrap components
import { Card, Container, Table, Row, Col, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import BookingSeatUp from "components/BookingSeat/BookingSeatUp";
import BookingSeatDown from "components/BookingSeat/BookingSeatDown";
import BookingSeatsub from "components/BookingSeat/BookingSeatsub";
import NumberFormat from 'react-number-format';
import Ticket from "components/ticket/Ticket";


function Bookingticket() {
  const [dataInVe, setDataInve] = useState({})
  const [show, setShow] = useState(false);
  const [showfr, setShowfr] = useState(false);
  const [showve, setShowve] = useState(false);
  const [idve, setidve] = useState({})


  const [seditve, setSeditve] = useState(false);

  const handleCloseseditve = () => setSeditve(false);
  const handleShowseditve = () => setSeditve(true);


  const [date, setDate] = useState(new Date());
  const [fName, setfName] = useState('');
  const [sdt, setsdt] = useState('');
  const [frice, setfrice] = useState('');
  const [idmanage, setidmanage] = useState('');
  const [arrmanagexe, setarrmanagexep] = useState()
  const [arrve, setarrve] = useState([])

  const [arrseatup, setarrseatup] = useState()
  const [arrseatdow, setarrseatdow] = useState()
  const [arrseatsub, setarrseatsub] = useState()

  const [arrayseatloop, setarrayseatloop] = useState([])




  let initacti = '1'

  const [active, setActive] = useState(initacti);




  // const [dataseat, setdataseat] = useState([])
  const [seatMode, setSeatMode] = useState('seatDown');



  const getves = async (id) => {
    setarrayseatloop([])

    if (id) {
      let response = await getve(id)
      if (response && response.errCode === 0) {
        const vexe = response.bookingseatxe.reverse();
        let conve = await vexe && vexe.map(track => {
          let num = '';
          if (track.bookingseats.nameClient) {

            num = track.bookingseats.nameClient

          }

          return { idbook: track.bookingseats.id, namekhach: num, sdt: track.bookingseats.phoneNumber, seat: track.bookingseats.seatbooks.seatId }
        })

        await setarrve(conve)

        const arr = [];

        if (conve !== '') {


          await conve && conve.map(track => {


            let text = track.idbook

            if (text == null) {
              setarrayseatloop([])
            } else {

              let id = text.toString();

              arr.push(id)

              return arr;
            }


          })
          let myArrayWithNoDuplicates = await arr.reduce(function (accumulator, element) {
            if (accumulator.indexOf(element) === -1) {
              accumulator.push(element)
            }
            return accumulator
          }, [])




          myArrayWithNoDuplicates && myArrayWithNoDuplicates.map(idd => {

            if (idd) {

              getveids(idd)
            }
          })

        }
      }
    }
  }




  const getveids = async (idd) => {

    let response = await getveid(idd)

    if (response && response.errCode === 0) {

      let name = response.bookingseatxe[0].bookingseat.nameClient;
      let id = response.bookingseatxe[0].bookingseat.id;

      let sdt = response.bookingseatxe[0].bookingseat.phoneNumber;
      let gia = response.bookingseatxe[0].bookingseat.price;
      let ngaydi = response.bookingseatxe[0].bookingseat.managecar.date;
      let bienso = response.bookingseatxe[0].bookingseat.managecar.car.platesCar;
      let from = response.bookingseatxe[0].bookingseat.managecar.roadmap.from;
      let to = response.bookingseatxe[0].bookingseat.managecar.roadmap.to;
      let arr = ngaydi.toString().split("T")
      let createdAt = arr[0].split("-").reverse().join("-");
      let convert = response.bookingseatxe && response.bookingseatxe.map(track => {
        return { id: track.seatId }
      })

      var finalArray = await convert.map(function (obj) {
        return obj.id;
      });

      let dataseatf = finalArray.toString()

      let seat = {};
      if (dataseatf) {
        seat.name = name;
        seat.sdt = sdt;
        seat.id = id;
        seat.gia = gia;
        seat.createdAt = createdAt;
        seat.bienso = bienso;
        seat.from = from;
        seat.to = to;
        seat.seatbook = dataseatf;

        setarrayseatloop((arrayseatloop) => [...arrayseatloop, seat])
      }
    }
  }


  const updateve = () => {



    if (fName !== '') {
      let ves = {
        id: idve,
        nameClient: fName,
        phoneNumber: sdt
      }

      Editcve(ves);
    }
    else {
      alert('Vui lòng nhập thông tin xe')
    }



  }

  const Editcve = async (data) => {
    try {
      let response = await edidtbokkve(data);
      if (response && response.errCode !== 0) {
        alert(' Xe đã tồn tại ')
      } else {
        alert('chinh sua thành công')
        await getves(idmanage);

        handleCloseseditve();


      }
    } catch (error) {
      console.log(error);
    }

  }


  const handleDelete = async (singer) => {

    try {
      let res = await deletboking(singer.id)
      if (res && res.errCode === 0) {

        await getves(idmanage);

        alert('Xóa Thành Công')

      }
      else {
        alert(res.errMessage)
      }

    } catch (error) {
      console.log(error);

    }


  }


  const handleEdit = (item) => {

    setfName(item.name)
    setsdt(item.sdt)
    setidve(item.id)



    handleShowseditve();
  }






  const getAllManageXes = async (dated) => {

    if (dated) {

      let df = dated + "T00:00:00.000Z"


      let response = await getALLManageXe(df)
      if (response && response.errCode === 0) {

        setarrmanagexep(response.manageCar)
      }
    }
    else {
      let df = defaultValue + "T00:00:00.000Z"



      let response = await getALLManageXe(df)
      if (response && response.errCode === 0) {

        setarrmanagexep(response.manageCar)
      }
    }
  }

  useEffect(() => {


    getseatdow();
    getseatUP();
    getseatsub();
    getAllManageXes();


  }, []);



  const [dataSeatUp, setDataSeatUp] = useState([])
  const [dataSeatDown, setDataSeatDown] = useState([])
  const [dataSeatSub, setDataSeatSub] = useState([])


  const handleClose = () => setShow(false);
  const handleShow = () => {

    const current = new Date();
    const ngay = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;


    let datecho = new Date(ngay);
    let datenow = new Date(date);

    if (datenow < datecho) {

      alert('Không được chọn ngày nhỏ hơn ngày hiện tại')




    } else if (idmanage == '') {
      alert('Vui lòng chọn xe để đặt vé')

    }
    else {

      setShow(true)
    }


  };

  const handleClosefr = () => setShowfr(false);
  const handleShowfr = () => setShowfr(true);

  const handleCloseve = () => setShowve(false);
  const handleShowve = () => setShowve(true);


  const getfromdatat = () => {
    if (fName == '' || sdt == '') {

      alert('vui lòng nhập đầy đủ thông tin')

    } else {



      let checksdt = isNumeric(sdt)


      if (checksdt == false) {
        alert('Số điện thoại chưa đúng ')

        // else if (checkfrice == false) {
        //   alert('Giá vé chưa đúng ')
      } else {

        handleShowfr();
        handleClose();


      }



    }

  }


  const saveticket = () => {


    if (!frice) {
      alert('Chưa nhập số tiền số tiền không thể lưu  ')
    }
    else {

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
  }

  function isNumeric(val) {
    return /^-?\d+$/.test(val);
  }




  const createNewtickets = async (data) => {
    try {
      let response = await createNewticket(data);
      if (response && response.errCode !== 0) {
        alert('đã có lỗi xảy ra ')
      } else {

        let result = [];

        let id = response.id;

        let arrrr = [].concat(dataSeatUp, dataSeatDown, dataSeatSub)

        let see = arrrr.filter(Boolean);


        if (see && see.length > 0) {

          see.map(key => {
            let seat = {};
            seat.bookingseatsId = id;
            seat.seatId = key;
            result.push(seat)
            setDataSeatUp('')
            setDataSeatDown('')
            setDataSeatSub('')
            setSeatMode('seatDown')
            setActive(initacti)


          })


        }

        try {

          let response = await seatbook(result);
          if (response && response.errCode !== 0) {
            alert('đã có lỗi xảy ra ')
          } else {

            alert('Tạo vé thành công')

            handleClosefr();
            getves(idmanage);

            setDataSeatUp('')
            setDataSeatDown('')
            setDataSeatSub('')
            setfrice('')



          }
        } catch (error) {
          console.log(error);
        }








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


  const getseatsub = async () => {

    let response = await getALLSeat('seatSub')
    if (response && response.errCode === 0) {
      setarrseatsub(response.allcodes)


    }
  }


  const getseatUP = async () => {

    let response = await getALLSeat('seatup')
    if (response && response.errCode === 0) {
      setarrseatup(response.allcodes)
    }
  }



  const getseatUPw = async (event) => {
    setActive(event.target.id);

    setSeatMode('seatUp');
    // let data = <BookingSeatUp arr={arrseatup} handleSendData={(data) => handleGetDataSeatUp(data)} dataSeatUp={dataSeatUp} />

    // setdataseat(data)

  }



  const getseatSub = async (event) => {
    setActive(event.target.id);

    setSeatMode('seatSub');
    // let data = <BookingSeatUp arr={arrseatup} handleSendData={(data) => handleGetDataSeatUp(data)} dataSeatUp={dataSeatUp} />
    // setdataseat(data)
  }

  const getseatdoww = async (event) => {
    setActive(event.target.id);

    setSeatMode('seatDown');
    // let data = <BookingSeatDown arr={arrseatdow} handleSendData={(data) => handleGetData(data)} />
    // setdataseat(data)

  }

  const handleGetDataSeatDown = (data) => {
    // setdataseatget(data)
    setDataSeatDown(data)


  }


  const handleGetDataSeatUp = (data) => {
    setDataSeatUp(data)



  }

  const handleGetDataSeatSub = (data) => {
    setDataSeatSub(data)



  }

  const today = new Date();
  const numberOfDaysToAdd = 0;
  const datenow = today.setDate(today.getDate() + numberOfDaysToAdd);
  const defaultValue = new Date(datenow).toISOString().split('T')[0] // yyyy-mm-dd
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
                      defaultValue={defaultValue}
                      placeholder="Due date"
                      onChange={(e) => {
                        setDate(e.target.value)

                        getAllManageXes(e.target.value)
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
                        getves(e.target.value)
                      }}
                    >
                      <option>Chọn xe muốn đặt</option>
                      {arrmanagexe && arrmanagexe.map((item, index) => {
                        if (item.status == 1) {

                          return (
                            <option key={index} value={item.id}>{item.car.platesCar}</option>
                          )
                        }
                      })
                      }
                    </Form.Select>
                  </Form.Group>

                </Form>

              </Card.Header>
              <Card.Body className="all-icons">
                {/* handleShow */}
                <Button variant="primary" size="sm" onClick={handleShow} active>
                  Đặt vé
                </Button>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>stt</th>
                      <th>Tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Tổng giá vé</th>
                      <th>ngày đi</th>
                      <th>xe </th>
                      <th>nơi đi - nơi đến</th>
                      <th>số ghế</th>

                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrayseatloop && arrayseatloop.map((item, index) => {

                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.sdt}</td>
                          <td> <NumberFormat
                            thousandSeparator={'.'}
                            decimalSeparator={false}
                            suffix={' đ'}
                            value={item.gia}
                            displayType={"text"}
                          /></td>
                          <td>{item.createdAt}</td>
                          <td>{item.bienso}</td>
                          <td>{item.from}-{item.to}</td>
                          <td>{item.seatbook}</td>
                          <td><button onClick={() => {
                            setDataInve(item)
                            handleShowve()

                          }}>In ve</button>
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

                  <Modal size="lg" show={showve} onHide={handleCloseve}>
                    <Modal.Header closeButton>
                      <Modal.Title>In vé</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Ticket
                          dataInVe={dataInVe}
                        />
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseve}>
                        Đóng
                      </Button>

                    </Modal.Footer>
                  </Modal>
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
                          autoFocus required
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Số điện thoại <p className="sao">*</p> </Form.Label>
                        <Form.Control
                          type="number"
                          pattern="[0-9]{10}"
                          placeholder="vd: 0332584857"
                          onChange={(e) => { setsdt(e.target.value) }}
                          required
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







                <Modal show={seditve} onHide={handleCloseseditve}>
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
                          value={fName}
                          onChange={e => setfName(e.target.value)}
                          autoFocus required
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Số điện thoại <p className="sao">*</p> </Form.Label>
                        <Form.Control
                          type="number"
                          pattern="[0-9]{10}"
                          placeholder="vd: 0332584857"
                          value={sdt}

                          onChange={(e) => { setsdt(e.target.value) }}
                          required
                        ></Form.Control>
                      </Form.Group>

                    </Form>

                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseseditve}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={updateve}>
                      Cập nhật
                    </Button>
                  </Modal.Footer>
                </Modal>











                <Modal show={showfr} onHide={handleClosefr}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chọn Ghế</Modal.Title>
                  </Modal.Header>
                  <Modal.Body  >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInputfrice">
                      <Form.Label>Tổng tiền</Form.Label>

                      <NumberFormat
                        thousandSeparator={'.'}
                        decimalSeparator={false}
                        suffix={' đ'}
                        className="form-control"
                        value={frice}
                        onValueChange={values => {
                          const { formattedValue, floatValue } = values;
                          setfrice(floatValue)//bad code
                        }}
                        placeholder="vd: 100.000.000"
                      />
                    </Form.Group>

                    <Form>
                      <ButtonGroup className="mb-2">
                        <Button id="1" className={active === "1" ? "active" : undefined} onClick={getseatdoww} >Tầng dưới</Button>
                        <Button id="2" className={active === "2" ? "active" : undefined} onClick={getseatUPw} >Tầng trên</Button>
                        <Button id="3" className={active === "3" ? "active" : undefined} onClick={getseatSub} >Ghế sub</Button>
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


                      {/* {dataseat} */}
                      {seatMode === 'seatUp' && (
                        <BookingSeatUp
                          arr={arrseatup}
                          handleSendData={(data) => handleGetDataSeatUp(data)}
                          dataSeatUp={dataSeatUp}
                          arrve={arrve}
                        />
                      )}
                      {seatMode === 'seatDown' && (
                        <BookingSeatDown
                          arr={arrseatdow}
                          handleSendData={(data) => handleGetDataSeatDown(data)}
                          dataSeatDown={dataSeatDown}
                          arrve={arrve}
                        />
                      )}
                      {seatMode === 'seatSub' && (
                        <BookingSeatsub
                          arr={arrseatsub}
                          handleSendData={(data) => handleGetDataSeatSub(data)}
                          dataSeatSub={dataSeatSub}
                          arrve={arrve}
                        />
                      )}
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
