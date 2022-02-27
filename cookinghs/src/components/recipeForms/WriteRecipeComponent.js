import React from 'react';
import '../../styles/recipeform.css';
import RecipeForm from './RecipeFormComponent';

class WriteRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            ingredients: [
                {
                    name: '',
                    quantity: '',
                    unit: ''
                },
                {
                    name: '',
                    quantity: '',
                    unit: ''
                }
            ],
            steps: [
                '',
                '',
                ''
            ],
            course: 'Main',
            cuisine: '',
            preptime: '',
            cooktime: '',
            servings: 1,                                                  
            image: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);

        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        
        this.addStep = this.addStep.bind(this);
        this.removeStep = this.removeStep.bind(this);
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

    handleStepChange(index, e) {
        const target = e.target;
        const value = target.value;
        let steps = [...this.state.steps];
        steps[index] = value;
        this.setState({steps})
    }

    removeIngredient(index, e) {
        let newIngredients = this.state.ingredients;
        newIngredients.splice(index, 1);
        this.setState({
            ingredients: newIngredients
        });
    }

    addIngredient(e) {
        this.setState(({ingredients}) => ({
            ingredients: [
                ...ingredients,
                {
                    name: '',
                    quantity: '',
                    unit: ''
                }
            ]
        }));
    }

    removeStep(index, e) {
        let newSteps = this.state.steps;
        newSteps.splice(index, 1);
        this.setState({
            steps: newSteps
        });
    }

    addStep(e) {
        this.setState(({steps}) => ({
            steps: [
                ...steps,
                ''
            ]
        }));
    }

    checkForm() {

    }

    handleSubmit(event) {
        console.log(this.state);
        this.checkForm();
        event.preventDefault();
    }
    
    render() {
        return(
            <div className='container' id='formContainer'>
                <h1> + Add a Recipe</h1>
                <p>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, and the CookingHS community.</p>
                <RecipeForm 
                    {...this.state} 
                    handleSubmit = {this.handleSubmit}
                    handleInputChange = {this.handleInputChange}
                    handleIngredientChange = {this.handleIngredientChange}
                    addIngredient = {this.addIngredient}
                    removeIngredient = {this.removeIngredient}
                    handleStepChange = {this.handleStepChange}
                    addStep = {this.addStep}
                    removeStep = {this.removeStep}
                />
            </div>
        )
    }
}

export default WriteRecipe;