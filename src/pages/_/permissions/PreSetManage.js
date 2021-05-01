import React, { useState, useEffect, useRef, useMemo } from "react";
import { Formik, useFormik } from "formik";
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
    ButtonGroup,
    Button,
    Table,
} from "reactstrap";
import Th from "components/Common/Th";
import { db } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";
import EditPreset from "./EditPreset";

const PreSetManagement = () => {
    const fetchPresets = async () => {
        const snapshot = db.collection("presets").get();
        const docs = (await snapshot).docs;

        return new Promise((resolve, reject) => {
            const presets = docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const modifiedPresets = presets.map((preset) => ({
                value: preset,
                label: preset.title,
            }));
            resolve(modifiedPresets);
        });
    };

    const preSets = useModifiedQuery("presets", fetchPresets);
    console.log(preSets);
    return (
        <>
            <Card>
                <CardBody>
                    <Table
                        responsive
                        size="xl"
                        borderless
                        hover
                        style={{ minWidth: "706px" }}
                        className="position-relative"
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Role/PreSet</th>
                                <th>Permission</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {preSets.data?.map((preSet, i) => (
                                <>
                                    <tr key={i}>
                                        <Th>{preSet.value.id}</Th>
                                        <Th>{preSet.value.title}</Th>
                                        <Th>
                                            <Button color="link" className="p-0">
                                                View Permissions
                                            </Button>
                                        </Th>
                                        <Th>
                                            <ButtonGroup>
                                                <Button color="light" size="sm">
                                                    <i className="fas fa-edit" />
                                                </Button>
                                                <Button color="light" size="sm">
                                                    <i className="fas fa-trash-alt" />
                                                </Button>
                                            </ButtonGroup>
                                        </Th>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <EditPreset />
        </>
    );
};
export default PreSetManagement;
