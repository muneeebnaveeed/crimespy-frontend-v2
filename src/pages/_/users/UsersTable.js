import React, { useCallback, useState } from 'react';
import { ButtonGroup, Card, CardBody, Table } from 'reactstrap';

// Import Breadcrumb
import { useModifiedQuery } from 'helpers/query';

import Spinner from 'components/Common/Spinner';
import Error from 'components/Common/Error';
import Button from 'components/Common/Button';
import Th from 'components/Common/Th';
import { db } from 'helpers/auth';
import useDisclosure from 'helpers/useDisclosure';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import usePermissions from 'helpers/usePermissions';
import axios from 'axios';
import Select from '../../../components/Common/Select';
import DeleteUser from './DeleteUser';
import SearchTask from '../feed/SearchTask';

const fetchUsers = async () => axios.get(`https://crimespy.herokuapp.com/users`).then((res) => res.data);

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

function UsersTable(props) {
    const users = useModifiedQuery('users', fetchUsers);
    const presets = useModifiedQuery('presets', fetchPresets);
    const queryClient = useQueryClient();
    const { isOpen, toggle, onOpen } = useDisclosure();

    const [changingRole, setChangingRole] = useState(null);
    const [userId, setUserId] = useState('');
    const history = useHistory();

    const handlePassInfoShow = async (id) => {
        toggle();
        setUserId(id);
    };

    const isAuthorized = usePermissions('users');

    const handleChangeRole = useCallback(async (role, id) => {
        setChangingRole(id);
        try {
            await db
                .collection('users')
                .doc(id)
                .update({ role: role.value.title, permissions: role.value.permissions });
            await queryClient.invalidateQueries('users');
        } catch (err) {
            console.error(err.message);
        }
        setChangingRole(null);
    }, []);

    return (
        <>
            <Card>
                {' '}
                {((users.isLoading && !users.isError) || (presets.isLoading && !presets.isError)) && <Spinner />}
                {((users.isError && !users.isLoading) || (presets.isError && !presets.isLoading)) && (
                    <Error
                        for={users.isError ? 'users' : 'roles'}
                        onClick={users.isError ? users.refetch : presets.refetch}
                    />
                )}
                <CardBody
                    className="pt-0"
                    style={
                        users.data?.length
                            ? {}
                            : {
                                  minHeight: 350,
                              }
                    }
                >
                    <SearchTask />
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
                                <th className="bold-text">Username</th>
                                <th className="bold-text">Email</th>
                                <th className="bold-text">Number</th>
                                <th className="bold-text">Role Presets</th>
                                <th className="bold-text">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {' '}
                            {users.data?.map((user, i) => {
                                const isSelectBusy = changingRole === user.id;
                                return (
                                    <>
                                        <tr key={i}>
                                            <Th scope="row" key={i}>
                                                {user.id.substring(user.id.length - 3, user.id.length)}{' '}
                                            </Th>
                                            <Th>{user.displayName}</Th>
                                            <Th>{user.email}</Th>
                                            <Th>{user.phoneNumber}</Th>
                                            <Th>
                                                <Select // as={AsyncSelect}
                                                    options={presets.data}
                                                    defaultValue={{
                                                        value: user.permissions,
                                                        label: user.role,
                                                    }}
                                                    onChange={(role) =>
                                                        role.label !== user.role
                                                            ? handleChangeRole(role, user.id)
                                                            : null
                                                    }
                                                    isLoading={isSelectBusy}
                                                    isDisabled={isSelectBusy}
                                                />
                                            </Th>
                                            <Th>
                                                <ButtonGroup>
                                                    {' '}
                                                    {isAuthorized('edit') && (
                                                        <Button
                                                            color="light"
                                                            size="sm"
                                                            onClick={() => history.push(`/users/edit?user=${user.id}`)}
                                                        >
                                                            <i className="fas fa-user-edit" />
                                                        </Button>
                                                    )}
                                                    {isAuthorized('delete') && (
                                                        <Button
                                                            color="light"
                                                            size="sm"
                                                            onClick={() => handlePassInfoShow(user.id)}
                                                        >
                                                            <i className="fas fa-trash-alt" />
                                                        </Button>
                                                    )}{' '}
                                                </ButtonGroup>
                                            </Th>
                                        </tr>
                                    </>
                                );
                            })}{' '}
                        </tbody>
                        {!users.data?.length && !users.isLoading && !users.isError && (
                            <caption style={{ textAlign: 'center' }}>No users found</caption>
                        )}{' '}
                    </Table>
                </CardBody>
            </Card>
            <DeleteUser isOpen={isOpen} toggle={toggle} userId={userId} />
        </>
    );
}

export default UsersTable;
