import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float uHover;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Rotación y elevación 3D suave basada en uHover
  pos.z += sin(pos.x * 3.14) * 0.1 * uHover;
  pos.z += cos(pos.y * 3.14) * 0.1 * uHover;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uHover;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uTime;
uniform vec2 uScale;
uniform vec2 uOffset;
varying vec2 vUv;

// Simplex 3D Noise by Ian McEwan, Ashima Arts
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise3(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  // Ajuste de UV para object-fit: cover y object-position: top
  vec2 uv = vUv * uScale + uOffset;
  
  // Generación de ruido orgánico
  float noise = snoise3(vec3(vUv * 4.0, uTime * 0.4));
  
  // Deformar las coordenadas UV de forma fluida basándonos en el ruido y el uHover
  vec2 distortedUv1 = uv + noise * 0.1 * uHover;
  vec2 distortedUv2 = uv - noise * 0.1 * (1.0 - uHover);
  
  // Muestrear las texturas
  vec4 color1 = texture2D(uTexture1, distortedUv1);
  vec4 color2 = texture2D(uTexture2, distortedUv2);
  
  // Transición suave entre las dos imágenes usando smoothstep y noise
  float mixValue = smoothstep(0.0, 1.0, uHover + noise * 0.2 * uHover);
  
  gl_FragColor = mix(color1, color2, clamp(mixValue, 0.0, 1.0));
}
`;

export default function ImageDisplacement({ imageSrc, hoverImageSrc }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let targetHover = 0;
    let currentHover = 0;
    
    // Ocultar imagen estática original debajo para que no haya duplicados
    const prevImg = container.previousElementSibling;
    if (prevImg && prevImg.tagName === 'IMG') {
        prevImg.style.opacity = '0';
        prevImg.style.transition = 'opacity 0.3s ease';
    }
    
    // Escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Configurar Geometría y Material Shader
    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uHover: { value: 0 },
        uTime: { value: 0 },
        uTexture1: { value: null },
        uTexture2: { value: null },
        uScale: { value: new THREE.Vector2(1, 1) },
        uOffset: { value: new THREE.Vector2(0, 0) }
      },
      transparent: true,
    });
    
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Lógica para calcular aspect ratio simulando object-fit: cover, object-position: top
    const calculateUV = (image) => {
        if (!image || !container.clientWidth) return;
        const imgAspect = image.width / image.height;
        const contAspect = container.clientWidth / container.clientHeight;
        
        let scaleX = 1;
        let scaleY = 1;
        let offsetX = 0;
        let offsetY = 0;
        
        if (contAspect > imgAspect) {
            // Container wider than image
            scaleY = contAspect / imgAspect;
            offsetY = 1.0 - scaleY; // Object-position: top equivalent
        } else {
            // Container taller than image
            scaleX = imgAspect / contAspect;
            offsetX = (1.0 - scaleX) * 0.5; // Object-position: center horizontally
        }
        
        material.uniforms.uScale.value.set(scaleX, scaleY);
        material.uniforms.uOffset.value.set(offsetX, offsetY);
    };

    // Cargar las texturas
    const textureLoader = new THREE.TextureLoader();
    const texture1 = textureLoader.load(imageSrc, (tex) => {
        calculateUV(tex.image);
    });
    const texture2 = hoverImageSrc ? textureLoader.load(hoverImageSrc) : texture1;
    
    material.uniforms.uTexture1.value = texture1;
    material.uniforms.uTexture2.value = texture2;

    // Resize
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      if (texture1.image) {
          calculateUV(texture1.image);
      }
    };
    window.addEventListener('resize', handleResize);

    // Eventos de Hover
    const handleMouseEnter = () => targetHover = 1;
    const handleMouseLeave = () => targetHover = 0;
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Bucle de Animación
    let animationFrameId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Interpolación lineal (lerp) para suavizar la transición de hover
      currentHover += (targetHover - currentHover) * 0.08;
      
      // Actualizar Uniforms
      material.uniforms.uHover.value = currentHover;
      material.uniforms.uTime.value = elapsedTime;
      
      // Pequeña rotación 3D del plano entero en función del hover
      plane.rotation.x = currentHover * 0.1 * Math.sin(elapsedTime * 0.5);
      plane.rotation.y = currentHover * 0.1 * Math.cos(elapsedTime * 0.5);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();

    // Limpieza estricta de recursos para evitar fugas de memoria
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      cancelAnimationFrame(animationFrameId);
      
      // Restore previous img opacity if unmounting
      if (prevImg && prevImg.tagName === 'IMG') {
          prevImg.style.opacity = '1';
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      texture1.dispose();
      if (texture2 !== texture1) texture2.dispose();
      renderer.dispose();
    };
  }, [imageSrc, hoverImageSrc]);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'auto', // Permite que capture el hover
        cursor: 'pointer',
        borderRadius: 'inherit' // Hereda el border-radius de la imagen subyacente si lo tiene
      }}
    />
  );
}
