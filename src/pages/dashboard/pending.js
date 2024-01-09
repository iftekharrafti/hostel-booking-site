/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Style from "@/styles/dashboard/previousDoing.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import TopTitle from "@/components/topTitle/TopTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { subDays, format } from "date-fns";

const getCookie = (req, cookieName) => {
  // For server-side rendering, use req.headers.cookie
  if (req && req.headers && req.headers.cookie) {
    const cookiesList = req.headers.cookie.split("; ");
    const cookie = cookiesList.find((c) => c.startsWith(`${cookieName}=`));
    if (cookie) {
      return cookie.split("=")[1];
    }
  }

  // For client-side rendering, use js-cookie
  return cookies.get(cookieName);
};

export default function PreviousDoing({ previous }) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  console.log(previous);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head>
        <title>DASHBOARD::Previous Doing</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        <>
          <div className={`${Style.mainContainer} d-flex`}>
            {/* Dashboard Left Side and Header */}
            <DashboardLeftSide />

            {/* Main Content */}
            <div className={`${Style.content} px-4`}>
              <Row style={{ marginTop: "70px" }}>
                <Col md={8} sm={12}>
                  <Col md={10} sm={12}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Grand Total</th>
                          <th>Product</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previous?.data?.map((item) => (
                          <tr key={item.ledger_id}>
                            <td>{item.salesDate}</td>
                            <td>{item.grandTotal}</td>
                            <td>
                              {/* {item.products.length > 0 && (
                                <thead>
                                  <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                              )} */}

                              {item.products.map((product) => (
                                <Table
                                  striped
                                  bordered
                                  hover
                                  key={product.saleProductID}
                                >
                                  <tbody>
                                    <tr>
                                      <td>{product.productName}</td>
                                      <td>{product.quantity}</td>
                                      <td>{product.productPrice}</td>
                                      <td>{product.price}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
        </>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const userId = getCookie(context.req, "USER_ID");
  const fromDate = format(subDays(new Date(), 30), "yyyy-MM-dd");
  const toDate = format(new Date(), "yyyy-MM-dd");

  try {
    const response = await axios.get(
      `https://www.dhakauniversityclub.com/api/salesQueues?memberID=${userId}&from=${fromDate}&to=${toDate}`
    );

    const data = response.data;

    return {
      props: {
        previous: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        previous: null,
      },
    };
  }
}
