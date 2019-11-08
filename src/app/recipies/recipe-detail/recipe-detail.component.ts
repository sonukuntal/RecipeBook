import { Component, OnInit } from '@angular/core';
import {Recipe} from '../Recipe.model';
import {RecipiesService} from '../recipies.service';
import {ActivatedRoute,Params,Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe:Recipe;
   index:number;
  constructor(private recipiesService:RecipiesService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit() {
   //const id = +this.router.snapshot.params['id'];
   this.router.params.subscribe((param:Params)=>{
     this.index=+param['id'];
     this.recipe=this.recipiesService.getrecipies(this.index);
   });
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