import React from "react";
import { connect } from "react-redux";
import { Progress } from 'reactstrap'; 
import './Users.css';


const UserProgress = ({ recipes }) => {
    
    const numRecipes = recipes.length;
    const progressPercentage = Math.min(numRecipes, 100);
    let skillLevel;
    if (numRecipes <= 10) {
        skillLevel = "Beginner"
    } else if (numRecipes <= 30) {
        skillLevel = "Intermediate"
    } else if (numRecipes <= 60) {
        skillLevel = "Advanced"
    } else {
        skillLevel = "Master Chef"
    }

    return (
        <div>
            <Progress 
                id="progressBar"
                animated
                color="success"
                value={progressPercentage}
            />
            <p id="skillLevel"><span className="bold">Skill Level:</span> {skillLevel}</p>
        </div>
    );
};

export default UserProgress;