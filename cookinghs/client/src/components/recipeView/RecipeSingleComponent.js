import React, { useState } from 'react';
import { connect } from 'react-redux';
import { List, ListGroup, ListGroupItem, Card, CardBody, CardHeader, Button, Input, Label, FormGroup, Col, Row } from 'reactstrap';
import { Fraction } from 'fractional';
import { Link } from 'react-router-dom';
import '../../styles/recipeview.css';
import '../../styles/colorpalette.css';
import '../../styles/defaults.css'
import ReviewModal from '../recipeModals/ReviewModalComponent';
import ReportModal from '../recipeModals/ReportModalComponent';
import StarRating from './StarRatingComponent';
import { postComment } from '../../redux/comments/comment-actions';
import { postReport } from '../../redux/reports/report-actions';
import axios from 'axios'; // new!!
import { baseUrl } from '../../shared/baseUrl';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function RecipeSingle(props) {
    const forceUpdate = useForceUpdate();
    const recipes = props.recipes
    const chosenRecipe = props.chosenRecipe;
    let chosenComment = []
    let loggedIn = false;
    let bookmarked = false
    if(props.currentUser !== null && props.currentUser.hasOwnProperty("_id")){
        loggedIn = true;
        axios.get(baseUrl + "api/users/session", {params: {want : ["bookmarked"]}})
        .then((response) => {
            if(response.data.bookmarked.filter(entry => entry === chosenRecipe._id).length != 0){
                bookmarked = true
            }
        }).then(() => forceUpdate)
    }
    let averageRating = 0
    let averageRatingString = ""
    if (!props.Comments.isLoading) {
        chosenComment = props.Comments.comments.filter((comment) => comment.recipeid === chosenRecipe._id)
        if (chosenComment.length) {
            chosenComment.map((comment) => averageRating += comment.rating)
            averageRating /= chosenComment.length
            averageRatingString = averageRating.toFixed(2)
        }
        else {
            averageRatingString = "No ratings yet"
        }
    }
    const [servingSize, setServingSize] = useState(chosenRecipe.servings);
    const [scale, setScale] = useState(1);

    const timeline = (par) => {
        let parent = par;
        let line = [chosenRecipe._id];
        while (parent !== '') {
            line.push(parent);
            parent = recipes.filter(recipe => recipe._id === parent)[0].parent
        }
        line.reverse()
        const timelineView = line.map((step, index) => {
            const parentRecipe = recipes.filter(recipe => recipe._id === step)[0]
            const parentTitle = parentRecipe.title
            const parentAuthor = props.users.filter((user) => user._id === parentRecipe.author)[0].fullName
            const parentDeleted = parentRecipe.deleted
            const link = '../recipes/' + step
            return (
                <li key={index}>
                    {index !== line.length - 1 ? parentDeleted ? <span>{parentTitle} by {parentAuthor} (Deleted)</span> : <><Link className='linkStyle' to={link}>{parentTitle}</Link> by {parentAuthor} </> : <>{parentTitle} (Current)</>}
                </li>
            )
        })

        return(
            <>
                {line.length !== 1 ? 
                    <>
                    <strong>Timeline:</strong>
                    <br></br>
                    <ol>
                        {timelineView}
                    </ol>
                    </> 
                : 
                <strong>Original Recipe!</strong>}

            </>
        )
    }

    const ingredientView = chosenRecipe.ingredients.map((ingredient, index) => {
        let amount;
        if (ingredient.quantity) {
            let quantity = ingredient.quantity * scale;
            if (scale % 1 === 0) {
                if (quantity%1 === 0){
                    amount = new Fraction(quantity).toString();
                }
                else if (quantity*3%1 === 0 || quantity*3%1 > 0.999) {
                    amount = Math.round(quantity*3).toString();
                    amount = new Fraction(amount.concat('/3')).toString()
                }
                else {
                    amount = new Fraction(quantity).toString();
                }
            }
            else {
                amount = quantity.toFixed(2);
                if (quantity%1 === 0){
                    amount = new Fraction(quantity).toString();
                }
                else{
                    amount = amount.toString();
                }
            }
            
            amount = amount.concat(' ');
        }
            
        return (
            <li key={index}>
                <input type="checkbox" />
                <> </>
                {amount} 
                {ingredient.unit ? ingredient.unit + " " + ingredient.name.toLowerCase() : ingredient.name.toLowerCase()}
            </li>
        );
    });

    const stepsView = chosenRecipe.steps.map((step, index) => {
        return (
            <li className='stepsListItem' key={index}>
                <span>{step.step}</span>
                {step.stepimage ? <img alt="" src = {step.stepimage} className="stepImage"/> : null}
            </li>
        )
    });

    const bookmark = () => {
        console.log(bookmarked)
        if(!bookmarked){
            console.log("bookmarking!")
            let id = ""
            axios.get(baseUrl + "api/users/session", {params: {want : ["_id"]}})
            .then( async (response) => {
                id = response.data._id
                axios.patch(baseUrl + "api/users/bookmarked/" + id + "/" + chosenRecipe._id)
                .then( () => {
                    bookmarked = true
                }).then(() => alert('Bookmarked!'))
            })
        }else{
            console.log("un bookmarking!")
            let id = ""
            axios.get(baseUrl + "api/users/session", {params: {want : ["_id"]}})
            .then( async (response) => {
                id = response.data._id
                axios.delete(baseUrl + "api/users/bookmarked/" + id + "/" + chosenRecipe._id)
                .then( () => {
                    bookmarked = false
                }).then(() => alert('Unbookmarked!'))
            })
        }
    }

    const [reportModal, setReportModal] = useState(false);
    const [reportId, setReportId] = useState();
    const toggleReport = (e) => {
        console.log("report button clicked")
        const targetId = Number(e.target.id.slice(-1));
        setReportId(targetId);
        setReportModal(!reportModal); 
    }

    const [reviewModal, setReviewModal] = useState(false);
    const toggleReview = () => {props.currentUser ? setReviewModal(!reviewModal) : alert("Please login to leave a comment!")};
    let [commentCount, setCommentCount] = useState(3)
    const commentsView = chosenComment.slice(0,commentCount).map((comment, index) => {
        const rating = comment.rating;
        const reportId = 'reportIcon' + (index + 1);
        return (
            <>
                <Card>
                    <CardHeader>
                        {/* link to commenter user profile here */}
                        <span className='userLink'>{props.users.filter((user) => user._id === comment.user)[0].fullName}</span> rates this: <StarRating rating={rating}/>
                        <Button 
                            className='reportButton'
                            onClick={toggleReport}
                            color="danger"
                            outline
                        >
                            <i id={reportId} className="reportIcon fa-solid fa-triangle-exclamation"></i>
                        </Button>
                    </CardHeader>
                    <CardBody className="commentBody">
                        {comment.content}
                        <br></br>
                        {comment.date}
                    </CardBody>
                </Card>
                <br></br>
            </>
        )
    })

    return(
        <div id='recipeViewContainer'>
            <ReviewModal
                toggle={toggleReview}
                isOpen={reviewModal}
                title={chosenRecipe.title}
                recipeid={chosenRecipe._id}
                currentUser={props.currentUser}
                postComment={props.postComment}
            />
            <ReportModal
                toggle={toggleReport}
                isOpen={reportModal}
                chosenRecipe={chosenRecipe}
                recipeid={chosenRecipe._id}
                chosenComment={chosenComment}
                recipeTitle={chosenRecipe.title}
                reportId={reportId}
                currentUser={props.currentUser}
                commentContent={reportId ? chosenComment[reportId-1] : ""}
                postReport={props.postReport}
            />
            {/* <img src='../report.png' alt=''></img> */}
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col md={9}>
                            <h1>{chosenRecipe.title}</h1>
                        </Col>
                        <Col md={3} style={{textAlign: "right"}}>
                            {loggedIn ?<Button 
                                onClick={() => bookmark}
                                color="primary"
                                outline
                                className="headerButton">
                                {bookmarked ? <i class="fa-solid fa-bookmark"></i> : <i class="fa-regular fa-bookmark"></i>}
                            </Button> 
                            : null}
                            <Button 
                                onClick={(e) => {toggleReport(e)}}
                                color="danger"
                                outline
                                className="headerButton"
                            >
                                <i id='reportIcon0' className="fa-solid fa-triangle-exclamation"></i>
                            </Button>
                            <Link to="./forkrecipe" state={{chosenRecipe: chosenRecipe}}>
                                <Button color="secondary" outline>
                                    <i className="fa-solid fa-code-fork"></i>
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <div id='averageStarRating'>
                    <StarRating rating={averageRating}/> <span id="averageRating">{averageRatingString}</span>
                    </div>
                    {/* link to author user profile here */}
                    {chosenRecipe.author ? <span> By <Link className='linkStyle' to={"/users/"+chosenRecipe.author}>{props.users.filter((user) => user._id === chosenRecipe.author)[0].fullName}</Link></span> : null}
                    {chosenRecipe.difficulty ? <span className="recipeDifficulty"> Difficulty: {chosenRecipe.difficulty}/10 </span> : null}
                </ListGroupItem>
                <ListGroupItem>
                    {timeline(chosenRecipe.parent)}
                </ListGroupItem>
                <img className="recipeimage" src={chosenRecipe.image} alt={chosenRecipe.title}></img>
                <ListGroupItem>
                    {chosenRecipe.description ? <span>{chosenRecipe.description}</span> : null}
                </ListGroupItem>
            </ListGroup>
            <ListGroup horizontal>
                {chosenRecipe.course ? <ListGroupItem className='flex-fill'>{chosenRecipe.course}</ListGroupItem> : <></>}
                {chosenRecipe.cuisine ? <ListGroupItem className='flex-fill'>{chosenRecipe.cuisine}</ListGroupItem> : <></>}
                {chosenRecipe.servings ? 
                    <ListGroupItem className='flex-fill' id="servingInputContainer">
                        <FormGroup row id="servingInput">
                            <Col sm={6}>
                                <Input
                                    id="servingSize"
                                    name="servingSize"
                                    type="number"
                                    min='1'
                                    value={servingSize}
                                    onChange={(e) => {setServingSize(e.target.value);
                                        setScale(e.target.value/chosenRecipe.servings)}}
                                />
                            </Col>
                            <Label
                                for="servingSize"
                                sm={6}
                            >
                                Servings
                            </Label>
                        </FormGroup>
                    </ListGroupItem> : 
                    <></>
                }
            </ListGroup>
            <ListGroup horizontal>
                {chosenRecipe.preptime ? <ListGroupItem className='flex-fill'>Preptime: {chosenRecipe.preptime} minutes</ListGroupItem> : <></>}
                {chosenRecipe.cooktime ? <ListGroupItem className='flex-fill'>Cooktime: {chosenRecipe.cooktime} minutes</ListGroupItem> : <></>}
            </ListGroup>
            <ListGroup>
                <ListGroupItem>
                    <h2>Ingredients</h2>
                    <List type='unstyled'>
                        {ingredientView}
                    </List>
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Directions</h2>
                    <ol>
                        {stepsView}
                    </ol>
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Comments</h2>
                    <Button className='color-primary-bg' 
                        id='ratingButton'
                        color="black"
                        onClick={toggleReview}
                    >
                        Add Rating and Review
                    </Button>
                    {commentsView}
                    <Button
                        onClick={() => setCommentCount(commentCount+3)}
                        id='loadReviewButton'
                    >
                        Load More Reviews
                    </Button>
                </ListGroupItem>
            </ListGroup>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        Comments: state.Comments
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (comment) => dispatch(postComment(comment)),
    postReport: (report) => dispatch(postReport(report))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSingle);
