import { Col, Row, Tag } from "antd";

import { FaShoppingCart } from "react-icons/fa";
import { TProduct } from "../../types";
import CommonBtn from "../ui/CommonBtn";

/**
 * TODO:
 * 1. Make a reusable function for updating wishlist and shopping cart in both ProductCard and FeatureProductLargeCard
 * 1. Make total feedbacks dynamic
 */

const ShopProductLargeCard = ({ product }: { product: TProduct }) => {
  return (
    <Row className="shadow-lg rounded-md overflow-hidden bg-white ">
      <Col
        span={24}
        className="relative bg-warning"
      >
        <img
          className="w-full h-full"
          src={product?.images[2]}
          alt=""
        />
      </Col>
      <Col
        span={24}
        className="space-y-3 bg-warning text-center flex flex-col justify-center items-center p-4"
      >
        <p className="text-[#BE4646] font-bold ">Best Selling Product</p>
        <h4 className="text-3xl text-grayBlack">{product.name}</h4>
        <p className="font-semibold">For all ellectronics products</p>
        <div>
          <span>Only for: </span>
          <Tag
            color="#ffffff"
            style={{ color: "#191C1F", fontWeight: "600", fontSize: "1rem" }}
          >
            {product.price} BDT
          </Tag>
        </div>
        <div className="w-2/3 mx-auto">
          <CommonBtn size="large">
            <FaShoppingCart /> Add To Cart
          </CommonBtn>
        </div>
      </Col>
    </Row>
  );
};

export default ShopProductLargeCard;
