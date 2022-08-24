import React from "react";
import { Line } from "react-chartjs-2";
// react-bootstrap components
import { Container, Form } from "react-bootstrap";
import { Chart, registerables } from "chart.js";

function Dashboard() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  Chart.register(...registerables);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu",
        data: [10000, 2000, 20000, 6000, 700, 8000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
    //   title: {
    //     display: true,
    //     text: 'Chart.js Line Chart',
    //   },
    // },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 1000,
        suggestedMax: 10000,
      },
    },
  };

  return (
    <>
      <Container fluid>
        <Form.Group className="mb-3 col-6" style={{ float: "right", width: "200px" }}>
          <Form.Control
            type="date"
            name="duedate"
            placeholder="Due date"
          // value={}
          // onChange={(e) => {

          // }}
          />
        </Form.Group>
        <Line options={options} data={data} />
      </Container>
    </>
  );
}

export default Dashboard;
