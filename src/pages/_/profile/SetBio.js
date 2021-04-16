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
const SetBio = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
                Toggle Bio info
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>What is Your qualification :</Label>
                                <Input
                                    type="textarea"
                                    name="fullname"
                                    id="fullname"
                                    placeholder="Enter Qualification Here"
                                    height="35"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Where do you live</Label>
                                <Input type="textarea" name="fullname" id="fullname" placeholder="Enter your Address" />
                            </FormGroup>
                            <FormGroup>
                                <Label>What Are you doing for a living</Label>

                                <Input
                                    type="textarea"
                                    name="fullname"
                                    id="fullname"
                                    placeholder="Enter what you are doing for a living "
                                />
                            </FormGroup>
                            <Button>Update</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};
export default SetBio;
