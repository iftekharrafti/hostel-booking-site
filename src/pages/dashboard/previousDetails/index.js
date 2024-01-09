import axios from "axios";
import Style from "@/styles/dashboard/previousDoing.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { Col, Row, Table } from "react-bootstrap";
import TopTitle from "@/components/topTitle/TopTitle";

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

const PreviousDetails = ({ previous }) => {
  console.log(previous);

  return (
    <main>
      <>
        <div className={`${Style.mainContainer} d-flex`}>
          {/* Dashboard Left Side and Header */}
          <DashboardLeftSide />

          {/* Main Content */}
          <div
            className={`${Style.content} px-4`}
            style={{ marginTop: "70px" }}
          >
            <TopTitle title="Previous Details" textAlign="left" />
            <Row>
              <Col md={8} sm={12}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Product Info</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previous?.data?.ledger?.map((item) => (
                      <tr key={item.ledger_id}>
                        <td>{item.trans_date}</td>
                        <td>{item.view_product_info}</td>
                        <td>{item.dr}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </>
    </main>
  );
};

export default PreviousDetails;

export async function getServerSideProps(context) {
  const { fromDate, toDate } = context.query;
  const id = getCookie(context.req, "USER_ID");
  console.log(id);

  try {
    const response = await axios.get(
      `https://www.dhakauniversityclub.com/api/memberLedger?memberID=${id}&from=${fromDate}&to=${toDate}`
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
