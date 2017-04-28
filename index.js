var demoWidth = 800;
var demoHeight = 500;
// More info https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,

  transition: 'slide', // none/fade/slide/convex/concave/zoom

  // More info https://github.com/hakimel/reveal.js#dependencies
  dependencies: [
    { src: 'lib/js/classList.js', condition: function () { return !document.body.classList; } },
    { src: 'plugin/markdown/marked.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
    { src: 'plugin/markdown/markdown.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },
    { src: 'plugin/zoom-js/zoom.js', async: true },
    { src: 'plugin/notes/notes.js', async: true }
  ]
});

Reveal.addEventListener('slidechanged', function (event) {
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  $("canvas", ".three-demo").remove();
  console.log("h", event.indexh);
  console.log("v", event.indexv);
  if (event.indexh == 1 && event.indexv == 0) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, demoWidth / demoHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(demoWidth, demoHeight);
    document.getElementById("section_embed_1").appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    var render = function () {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
    };
    render();
  }
});