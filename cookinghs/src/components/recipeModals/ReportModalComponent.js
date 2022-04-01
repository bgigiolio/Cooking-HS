import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Form, Label, Input, Col } from 'reactstrap';

function ReportModal(props) {
    const [category, setCategory] = useState('Hate Speech');
    const [context, setContext] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitting report')
        const newReport = {
            reporter_user: props.currentUser,
            reported_user: 'admin', //TODO - temp, need to change (req.body.... does not work)
            item: '', //TODO - temporary, need to change
            item_type: '', //TODO - temp, need to change
            category: category,
            context: context,
        }
        props.postReport(newReport)
        .then(props.toggle)
    }

    return(
        <Modal
            toggle={props.toggle}
            isOpen={props.isOpen}
        >
            <ModalHeader toggle={props.toggle} className='color-secondary-bg'>
                Make a Report
            </ModalHeader>
            <ModalBody>
                <h5>You are reporting: </h5>
                <p>{props.commentContent.content ? props.commentContent.content : props.recipeTitle}</p>
                <Form>
                    <FormGroup row>
                        <Col md={12}>
                            <FormGroup row>
                                <Label
                                    for="category"
                                    md={3}
                                >
                                    Category
                                </Label>
                                <Col md={9}>
                                    <Input
                                        id="category"
                                        name="category"
                                        type="select"
                                        value={category}
                                        onChange={(e) => {setCategory(e.target.value)}}
                                    >
                                        <option>
                                        Hate Speech
                                        </option>
                                        <option>
                                        Offensive or Inappropriate Language
                                        </option>
                                        <option>
                                        Verbal Abuse
                                        </option>
                                        <option>
                                        Plagiarism
                                        </option>
                                        <option>
                                        Other
                                        </option>                            
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label
                                    for="context"
                                />
                                <Input 
                                    id="context"
                                    name="context"
                                    type="textarea"
                                    rows="6"
                                    value={context}
                                    onChange={(e)=>{setContext(e.target.value)}}
                                    placeholder="What was the reason for the report? Please provide details as to why an infraction occured."
                                />
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
            <Button onClick={props.toggle}>
                Cancel
            </Button>
            <Button
                color="danger"
                className="color-secondary-bg"
                onClick={handleSubmit}
            >
                Submit
            </Button>
            {' '}
            
            </ModalFooter>
        </Modal>
    )
}

export default ReportModal;