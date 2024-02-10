import { Col, Row } from "antd";
import { FaRegHandshake } from "react-icons/fa6";
import { FiHeadphones } from "react-icons/fi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { SlBadge } from "react-icons/sl";

const ProductDetailsTab = ({ product }) => {
  const featuresItems = [
    {
      icon: <SlBadge />,
      text: "Free 1 Year Warranty",
    },
    {
      icon: <LiaShippingFastSolid />,
      text: "Free Shipping & Fasted Delivery",
    },
    {
      icon: <FaRegHandshake />,
      text: "100% Money-back guarantee",
    },
    {
      icon: <FiHeadphones />,
      text: "24/7 Customer support",
    },
    {
      icon: <MdOutlinePayment />,
      text: "Secure payment method",
    },
  ];

  const shippingInfo = [
    {
      courier: "Courier",
      duration: "2 - 4 days",
      cost: "free shipping",
    },
    {
      courier: "UPS Ground Shipping",
      duration: "4 - 6 days",
      cost: "$29.00",
    },
    {
      courier: "Unishop Global Export",
      duration: "3 - 4 days",
      cost: "$39.00",
    },
  ];

  return (
    <div className="space-y-4">
      <div
        style={{ border: "2px solid #e2e8f0" }}
        className="flex w-full items-center justify-center text-xl font-semibold gap-4 py-2"
      >
        <p>Description</p>
        <p>Review</p>
      </div>
      <Row
        gutter={[16, 16]}
        justify={"center"}
        align={"top"}
        style={{ padding: "1rem", borderBottom: "2px solid #e2e8f0" }}
      >
        <Col
          span={24}
          md={{ span: 8 }}
          className="space-y-2"
        >
          <h3>Description</h3>
          <p className="text-gray">{product?.description}</p>
        </Col>
        <Col
          span={24}
          md={{ span: 8 }}
          className="relative "
        >
          <h3>Features</h3>
          <div className="absolute w-[1px] h-3/4 bg-gray left-0 top-1/2 transform -translate-y-1/2"></div>
          <ul className="space-y-1 mt-2 ">
            {featuresItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2"
              >
                <span className="text-orange text-xl">{item.icon}</span>
                <span className="text-grayBlack font-bold">{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="absolute w-[1px] h-3/4 bg-gray right-0 top-1/2 transform -translate-y-1/2"></div>
        </Col>
        <Col
          span={24}
          md={{ span: 8 }}
        >
          <h3>Shipping Information</h3>
          <ul className="space-y-2 mt-2">
            {shippingInfo.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2"
              >
                <span className="font-bold">{item.courier}</span>
                <span className="text-grayBlack ">{item.duration}</span>
                <span className="text-grayBlack">{item.cost}</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsTab;
