import React, { useState, useCallback } from 'react';
import { Col, Card, CardBody, Row, ButtonGroup, Button, Table, Spinner } from 'reactstrap';
import Th from 'components/Common/Th';
import { db } from 'helpers/auth';
import { useModifiedQuery } from 'helpers/query';
import { If, Then, Else, When } from 'react-if';
import useDisclosure from 'helpers/useDisclosure';
import { useQueryClient } from 'react-query';
import ViewPreset from './ViewPreset';
import EditPreset from './EditPreset';

const fetchPresets = async () => {
    const snapshot = db.collection('presets').get();
    const { docs } = await snapshot;

    return new Promise((resolve, reject) => {
        const presets = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const modifiedPresets = presets.map((preset) => ({ value: preset, label: preset.title }));
        resolve(modifiedPresets);
    });
};

const Presets = () => {
    const presets = useModifiedQuery('presets', fetchPresets);
    const editDisclosure = useDisclosure();
    const viewDisclosure = useDisclosure();
    const queryClient = useQueryClient();
    const [selectedPreset, setSelectedPreset] = useState(null);

    const handleEditPreset = useCallback(
        (preset) => {
            // console.log(preset);
            setSelectedPreset(preset);
            editDisclosure.toggle();
        },
        [editDisclosure.toggle, setSelectedPreset]
    );
    const handleViewPreset = useCallback(
        (preset) => {
            setSelectedPreset(preset);
            viewDisclosure.toggle();
        },
        [viewDisclosure.toggle, setSelectedPreset]
    );

    const deletePreset = async (obj) => {
        console.log('ob', obj.title);
        const presetRef = db.collection('presets');
        await presetRef
            .doc(obj.title)
            .delete()
            .then(function () {
                console.log('delete Presets info successfully');
            })
            .catch(function (error) {
                console.log(`Errors post info ${error}`);
            });
        await queryClient.invalidateQueries('presets');
    };

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
                                                style={{ minWidth: '706px' }}
                                                className="position-relative"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th className="bold-text">#</th>
                                                        <th className="bold-text">Role/PreSet</th>
                                                        <th className="bold-text">Permission</th>
                                                        <th className="bold-text">Manage</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {' '}
                                                    {presets.data?.map((preset, i) => (
                                                        <>
                                                            <tr key={i}>
                                                                <Th>{preset.value.id}</Th>
                                                                <Th>{preset.value.title}</Th>
                                                                <Th>
                                                                    <Button
                                                                        color="link"
                                                                        className="p-0"
                                                                        onClick={() => handleViewPreset(preset.value)}
                                                                    >
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
                                                                        <Button
                                                                            color="light"
                                                                            size="sm"
                                                                            onClick={() => deletePreset(preset.value)}
                                                                        >
                                                                            <i className="fas fa-trash-alt" />
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                </Th>
                                                            </tr>
                                                        </>
                                                    ))}{' '}
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
                <EditPreset
                    isOpen={editDisclosure.isOpen}
                    preset={selectedPreset}
                    toggle={() => {
                        setSelectedPreset(null);
                        editDisclosure.toggle();
                    }}
                />
                <ViewPreset
                    isOpen={viewDisclosure.isOpen}
                    preset={selectedPreset}
                    toggle={() => {
                        setSelectedPreset(null);
                        viewDisclosure.toggle();
                    }}
                />
            </When>
        </>
    );
};
export default Presets;
