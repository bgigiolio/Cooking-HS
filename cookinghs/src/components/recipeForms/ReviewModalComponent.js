import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Form, Label, Input, Col } from 'reactstrap';
import { postComment } from '../../redux/CommentPage/comment-actions';

function ReviewModal(props) {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    // Include a call to pull the comments for the recipe to be able to update the database with a new rating & comment
    //TODO - get rid of sample data here for actual data
    const USER = 'admin'
    const RATING = 4
    const CONTENT = "Oh my, this was very good!"


    const comment = useState(() => 
    {
        return {
            recipeid: props.id,
            user: USER,
            rating: RATING,
            content: CONTENT
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // const recipe = parseForm()
        // const valid = checkForm(recipe)
        // if (valid) {
        postComment(comment.recipeid, comment.user, comment.rating, comment.content);
        handleRedirect()
        // }
        // else {
        //     alert("Please double check your recipe!")
        // }
    }

    let navigate = useNavigate()
    const handleRedirect = () => {
        let path = '/recipes/:id'; 
        navigate(path);
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
            {/* <Link to="/comments"> */}
                <Button
                    onClick={handleSubmit}
                    color="danger"
                    className="color-secondary-bg"
                    
                >
                    Submit
                </Button>
            {/* </Link> */}
            {' '}
            
            </ModalFooter>
        </Modal>
    )
}

export default ReviewModal;

// const mapDispatchtoProps = (dispatch) => {
//     return{
//         postRecipe: (author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => {dispatch(postRecipe(author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image))},
//         putRecipe: (_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image) => {dispatch(putRecipe(_id, author, parent, title, description, ingredients, steps, difficulty, course, cuisine, preptime, cooktime, servings, image))},
//     }
// }


// export default connect(null, mapDispatchtoProps)(WriteRecipe);