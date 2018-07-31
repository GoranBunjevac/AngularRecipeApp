import { Recipe } from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { FormArray } from '@angular/forms';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  ingredients: Ingredient[];

    private  recipes: Recipe[] = [
        new Recipe('Pizza', 'Just Test', 'https://www.campbellsoup.co.uk/img/recipes/6-campbells-vegetarian-pizza-recipe.jpg',
        [
            new Ingredient('Meat', 1),
        new Ingredient('Fries', 20)
        ]),

        new Recipe('Taco', 'Awesome meal',
        // tslint:disable-next-line:max-line-length
        'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/29/0/0149359_Making-Taco_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371603491866.jpeg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Salad', 3)
        ]),

        new Recipe('Badass Burger', 'Just Test', 'http://www.readersdigest.ca/wp-content/uploads/2015/11/gourmet-burger.jpg',
        [
            new Ingredient('Meat', 1),
        new Ingredient('Fries', 20)
        ]),
      ];

      constructor() {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
         return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

}
