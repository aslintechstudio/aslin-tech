import * as THREE from "./vendor/three.module.js";

const heroWorld = document.querySelector(".hero-world");
const canvas = document.querySelector(".globe-canvas");

if (heroWorld && canvas) {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );
    const webglContext = canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        powerPreference: "default"
    });

    if (webglContext) {
        try {
            const renderer = new THREE.WebGLRenderer({
                canvas,
                context: webglContext,
                alpha: true,
                antialias: true,
                powerPreference: "default"
            });
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(47, 1, 0.1, 100);
            const globe = new THREE.Group();
            const clock = new THREE.Clock();

            let frameId = null;
            let isVisible = true;
            let autoRotation = -0.35;

            renderer.setClearColor(0x000000, 0);
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.24;
            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio || 1, 1.5)
            );

            camera.position.set(0, 0, 4.8);
            scene.add(globe);

            const core = new THREE.Mesh(
                new THREE.SphereGeometry(1.5, 48, 32),
                new THREE.MeshStandardMaterial({
                    color: 0x104a72,
                    emissive: 0x0a5278,
                    emissiveIntensity: 0.65,
                    roughness: 0.46,
                    metalness: 0.24,
                    transparent: false,
                    opacity: 1
                })
            );
            globe.add(core);

            const network = new THREE.Mesh(
                new THREE.SphereGeometry(1.525, 34, 24),
                new THREE.MeshBasicMaterial({
                    color: 0x37c9ff,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.26,
                    blending: THREE.AdditiveBlending
                })
            );
            globe.add(network);

            const pointPositions = [];
            const pointCount = 820;
            const goldenAngle = Math.PI * (3 - Math.sqrt(5));

            for (let index = 0; index < pointCount; index += 1) {
                const y = 1 - (index / (pointCount - 1)) * 2;
                const radius = Math.sqrt(1 - y * y);
                const theta = goldenAngle * index;
                const sphereRadius =
                    1.555 + Math.sin(index * 12.9898) * 0.012;

                pointPositions.push(
                    Math.cos(theta) * radius * sphereRadius,
                    y * sphereRadius,
                    Math.sin(theta) * radius * sphereRadius
                );
            }

            const pointGeometry = new THREE.BufferGeometry();
            pointGeometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(pointPositions, 3)
            );

            const points = new THREE.Points(
                pointGeometry,
                new THREE.PointsMaterial({
                    color: 0x8be8ff,
                    size: 0.028,
                    sizeAttenuation: true,
                    transparent: true,
                    opacity: 0.96,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                })
            );
            globe.add(points);

            const atmosphere = new THREE.Mesh(
                new THREE.SphereGeometry(1.66, 40, 28),
                new THREE.ShaderMaterial({
                    transparent: true,
                    side: THREE.BackSide,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                    vertexShader: `
                        varying vec3 vertexNormal;

                        void main() {
                            vertexNormal = normalize(
                                normalMatrix * normal
                            );
                            gl_Position = projectionMatrix *
                                modelViewMatrix *
                                vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vertexNormal;

                        void main() {
                            float intensity = pow(
                                max(
                                    0.0,
                                    0.72 - dot(
                                    vertexNormal,
                                    vec3(0.0, 0.0, 1.0)
                                    )
                                ),
                                2.25
                            );
                            gl_FragColor = vec4(
                                0.22,
                                0.79,
                                1.0,
                                intensity * 0.76
                            );
                        }
                    `
                })
            );
            globe.add(atmosphere);

            scene.add(new THREE.AmbientLight(0x5bc3ff, 1.24));

            const hemisphereLight = new THREE.HemisphereLight(
                0x6ad7ff,
                0x031020,
                0.78
            );
            scene.add(hemisphereLight);

            const keyLight = new THREE.DirectionalLight(0x8be8ff, 3.35);
            keyLight.position.set(3.4, 2.6, 4.2);
            scene.add(keyLight);

            const rimLight = new THREE.PointLight(0x7a5cff, 5.1, 14);
            rimLight.position.set(-3.2, -1.7, 2.2);
            scene.add(rimLight);

            const lowerFill = new THREE.PointLight(0x37c9ff, 1.35, 10);
            lowerFill.position.set(0.6, -3.2, 1.8);
            scene.add(lowerFill);

            const resize = () => {
                const width = Math.max(heroWorld.clientWidth, 1);
                const height = Math.max(heroWorld.clientHeight, 1);

                renderer.setPixelRatio(
                    Math.min(window.devicePixelRatio || 1, 1.5)
                );
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            };

            const render = () => {
                frameId = null;

                if (!isVisible) {
                    return;
                }

                const delta = Math.min(clock.getDelta(), 0.05);
                const elapsed = clock.elapsedTime;
                const idleTiltX = Math.sin(elapsed * 0.42) * 0.085;
                const idleTiltY = Math.sin(elapsed * 0.31) * 0.065;
                const idleDepth = Math.sin(elapsed * 0.36) * 0.09;

                if (!reducedMotion.matches) {
                    autoRotation += delta * 0.075;
                }

                globe.rotation.x = reducedMotion.matches ? 0 : idleTiltX;
                globe.rotation.y =
                    autoRotation +
                    (reducedMotion.matches ? 0 : idleTiltY);
                globe.rotation.z =
                    reducedMotion.matches ? 0 : idleTiltY * -0.18;
                globe.position.z =
                    reducedMotion.matches ? 0 : idleDepth;

                renderer.render(scene, camera);

                if (!reducedMotion.matches) {
                    frameId = requestAnimationFrame(render);
                }
            };

            const startRendering = () => {
                if (!frameId) {
                    clock.getDelta();
                    frameId = requestAnimationFrame(render);
                }
            };

            const stopRendering = () => {
                if (frameId) {
                    cancelAnimationFrame(frameId);
                    frameId = null;
                }
            };

            canvas.addEventListener(
                "webglcontextlost",
                (event) => {
                    event.preventDefault();
                    stopRendering();
                    heroWorld.classList.remove("webgl-ready");
                },
                false
            );

            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(heroWorld);

            const visibilityObserver = new IntersectionObserver(
                (entries) => {
                    isVisible = entries[0].isIntersecting;

                    if (isVisible) {
                        startRendering();
                    } else {
                        stopRendering();
                    }
                },
                { threshold: 0.02 }
            );
            visibilityObserver.observe(heroWorld);

            reducedMotion.addEventListener("change", () => {
                globe.rotation.x = 0;
                globe.rotation.z = 0;
                globe.position.z = 0;

                if (reducedMotion.matches) {
                    stopRendering();
                    renderer.render(scene, camera);
                } else if (isVisible) {
                    startRendering();
                }
            });

            resize();
            renderer.render(scene, camera);
            heroWorld.classList.add("webgl-ready");

            if (!reducedMotion.matches) {
                startRendering();
            }
        } catch (error) {
            canvas.remove();
        }
    }
}
