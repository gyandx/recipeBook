import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector:'[appDropdown]'
})

export class OpenDropdown implements OnInit{

  constructor(private render: Renderer2, private eleRef: ElementRef){}

  @HostBinding('class.open') isOpen = false;

  ngOnInit(){
    // this.render.setAttribute(this.eleRef.nativeElement, 'class', 'open');
  }

  // @HostListener('mouseenter') mouseover(){
  //   // this.render.setAttribute(this.eleRef.nativeElement, 'class', 'open');
  //   this.class = 'open';
  // }

  // @HostListener('mouseleave') mouseout(){
  //   // this.render.removeAttribute(this.eleRef.nativeElement, 'class', '');
  //   this.class = '';
  // }

  //to close dropdown
  // @HostListener('click') toogleOpen(){
  //   this.isOpen = !this.isOpen;
  // }

  //to close dropdown from anywhere or clicking from anywhere
  @HostListener('document:click', ['$event']) toogleOpen(event:Event){
    this.isOpen = this.eleRef.nativeElement.contains(event.target)? !this.isOpen : false;
  }

}
