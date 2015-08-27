/**
 * Created by Dylan on 27/08/2015.
 */


var pascalnumbers = [];
function getPascalTriangle(rows) {
    for (var row = 1; row < rows; row++) {
        pascalnumbers[row - 1] = generatePascalTriangleRow(row);
    }
}


function display() {
    getPascalTriangle(10);
    console.log(THREE.FontUtils.faces);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
            geom = new THREE.ShapeGeometry(shapes);
            mat = new THREE.MeshBasicMaterial();
            mesh = new THREE.Mesh(geom, mat);
            mesh.position.set(xoffset, yoffset, 0);
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