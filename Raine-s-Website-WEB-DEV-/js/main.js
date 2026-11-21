console.log('main.js is working!');
const sidebarButtons = document.querySelectorAll('.sidebar button');
 
sidebarButtons.forEach(function (button) {
     button.addEventListener('click' , function () {
        const label = button.textContent.trim();

        if (label.includes('Log OUt')) {
            alert(' You have been Logged Out!');
        } else if (label.includes(' Our Branches')) {
            alert (' Infante St., Molo, Iloilo City\n Lopez Jaena St., Jaro, Iloilo City');
        } else {
            alert (label + ' (THIS PART AINT DONE YET WAIT BIACH~~😒😒');
        }
     });
 });