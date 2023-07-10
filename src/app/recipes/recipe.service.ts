import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chorizo & mozzarella gnocchi',
      'Cheesy tomato pasta with gnocchi, chorizo and mozzarella for a comforting bake',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=440,400',
      [
        new Ingredient('Gnocchi', 600),
        new Ingredient('Mozzarella', 200)
      ]),
    new Recipe('Courgette fries',
      'Ditch the potatoes and try these moreish courgette fries as a snack or side dish',
      'https://images.immediate.co.uk/production/volatile/sites/30/2023/03/Courgette-fries-34844b6.jpg?quality=90&webp=true&resize=600,545',
      [
        new Ingredient('Courgettes', 2),
        new Ingredient('Parmesan', 100),
        new Ingredient('Flour', 100),
      ]),
      new Recipe('Salmon & asparagus',
      'Delicious creamy salmon and asparagus one-pot topped with crunchy breadcrumbs',
      'https://images.immediate.co.uk/production/volatile/sites/30/2023/05/Salmon-and-asparagus-gratin-eb950af.jpg?quality=90&webp=true&resize=600,545',
      [
        new Ingredient('Salmon', 300),
        new Ingredient('Asparagus', 500),
        new Ingredient('Parmesan', 100),
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
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
