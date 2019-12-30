import { Component, OnInit } from '@angular/core';
import {map,switchMap} from 'rxjs/operators';
import {Recipe} from '../Recipe.model';
import {RecipiesService} from '../recipies.service';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe:Recipe;
   index:number;
  constructor(private recipiesService:RecipiesService,private router:ActivatedRoute,private route:Router,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
   this.router.params.pipe(map(params=>{return +params['id'];}),
   switchMap(id =>{
     this.index=id;
     return this.store.select('recipies');
     }),
   map(recipestate=>{return recipestate.recipies.find((recipe,id)=>{
    return id===this.index;
   });
   })).subscribe(recipe=>{
     this.recipe=recipe;
   })
  }
  onaddtoshoopinglist()
  {
    this.recipiesService.addingredientstoshoopinglist(this.recipe.ingredients);
  }

  oneditclick()
  {
    this.route.navigate(['edit'],{relativeTo:this.router});
  }
  ondeleteclick()
  {
   this.recipiesService.deleteRecipe(this.index);
    this.route.navigate(['recipies']);
  }

}