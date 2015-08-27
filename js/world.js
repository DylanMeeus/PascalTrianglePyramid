/**
 * Created by Dylan on 27/08/2015.
 */


var pascalnumbers = [];
function getPascalTriangle(rows) {
    for (var row = 1; row < rows; row++) {
        pascalnumbers[row - 1] = generatePascalTriangleRow(row);
    }
}


var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
function displayTriangle() {
    getPascalTriangle(10);
    console.log(THREE.FontUtils.faces);
    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);
    // scene.add( cube );

    camera.position.z = 5;

    // generate all the shapes
    console.log(pascalnumbers);


    console.log(currentNumber);
    var shapes, geom, mat, mesh;

    // hardcode the start for a bit

    shapes = THREE.FontUtils.generateShapes("1", {
        font: "helvetiker",
        weight: "normal",
        size: 0.25
    });

    geom = new THREE.ShapeGeometry(shapes);
    mat = new THREE.MeshBasicMaterial();
    mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(1.5, +2.5, 0);
    scene.add(mesh);

    // end hardcode
    var previousNumber = 1;
    var currentNumber; // We need the # numbers of this to adjust the offset correctly!
    for (var row = 0; row < pascalnumbers.length; row++) {
        console.log("new row # .. " + row);
        var xoffset = -row/2; // start of x-offset.
        for (var col = 0; col <= row + 1; col++) {
            currentNumber = pascalnumbers[row][0][col];
            console.log(currentNumber);
            shapes = THREE.FontUtils.generateShapes(pascalnumbers[row][0][col], {
                font: "helvetiker",
                weight: "normal",
                size: 0.25
            });
            // the x Offset depends on the "length" of the previous number & the position.
            var numberCorrection = previousNumber.toString().length /10 ;
            console.log(numberCorrection);
            xoffset += 1
            var yoffset = 2 - row / 2;
            var zoffset = 0;
            geom = new THREE.ShapeGeometry(shapes);
            mat = new THREE.MeshBasicMaterial();
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








// testing camera movement

THREE.PerspectiveCamera.prototype.setRotateX = function( deg ){
    if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
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
    console.log(key);

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
