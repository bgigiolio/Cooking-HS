import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Form, Label, Input, Col } from 'reactstrap';

function ReviewModal(props) {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    // Include a call to pull the comments for the recipe to be able to update the database with a new rating & comment

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitting review')
        const newComment = {
            recipeid: props.recipeid,
            user: props.currentUser._id,
            rating: rating,
            content: content
        }
        props.postComment(newComment)
        .then(props.toggle)
    }

    return(
        <Modal
            toggle={props.toggle}
            isOpen={props.isOpen}
        >
            <ModalHeader toggle={props.toggle} className='color-primary-bg'>
                <h4>Review this recipe:</h4>
                <span>{props.title}</span>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Col md={12}>
                            <FormGroup row>
                                <Label
                                    for="rating"
                                    md={6}
                                >
                                    Your Rating (out of 5)
                                </Label>
                                <Col md={6}>
                                    <Input
                                        id="rating"
                                        name="rating"
                                        type="select"
                                        value={rating}
                                        onChange={(e) => {setRating(e.target.value)}}
                                    >
                                        <option>
                                        1
                                        </option>
                                        <option>
                                        2
                                        </option>
                                        <option>
                                        3
                                        </option>
                                        <option>
                                        4
                                        </option>
                                        <option>
                                        5
                                        </option>                            
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label
                                    for="content"
                                />
                                <Input 
                                    id="content"
                                    name="content"
                                    type="textarea"
                                    rows="6"
                                    value={content}
                                    onChange={(e)=>{setContent(e.target.value)}}
                                    placeholder="What did you think of this recipe? Did you make any changes or notes?"
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

export default ReviewModal;