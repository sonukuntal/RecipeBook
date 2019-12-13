import {Directive,HostBinding,HostListener,ElementRef} from '@angular/core';

@Directive({
  selector:'[appDropdown]'
})

export class DropdownDirective
{

  constructor(private elementref:ElementRef){}
@HostBinding('class.open') isOpen=false;

@HostListener('document:click',['$event']) datatoggle(event:Event)
{
this.isOpen=this.elementref.nativeElement.contains(event.target)? !this.isOpen:false;
}
}