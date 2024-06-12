import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'http://localhost:4040/api';

  constructor(private http: HttpClient) {}

  uploadPhoto(photo: string): any {
    return this.http.post(`${this.apiUrl}/get-ingredients`, {baseImage: photo});
  }

  getRecipe(recipeData: any) {
    return this.http.post(`${this.apiUrl}/generate-recipe`, {
      ingredients: "mascarpone, borówki, dżem, miód, orzechy włoskie",
      diet: "any",
      cuisine: "italian",
      calories: 1000
    });
  }
}
