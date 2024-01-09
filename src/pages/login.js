/* eslint-disable react/jsx-no-duplicate-props */
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Style from "@/styles/login.module.css";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [scheneChange, setScheneChange] = useState(true);
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLoginSubmit = async (data) => {
    try {
      setPhone(data.phone);
      setLoadingBtn(true);
      const response = await fetch(`${BASE_URL}/users/${data.phone}`);
      const result = await response.json();
      console.log(result);
      if (result.status === "success") {
        toast.success("We've sent a 4-digit one time PIN in your phone");
        setLoadingBtn(false);
        setScheneChange(!scheneChange);
        reset();
      } else if (result.status === "error") {
        toast.error(result.message);
        setLoadingBtn(false);
      } else {
        toast.error(result.message);
        setLoadingBtn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // http://localhost:3000/api/users/01750360044/9615
  const handleCodeSubmit = async (data) => {
    try {
      setLoadingBtn(true);
      const response = await fetch(`${BASE_URL}/users/${phone}/${data.code}`);
      const result = await response.json();
      if (result.status === "success") {
        Cookies.set("TOKEN_LOGIN", result.tokenLogin, { expires: 2 });
        Cookies.set("USER_ID", result.id, { expires: 2 });
        Cookies.set("USER_NAME", result.name, { expires: 2 });
        setLoadingBtn(false);
        toast.success(result.message);
        router.push("/dashboard");
        reset();
      } else if (result.status === "error") {
        setLoadingBtn(false);
        toast.error(result.message);
      } else {
        setLoadingBtn(false);
        toast.error(result.message);
      }
    } catch (err) {
      console.log(err);
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Head>
        <title>LOGIN::</title>
        <meta name="description" content="{data?.admin?.nameen}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main className={Style.login}>
        <Container>
          <Row>
            <div
              className="d-flex justify-content-center mb-5 mt-4"
              style={{ width: "100%" }}
            >
              {scheneChange ? (
                <Col lg={4} md={7} sm={7}>
                  <div className={Style.loginContainer}>
                    {/* Form header and login Form data */}
                    {/* Title */}
                    {/* <TopTitle title="Phone" /> */}
                    <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          className={`${Style.inputField} remove-focus`}
                          {...register("phone", { required: true })}
                          placeholder="Phone Number"
                        />
                        {errors.phone && (
                          <span className="text-danger">Phone is required</span>
                        )}
                      </Form.Group>

                      {/* Submit Button */}
                      {loadingBtn ? (
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ width: "100%" }}
                          disabled
                        >
                          Loading...
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ width: "100%" }}
                        >
                          Sign In
                        </Button>
                      )}
                    </Form>
                  </div>
                </Col>
              ) : (
                <Col lg={4} md={7} sm={7}>
                  <div className={Style.loginContainer}>
                    {/* Form header and login Form data */}
                    {/* Title */}
                    {/* <TopTitle title="We've sent a 4-digit one time PIN in your phone" /> */}
                    <Form onClick={handleSubmit(handleCodeSubmit)}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>4-digit PIN</Form.Label>
                        <Form.Control
                          type="text"
                          className={`${Style.inputField} remove-focus`}
                          {...register("code", { required: true })}
                          placeholder="Enter 4-digit PIN"
                        />
                        {errors.code && (
                          <span className="text-danger">Code is required</span>
                        )}
                      </Form.Group>

                      {/* Submit Button */}
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled={loadingBtn}
                      >
                        {loadingBtn
                          ? "Loading..."
                          : scheneChange
                          ? "Sign In"
                          : "Submit"}
                      </Button>
                    </Form>
                  </div>
                </Col>
              )}
            </div>
          </Row>
        </Container>
      </main>
    </>
  );
}
