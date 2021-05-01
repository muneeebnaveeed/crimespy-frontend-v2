import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
    Spinner,
} from "reactstrap";
import Th from "components/Common/Th";
import { db } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";
import EditPreset from "./EditPreset";
import { If, Then, Else, When } from "react-if";
import useDisclosure from "helpers/useDisclosure";

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

const Presets = () => {
    const presets = useModifiedQuery("presets", fetchPresets);
    const editDisclosure = useDisclosure();
    const [selectedPreset, setSelectedPreset] = useState(null);

    const handleEditPreset = useCallback(
        (preset) => {
            console.log(preset);
            setSelectedPreset(preset);
            editDisclosure.toggle();
        },
        [editDisclosure.toggle, setSelectedPreset]
    );

    return (
        <>
            <Card>
                <CardBody>
                    <If condition={presets.isLoading}>
                        <Then>
                            <Spinner />
                        </Then>
                        <Else>
                            <If condition={presets.isError}>
                                <Then>
                                    <p>Cannot fetch presets: {presets.error}</p>
                                </Then>
                                <Else>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="page-title-box">
                                                <h4 className="mb-0">Manage Presets</h4>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
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
                                                    {presets.data?.map((preset, i) => (
                                                        <>
                                                            <tr key={i}>
                                                                <Th>{preset.value.id}</Th>
                                                                <Th>{preset.value.title}</Th>
                                                                <Th>
                                                                    <Button color="link" className="p-0">
                                                                        View Permissions
                                                                    </Button>
                                                                </Th>
                                                                <Th>
                                                                    <ButtonGroup>
                                                                        <Button
                                                                            color="light"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                handleEditPreset(preset.value)
                                                                            }
                                                                        >
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
                                        </Col>
                                    </Row>
                                </Else>
                            </If>
                        </Else>
                    </If>
                </CardBody>
            </Card>
            <When condition={selectedPreset}>
                <EditPreset isOpen={editDisclosure.isOpen} toggle={editDisclosure.toggle} preset={selectedPreset} />
            </When>
        </>
    );
};
export default Presets;
