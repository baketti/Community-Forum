import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appUserIcons]'
})
export class UserIconsDirective implements OnInit {
  @Input() appUserIcons:string = '';
  
  constructor( 
    private el: ElementRef
  ) { }

  ngOnInit(){
    switch(this.appUserIcons){
      case 'male':
        this.el.nativeElement.style.backgroundColor = '#d6eaff';
        break;
      case 'female':
        this.el.nativeElement.style.backgroundColor = '#fce5ff';
        break;
      case 'active':
        this.el.nativeElement.style.backgroundColor = '#d8ffc0';
        break;
      case 'inactive':
        this.el.nativeElement.style.backgroundColor = '#ffc0c0';
        break;
    }
  }
}
