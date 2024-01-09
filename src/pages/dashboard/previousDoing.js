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

export default function PreviousDoing({ previous }) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePreviousSubmit = async (data) => {
    const { fromDate, toDate } = data;

    // Navigate to another page with the fromDate and toDate as query parameters
    router.push(
      `/dashboard/previousDetails?fromDate=${fromDate}&toDate=${toDate}`
    );
  };

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
              <Row style={{ marginTop: "60px" }}>
                <div className="d-flex mb-2 mt-0" style={{ width: "100%" }}>
                  <Col lg={8} md={10} sm={12}>
                    <TopTitle title="Previous Doing" textAlign="left" />
                    <div
                      style={{
                        background: "#fff",
                        padding: "25px 50px",
                        borderRadius: "20px",
                      }}
                    >
                      {/* Form header and login Form data */}
                      {/* Title */}
                      <Form onSubmit={handleSubmit(handlePreviousSubmit)}>
                        <div className={Style.date}>
                          <div className={Style.from}>
                            <Form.Group className="mb-3" controlId="formEmail">
                              <Form.Label className={Style.inputLabel}>
                                From Date
                              </Form.Label>
                              <div className={Style.textField}>
                                <Form.Control
                                  type="date"
                                  className={`${Style.inputField} remove-focus`}
                                  {...register("fromDate", { required: true })}
                                />
                              </div>
                            </Form.Group>
                          </div>
                          <div className={Style.to}>
                            <Form.Group className="mb-3" controlId="formEmail">
                              <Form.Label className={Style.inputLabel}>
                                To Date
                              </Form.Label>
                              <div className={Style.textField}>
                                <Form.Control
                                  type="date"
                                  className={`${Style.inputField} remove-focus`}
                                  {...register("toDate", { required: true })}
                                />
                              </div>
                            </Form.Group>
                          </div>

                          {/* Submit Button */}
                          <div className={Style.submit}>
                            <Button variant="primary" type="submit">
                              Submit
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
