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
  if (event.indexh == 4 && event.indexv == 1) {
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

  if(event.indexh == 7 && event.indexv == 1) {
    var parent = document.getElementById("section_embed_2");
    renderBall(parent);
  }
});


function renderBall(parent) {
  var SCREEN_WIDTH = demoWidth,
			SCREEN_HEIGHT = demoHeight,
			mouseX = 0, mouseY = 0,
			windowHalfX = demoWidth / 2,
			windowHalfY = demoHeight / 2,
			SEPARATION = 200,
			AMOUNTX = 10,
			AMOUNTY = 10,
			camera, scene, renderer;
			init();
			animate();
			function init() {
				var container, separation = 100, amountX = 50, amountY = 50,
				particles, particle;
				container = document.createElement('div');
				parent.appendChild(container);
				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 1000;
				scene = new THREE.Scene();
				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );
				// particles
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {
					color: 0xffffff,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
					}
				} );
				for ( var i = 0; i < 1000; i ++ ) {
					particle = new THREE.Sprite( material );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 2 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					particle.position.multiplyScalar( Math.random() * 10 + 450 );
					particle.scale.multiplyScalar( 2 );
					scene.add( particle );
				}
				// lines
				for (var i = 0; i < 300; i++) {
					var geometry = new THREE.Geometry();
					var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
					vertex.normalize();
					vertex.multiplyScalar( 450 );
					geometry.vertices.push( vertex );
					var vertex2 = vertex.clone();
					vertex2.multiplyScalar( Math.random() * 0.3 + 1 );
					geometry.vertices.push( vertex2 );
					var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: Math.random() } ) );
					scene.add( line );
				}
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				windowHalfX = demoWidth / 2;
				windowHalfY = demoHeight / 2;
				camera.aspect = demoWidth / demoHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( demoWidth, demoHeight );
			}
			//
			function onDocumentMouseMove(event) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}
			function onDocumentTouchStart( event ) {
				if ( event.touches.length > 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			function onDocumentTouchMove( event ) {
				if ( event.touches.length == 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				render();
			}
			function render() {
				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
}