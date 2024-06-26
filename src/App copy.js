import "./App.css";
import * as THREE from "three";

function App() {
  var camera, scene, renderer;
  var earth, cloud;
  var pointLight, ambientLight;
  var mouseDown = false,
    mouseX = 0,
    mouseY = 0;

  init();
  animate();

  function init() {
    // initialization
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 160;

    // Earth terrain
    var earth_texture = new THREE.TextureLoader().load(
      "https://i.postimg.cc/ry0pcyyZ/earth.jpg"
    );
    var earth_bump = new THREE.TextureLoader().load(
      "https://i.postimg.cc/mgrJfkBt/bump.jpg"
    );
    var earth_specular = new THREE.TextureLoader().load(
      "https://i.postimg.cc/R06YhY3m/spec.jpg"
    );
    var earth_geometry = new THREE.SphereGeometry(30, 32, 32);
    var earth_material = new THREE.MeshPhongMaterial({
      shininess: 40,
      bumpScale: 1,
      map: earth_texture,
      bumpMap: earth_bump,
      specularMap: earth_specular,
    });
    earth = new THREE.Mesh(earth_geometry, earth_material);
    scene.add(earth);

    // Earth cloud
    var cloud_texture = new THREE.TextureLoader().load(
      "https://i.postimg.cc/k4WhFtFh/cloud.png"
    );
    var cloud_geometry = new THREE.SphereGeometry(31, 32, 32);
    var cloud_material = new THREE.MeshBasicMaterial({
      shininess: 10,
      map: cloud_texture,
      transparent: true,
      opacity: 0.8,
    });
    cloud = new THREE.Mesh(cloud_geometry, cloud_material);
    scene.add(cloud);

    // point light (upper left)
    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-400, 100, 150);
    scene.add(pointLight);

    // ambient light
    ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    // renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // event handler
    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener(
      "mousemove",
      function (e) {
        onMouseMove(e);
      },
      false
    );
    document.addEventListener(
      "mousedown",
      function (e) {
        onMouseDown(e);
      },
      false
    );
    document.addEventListener(
      "mouseup",
      function (e) {
        onMouseUp(e);
      },
      false
    );
  }

  function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.001;
    cloud.rotation.y += 0.001;

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(evt) {
    if (!mouseDown) return;
    evt.preventDefault();
    var deltaX = evt.clientX - mouseX,
      deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY);
  }

  function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
  }

  function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
  }

  function rotateScene(deltaX, deltaY) {
    earth.rotation.y += deltaX / 300;
    earth.rotation.x += deltaY / 300;
    cloud.rotation.y += deltaX / 300;
    cloud.rotation.x += deltaY / 300;
  }

  return <div className="App"></div>;
}

export default App;
