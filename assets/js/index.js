// window.alert("Working")
$(document).ready(function(){
      //Banner-area owl carousel
      $('#banner-area .owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        autoplayTimeout:1000,
        autoplayHoverPause:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
      //Our-chef owl carousel
      $('#our-chef .owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
    // gallary
    (function() {
      const $imgs = $('#gallery img');
      const $buttons = $('#buttons');
      const tagged = {};
    
      $imgs.each(function() {
        const img = this;
        const tags = $(this).data('tags');
    
        if (tags) {
          tags.split(',').forEach(function(tagName) {
            if (tagged[tagName] == null) {
              tagged[tagName] = [];
            }
            tagged[tagName].push(img);
          })
        }
      })
    
      $('<button/>', {
        text: 'Show All',
        class: 'active',
        click: function() {
          $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
          $imgs.show();
        }
      }).appendTo($buttons);
    
      $.each(tagged, function(tagName) {
        const $n = $(tagged[tagName]).length;
        $('<button/>', {
          text: tagName + '(' + $n + ')',
          click: function() {
            $(this)
              .addClass('active')
              .siblings()
              .removeClass('active');
            $imgs
              .hide()
              .filter(tagged[tagName])
              .show();
          }
        }).appendTo($buttons);
      });
    }());

    
  
  
  
  
  
  
  
  
  

  
  
  })