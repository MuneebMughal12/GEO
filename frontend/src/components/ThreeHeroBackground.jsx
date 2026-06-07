import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHeroBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect mobile viewport for performance scaling
    const isMobile = window.innerWidth < 768;
    const boxCount = isMobile ? 15 : 45; // Down-scale elements on mobile
    const lineCount = isMobile ? 8 : 20;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Geometry Group
    const group = new THREE.Group();
    scene.add(group);

    const material = new THREE.MeshPhongMaterial({
      color: 0x002366,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    // Seed boxes
    for (let i = 0; i < boxCount; i++) {
      const size = Math.random() * 2 + 0.5;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);
    }

    // Connective lines
    const points = [];
    for (let i = 0; i < lineCount; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.15
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(1, 1, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 25;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.y += 0.0015;
      group.rotation.x += 0.0008;
      line.rotation.y -= 0.0008;
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

export default ThreeHeroBackground;
