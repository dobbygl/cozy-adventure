import * as THREE from 'three';

export class CollisionSystem {
  constructor(scene) {
    this.scene = scene;
    this.colliders = [];
    this.raycaster = new THREE.Raycaster();
    this.debugVisualization = [];
    this.debugVisible = false;
    this.playerColliderVisualization = null;
    this.playerMesh = null;
    
    // Raycasting settings
    this.rayDistance = 50;
    this.rayOriginOffset = 0.5;
  }

  // Add a collider to the system
  addCollider(mesh, type = 'ground', options = {}) {
    if (!mesh) {
      console.warn('Cannot add null mesh as collider');
      return;
    }
    const collider = {
      mesh: mesh,
      type: type,
      boundingBox: new THREE.Box3().setFromObject(mesh),
      name: mesh.name || options.name || 'unnamed',
      buildingType: options.buildingType || null, // Track building type for step detection
      isNewlyBuilt: options.isNewlyBuilt || false // Flag for newly built structures
    };
    this.colliders.push(collider);
    console.log(`Added collider: ${collider.name} (${collider.type})${collider.isNewlyBuilt ? ' [NEWLY BUILT]' : ''}`);
    
    // If this is a newly built structure, update the bounding box immediately
    if (collider.isNewlyBuilt) {
      this.updateColliderBoundingBox(collider);
    }
    
    return collider;
  }

  // Remove a collider from the system
  removeCollider(mesh) {
    const index = this.colliders.findIndex(c => c.mesh === mesh);
    if (index !== -1) {
      this.colliders.splice(index, 1);
      console.log(`Removed collider: ${mesh.name || 'unnamed'}`);
    }
  }

  // Set player mesh reference for collision detection
  setPlayerMesh(playerMesh) {
    this.playerMesh = playerMesh;
    console.log('Player mesh set for collision system');
  }

  // Check ground collision using raycasting
  checkGroundCollision(position, characterHeight = 2.0, rayOffset = 0.1) {
    if (this.colliders.length === 0) {
      return {
        hasCollision: false,
        groundHeight: null,
        distance: Infinity,
        normal: new THREE.Vector3(0, 1, 0),
        collider: null
      };
    }

    // Create ray from character position downward
    const rayOrigin = new THREE.Vector3(
      position.x,
      position.y + rayOffset,
      position.z
    );
    
    const rayDirection = new THREE.Vector3(0, -1, 0);
    this.raycaster.set(rayOrigin, rayDirection);

    // Collect all meshes to test against
    const meshesToTest = [];
    
    for (const collider of this.colliders) {
      if (collider.type === 'ground') {
        // For ground colliders, add all mesh children for accurate ground detection
        collider.mesh.traverse((child) => {
          if (child.isMesh && child.geometry) {
            meshesToTest.push(child);
          }
        });
      } else if (collider.type === 'mesh') {
        // For wall/building colliders, only add the root mesh to avoid internal collision issues
        if (collider.mesh.isMesh && collider.mesh.geometry) {
          meshesToTest.push(collider.mesh);
        }
      }
    }

    // Perform raycasting
    const intersections = this.raycaster.intersectObjects(meshesToTest);
    
    if (intersections.length > 0) {
      // Get the closest intersection
      const closestHit = intersections[0];
      
      return {
        hasCollision: true,
        groundHeight: closestHit.point.y,
        distance: closestHit.distance,
        normal: closestHit.face ? closestHit.face.normal.clone() : new THREE.Vector3(0, 1, 0),
        collider: this.colliders.find(c => c.mesh.traverse(child => child === closestHit.object))
      };
    }

    return {
      hasCollision: false,
      groundHeight: null,
      distance: Infinity,
      normal: new THREE.Vector3(0, 1, 0),
      collider: null
    };
  }
  // Check horizontal collision (for walls and obstacles)
  checkHorizontalCollision(position, velocity, characterRadius = 0.5) {
    if (this.colliders.length === 0 || velocity.lengthSq() === 0) {
      return {
        hasCollision: false,
        correctedPosition: position.clone(),
        normal: new THREE.Vector3()
      };
    }
    const originalPosition = position.clone();
    const newPosition = position.clone().add(velocity);
    
    let hasCollision = false;
    let correctedPosition = newPosition.clone();
    let collisionNormal = new THREE.Vector3();
    
    // Test collision with all mesh-type colliders (walls and trees)
    for (const collider of this.colliders) {
      if (collider.type !== 'mesh') continue;
      
      // Check if this is a tree collider (cylindrical)
      if (collider.name && collider.name.includes('treeCollider')) {
        // Handle cylindrical tree collision with dynamic values
        const treeCenter = collider.mesh.position.clone();
        
        // Get radius and height from collider userData (set during creation)
        const treeRadius = collider.mesh.userData.trunkRadius || 0.8;
        const treeHeight = collider.mesh.userData.trunkHeight || 2.0;
        
        // Check if character is within the tree's height range
        const characterBottom = newPosition.y - 1.0;
        const characterTop = newPosition.y + 1.0;
        const treeBottom = treeCenter.y - (treeHeight * 0.5);
        const treeTop = treeCenter.y + (treeHeight * 0.5);
        
        // Only check horizontal collision if character overlaps with tree height
        if (characterTop > treeBottom && characterBottom < treeTop) {
          // Calculate horizontal distance from character to tree center
          const horizontalDistance = Math.sqrt(
            Math.pow(newPosition.x - treeCenter.x, 2) + 
            Math.pow(newPosition.z - treeCenter.z, 2)
          );
          
          // Check if collision occurs (character radius + tree radius)
          const collisionDistance = characterRadius + treeRadius;
          if (horizontalDistance < collisionDistance) {
            hasCollision = true;
            
            // Calculate collision response
            const penetrationDepth = collisionDistance - horizontalDistance;
            
            // Calculate direction to push character away from tree center
            const pushDirection = new THREE.Vector3(
              newPosition.x - treeCenter.x,
              0,
              newPosition.z - treeCenter.z
            );
            
            // Handle case where character is exactly at tree center
            if (pushDirection.lengthSq() === 0) {
              pushDirection.set(1, 0, 0); // Default push direction
            }
            
            pushDirection.normalize();
            
            // Apply collision correction
            correctedPosition.x = treeCenter.x + pushDirection.x * collisionDistance;
            correctedPosition.z = treeCenter.z + pushDirection.z * collisionDistance;
            
            // Set collision normal
            collisionNormal.add(pushDirection);
          }
        }
      } else {
        // Handle rectangular wall collision (existing code for buildings/walls)
        collider.boundingBox.setFromObject(collider.mesh);
        
        // Create character collision cylinder
        const characterBox = new THREE.Box3(
          new THREE.Vector3(
            newPosition.x - characterRadius,
            newPosition.y - 1.0,
            newPosition.z - characterRadius
          ),
          new THREE.Vector3(
            newPosition.x + characterRadius,
            newPosition.y + 1.0,
            newPosition.z + characterRadius
          )
        );
        
        // Only check collision if the bounding boxes actually intersect
        if (characterBox.intersectsBox(collider.boundingBox)) {
          hasCollision = true;
          
          // Get wall properties for collision resolution
          const wallCenter = collider.boundingBox.getCenter(new THREE.Vector3());
          const wallSize = collider.boundingBox.getSize(new THREE.Vector3());
          
          // Calculate overlap amounts on each axis
          const overlapX = Math.max(0, (characterRadius + wallSize.x * 0.5) - Math.abs(newPosition.x - wallCenter.x));
          const overlapZ = Math.max(0, (characterRadius + wallSize.z * 0.5) - Math.abs(newPosition.z - wallCenter.z));
          
          // Only apply correction if there's actual overlap
          if (overlapX > 0.01 || overlapZ > 0.01) {
            // Choose the axis with minimum penetration for natural sliding
            if (overlapX < overlapZ && overlapX > 0.01) {
              // Push out along X-axis
              const direction = newPosition.x > wallCenter.x ? 1 : -1;
              const correctedX = wallCenter.x + direction * (wallSize.x * 0.5 + characterRadius + 0.02);
              
              // Safety check to prevent teleportation
              if (Math.abs(correctedX - originalPosition.x) < 3.0) {
                correctedPosition.x = correctedX;
              } else {
                correctedPosition.x = originalPosition.x;
              }
            } else if (overlapZ > 0.01) {
              // Push out along Z-axis
              const direction = newPosition.z > wallCenter.z ? 1 : -1;
              const correctedZ = wallCenter.z + direction * (wallSize.z * 0.5 + characterRadius + 0.02);
              
              // Safety check to prevent teleportation
              if (Math.abs(correctedZ - originalPosition.z) < 3.0) {
                correctedPosition.z = correctedZ;
              } else {
                correctedPosition.z = originalPosition.z;
              }
            }
          }
          
          // Calculate collision normal for sliding behavior
          const toCharacter = newPosition.clone().sub(wallCenter);
          toCharacter.y = 0; // Only horizontal collision
          if (toCharacter.lengthSq() > 0) {
            toCharacter.normalize();
            collisionNormal.add(toCharacter);
          }
        }
      }
    }
    // Normalize collision normal if we had collisions
    if (hasCollision && collisionNormal.lengthSq() > 0) {
      collisionNormal.normalize();
    }
    return {
      hasCollision: hasCollision,
      correctedPosition: correctedPosition,
      normal: collisionNormal
    };
  }
  // Check if a sphere intersects with any colliders
  checkSphereCollision(center, radius) {
    const collisions = [];
    
    for (const collider of this.colliders) {
      // Simple bounding box check first
      const sphere = new THREE.Sphere(center, radius);
      if (sphere.intersectsBox(collider.boundingBox)) {
        collisions.push({
          collider: collider,
          penetration: radius - center.distanceTo(collider.boundingBox.getCenter(new THREE.Vector3()))
        });
      }
    }
    
    return collisions;
  }

  // Update all collider bounding boxes
  updateColliders() {
    for (const collider of this.colliders) {
      this.updateColliderBoundingBox(collider);
    }
  }
  
  // Update a specific collider's bounding box
  updateColliderBoundingBox(collider) {
    if (collider && collider.mesh) {
      collider.boundingBox.setFromObject(collider.mesh);
      
      // Clear the newly built flag after the first update
      if (collider.isNewlyBuilt) {
        collider.isNewlyBuilt = false;
        console.log(`Updated bounding box for newly built collider: ${collider.name}`);
      }
    }
  }
  
  // Add a building structure collider with immediate registration
  addBuildingCollider(mesh, buildingType, position) {
    if (!mesh) {
      console.warn('Cannot add null building mesh as collider');
      return;
    }
    
    // Ensure mesh has proper world matrix updates
    mesh.updateMatrixWorld(true);
    
    const collider = this.addCollider(mesh, 'mesh', {
      name: `${buildingType}_${Date.now()}`,
      buildingType: buildingType,
      isNewlyBuilt: true
    });
    
    // Force immediate geometry and bounds update for step detection
    if (collider) {
      // Update geometry if needed
      if (mesh.geometry) {
        mesh.geometry.computeBoundingBox();
        mesh.geometry.computeBoundingSphere();
      }
      
      // Update world matrix and bounding box
      mesh.updateMatrixWorld(true);
      this.updateColliderBoundingBox(collider);
      
      console.log(`Building collider registered for step detection: ${buildingType} at (${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)})`);
    }
    
    return collider;
  }

  // Debug visualization methods
  toggleDebugVisualization() {
    this.debugVisible = !this.debugVisible;
    
    if (this.debugVisible) {
      this.showDebugVisualization();
      this.showPlayerColliderVisualization();
    } else {
      this.hideDebugVisualization();
      this.hidePlayerColliderVisualization();
    }
    
    console.log(`Collision debug visualization: ${this.debugVisible ? 'ON' : 'OFF'}`);
  }

  showDebugVisualization() {
    this.hideDebugVisualization(); // Clear existing
    
    console.log(`Creating debug visualization for ${this.colliders.length} colliders`);
    
    this.colliders.forEach((collider, index) => {
      const debugGroup = new THREE.Group();
      debugGroup.name = `debugCollider_${index}`;
      
      // Create wireframe for the collider
      const wireframeColor = collider.type === 'ground' ? 0xff0000 : 0x00ff00;
      
      // Handle single mesh colliders (like tree colliders)
      if (collider.mesh.isMesh && collider.mesh.geometry) {
        const wireframeGeometry = new THREE.WireframeGeometry(collider.mesh.geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ 
          color: wireframeColor,
          transparent: true,
          opacity: 0.8
        });
        
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        wireframe.position.copy(collider.mesh.position);
        wireframe.rotation.copy(collider.mesh.rotation);
        wireframe.scale.copy(collider.mesh.scale);
        
        debugGroup.add(wireframe);
      } else {
        // Handle complex meshes with children
        collider.mesh.traverse((child) => {
          if (child.isMesh && child.geometry) {
            const wireframeGeometry = new THREE.WireframeGeometry(child.geometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ 
              color: wireframeColor,
              transparent: true,
              opacity: 0.8
            });
            
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            
            // Get world position and transform
            const worldPosition = new THREE.Vector3();
            const worldRotation = new THREE.Quaternion();
            const worldScale = new THREE.Vector3();
            child.getWorldPosition(worldPosition);
            child.getWorldQuaternion(worldRotation);
            child.getWorldScale(worldScale);
            
            wireframe.position.copy(worldPosition);
            wireframe.setRotationFromQuaternion(worldRotation);
            wireframe.scale.copy(worldScale);
            
            debugGroup.add(wireframe);
          }
        });
      }
      
      // Add bounding box helper
      const bboxHelper = new THREE.Box3Helper(collider.boundingBox, 0xffff00);
      debugGroup.add(bboxHelper);
      
      this.debugVisualization.push(debugGroup);
      this.scene.add(debugGroup);
      
      console.log(`Added debug visualization for ${collider.name}`);
    });
  }

  hideDebugVisualization() {
    this.debugVisualization.forEach(debugGroup => {
      this.scene.remove(debugGroup);
    });
    this.debugVisualization = [];
  }

  showPlayerColliderVisualization() {
    if (!this.playerMesh) {
      console.log('No player mesh set for collider visualization');
      return;
    }
    
    this.hidePlayerColliderVisualization();
    
    // Create player collider visualization (capsule-like)
    const playerColliderGroup = new THREE.Group();
    playerColliderGroup.name = 'playerColliderDebug';
    
    // Main body cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2.0, 12);
    const cylinderMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.y = 1.0;
    playerColliderGroup.add(cylinderMesh);
    
    // Top sphere (head)
    const topSphereGeometry = new THREE.SphereGeometry(0.5, 12, 8);
    const topSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const topSphereMesh = new THREE.Mesh(topSphereGeometry, topSphereMaterial);
    topSphereMesh.position.y = 2.0;
    playerColliderGroup.add(topSphereMesh);
    
    // Bottom sphere (feet)
    const bottomSphereMesh = new THREE.Mesh(topSphereGeometry, topSphereMaterial);
    bottomSphereMesh.position.y = 0.0;
    playerColliderGroup.add(bottomSphereMesh);
    
    this.playerColliderVisualization = playerColliderGroup;
    this.scene.add(playerColliderGroup);
    
    console.log('Added player collider visualization');
  }

  hidePlayerColliderVisualization() {
    if (this.playerColliderVisualization) {
      this.scene.remove(this.playerColliderVisualization);
      this.playerColliderVisualization = null;
    }
  }

  updatePlayerColliderVisualization() {
    if (this.playerColliderVisualization && this.playerMesh) {
      this.playerColliderVisualization.position.copy(this.playerMesh.position);
      this.playerColliderVisualization.rotation.copy(this.playerMesh.rotation);
    }
  }

  // Create a debug ray visualization
  visualizeRay(origin, direction, distance = 10, color = 0xff0000) {
    // Remove existing ray
    const existingRay = this.scene.getObjectByName('debugRay');
    if (existingRay) {
      this.scene.remove(existingRay);
    }
    
    // Create new ray
    const rayEnd = origin.clone().add(direction.clone().multiplyScalar(distance));
    const points = [origin, rayEnd];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: color });
    const line = new THREE.Line(geometry, material);
    line.name = 'debugRay';
    
    this.scene.add(line);
  }

  // Clean up the collision system
  destroy() {
    this.hideDebugVisualization();
    this.hidePlayerColliderVisualization();
    this.colliders = [];
    console.log('Collision system destroyed');
  }
}