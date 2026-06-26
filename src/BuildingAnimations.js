import * as THREE from 'three';

export class BuildingAnimations {
  constructor(scene) {
    this.scene = scene;
    
    // Animation tracking
    this.animatingObjects = new Set();
    this.particleSystems = new Map();
    
    // Animation settings
    this.placementDuration = 800; // 0.8 seconds
    this.destructionDuration = 600; // 0.6 seconds
    this.particleLifetime = 2500; // 2.5 seconds
    
    // Particle pools for performance
    this.particlePool = [];
    this.maxPoolSize = 100;
    
    console.log('BuildingAnimations system initialized');
  }
  
  // Check if an object is currently animating
  isAnimating(object) {
    return this.animatingObjects.has(object);
  }
  
  // Play placement animation with particle effects
  playPlacementAnimation(object) {
    if (this.isAnimating(object)) {
      console.warn('Object is already animating, skipping placement animation');
      return;
    }
    
    console.log('🔨 Starting placement animation for object at:', object.position);
    
    // Mark object as animating
    this.animatingObjects.add(object);
    
    // Store original properties
    const originalScale = object.scale.clone();
    const originalPosition = object.position.clone();
    const originalRotation = object.rotation.clone();
    
    // Clone materials to avoid affecting other objects
    this.cloneMaterials(object);
    
    // Start with object smaller and higher
    object.scale.setScalar(0.1);
    object.position.y = originalPosition.y + 2.0;
    
    // Create construction particle effects
    this.createConstructionParticles(object, originalPosition);
    
    // Animate the placement
    this.animatePlacement(object, originalScale, originalPosition, originalRotation);
    
    return new Promise((resolve) => {
      // Store resolve function to call when animation completes
      object.userData.placementResolve = resolve;
    });
  }
  
  // Play destruction animation with particle effects
  playDestructionAnimation(object) {
    if (this.isAnimating(object)) {
      console.warn('Object is already animating, skipping destruction animation');
      return;
    }
    
    console.log('🗑️ Starting destruction animation for object at:', object.position);
    
    // Mark object as animating
    this.animatingObjects.add(object);
    
    // Store original properties
    const originalScale = object.scale.clone();
    const originalPosition = object.position.clone();
    const originalRotation = object.rotation.clone();
    
    // Clone materials to avoid affecting other objects
    this.cloneMaterials(object);
    
    // Create destruction particle effects
    this.createDestructionParticles(object, originalPosition);
    
    // Animate the destruction
    this.animateDestruction(object, originalScale, originalPosition, originalRotation);
    
    return new Promise((resolve) => {
      // Store resolve function to call when animation completes
      object.userData.destructionResolve = resolve;
    });
  }
  
  // Animate object placement (scale up and drop down)
  animatePlacement(object, originalScale, originalPosition, originalRotation) {
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.placementDuration, 1);
      
      // Ease-out bounce function
      const easeOutBounce = (t) => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          t -= 1.5 / 2.75;
          return 7.5625 * t * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          t -= 2.25 / 2.75;
          return 7.5625 * t * t + 0.9375;
        } else {
          t -= 2.625 / 2.75;
          return 7.5625 * t * t + 0.984375;
        }
      };
      
      const easedProgress = easeOutBounce(progress);
      
      // Animate scale from 0.1 to original
      const currentScale = 0.1 + (originalScale.x - 0.1) * easedProgress;
      object.scale.setScalar(currentScale);
      
      // Animate position (drop down)
      object.position.x = originalPosition.x;
      object.position.y = originalPosition.y + 2.0 * (1 - easedProgress);
      object.position.z = originalPosition.z;
      
      // Keep rotation unchanged
      object.rotation.copy(originalRotation);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        this.completePlacementAnimation(object, originalScale, originalPosition, originalRotation);
      }
    };
    
    animate();
  }
  
  // Animate object destruction (scale down and fade out)
  animateDestruction(object, originalScale, originalPosition, originalRotation) {
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.destructionDuration, 1);
      
      // Ease-in-out function
      const easeInOut = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
      
      const easedProgress = easeInOut(progress);
      
      // Scale down to nothing
      const currentScale = originalScale.x * (1 - easedProgress);
      object.scale.setScalar(Math.max(0.01, currentScale));
      
      // Add slight wobble while keeping original rotation
      object.rotation.x = originalRotation.x + Math.sin(progress * Math.PI * 2) * 0.05;
      object.rotation.y = originalRotation.y; // Keep Y rotation unchanged
      object.rotation.z = originalRotation.z + Math.cos(progress * Math.PI * 2) * 0.05;
      
      // Fade out materials
      this.fadeOutMaterials(object, easedProgress);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        this.completeDestructionAnimation(object);
      }
    };
    
    animate();
  }
  
  // Complete placement animation
  completePlacementAnimation(object, originalScale, originalPosition, originalRotation) {
    // Restore exact original values
    object.scale.copy(originalScale);
    object.position.copy(originalPosition);
    object.rotation.copy(originalRotation);
    
    // Remove from animating set
    this.animatingObjects.delete(object);
    
    // Clean up particle system after delay
    setTimeout(() => {
      this.cleanupParticles(object);
    }, 2000);
    
    // Resolve promise if exists
    if (object.userData.placementResolve) {
      object.userData.placementResolve();
      delete object.userData.placementResolve;
    }
    
    console.log('✓ Placement animation completed');
  }
  
  // Complete destruction animation
  completeDestructionAnimation(object) {
    // Remove from animating set
    this.animatingObjects.delete(object);
    
    // Clean up particle system after delay
    setTimeout(() => {
      this.cleanupParticles(object);
    }, 2000);
    
    // Resolve promise if exists
    if (object.userData.destructionResolve) {
      object.userData.destructionResolve();
      delete object.userData.destructionResolve;
    }
    
    console.log('✓ Destruction animation completed');
  }
  
  // Create construction particle effects (wood chips)
  createConstructionParticles(object, position) {
    const particleCount = 15;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = this.createWoodChip();
      
      // Position around the object
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.8 + Math.random() * 0.4;
      
      particle.position.set(
        position.x + Math.cos(angle) * radius,
        position.y + 0.5 + Math.random() * 0.5,
        position.z + Math.sin(angle) * radius
      );
      
      // Random rotation
      particle.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Store physics data
      particle.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          Math.random() * 2 + 1,
          (Math.random() - 0.5) * 3
        ),
        angularVelocity: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ),
        startTime: Date.now(),
        lifetime: 1500 + Math.random() * 1000
      };
      
      this.scene.add(particle);
      particles.push(particle);
    }
    
    // Store particle system
    this.particleSystems.set(object, particles);
    
    // Start particle animation
    this.animateParticles(particles);
  }
  
  // Create destruction particle effects (debris)
  createDestructionParticles(object, position) {
    const particleCount = 25;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = this.createDebris();
      
      // Position around the object with more spread
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.8;
      
      particle.position.set(
        position.x + Math.cos(angle) * radius,
        position.y + 0.3 + Math.random() * 0.8,
        position.z + Math.sin(angle) * radius
      );
      
      // Random rotation
      particle.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Store physics data with explosive velocity
      particle.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          Math.random() * 3 + 2,
          (Math.random() - 0.5) * 6
        ),
        angularVelocity: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12
        ),
        startTime: Date.now(),
        lifetime: 2000 + Math.random() * 1500
      };
      
      this.scene.add(particle);
      particles.push(particle);
    }
    
    // Store particle system
    this.particleSystems.set(object, particles);
    
    // Start particle animation
    this.animateParticles(particles);
  }
  
  // Create wood chip particle
  createWoodChip() {
    // Try to reuse from pool first
    if (this.particlePool.length > 0) {
      const particle = this.particlePool.pop();
      // Reset properties
      particle.scale.setScalar(1);
      particle.material.opacity = 1;
      particle.material.transparent = false;
      particle.visible = true;
      return particle;
    }
    
    // Create new particle
    const width = 0.08 + Math.random() * 0.04;
    const height = 0.02 + Math.random() * 0.02;
    const depth = 0.12 + Math.random() * 0.06;
    
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 0.6, 0.4 + Math.random() * 0.2)
    });
    
    const particle = new THREE.Mesh(geometry, material);
    particle.castShadow = true;
    
    return particle;
  }
  
  // Create debris particle
  createDebris() {
    // Try to reuse from pool first
    if (this.particlePool.length > 0) {
      const particle = this.particlePool.pop();
      // Reset properties
      particle.scale.setScalar(1);
      particle.material.opacity = 1;
      particle.material.transparent = false;
      particle.visible = true;
      return particle;
    }
    
    // Create new particle with varied shapes
    const debrisType = Math.random();
    let geometry, material;
    
    if (debrisType < 0.4) {
      // Rectangular chunks
      const width = 0.06 + Math.random() * 0.08;
      const height = 0.03 + Math.random() * 0.04;
      const depth = 0.08 + Math.random() * 0.10;
      geometry = new THREE.BoxGeometry(width, height, depth);
    } else if (debrisType < 0.7) {
      // Irregular chunks
      const radius = 0.04 + Math.random() * 0.06;
      geometry = new THREE.SphereGeometry(radius, 6, 4);
      geometry.scale(1 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 1 + Math.random() * 0.5);
    } else {
      // Thin splinters
      const width = 0.02 + Math.random() * 0.02;
      const height = 0.01 + Math.random() * 0.01;
      const depth = 0.15 + Math.random() * 0.10;
      geometry = new THREE.BoxGeometry(width, height, depth);
    }
    
    // Darker colors for debris
    material = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(
        0.05 + Math.random() * 0.08,
        0.4 + Math.random() * 0.4,
        0.2 + Math.random() * 0.3
      )
    });
    
    const particle = new THREE.Mesh(geometry, material);
    particle.castShadow = true;
    
    return particle;
  }
  
  // Animate particles with physics
  animateParticles(particles) {
    const animateFrame = () => {
      const currentTime = Date.now();
      let activeParticles = 0;
      
      particles.forEach(particle => {
        const elapsed = currentTime - particle.userData.startTime;
        const progress = elapsed / particle.userData.lifetime;
        
        if (progress < 1) {
          activeParticles++;
          
          // Apply physics
          const deltaTime = 0.016; // 60fps
          
          // Apply gravity
          particle.userData.velocity.y -= 9.8 * deltaTime;
          
          // Update position
          particle.position.add(
            particle.userData.velocity.clone().multiplyScalar(deltaTime)
          );
          
          // Update rotation
          particle.rotation.x += particle.userData.angularVelocity.x * deltaTime;
          particle.rotation.y += particle.userData.angularVelocity.y * deltaTime;
          particle.rotation.z += particle.userData.angularVelocity.z * deltaTime;
          
          // Fade out towards end of lifetime
          const fadeProgress = Math.max(0, (progress - 0.7) / 0.3);
          particle.material.opacity = 1 - fadeProgress;
          particle.material.transparent = fadeProgress > 0;
          
          // Ground collision
          if (particle.position.y <= 6.05) {
            particle.position.y = 6.05;
            particle.userData.velocity.y *= -0.3; // Bounce
            particle.userData.velocity.x *= 0.8; // Friction
            particle.userData.velocity.z *= 0.8;
          }
        } else {
          // Recycle expired particle
          this.recycleParticle(particle);
        }
      });
      
      // Continue animation if particles are active
      if (activeParticles > 0) {
        requestAnimationFrame(animateFrame);
      }
    };
    
    animateFrame();
  }
  
  // Clone materials to avoid affecting other objects
  cloneMaterials(object) {
    object.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map(mat => mat.clone());
        } else {
          child.material = child.material.clone();
        }
      }
    });
  }
  
  // Fade out materials during destruction
  fadeOutMaterials(object, progress) {
    object.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(material => {
          if (!material.transparent) {
            material.transparent = true;
          }
          material.opacity = 1 - progress;
        });
      }
    });
  }
  
  // Recycle particle back to pool
  recycleParticle(particle) {
    this.scene.remove(particle);
    
    // Add to pool if not full
    if (this.particlePool.length < this.maxPoolSize) {
      // Reset particle properties
      particle.visible = false;
      this.particlePool.push(particle);
    }
  }
  
  // Clean up particle systems
  cleanupParticles(object) {
    const particles = this.particleSystems.get(object);
    if (particles) {
      particles.forEach(particle => {
        this.recycleParticle(particle);
      });
      this.particleSystems.delete(object);
    }
  }
  
  // Clean up all animations and particles
  destroy() {
    // Clean up all particle systems
    this.particleSystems.forEach((particles, object) => {
      particles.forEach(particle => {
        this.scene.remove(particle);
      });
    });
    
    // Clean up particle pool
    this.particlePool.forEach(particle => {
      this.scene.remove(particle);
    });
    
    // Clear all tracking
    this.animatingObjects.clear();
    this.particleSystems.clear();
    this.particlePool = [];
    
    console.log('BuildingAnimations system destroyed');
  }
}