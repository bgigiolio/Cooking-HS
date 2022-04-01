import React, { useState } from 'react';
import { List, ListGroup, ListGroupItem, Card, CardBody, CardHeader, Button, Input, Label, FormGroup, Col, Row } from 'reactstrap';
import { Fraction } from 'fractional';
import { Link } from 'react-router-dom';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import ReviewModal from '../recipeForms/ReviewModalComponent';
import ReportModal from '../report/ReportModalComponent';
import { connect } from "react-redux";

function CommentComponent(props) {

    const starRating = props.starRating
    const toggleReport = props.toggleReport

    let [commentCount, setCommentCount] = useState(3)

    const recipes = props.recipes
    const chosenRecipe = props.chosenRecipe;
    const chosenComments = chosenRecipe.comments
    let [servingSize, setServingSize] = useState(chosenRecipe.servings);
    let [scale, setScale] = useState(1);

    const commentsView = chosenComments.slice(0,commentCount).map((comment, index) => {
        const rating = comment.rating;
        const reportId = 'reportIcon' + (index + 1);
        return (
            <h2>Hello there!</h2>
            // <>
            //     <Card>
            //         <CardHeader>
            //             {/* link to commenter user profile here */}
            //             <span className='userLink'>{comment.user}</span> says: 
            //         </CardHeader>
            //         <CardBody>
            //             <div>
            //                 {starRating(rating)}
            //             </div>
            //             {comment.content}
            //             <Button 
            //                 className='reportButton'
            //                 onClick={toggleReport}
            //                 color="danger"
            //                 outline
            //             >
            //                 <i id={reportId} className="reportIcon fa-solid fa-triangle-exclamation"></i>
            //                 Hello there!
            //             </Button>
            //             <h2>Hello BOB</h2>
            //         </CardBody>
            //     </Card>
            // </>
        )
    })

    //TODO - was doing some test here to see how comments were being returned, can remove this when I get actual comments running
    const arr = [1,2,3]
    const temp = arr.map(element => <h2>{element}</h2>)
    console.log(chosenComments)
    console.log(props.recipes)
    console.log(props.comments)


    return (
        temp
            // <>
            //     <Card>
            //         <CardHeader>
            //             {/* link to commenter user profile here */}
            //             <span className='userLink'>Ali Syed</span> says: 
            //         </CardHeader>
            //         <CardBody>
            //             <div>
            //                 {starRating(4)}
            //             </div>
            //             I love this!
            //             <Button 
            //                 className='reportButton'
            //                 onClick={toggleReport}
            //                 color="danger"
            //                 outline
            //             >
            //                 <i id={1} className="reportIcon fa-solid fa-triangle-exclamation"></i>
            //             </Button>
            //         </CardBody>
            //     </Card>
            // </>
    )
}

export default CommentComponent;