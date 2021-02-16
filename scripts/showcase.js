import * as THREE from 'https://unpkg.com/three/build/three.module.js';

export default class Showcase{
    static size = {
        x: 500,
        y: 500
    }

    constructor(canvas){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90, Showcase.size.x/Showcase.size.y, 0.1, 1000);;
        this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas});;
        this.loader = new THREE.FontLoader();

        this.ResizeScene();
        this.renderer.setClearColor(0xfffff, 0);
        this.camera.position.z = 20;

        this.textGeometry;
        this.geometry;
        this.edges;
        this.line;

        this.lastPosition;
        this.isGrowing;
        this.counter = 0;

        //Load text before animating anything else
        this.loader.load('styles/roboto.json', (font)=>{
            this.textGeometry = new THREE.TextGeometry(':)', {font: font, size: 10, height: 0.5});
            this.ReplaceForm();
            this.animate();

            window.addEventListener('mousemove', this.mouseControl.bind(this));
            window.addEventListener('mousedown', ()=>{this.lastPosition = undefined});
            window.addEventListener('resize', this.ResizeScene.bind(this));
        });
    }

    mouseControl(event){
        if(event.buttons === 1){
            if(this.lastPosition === undefined)
                this.lastPosition = {x: event.clientX, y:event.clientY};
            
            let newPosition = {x: event.clientX, y:event.clientY};
            this.line.rotation.x += (newPosition.y - this.lastPosition.y) * 0.003;
            this.line.rotation.y += (newPosition.x - this.lastPosition.x) * 0.003;

            this.lastPosition = newPosition;
        }
    }

    MoveAlone(){
        this.line.rotation.y += 0.004;
    }

    animate(){
        this.MoveAlone();
        this.ChangeForm();

        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    ResizeScene(){
        if(window.innerWidth <= this.renderer.domElement.width){
            this.camera.aspect = window.innerWidth / Showcase.size.y;
            this.renderer.setSize(window.innerWidth, Showcase.size.y);
            this.camera.updateProjectionMatrix();
        }else{
            this.camera.aspect = Showcase.size.x/Showcase.size.y;
            this.renderer.setSize(Showcase.size.x, Showcase.size.y);
            this.camera.updateProjectionMatrix();
        }
    }

    ReplaceForm(){
        //let options = ['cube', 'sphere', 'text', 'octahedron', 'torus'];
        let options = ['text', 'sphere'];

        if(this.line){
            this.scene.remove(this.line);
            this.geometry.dispose();
            this.edges.dispose();
        }

        switch(options[this.counter].toLowerCase()){
            case 'cube':
                this.geometry = new THREE.BoxGeometry(10, 10, 10);
                break;
            case 'sphere':
                this.geometry = new THREE.SphereGeometry(10, 10, 10);
                break;
            case 'octahedron':
                this.geometry = new THREE.OctahedronGeometry(10);
                break;
            case 'torus':
                this.geometry = new THREE.TorusGeometry(10, 3, 16, 100);
                break;
            case 'text':
                this.geometry = this.textGeometry;
                break;
            default:
                this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
                break;
        }

        this.counter = this.counter >= options.length - 1 ? 0 : this.counter + 1;

        this.edges = new THREE.EdgesGeometry(this.geometry);
        this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial( { color: 0x55708a, linewidth: 200} ));
        this.line.material.transparent = true;
        this.line.material.opacity = 0;
        
        this.scene.add(this.line);
    }

    ChangeForm(){
        if(this.isGrowing){
            this.line.material.opacity += 0.002;
            this.isGrowing = this.line.material.opacity < 1.0;
        }else if(this.line.material.opacity >= 0.001){
            this.line.material.opacity -= 0.002;
        }else{
            this.ReplaceForm();

            this.isGrowing = true;
        }
    }
}