import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if ($('.hidden-bar').length) {
      var hiddenBar = $('.hidden-bar');
      var hiddenBarOpener = $('.hidden-bar-opener');
      var hiddenBarCloser = $('.hidden-bar-closer');
      //$('.hidden-bar-wrapper').mCustomScrollbar();
      $('.hidden-bar .side-menu ul li.dropdown').append('<div class="dropdown-btn"><span class="arrow_carrot-down"></span></div>');
      
      //Hide Sidebar
      hiddenBarCloser.on('click', function () {
        hiddenBar.removeClass('visible-sidebar');
        $('.hidden-bar-opener').removeClass('custom_opener');
        $('.sidenav-list').removeClass('custom_left_sidebar');
        $('.page-wrapper').removeClass('padding_left');
      });
  
      hiddenBarOpener.on('click', function(e){
        console.log('working');
        if(hiddenBarOpener.hasClass('custom_opener')){
          console.log('If');
          hiddenBar.removeClass('visible-sidebar');
          $('.hidden-bar-opener').removeClass('custom_opener');
          $('.sidenav-list').removeClass('custom_left_sidebar');
          $('.page-wrapper').removeClass('padding_left');
        }
        else{
          console.log('else');
          hiddenBar.addClass('visible-sidebar');	
          $('.sidenav-list').addClass('custom_left_sidebar');
          $('.hidden-bar-opener').addClass('custom_opener');	
          $('.page-wrapper').addClass('padding_left');			
        }
      });
  
      $('.color-layer').on('click', function(e){
        hiddenBar.removeClass('visible-sidebar');
        $('.hidden-bar-opener').removeClass('custom_opener');
        $('.sidenav-list').removeClass('custom_left_sidebar');
        $('.page-wrapper').removeClass('padding_left');
      })
      
    }
    if($('.mobile-menu').length){
		
      //$('.mobile-menu .menu-box').mCustomScrollbar();
      
      var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
      $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
      $('.sticky-header .main-menu').append(mobileMenuContent);
      
      //Dropdown Button
      $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
        $(this).toggleClass('open');
        $(this).prev('ul').slideToggle(500);
      });
      
      //Menu Toggle Btn
      $('.mobile-nav-toggler').on('click', function() {
        $('body').addClass('mobile-menu-visible');
      });
  
      // Menu Toggle Btn
      $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
        $('body').removeClass('mobile-menu-visible');
      });
      
      // Dark Layout Button
      $('.dark-mode .dark-buttons .on').on('click', function() {
        $('.round').addClass('boll-right');
        $('body').addClass('dark-body');
      });
      
      // Dark Layout Button
      $('.dark-mode .dark-buttons .off').on('click', function() {
        $('.round').removeClass('boll-right');
        $('body').removeClass('dark-body');
      });
      $.getScript( 'assets/js/color-settings.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/jquery-ui.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/wow.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/owl.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/isotope.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/appear.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/jquery.fancybox.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/popper.min.js', function( data, textStatus, jqxhr ) {      
      });
      $.getScript( 'assets/js/jquery.js', function( data, textStatus, jqxhr ) {      
      });
      
    }
    
  }
  

}
