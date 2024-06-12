import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon, IonButton, IonModal, IonButtons, IonAlert } from '@ionic/angular/standalone';
import { PhotoCaptureComponent } from "../components/photo-capture/photo-capture.component";
import { RecipeDataFormComponent } from "../components/recipe-data-form/recipe-data-form.component";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonAlert, IonButtons, IonModal, IonButton, IonIcon, IonTabButton, IonTabBar, IonTabs, IonHeader, IonToolbar, IonTitle, IonContent, PhotoCaptureComponent, RecipeDataFormComponent]
})
export class HomePage {
  constructor() {}

  isModalOpen = false;
  isAlertOpen = false;
  alertButtons = ['Zamknij'];
  ingredientsFromImage = "";
  
  getIngredients(ingredients: string) {
    this.isModalOpen = false;
    if(ingredients === "no ingredients" || ingredients === "brak składników") {
      this.isAlertOpen = true;
    } else {
      this.ingredientsFromImage = ingredients;
    }
    console.log(ingredients);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
