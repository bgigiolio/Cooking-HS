import React from 'react';
import { Form, FormGroup, Label, Input, FormText, Col, Button } from 'reactstrap';
import '../styles/writerecipe.css';

class WriteRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            ingredients: [{
                name: 'chicken thigh',
                quantity: 500,
                unit: 'grams'},
                {

                }
            ],
            steps: [''],
            course: 'Main',
            cuisine: '',
            preptime: 0,
            cooktime: 0,
            servings: 1,                                                  
            image: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }); 
    }

    handleIngredientChange(index, e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let ingredients = [...this.state.ingredients]
        let ingredient = {
            ...this.state.ingredients[index],
            [name] : value
        }
        ingredients[index] = ingredient;
        this.setState({ingredients})
    }

    checkForm() {

    }

    handleSubmit(event) {
        // if (this.state.option !== ''){
        //     this.props.addTask(this.state.option);
        // };
        // this.setState({option: ''});
        console.log(this.state)
        event.preventDefault();
    }

    ingredientsForm()  {
        let ingredientInput = this.state.ingredients.map((ingredient, index) => {
            return(
                <FormGroup row>
                    <Label
                    for="ingredients"
                    md={2}
                    style={{textAlign:"right"}}
                    >
                        {index + 1}.
                    </Label>
                    <Col md={4}>
                    <Input
                        id="ingredientname"
                        name='name'
                        type="text"
                        placeholder='Ingredient'
                        value={ingredient.name}
                        onChange={(e) => this.handleIngredientChange(index, e)}
                    />
                    </Col>
                    <Col md={2}>
                    <Input
                        id="quantity"
                        name="quantity"
                        type="text"
                        placeholder='Quantity'
                        value={ingredient.quantity}
                        onChange={(e) => this.handleIngredientChange(index, e)}
                    />
                    </Col>
                    <Col md={2}>
                    <Input
                        id="unit"
                        name="unit"
                        type="text"
                        placeholder='Unit'
                        value={ingredient.unit}
                        onChange={(e) => this.handleIngredientChange(index, e)}
                    />
                    </Col>
                    <Col md={2}>
                    {
                        index ?
                        <Button 
                            type="button"
                            className="float-end"
                            onClick={this.removeIngredient}
                        >
                            Remove
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
                            onClick={this.addIngredient}
                            className="float-end">
                            Add Ingredient
                        </Button>
                    </Col>
                </FormGroup>
                {ingredientInput}
            </>
        )
    }
    
    render() {
        return(
            <div className='container' id='formContainer'>
                <h1> + Add a Recipe</h1>
                <Form style={{position: "relative"}}>
                    <FormGroup row>
                        <Label
                            for="title"
                            md={2}
                        >
                            Recipe Name
                        </Label>
                        <Col md={10}>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Give your recipe a title"
                                type="text"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
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
                                value={this.state.course}
                                onChange={this.handleInputChange}
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
                                placeholder="Cuisine"
                                type="text"
                                value={this.state.cuisine}
                                onChange={this.handleInputChange}
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
                                placeholder="Servings"
                                type="number"
                                value={this.state.servings}
                                onChange={this.handleInputChange}
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
                                placeholder="Preparation Time"
                                type="number"
                                value={this.state.preptime}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                        <Label md={2}>
                            minute(s)
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
                                placeholder="Cooking Time"
                                type="number"
                                value={this.state.cooktime}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                        <Label md={2}>
                            minute(s)
                        </Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                        for="image"
                        md={2}
                        >
                        Dish Picture
                        </Label>
                        <Col md={10}>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                        />
                        <FormText>
                            Give us the tastiest image of your recipe!
                        </FormText>
                        </Col>
                    </FormGroup>
                    {this.ingredientsForm()}
                    <FormGroup row>
                        <Label
                        for="steps"
                        md={2}
                        >
                        Steps
                        </Label>
                        <Col md={10}>
                        <Input
                            id="steps"
                            name="steps"
                            type="textarea"
                            value={this.state.steps}
                            onChange={this.handleInputChange}
                            rows="10"
                        />
                        </Col>
                    </FormGroup>
                    <Button type="button" 
                            color="primary"
                            style={{position: "absolute",
                                    right: 0}}
                            onClick={this.handleSubmit}>
                        Create
                    </Button>
                </Form>
            </div>
        )
    }
}

export default WriteRecipe;


{/* <FormGroup row>
    <Label
    for="exampleSelectMulti"
    md={2}
    >
    Select Multiple
    </Label>
    <Col md={10}>
    <Input
        id="exampleSelectMulti"
        multiple
        name="selectMulti"
        type="select"
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
<FormGroup row>
    <Label
    for="exampleFile"
    md={2}
    >
    File
    </Label>
    <Col md={10}>
    <Input
        id="exampleFile"
        name="file"
        type="file"
    />
    <FormText>
        This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
    </FormText>
    </Col>
</FormGroup>
<FormGroup
    row
    tag="fieldset"
>
    <legend className="col-form-label col-md-2">
    Radio Buttons
    </legend>
    <Col md={10}>
    <FormGroup check>
        <Input
        name="radio2"
        type="radio"
        />
        {' '}
        <Label check>
        Option one is this and that—be sure to include why it's great
        </Label>
    </FormGroup>
    <FormGroup check>
        <Input
        name="radio2"
        type="radio"
        />
        {' '}
        <Label check>
        Option two can be something else and selecting it will deselect option one
        </Label>
    </FormGroup>
    <FormGroup
        check
        disabled
    >
        <Input
        disabled
        name="radio2"
        type="radio"
        />
        {' '}
        <Label check>
        Option three is disabled
        </Label>
    </FormGroup>
    </Col>
</FormGroup>
<FormGroup row>
    <Label
    for="checkbox2"
    md={2}
    >
    Checkbox
    </Label>
    <Col
    md={{
        size: 10
    }}
    >
    <FormGroup check>
        <Input
        id="checkbox2"
        type="checkbox"
        />
        {' '}
        <Label check>
        Check me out
        </Label>
    </FormGroup>
    </Col>
</FormGroup>
<FormGroup
    check
    row
>
    <Col
    md={{
        offset: 2,
        size: 10
    }}
    >
    <Button type="button" color="primary" onClick={this.handleSubmit}>
        Submit
    </Button>
    </Col>
</FormGroup> */}