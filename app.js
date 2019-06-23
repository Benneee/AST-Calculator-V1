// console.log('loaded');

// The form
const form = document.getElementById('ast-form');

// The loader and The results
const loader = document.getElementById('loading');
const results = document.getElementById('results');


// Event to show loader 
// (Load the functions here)
// Call sendValuesOver() here

form.addEventListener('submit', loadResults);



function calculateAreaOfSteel () {

    // The UI Variables

    // Input fields before the submit button
    const beamWidth = document.getElementById('width-of-beam');
    const beamDepth = document.getElementById('depth-of-beam');
    const moment = document.getElementById('design-moment');
    const fcu = document.getElementById('strength-of-concrete');
    const fy = document.getElementById('strength-of-steel');

    // Fields after the submit button
    // const overallDepth = document.getElementById('overall-depth-of-beam');
    const areaOfSteel = document.getElementById('area-of-steel');
    const valueOfK = document.getElementById('value-of-k');
    const leverArm = document.getElementById('lever-arm');

    // Cover for concrete (assumed value - to be used to get Overall Depth)
    const c = 25;

    // Convert all numbers to avoid NaN issues because I'm freakin' tired!
    const M = parseFloat(moment.value);
    const Fcu = parseFloat(fcu.value) || 30;
    const b = parseFloat(beamWidth.value);
    const d = parseFloat(beamDepth.value);
    const Fy = parseFloat(fy.value) || 460;
    // console.log(d)

    // We need K to flag for singly-reinforced or doubly-reinforced design
    let K = (M * (10 ** 6)) / (Fcu * b * (d ** 2));
    // console.log(K)

    // Lever arm
    let z = d * (0.5 + (Math.sqrt((0.25) - ((K.toFixed(3)) / 0.9))));
    // console.log(z)

    if ( beamDepth.value == '' || beamWidth.value == '' || moment.value == '') {
        showError('Please fill in all fields')
    } else {
        
        if (K > 0.156) {
            // Display alert that K is greater than 0.156
            // console.log('K is greater than 0.156', K.toFixed(3));
            showError(`K is greater than 0.156: ${K.toFixed(3)}`);

        } else {
            // calculate the area of steel
            // console.log('K is less than 0.156:', K.toFixed(3));
    
            let steelArea =  (M * (10 ** 6)) / (0.87 * Fy * z.toFixed(3)); 
    
            // console.log('[Area of Steel]:', steelArea.toFixed(3));
    
            // Populate form with Area of Steel answer
            valueOfK.value = K.toFixed(3);
            leverArm.value = (parseFloat(z)).toFixed(3);
            areaOfSteel.value = (parseFloat(steelArea)).toFixed(3)
    
             // hide loader
            loader.style.display = 'none';
    
            // display results
            results.style.display = 'block';
        }

    }
}

// function calculateOverallDepth () {

    /* Three values are needed here
    * 1. the beam depth
    * 2. the diameter of the bars found out after Ast is gotten
    * 3. the concrete cover, c
    * 
    * The suggestion to get the prediction for bars should be from that pi-R-square formula
    * Or just wait to run the stuff by Chris and see the progress of the PDF reader thingy
    */
    
// }

// function sendValuesOver () {

    // This function will handle displaying the results after calculations
    // calculateAreaOfSteel()
    // calculateOverallDepth()

   
// }

function showError(error) {
    loader.style.display = 'none';
    results.style.display = 'none';

    // The div
    const errorDiv = document.createElement('div');

    // Add class to div
    errorDiv.className = 'alert alert-danger text-center';

    // Append a text node to the errorDiv 
    errorDiv.appendChild(document.createTextNode(error));
    // console.log(errorDiv);

    // Pick out parts of the DOM to display the errorDiv
    const form = document.querySelector('.form-wrap')
    const container = document.querySelector('.container');

    // Insert errorDIv into the DOM
    container.insertBefore(errorDiv, form);

    // Set time limit for errorDiv
    setTimeout(clearError, 2500);

}

function clearError() {
    const alert = document.querySelector('.alert');
    alert.remove()
}

function loadResults(e) {

    // Show loader
    loader.style.display = 'block';
    
    // Hide results for a bit
    results.style.display = 'none';

    // Set a timeout for the loader 
    setTimeout(calculateAreaOfSteel(), 3000);

    e.preventDefault();
}