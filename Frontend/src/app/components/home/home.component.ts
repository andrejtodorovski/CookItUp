import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newest: Recipe[] = [];
  topRated: Recipe[] = [];
  mostViewed: Recipe[] = [];
  imageUrl: string | undefined
  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService){}
  ngOnInit(): void {
    this.getRecipes() 
  }
  getRecipes() {
    this.recipeService.getNewestRecipes().subscribe(
      r => {
        this.newest = r;
      }
    );
    this.recipeService.getMostViewedRecipes().subscribe(r => this.mostViewed = r);
    this.recipeService.getTopRatedRecipes().subscribe(r => this.topRated = r);
  }
  isStarFilled(averageRating: number, starNumber: number): boolean {
    return starNumber <= Math.floor(averageRating);
  }
  isStarHalfFilled(averageRating: number, starNumber: number): boolean {
    return starNumber > Math.floor(averageRating) && starNumber === Math.ceil(averageRating)
    && averageRating >= starNumber-0.5
  }
}
