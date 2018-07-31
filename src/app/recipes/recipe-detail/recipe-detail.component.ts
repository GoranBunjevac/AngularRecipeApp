import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shoping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
recipe: Recipe;
id: number;

  constructor(private slService: ShoppingListService, private route: ActivatedRoute, private reService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe =  this.reService.getRecipe(this.id);
      }
    );
  }

  toShoppinglist() {
    for (let index = 0; index < this.recipe.ingredients.length; index++) {
      this.slService.addIngredient(this.recipe.ingredients[index]);
    }
  }

  toEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.reService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
