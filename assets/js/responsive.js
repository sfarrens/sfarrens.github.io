/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  var topnav = document.getElementById("topnav");
  var icon = document.querySelector('.icon');
  
  if (topnav.classList.contains('responsive') && 
      !topnav.contains(event.target) && 
      !icon.contains(event.target)) {
    topnav.className = "topnav";
  }
});
