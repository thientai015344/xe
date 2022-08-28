import React, { useState } from "react";
import Chartim from "components/chart/Chartim";
import { Card, Container, Row, Col, Button, ButtonGroup, Form } from "react-bootstrap";
import Chartex from "components/chart/Chartex";
import { getchithongke } from "services/carSevice";




function Dashboard() {

  const [datefrom, setdatefrom] = useState()
  const [dateto, setdateto] = useState()
  const [arrchi, setarrchi] = useState([])





  const [active, setActive] = useState('');
  const [seatMode, setSeatMode] = useState('');









  const getcharim = async (event) => {
    setActive(event.target.id);
    setSeatMode('charim');

    // setdataseat(data)
  }

  const getcharex = async (event) => {

    let data = [];
    let seat = {};
    if (datefrom || dateto) {
      let from = datefrom + "T00:00:00.000Z"
      let to = dateto + "T00:00:00.000Z"


      seat.from = from;
      seat.to = to;
      data.push(seat)


    }
    //await getchithongkes(data)
    setActive(event.target.id);
    console.log('ddssdfbsjdfnsdfsd')
    setSeatMode('charex');
    // setdataseat(data)

  }

  const getchithongkes = async (data) => {
    console.log('dd', data)
    try {
      let response = await getchithongke(data);
      if (response && response.errCode !== 0) {
        alert('Có lỗi phía server ')
      } else {

        let convert = response.commoditys && response.commoditys.map(track => {
          let date = '';

          if (track.date) {

            let num = track.dateinput
            let arr = num.toString().split("T")
            date = arr[0].split("-").reverse().join("-");
          }
          return { platesCar: track.car.platesCar, title: track.descriptioncommodities, gia: track.pfice, date: date }
        })

        await setarrchi(convert)
        console.log(convert)


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
                    <Button id="2" className={active === "2" ? "active" : undefined} onClick={getcharim} >Thống Kê thu</Button>
                    <Button id="3" className={active === "3" ? "active" : undefined} onClick={getcharex} >Thống Kê chi </Button>
                  </ButtonGroup>
                  <br />
                </Form>



              </Card.Header>
              <Card.Body className="all-icons">

                {seatMode === 'charim' && (
                  <Chartim
                  //  arr={arrseatup}
                  />
                )}
                {seatMode === 'charex' && (
                  <Chartex
                  //arr={arrseatdow}
                  />
                )}

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


    </>
  );
}


export default Dashboard;
