import { Component } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { DataStorage } from '../../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorage: DataStorage, private reService: RecipeService, public authService: AuthService) {}

  onSaveData() {
    this.dataStorage.saveData().subscribe(
     // (response: Response) => console.log(response.json()),
      (error) => console.log(error)
    );
  }

  onFetchData() {
    this.dataStorage.fetchData();
  }

  onLogout() {
    this.authService.logout();
  }
}
