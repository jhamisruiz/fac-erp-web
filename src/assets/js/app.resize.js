// console.log('start');


// //function isEven
// function isEven(n) {
//   return n == parseFloat(n) ? !(n % 2) : void 0;
// }


// interact('.resize-drag-ratio')
//   .draggable({
//     onmove: window.dragMoveListener
//   })
//   .resizable({
//     preserveAspectRatio: true,
//     edges: { left: true, right: true, bottom: true, top: true }
//   })
//   .on('resizemove', function (event) {
//     var target = event.target,
//       x = (parseFloat(target.getAttribute('data-x')) || 0),
//       y = (parseFloat(target.getAttribute('data-y')) || 0);

//     var min_size = 35;

//     if (event.rect.width > min_size) {
//       // update the element's style
//       target.style.width = event.rect.width + 'px';
//       target.style.height = event.rect.height + 'px';


//       // translate when resizing from top or left edges
//       x += event.deltaRect.left;
//       y += event.deltaRect.top;

//       target.style.webkitTransform = target.style.transform =
//         'translate(' + x + 'px,' + y + 'px)';

//       target.setAttribute('data-x', x);
//       target.setAttribute('data-y', y);

//     }
//   });







// interact('.resize-drag')
//   .draggable({
//     onmove: window.dragMoveListener
//   })
//   .resizable({
//     preserveAspectRatio: false,
//     edges: { left: true, right: true, bottom: true, top: true }
//   })
//   .on('resizemove', function (event) {
//     var target = event.target,
//       x = (parseFloat(target.getAttribute('data-x')) || 0),
//       y = (parseFloat(target.getAttribute('data-y')) || 0);


//     //console.log("event.rect.width: "+event.rect.width);

//     //prevents resizing to units smaller then 35px
//     var min_size = 35;

//     if (event.rect.width > min_size) {
//       // update the element's style
//       target.style.width = event.rect.width + 'px';
//       target.style.height = event.rect.height + 'px';


//       //$("#form_bubble_width").val(event.rect.width);
//       //$("#form_bubble_width").val(event.rect.height);



//       // translate when resizing from top or left edges
//       x += event.deltaRect.left;
//       y += event.deltaRect.top;

//       target.style.webkitTransform = target.style.transform =
//         'translate(' + x + 'px,' + y + 'px)';

//       target.setAttribute('data-x', x);
//       target.setAttribute('data-y', y);
//       //target.textContent = event.rect.width + '×' + event.rect.height;
//     }
//   });




// function dragMoveListener(event) {
//   var target = event.target,
//     // keep the dragged position in the data-x/data-y attributes
//     x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//     y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//   // translate the element
//   target.style.webkitTransform =
//     target.style.transform =
//     'translate(' + x + 'px, ' + y + 'px)';

//   // update the posiion attributes
//   target.setAttribute('data-x', x);
//   target.setAttribute('data-y', y);
// }



// // target elements with the "draggable" class
// interact('.draggable')
//   .draggable({
//     // enable inertial throwing
//     inertia: true,
//     // keep the element within the area of it's parent
//     restrict: {
//       restriction: "parent",
//       endOnly: true,
//       elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
//     },
//     // enable autoScroll
//     autoScroll: true,

//     // call this function on every dragmove event
//     onmove: dragMoveListener,
//     // call this function on every dragend event
//     onend: function (event) {



//       // var textEl = event.target.querySelector('p');

//       console.log(event.target.id)

//       var distance = (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
//         Math.pow(event.pageY - event.y0, 2) | 0))
//         .toFixed(2) + 'px';

//     }

//   });



// interact('.resize-drag , .resize-drag-ratio').on('tap', function (event) {
//   event.preventDefault();
//   var target = event.target
//   console.log("tap resize-drag class element");

//   var uuid = target.id;
//   //console.log("uuid: "+uuid);
//   console.log("click");
// });






// function dragMoveListener(event) {
//   var target = event.target,
//     // keep the dragged position in the data-x/data-y attributes
//     x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//     y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//   // translate the element
//   target.style.webkitTransform =
//     target.style.transform =
//     'translate(' + x + 'px, ' + y + 'px)';

//   // update the posiion attributes
//   target.setAttribute('data-x', x);
//   target.setAttribute('data-y', y);
// }

// // this is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener;


// var mouseX = 0, mouseY = 0


// //function onMousemove(e)
// function onMousemove(e) {
//   var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0,
//     obj = this;
//   //get mouse position on document crossbrowser
//   if (!e) { e = window.event; }
//   if (e.pageX || e.pageY) {
//     m_posx = e.pageX;
//     m_posy = e.pageY;
//   } else if (e.clientX || e.clientY) {
//     m_posx = e.clientX + document.body.scrollLeft
//       + document.documentElement.scrollLeft;
//     m_posy = e.clientY + document.body.scrollTop
//       + document.documentElement.scrollTop;
//   }
//   //get parent element position in document
//   if (obj.offsetParent) {
//     do {
//       e_posx += obj.offsetLeft;
//       e_posy += obj.offsetTop;
//     } while (obj = obj.offsetParent);
//   }
//   // mouse position minus elm position is mouseposition relative to element:
//   dbg.innerHTML = ' X Position: ' + (m_posx - e_posx)
//     + ' Y Position: ' + (m_posy - e_posy);

//   mouseX = (m_posx - e_posx);
//   mouseY = (m_posy - e_posy);

// }

// var elem = document.getElementById('container');
// //elem.addEventListener('mousemove', onMousemove, false);

// var dbg = document.getElementById('dbg');  //just for debug div instead of console




// $(document).ready(function () {






//   var is_rotate = true;

//   $("#btn_rotate").click(function () {

//     console.log('ddd');

//     if (is_rotate) {


//       $(this).text('drag-resize');
//       $(".element").removeClass("drag-rotate");
//       $(".element").addClass("resize-drag-ratio");
//       is_rotate = false;
//     } else {
//       $(this).text('rotate');

//       $(".element").removeClass("resize-drag-ratio");
//       $(".element").addClass("drag-rotate");
//       is_rotate = true;
//     }


//     //console.log('click: '+is_rotate);


//   });



//   var saved_mouseX = 0;
//   var saved_mouseY = 0;

//   //interact("#container").on('tap', function (event) {
//   interact("#container").on('tap', function (event) {
//     event.preventDefault();
//     var target = event.target
//     if (target.id == "tp_image") {
//       console.log(target.id);
//       console.log(mouseX + "-" + mouseY);

//       saved_mouseX = mouseX;
//       saved_mouseY = mouseY;

//       //$('#modal_stickers').modal('show');
//     }
//   });





//   //interact('.drag-rotate')
//   interact('.drag-rotate')
//     .draggable({
//       onstart: function (event) {
//         var element = event.target;
//         var rect = element.getBoundingClientRect();
//         // store the center as the element has css `transform-origin: center center`
//         element.dataset.centerX = rect.left + rect.width / 2;
//         element.dataset.centerY = rect.top + rect.height / 2;

//         console.log("element.dataset.centerX: " + element.dataset.centerX);
//         console.log("element.dataset.centerY: " + element.dataset.centerY);



//         // get the angle of the element when the drag starts
//         element.dataset.angle = getDragAngle(event);
//       },
//       onmove: function (event) {
//         var element = event.target;
//         var center = {
//           x: 300,
//           y: 300,
//         };


//         console.log("element.dataset.centerX: " + element.dataset.centerX);
//         console.log("element.dataset.centerY: " + element.dataset.centerY);


//         var angle = getDragAngle(event);

//         // update transform style on dragmove
//         element.style.transform = 'rotate(' + angle + 'rad' + ')';
//       },
//       onend: function (event) {
//         var element = event.target;

//         // save the angle on dragend
//         element.dataset.angle = getDragAngle(event);
//       },
//     })



//   //function getDragAngle(event)
//   function getDragAngle(event) {
//     var element = event.target;
//     var startAngle = parseFloat(element.dataset.angle) || 0;
//     var center = {
//       x: parseFloat(element.dataset.centerX) || 0,
//       y: parseFloat(element.dataset.centerY) || 0,
//     };
//     var angle = Math.atan2(center.y - event.clientY,
//       center.x - event.clientX);

//     return angle - startAngle;
//   }

// });


