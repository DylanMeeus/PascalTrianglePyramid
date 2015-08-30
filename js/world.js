/**
 * Created by Dylan on 27/08/2015.
 */

var exists = false;
var pascalnumbers = [];
function getPascalTriangle(rows) {
    for (var row = 1; row < rows; row++) {
        pascalnumbers[row - 1] = generatePascalTriangleRow(row);
    }
}

// Billboard & 2-sided textures.

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
function displayTriangle() {
    // fetch the amount of rows from the page.
    // Each time it is pressed we need to refresh the page

    // We should choose an initial spacing between numbers based on the input amount of numbers (they get larger near the bottom)
    var rowinput = 1;
    rowinput = document.getElementById("rows").value;
    getPascalTriangle(rowinput);

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight-125);
    if(!exists){
        document.getElementById("renderframe").appendChild(renderer.domElement);
        exists = true;
    }else{ // we empty the scene

        while(document.getElementById("renderframe").hasChildNodes()){
            document.getElementById("renderframe").removeChild(document.getElementById("renderframe").lastChild);
        }
        scene = new THREE.Scene();
        document.getElementById("renderframe").appendChild(renderer.domElement);

    }

    camera.position.z = 5;

    // generate all the shapes
    //console.log(pascalnumbers);


    //console.log(currentNumber);
    var shapes, geom, mat, mesh;

    // hardcode the start for a bit

    shapes = THREE.FontUtils.generateShapes("1", {
        font: "helvetiker",
        weight: "normal",
        size: 0.25
    });

    geom = new THREE.ShapeGeometry(shapes);
    mat = new THREE.MeshBasicMaterial();
    mat.side = THREE.DoubleSide;
    mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(1.5, +2.5, 0);

    scene.add(mesh);


    // end hardcode
    var previousNumber = 1;
    var currentNumber; // We need the # numbers of this to adjust the offset correctly!
    for (var row = 0; row < pascalnumbers.length; row++) {
        //console.log("new row # .. " + row);
        var xoffset = -row/2; // start of x-offset.
        for (var col = 0; col <= row + 1; col++) {
            currentNumber = pascalnumbers[row][0][col];
            console.log(currentNumber);
            shapes = THREE.FontUtils.generateShapes(Math.round(currentNumber), {
                font: "helvetiker",
                weight: "normal",
                size: 0.25
            });
            // the x Offset depends on the "length" of the previous number & the position.
            var numberCorrection = previousNumber.toString().length /10 ;
        //    console.log(numberCorrection);

            // The space between the numbers is determined by the amount of rows we generated.



            xoffset += 1; // We need to fix this for really large numbers!
            var yoffset = 2 - row / 2;
            var zoffset = 0;
            geom = new THREE.ShapeGeometry(shapes);
            mat = new THREE.MeshBasicMaterial();
            mat.side = THREE.DoubleSide;
            mesh = new THREE.Mesh(geom, mat);
            mesh.position.set(xoffset, yoffset, zoffset);
            scene.add(mesh);

            previousNumber = currentNumber;
        }
    }

    function render() {

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
}



//***************** END PASCAL TRIANGLE *****************************\\




//*************** BEGIN PASCAL PYRAMID ******************************\\


var pascalpyramid = [1];
function getPascalPyramid(levels) // levels indicate 'floors' on the y-axis.
{
    for(var row = 1; row <= levels; row++)
    {
        console.log("generating level: " + row);
        pascalpyramid[row-1] = generatePascalPyramidLevel(row);
    }
}


function displayPyramid()
{



    // set up renderer and camera
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight-125);
    document.getElementById("renderframe").appendChild(renderer.domElement);
    camera.position.z = 5;
    // end setup

    var input = document.getElementById("rows").value;
    // hardcoded the amount of rows for now.
    console.log(input);
    getPascalPyramid(input);


    // just print what I have now
    console.log("pascal's pyramid");
    console.log(pascalpyramid);

    console.log("in-loop");
    var shapes, geom, mat, mesh;



    // hardcode the number 1 for a sec


    shapes = THREE.FontUtils.generateShapes("1", {
        font: "helvetiker",
        weight: "normal",
        size: 0.25
    });

    xoffset += 1; // We need to fix this for really large numbers!
    geom = new THREE.ShapeGeometry(shapes);
    mat = new THREE.MeshBasicMaterial({color:colour});
    mat.side = THREE.DoubleSide;
    mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(1, 2.50, 0);
    scene.add(mesh);



    // end hardcoded 1


    var xoffset = 0;
    var yoffset = 2;
    var zoffset = 0;
    var colour = 0xffff0000;
    for(var level = 0; level < pascalpyramid.length; level++)
    {
        zoffset = 0;
        // console.log(pascalpyramid[level]);
        for(var row = 0; row < pascalpyramid[level].length;row++)
        {
            xoffset = 0;
            //console.log(pascalpyramid[level][row]);
            for(var col = 0; col < pascalpyramid[level][row].length; col++)
            {
            //      console.log(pascalpyramid[level][row][col]);


                var currentNumber = pascalpyramid[level][row][col];


                shapes = THREE.FontUtils.generateShapes(Math.round(currentNumber), {
                    font: "helvetiker",
                    weight: "normal",
                    size: 0.25
                });

                xoffset += 1; // We need to fix this for really large numbers!
                geom = new THREE.ShapeGeometry(shapes);
                mat = new THREE.MeshBasicMaterial({color:colour});
                mat.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geom, mat);
                mesh.position.set(xoffset, yoffset, zoffset);
                scene.add(mesh);

            }
            // Adjust the Z-axis for every column (so we display columns along Z
            zoffset -= 0.5;
        }
        // Adjust Y-axis for every level.
        // change the colour for the level.
        if(colour === 0xffff0000){
            colour = 0xff0000ff;
        }
        else
        {
            colour = 0xffff0000;
        }
        yoffset -= 1;
    }



    function render() {
        console.log("rendering");
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        // bill board effect goes here.
        scene.traverse(function (node)
        {
            if(node instanceof THREE.Mesh)
            {
                node.quaternion.copy(camera.quaternion);
            }
        });
    }
    render();
}




//*************** END PASCAL PYRAMID ******************************\\


//*************** BEGIN CAMERA MANIPULATION ******************************\\

// testing camera movement

THREE.PerspectiveCamera.prototype.setRotateX = function( deg ){
    if ( typeof( deg ) ==  'number' &&parseInt( deg ) == deg ){
        this.rotation.x = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.setRotateY = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
        this.rotation.y = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.setRotateZ = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
        this.rotation.z = deg * ( Math.PI / 180 );
    }
};
THREE.PerspectiveCamera.prototype.getRotateX = function(){
    return Math.round( this.rotation.x * ( 180 / Math.PI ) );
};
THREE.PerspectiveCamera.prototype.getRotateY = function(){
    return Math.round( this.rotation.y * ( 180 / Math.PI ) );
};
THREE.PerspectiveCamera.prototype.getRotateZ = function(){
    return Math.round( this.rotation.z * ( 180 / Math.PI ) );
};

// forward backward implementation


const KEYUP             = 38;        // up key
const KEYDOWN             = 40;        // down key
const KEYLEFT             = 37;        // left key
const KEYRIGHT            = 39;        // right key
const Z_ROT_INC            = 86;
const Z_ROT_DEC            = 87;
const VIEW_INCREMENT    = 1;        // amount to move in degrees
const Z = 90;
const S = 83;
const A = 65;
const D = 68;
const Q = 81;
const distance = 0.25; // how much does the camera move during forward/backward/left/right
document.addEventListener('keydown', function(e) {
    var key = e.keyCode;
    //console.log(key);

    switch (key) {

        case Z:
            camera.translateZ(-distance);
            break;

        case S:
            camera.translateZ(distance);
            break;

        case A:
            camera.translateX(-distance);
            break;
        case D:
            camera.translateX(distance);
            break;

        case Q:
            console.log("Q!");
            camera.translateX(-distance);
            break;
        case KEYUP:
            // x increments, z depends of current y

            if (camera.getRotateX() < 90) {
                camera.setRotateX(camera.getRotateX() + VIEW_INCREMENT);
            }
            break;

        case KEYDOWN:

            if (camera.getRotateX() > -90) {
                camera.setRotateX(camera.getRotateX() - VIEW_INCREMENT);
            }
            break;

        case KEYLEFT:

            camera.setRotateY(camera.getRotateY() + VIEW_INCREMENT);
            break;

        case KEYRIGHT:

            camera.setRotateY(camera.getRotateY() - VIEW_INCREMENT);
            break;

        case Z_ROT_INC:

            camera.setRotateZ(camera.getRotateZ() + VIEW_INCREMENT);
            break;

        case Z_ROT_DEC:

            camera.setRotateZ(camera.getRotateZ() - VIEW_INCREMENT);
            break;

    }
});
