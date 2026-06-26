import * as THREE from 'three';

export class Compass {
  constructor() {
    this.compassStrip = null;
    this.compassDegrees = null;
  }
  
  initialize() {
    this.compassStrip = document.getElementById('compassStrip');
    this.compassDegrees = document.getElementById('compassDegrees');
    this.createCompassDirections();
    console.log('Linear compass initialized');
  }
  
  createCompassDirections() {
    if (!this.compassStrip) return;
    
    // Clear existing directions
    this.compassStrip.innerHTML = '';
    
    // Only show cardinal directions - simplified
    const directions = [
      { name: 'N', angle: 0 },
      { name: 'E', angle: 90 },
      { name: 'S', angle: 180 },
      { name: 'W', angle: 270 }
    ];
    
    // Create multiple sets for infinite scrolling (6 full rotations)
    for (let set = 0; set < 6; set++) {
      directions.forEach(dir => {
        const dirElement = document.createElement('div');
        dirElement.className = 'compass-direction';
        dirElement.textContent = dir.name;
        
        // Position based on angle and set
        const totalAngle = dir.angle + (set * 360);
        const position = (totalAngle / 360) * 300; // 300px per full rotation
        dirElement.style.left = `${position}px`;
        
        this.compassStrip.appendChild(dirElement);
      });
    }
  }
  
  update(camera) {
    if (!this.compassStrip || !this.compassDegrees || !camera) return;
    
    // Get camera's horizontal rotation
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    
    // Calculate angle from world north (positive Z direction) - no modulo for continuous rotation
    const angle = Math.atan2(cameraDirection.x, cameraDirection.z);
    const degrees = angle * 180 / Math.PI;
    
    // Update degree display - show actual degrees (can go beyond 360)
    this.compassDegrees.textContent = `${Math.round(degrees)}°`;
    
    // Move the strip based on camera rotation - allow continuous movement
    // Each degree = 300px/360° = 0.833px
    const stripOffset = -(degrees * 300 / 360);
    this.compassStrip.style.transform = `translateX(${stripOffset}px)`;
  }
}