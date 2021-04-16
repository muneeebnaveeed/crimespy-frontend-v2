import React, { useState, useEffect, useRef } from "react";
import {
    Col,
    Collapse,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Card,
    CardBody,
    Label,
    Row,
    Button,
} from "reactstrap";
const SetName = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
                Toggle General info
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Full-Name :</Label>
                                <Input type="text" name="fullname" id="fullname" placeholder="Enter Full Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Date of Birth :</Label>
                                <Input type="date" name="dob" id="dob" placeholder="Select your date of birth" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender:</Label>
                                <Label for="exampleSelect">Select</Label>
                                <Input type="select" name="gender" id="gender">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Shemale</option>
                                </Input>
                            </FormGroup>
                            <Button>Update</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};
export default SetName;
