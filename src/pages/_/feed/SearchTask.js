import React, { useCallback, useMemo, useRef, useState } from 'react';
import Button from 'components/Common/Button';

import axios from 'axios';
import {
    Form,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Card,
    FormText,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import { Formik, useFormik } from 'formik';
import { Col, Row } from 'reactstrap/lib';
import Select from 'components/Common/Select';
import firebase from 'firebase';
import { postSchema } from 'helpers/schema';
import { db, getLoggedInUser, storage } from 'helpers/auth';
import makeid from 'helpers/imagefunction';
import { useQueryClient } from 'react-query';
import { showSuccessToast } from 'helpers/showToast';
import crimeCategories from 'config/crimeCategories';
import { set } from 'lodash';

const SearchTask = ({ Task }) => {
    const [searchTask, setSearchTask] = useState('');
    const Action = () => {
        console.log({ searchTask });
        setSearchTask();
    };
    const updateText = (val) => {
        setSearchTask(val.target.value);
    };

    return (
        <Card className="m-0 p-3">
            <Form>
                <InputGroup>
                    <InputGroupAddon addonType="append">
                        <Button onClick={Action}>Search</Button>
                    </InputGroupAddon>
                    <Input
                        placeholder="Enter text for search"
                        type="text"
                        name="searchTask"
                        id="searchTask"
                        onChange={updateText}
                    />
                </InputGroup>
            </Form>
        </Card>
    );
};
export default SearchTask;
