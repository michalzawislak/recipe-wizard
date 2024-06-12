import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonCard, IonItem, IonLabel, IonList, IonCardContent, IonButton, IonItemDivider, IonHeader, IonText, IonRow, IonCol, IonSelect, IonSelectOption, IonGrid } from "@ionic/angular/standalone";
import { PhotoService } from 'src/app/services/photo.service';

export interface RecipeFormData {
  ingredients: string;
  diet: string;
  cuisine: string;
  kcal: string;
}

@Component({
  selector: 'app-recipe-data-form',
  templateUrl: './recipe-data-form.component.html',
  styleUrls: ['./recipe-data-form.component.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonText, IonHeader, IonItemDivider, IonButton, IonCardContent, IonList, IonLabel, IonItem, IonInput, IonCard, IonSelect,IonSelectOption , ReactiveFormsModule]
})
export class RecipeDataFormComponent  implements OnInit {
  @Input() ingredientsFromImage: string = '';

  recipeDataForm!: FormGroup;
  diets = ['any', 'vegan', 'vegetarian', 'pescatarian', 'keto', 'paleo', 'low-carb', 'low-fat', 'gluten-free', 'dairy-free', 'nut-free', 'halal', 'kosher'];
  cuisines = ['any', 'polish', 'italian', 'chinese', 'japanese', 'mexican', 'indian', 'french', 'greek', 'thai', 'spanish', 'middle eastern', 'american', 'british', 'korean', 'vietnamese'];


  constructor(private formBuilder: FormBuilder, private photoService: PhotoService) {
  }

  ngOnInit() {
    this.recipeDataForm = this.formBuilder.group({
      ingredients: ['', [Validators.required]],
      diet: [
        '',
        [
          Validators.required,
        ],
      ],
      cuisine: ['', [Validators.required]],
      kcal: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['ingredientsFromImage']) {
      const ingredients = changes['ingredientsFromImage'].currentValue;
      console.log('Data changed:', ingredients);
      if(ingredients.length > 0)
        this.recipeDataForm.patchValue({ingredients: ingredients});
    }
  }

  submitForm() {
    console.log(this.recipeDataForm.value);
    if (this.recipeDataForm.valid) {
      this.photoService.getRecipe(this.recipeDataForm.value).subscribe(response => {
        console.log(response);
      });
      return false;
    } else {
      
      return console.log('Please provide all the required values!');
    }
  }

  get errorControl() {
    return this.recipeDataForm.controls;
  }

}
