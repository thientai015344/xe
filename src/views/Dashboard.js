import React, { useState } from "react";
import Chartim from "components/chart/Chartim";
import ChartHnag from "components/chart/Charthnag";

import { Card, Container, Row, Col, Button, ButtonGroup, Form } from "react-bootstrap";
import Chartex from "components/chart/Chartex";
import { getchithongke, getthuve, getveid, getthuhang } from "services/carSevice";
import TableChi from "./exel/TableChi";
import TableThu from "./exel/TableThu";
import TableHang from "./exel/TableHang";


import '../assets/css/dasbo.css'


function Dashboard() {
  const [arrayseatloop, setarrayseatloop] = useState([])

  const [datefrom, setdatefrom] = useState()
  const [dateto, setdateto] = useState()
  const [arrchi, setarrchi] = useState([])
  const [arrhang, setarrhang] = useState([])

  const [sumChi, setSumchi] = useState(0)




  const [active, setActive] = useState('');
  const [seatMode, setSeatMode] = useState('');


  const getcharim = async (event) => {

    if (arrayseatloop) {

      setarrayseatloop([])
    }



    let seat = {};
    if (datefrom || dateto) {
      let from = datefrom + "T00:00:00.000Z"
      let to = dateto + "T00:00:00.000Z"
      seat.from = from;
      seat.to = to;
    }
    await getIdves(seat)
    // setdataseat(data)
    setActive(event.target.id);
  }
  const getIdves = async (data) => {

    try {
      let response = await getthuve(data);
      if (response && response.errCode !== 0) {
        alert('Có lỗi phía server ')
      } else {
        const arr = [];
        if (response.commoditys !== '') {
          await response.commoditys && response.commoditys.map(track => {
            let text = track.bookingseats.id
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
          console.log('id CHUOI', myArrayWithNoDuplicates)
          myArrayWithNoDuplicates && myArrayWithNoDuplicates.map(idd => {
            if (idd) {
              getveids(idd)
            }
          })
        }
      }
    } catch (error) {
      console.log(error);
    }

  }


  const getveids = async (idd) => {

    let response = await getveid(idd)

    if (response && response.errCode === 0) {

      let name = response.bookingseatxe[0].bookingseat.nameClient;
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
        seat.gia = gia;
        seat.createdAt = createdAt;
        seat.bienso = bienso;
        seat.from = from;
        seat.to = to;
        seat.seatbook = dataseatf;

        await setarrayseatloop((arrayseatloop) => [...arrayseatloop, seat])

        setSeatMode('charim');
      }
    }
  }



  const getcharhnag = async (event) => {


    let seat = {};
    if (datefrom || dateto) {
      let from = datefrom + "T00:00:00.000Z"
      let to = dateto + "T00:00:00.000Z"


      seat.from = from;
      seat.to = to;



    }
    await getthuhangs(seat)
    setActive(event.target.id);
    console.log('ddssdfbsjdfnsdfsd')
    setSeatMode('charhang');
    // setdataseat(data)

  }

  const getthuhangs = async (data) => {

    try {
      let response = await getthuhang(data);

      if (response && response.errCode !== 0) {
        alert('Có lỗi phía server ')
      } else {

        let datachi = response.commoditys.reverse();
        console.log('hangd', datachi)

        let sum = 0;
        let convert = datachi && datachi.map(track => {

          sum += +track.price;
          let datedd = '';

          if (track.date) {

            let num = track.date
            let arr = num.toString().split("T")
            datedd = arr[0].split("-").reverse().join("-");
          }
          return { platesCar: track.managecar.car.platesCar, namehang: track.name, nameuser: track.nameUserSend, sdt: track.phonenumberUserSend, gia: track.price, date: datedd }
        })





        await setarrhang(convert)






      }


    } catch (error) {
      console.log(error);
    }

  }

  const getcharex = async (event) => {


    let seat = {};
    if (datefrom || dateto) {
      let from = datefrom + "T00:00:00.000Z"
      let to = dateto + "T00:00:00.000Z"


      seat.from = from;
      seat.to = to;



    }
    await getchithongkes(seat)
    setActive(event.target.id);
    console.log('ddssdfbsjdfnsdfsd')
    setSeatMode('charex');
    // setdataseat(data)

  }

  const getchithongkes = async (data) => {

    try {
      let response = await getchithongke(data);
      if (response && response.errCode !== 0) {
        alert('Có lỗi phía server ')
      } else {

        let datachi = response.commoditys.reverse();
        let sum = 0;
        let convert = datachi && datachi.map(track => {

          sum += +track.price;
          let datedd = '';

          if (track.dateinput) {

            let num = track.dateinput
            let arr = num.toString().split("T")
            datedd = arr[0].split("-").reverse().join("-");
          }
          return { platesCar: track.car.platesCar, title: track.descriptioncommodities, gia: track.price, date: datedd }
        })

        setSumchi(sum);

        await setarrchi(convert)



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
                <Card.Title as="h4">Thống kê</Card.Title>


                <Form className="d-flex">
                  <Form.Group className="mb-3 col-6">
                    <Form.Label>Từ ngày</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Due date"
                      value={datefrom}
                      onChange={(e) => {
                        setdatefrom(e.target.value)
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-6">
                    <Form.Label>Tới ngày</Form.Label>
                    <Form.Control
                      type="date"


                      placeholder="Due date"
                      value={dateto}
                      onChange={(e) => {
                        setdateto(e.target.value)

                      }

                      }
                    />
                  </Form.Group>
                </Form>

                <Form className="d-flex col-8" >
                  <ButtonGroup className="mb-2">
                    <Button id="2" className={active === "1" ? "active" : undefined} onClick={getcharim} >Thống kê tiền vé</Button>
                    <Button id="2" className={active === "2" ? "active" : undefined} onClick={getcharhnag} >Thống kê tiền hàng</Button>
                    <Button id="3" className={active === "3" ? "active" : undefined} onClick={getcharex} >Thống Kê chi </Button>
                  </ButtonGroup>
                  <br />
                </Form>



              </Card.Header>
              <Card.Body className="all-icons">

                {seatMode === 'charim' && (
                  <Chartim
                    arrayseatloop={arrayseatloop}
                  />
                )}

                {seatMode === 'charhang' && (
                  <ChartHnag
                    arrhang={arrhang}
                  />
                )}


                {seatMode === 'charex' && (
                  <>
                    {arrchi && arrchi.length > 0 && <span className="tongtien">Tổng tiền chi = {sumChi.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </span>}
                    <Chartex
                      arrchi={arrchi}

                    />
                  </>
                )}


              </Card.Body>
            </Card>
          </Col>
        </Row>

        {seatMode === 'charex' && (
          <TableChi
            arrchi={arrchi}
            to={dateto}
            from={datefrom}
          />
        )}

        {seatMode === 'charhang' && (

          <TableHang
            arrhang={arrhang}
            to={dateto}
            from={datefrom}
          />


        )}

        {seatMode === 'charim' && (

          <TableThu
            arrayseatloop={arrayseatloop}
            to={dateto}
            from={datefrom}
          />


        )}



      </Container>


    </>
  );
}


export default Dashboard;
