import React, { useState } from "react";
import { db } from "../../../helpers/auth";
import { Form, FormGroup } from "reactstrap";
import { Input } from "reactstrap/lib";
import Button from "components/Common/Button";

export default function CreateComment(props) {
    return (
        <Form className="m-0 mt-2">
            <FormGroup className="m-0">
                <div className="d-flex">
                    <Input type="text" placeholder="Add a comment..." className="flex-grow-1 rounded-0" />
                    <Button type="submit" color="primary" className="rounded-0">
                        <i className="fa fa-comments" />
                    </Button>
                </div>
            </FormGroup>
        </Form>
    );
}
