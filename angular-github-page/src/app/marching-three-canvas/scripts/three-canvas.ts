import * as THREE from 'three';
import MarchingCube, { Point } from './marching-cube';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createNoise3D } from 'simplex-noise';
import { MathExpression } from 'mathjs';

export default class ThreeCanvas {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    startCoordinates: { x: number; y: number; z: number; };
    cleanUpList: Array<string>
    objectName: string;
    gridName: string;
    verticesName: string;

    constructor(width: number, height: number, canvas: HTMLCanvasElement) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
        this.camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 100000)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.startCoordinates = {
            x: 0,
            y: 0,
            z: 0
        }
        this.cleanUpList = [];
        this.objectName = "example";
        this.gridName = "grid"
        this.verticesName = "verts";
        this.camera.position.z = 50;

        this.spawnLight({ x: 1000, y: 1000, z: 1000 }, 0x7e00FF)



        this.animate();
    }

    resize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    spawnLight(coordinates: { x: any; y: any; z: any; }, color: THREE.ColorRepresentation) {
        const intensity = 2;
        const light = new THREE.PointLight(color, intensity);
        light.position.set(coordinates.x, coordinates.y, coordinates.z);
        this.scene.add(light);
    }

    createStructure(vertices: ArrayLike<number>) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
        material.color.setRGB(0.5, 1.0, 0.1);

        const mesh = new THREE.Mesh(geometry, material);

        mesh.name = this.objectName;
        this.cleanUpList.push(this.objectName);
        this.scene.add(mesh);
    }

    createCube(startCoords: THREE.Vector3, size: any, cubeArray: Array<Point> | null = null, noise: { (arg0: any, arg1: any, arg2: any): number; (arg0: any, arg1: any, arg2: any): number; (arg0: any, arg1: any, arg2: any): number; (arg0: any, arg1: any, arg2: any): number; }, formula: MathExpression) {
        let points = cubeArray;
        if (!cubeArray)
            points = [];

        points?.push(new Point(new THREE.Vector3(startCoords.x, startCoords.y + size, startCoords.z + size), noise, formula));
        points?.push(new Point(new THREE.Vector3(startCoords.x + size, startCoords.y + size, startCoords.z + size), noise, formula));
        points?.push(new Point(new THREE.Vector3(startCoords.x + size, startCoords.y + size, startCoords.z), noise, formula));
        points?.push(new Point(new THREE.Vector3(startCoords.x, startCoords.y + size, startCoords.z), noise, formula));

        return points;
    }

    createCubeGrid(midCoords: { x: any; y: any; z: any; }, totalSize: number, sizePerCube: number, noise: any, formula: any) {
        let points: never[] | null | undefined = [];
        let startCoords = new THREE.Vector3(midCoords.x - totalSize / 2, midCoords.y - totalSize / 2, midCoords.z - totalSize / 2);

        for (let x = startCoords.x; x < startCoords.x + totalSize; x += sizePerCube) {
            for (let z = startCoords.z; z < startCoords.z + totalSize; z += sizePerCube) {
                for (let y = startCoords.y; y < startCoords.y + totalSize; y += sizePerCube) {
                    this.createCube(new THREE.Vector3(x, y, z), sizePerCube, points, noise, formula);
                }
            }
        }

        return points;
    }

    cleanUp() {
        this.cleanUpList.forEach(name => {
            let obj = this.scene.getObjectByName(name);
            if (!obj)
                return;

            //@ts-ignore 
            obj.material.dispose();
            //@ts-ignore 
            obj.geometry.dispose();
            obj.parent?.remove(obj);
        })
    }

    generate(formula: any, isolevel: number, totalSize: number, individualSize: number, showGrid: any, showVertices: any) {
        this.cleanUp();
        if (totalSize < 0 || individualSize < 0)
            return;

        let triangles: string | any[] = [];
        let noise = createNoise3D();

        let points = this.createCubeGrid(this.startCoordinates, totalSize, individualSize, noise, formula);

        if (showGrid)
            this.drawPoints(points, this.gridName);
        for (let i = 0; i < points.length - 4; i += 4) {
            MarchingCube.polygonise(points.slice(i, i + 8), isolevel, triangles);
        }

        let vertices = new Float32Array(triangles.length * 3);
        for (let i = 0; i < triangles.length; i++) {
            for (let j = 0; j < 3; j++) {
                vertices[i * 3 + j] = triangles[i][j];
            }
        }

        if (showVertices)
            this.drawCoordinates(vertices, this.verticesName);
        this.createStructure(vertices);
    }

    animate() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }

    drawPoints(points: any[], name: string) {
        let geometry = new THREE.BufferGeometry()
        const vertices: Array<number> = [];

        points.forEach((element: Point) => {
            vertices.push(element.vector.x, element.vector.y, element.vector.z);
        });

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ size: 0.2, sizeAttenuation: true, alphaTest: 0.5, transparent: true, color: 0xffffff });

        const particles = new THREE.Points(geometry, material);
        particles.name = name;
        this.cleanUpList.push(name);

        this.scene.add(particles);
    }

    drawCoordinates(coordinatesArray: Float32Array, name: string) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(coordinatesArray, 3));

        const material = new THREE.PointsMaterial({ color: 0xff00ff, size: 0.5 });

        const point = new THREE.Points(geometry, material);
        point.name = name;
        this.cleanUpList.push(name);

        this.scene.add(point);
    }
}