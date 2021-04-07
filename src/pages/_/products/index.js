import React, { useCallback, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateProductDisclosure } from "store/routes/products/actions";
import { toggleCreateCategoryDisclosure } from "store/routes/categories/actions";
import Button from "components/Common/Button";
import pluralize from "pluralize";
import ProductsTable from "./products";
import CategoriesTable from "./categories";
import useProductsQuery from "./products/useProductsQuery";
import useCategoriesQuery from "./categories/useCategoriesQuery";

const breadcrumbItems = [
  { title: "4pace", link: "#" },
  { title: "Products", link: "/products" },
];

const tabLabels = ["Product", "Category"];

function Products() {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  const { isLoading: isLoadingCategories } = useCategoriesQuery();

  const toggleTab = useCallback(
    (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    },
    [activeTab]
  );

  const toggleDisclosure = useCallback(() => {
    if (activeTab === "Product") dispatch(toggleCreateProductDisclosure());
    else dispatch(toggleCreateCategoryDisclosure());
  }, [activeTab, dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Products" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody className="pt-0">
                <div className="d-flex justify-content-between align-items-center">
                  <Nav tabs className="nav-tabs-custom mb-4">
                    {tabLabels.map((label, index) => (
                      <NavItem key={`products-tab-${index}`}>
                        <NavLink
                          onClick={() => toggleTab(label)}
                          className={classnames(
                            "font-weight-bold p-3 text-capitalize",
                            {
                              active: activeTab === label,
                            }
                          )}
                        >
                          {pluralize(label)}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                  <Button
                    color="primary"
                    w="168.8px"
                    loading={
                      activeTab === "Product" ? isLoadingCategories : false
                    }
                    onClick={toggleDisclosure}
                  >
                    Create {activeTab} <i className="ml-2 fas fa-plus fa-xs" />
                  </Button>
                </div>
                {activeTab === "Product" ? (
                  <ProductsTable />
                ) : (
                  <CategoriesTable />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Products;
