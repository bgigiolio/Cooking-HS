import React from 'react';
import { Form, FormGroup, Label, Input, FormText, Col, Button } from 'reactstrap';
import '../../styles/recipeform.css'

function RecipeForm(props) {
    const ingredientsForm = function()  {
        let ingredientInput = props.ingredients.map((ingredient, index) => {
            return(
                <FormGroup row key={index}>
                    <Label
                        for="ingredient"
                        md={2}
                        className='numberedLabel'
                    >
                        {index + 1}.
                    </Label>
                    <Col md={5}>
                        <Input
                            id="ingredientname"
                            name='name'
                            type="text"
                            placeholder='Ingredient e.g. Chicken Wings'
                            value={ingredient.name}
                            onChange={(e) => props.handleIngredientChange(index, e)}
                        />
                    </Col>
                    <Col md={2}>
                        <Input
                            id="quantity"
                            name="quantity"
                            type="text"
                            placeholder='Amount'
                            value={ingredient.quantity}
                            onChange={(e) => props.handleIngredientChange(index, e)}
                        />
                    </Col>
                    <Col md={2}>
                        <Input
                            id="unit"
                            name="unit"
                            type="text"
                            placeholder='Unit'
                            value={ingredient.unit}
                            onChange={(e) => props.handleIngredientChange(index, e)}
                        />
                    </Col>
                    <Col md={1}>
                    {
                        index ?
                        <Button 
                            type="button"
                            className="float-end"
                            color="transparent"
                            onClick={(e) => props.removeIngredient(index, e)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="removeButton">
                            <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                            </svg>
                        </Button>
                        : null
                    }
                    </Col>
                </FormGroup>
            )
        })
        return (
            <>
                <FormGroup row>
                    <Label md={2}>Ingredients</Label>
                    <Col>
                        <Button type="button"
                            className="float-end color-tertiary-bg"
                            color="success"
                            onClick={(e) => props.addIngredient(e)}
                        >
                            Add Ingredient
                        </Button>
                    </Col>
                </FormGroup>
                {ingredientInput}
            </>
        )
    }

    const stepsForm = function() {
        let stepsInput = props.steps.map((step, index) => {
            return(
                <FormGroup row key={index}>
                    <Label
                        for="steps"
                        md={2}
                        className='numberedLabel'
                    >
                        {index+1}. 
                    </Label>
                    <Col md={9}>
                    <Input
                        id="steps"
                        name="steps"
                        type="textarea"
                        rows="3"
                        placeholder='e.g. Preheat oven to 350 degrees F...'
                        value={step}
                        onChange={(e) => props.handleStepChange(index, e)}
                    />
                    </Col>
                    <Col md={1}>
                    {
                        index ?
                        <Button 
                            type="button"
                            className="float-end"
                            color="transparent"
                            onClick={(e) => props.removeStep(index, e)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className='removeButton'>
                            <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                            </svg>
                        </Button>
                        : null
                    }
                    </Col>
                </FormGroup>
            )
        })
        return (
            <>
                <FormGroup row>
                    <Label md={2}>Steps</Label>
                    <Col>
                        <Button type="button"
                            className="float-end color-tertiary-bg"
                            color="success"
                            onClick={(e) => props.addStep(e)}
                        >
                            Add Step
                        </Button>
                    </Col>
                </FormGroup>
                {stepsInput}
            </>
        )
    }

    return(
        <Form>
            <div className="spacer" />
            <FormGroup row>
                <Col md={8}>
                    <FormGroup row>
                        <Label
                            for="title"
                        >
                            Title
                        </Label>
                        <Col>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Give your recipe a title"
                                type="text"
                                value={props.title}
                                onChange={props.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="description"
                        >
                            Description
                        </Label>
                        <Col>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Share the story behind your recipe and what makes it so special"
                                type="textarea"
                                rows='4'
                                value={props.description}
                                onChange={props.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup row>
                        <Label
                        for="image"
                        >
                        <img src='../upload.jpg' 
                            alt=''
                            id='uploadImage'
                        />
                        </Label>
                        <Col>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            style={{display: 'none'}}
                        />
                        <FormText>
                            Give us the tastiest image of your recipe! Use JPEG or PNG.
                        </FormText>
                        </Col>
                    </FormGroup>
                </Col>
            </FormGroup>
            <div className="spacer" />
            <FormGroup row>
                <Label
                    for="courseSelect"
                    md={2}
                >
                    Course
                </Label>
                <Col md={3}>
                    <Input
                        id="courseSelect"
                        name="course"
                        type="select"
                        value={props.course}
                        onChange={props.handleInputChange}
                    >
                        <option>
                        Main
                        </option>
                        <option>
                        Side
                        </option>
                        <option>
                        Appetizer
                        </option>
                        <option>
                        Dessert
                        </option>
                    </Input>
                </Col>
                <Label
                    for="cuisine"
                    md={1}
                >
                    Cuisine
                </Label>
                <Col md={3}>
                    <Input
                        id="cuisine"
                        name="cuisine"
                        placeholder="e.g. Canadian"
                        type="text"
                        value={props.cuisine}
                        onChange={props.handleInputChange}
                    />
                </Col>
                <Label
                    for="servings"
                    md={1}
                >
                    Serves
                </Label>
                <Col md={2}>
                    <Input
                        id="servings"
                        name="servings"
                        placeholder="e.g. 5"
                        type="number"
                        value={props.servings}
                        onChange={props.handleInputChange}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label
                    for="preptime"
                    md={2}
                >
                    Prep Time
                </Label>
                <Col md={2}>
                    <Input
                        id="preptime"
                        name="preptime"
                        placeholder="0"
                        type="number"
                        value={props.preptime}
                        onChange={props.handleInputChange}
                    />
                </Col>
                <Label md={2}>
                    minutes
                </Label>
                <Label
                    for="cooktime"
                    md={2}
                >
                    Cook Time
                </Label>
                <Col md={2}>
                    <Input
                        id="cooktime"
                        name="cooktime"
                        placeholder="0"
                        type="number"
                        value={props.cooktime}
                        onChange={props.handleInputChange}
                    />
                </Col>
                <Label md={2}>
                    minutes
                </Label>
            </FormGroup>
            <div className="spacer" />
            {ingredientsForm()}
            <div className="spacer" />
            {stepsForm()}
            <div className="spacer" />
            <Button type="button"
                    className="color-primary-bg"
                    color="info"
                    onClick={props.handleSubmit}>
                Post Recipe
            </Button>
        </Form>
    )
}

export default RecipeForm;