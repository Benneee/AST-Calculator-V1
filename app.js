console.log('loaded');

// The form
const form = document.getElementById('ast-form');

// The loader and The results
const loader = document.getElementById('loading');
const results = document.getElementById('results');


// Event to show loader 
// (Load the functions here)



// The UI Variables

// Input fields before the submit button
const beamWidth = document.getElementById('width-of-beam').value;
const beamDepth = document.getElementById('depth-of-beam').value;
const moment = document.getElementById('design-moment').value;
const fcu = document.getElementById('strength-of-concrete').value || 460;
const fy = document.getElementById('strength-of-steel').value || 30;

// Fields after the submit button
const overallDepth = document.getElementById('overall-depth-of-beam');
const areaOfSteel = document.getElementById('area-of-steel');

// Cover for concrete (assumed value - to be used to get Overall Depth)
let c = 25;


function calculateAreaOfSteel () {

    // We need K to flag for singly-reinforced or doubly-reinforced design
    let K = (parseFloat(moment) * (10 ** 6)) / (parseFloat(fcu) * parseFloat(beamWidth) * parseFloat((beamDepth ** 2)));

    // Lever arm
    let z = parseFloat(beamDepth) * (0.5 + Math.sqrt((0.2) - (parseFloat(K) / 0.9)));

    if (K > 0.156) {
        // Display alert that K is greater than 0.156
    } else {
        // calculate the area of steel
        let steelArea =  (parseFloat(moment) * (10 ** 6)) / (0.87 * parseFloat(fy) * z.toFixed(3)); 

        // Populate form with Area of Steel answer
        areaOfSteel.value = steelArea.toFixed(2)
    }
}

function calculateOverallDepth () {

    /* Three values are needed here
    * 1. the beam depth
    * 2. the diameter of the bars found out after Ast is gotten
    * 3. the concrete cover, c
    * 
    * The suggestion to get the prediction for bars should be from that pi-R-square formula
    */
    
}

function sendValuesOver () {

    // This function will handle displaying the results after calculations
    // calculateAreaOfSteel()
    // calculateOverallDepth()

    // hide loader
    // loader.style.display = 'none';

    // display results
    // results.style.display = 'block';
}