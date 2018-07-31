import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorage {
constructor(private httpClient: HttpClient, private reService: RecipeService, private authService: AuthService) {}

  saveData() {
    // const token = this.authService.getToken();
    // return this.httpClient.put('https://recipe-book-8d4ec.firebaseio.com/recipes.json?auth=' + token, this.reService.getRecipes());

    const req = new HttpRequest('PUT', 'https://recipe-book-8d4ec.firebaseio.com/recipes.json',
    this.reService.getRecipes(), {reportProgress: true});

    return this.httpClient.request(req);
  }

  fetchData() {
   const token = this.authService.getToken();
    return this.httpClient.get<Recipe[]>('https://recipe-book-8d4ec.firebaseio.com/recipes.json?auth=' + token)
    .pipe(map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ))
    .subscribe(
      (recipes: Recipe[]) => {
        this.reService.setRecipes(recipes);
      }
    );
  }
}
