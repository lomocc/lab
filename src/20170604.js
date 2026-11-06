var objects = [],
    points = [],
    num = 600,
    fl = 300,
    maxZ = 5000,
    separation = 4;

///////

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// renderer.context.globalCompositeOperation = "darken";

var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var materialRed = getMaterial(0xff0000);
var materialBlue = getMaterial(0x00ffff);

camera.position.z = 5;

// console.log(renderer.context.globalCompositeOperation)
makePoints();
makeObjects();

var render = function () {
    requestAnimationFrame( render );

    updateObjects();

    renderer.render(scene, camera);
};

render();

/////////

function makePoints() {
    for(var i = 0; i < num; i++) {
        points.push({
            x: bitlib.random.float(-500, 500),
            y: bitlib.random.float(-500, 500),
            z: bitlib.random.float(-fl, maxZ),
            char: String.fromCharCode(bitlib.random.int(0x4e00, 0x9fa5) + 65),
            speed: bitlib.random.float(-1, -5)/100
        });
    }
}
function makeObjects() {
    for(var i = 0; i < num; i++) {
        var cubeRed = new THREE.Mesh( geometry, materialRed );
        scene.add( cubeRed );
        var cubeBlue = new THREE.Mesh( geometry, materialBlue );
        scene.add( cubeBlue );

        objects.push({
            red: cubeRed,
            blue: cubeBlue
        });
    }
}
function updateObjects() {
    for(var i = 0; i < num; i++) {
        var p = points[i],
            scale = fl / (fl + p.z),
            x = p.x * scale,
            y = p.y * scale;

        var obj = objects[i];
        obj.red.position.x = x - separation * scale;
        obj.red.position.y = y;
        obj.red.position.z = -p.z;
        obj.blue.position.x = x + separation * scale;
        obj.blue.position.y = y;
        obj.blue.position.z = -p.z;

        obj.red.scale.x = obj.red.scale.y = scale;
        obj.blue.scale.x = obj.blue.scale.y = scale;

        // console.log(obj.red.blending)

        if(p.z < 50) {
            obj.red.alpha = bitlib.math.map(p.z, 50, 0, 1, 0);
            obj.blue.alpha = bitlib.math.map(p.z, 50, 0, 1, 0);
        }
        else {
            obj.red.alpha = scale;
            obj.blue.alpha = scale;
        }

        p.z += p.speed;
        if(p.z < 0) {
            p.z += maxZ;
        }
    }
}
function getMaterial(color) {
    var material = new THREE.MeshBasicMaterial( {color: color} );
    material.transparent = true;
    material.blending = THREE.CustomBlending;
    material.blendEquation = THREE.MinEquation; //default
    // material.blendSrc = THREE.SrcColorFactor; //default
    // material.blendDst = THREE.OneMinusDstAlphaFactor; //default
    return material;
}