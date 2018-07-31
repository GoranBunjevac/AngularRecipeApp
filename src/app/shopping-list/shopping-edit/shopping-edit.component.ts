import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editmode = false;
  editedItemindex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemindex = index;
        this.editmode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editmode) {
      this.shoppingListService.updateIngredient(this.editedItemindex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editmode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editmode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemindex);
    this.onClear();
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
