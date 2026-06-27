export class HealthSystem {
  maxHealth: number;
  currentHealth: number;
  hearts: HTMLElement[];

  constructor() {
    this.maxHealth = 5;
    this.currentHealth = 5;
    this.hearts = [];
    this.initializeHearts();
  }

  initializeHearts(): void {
    // Get all heart elements
    for (let i = 1; i <= this.maxHealth; i++) {
      const heartElement = document.getElementById(`heart${i}`);
      if (heartElement) {
        this.hearts.push(heartElement);
      }
    }

    this.updateHeartsDisplay();
    console.log('Health system initialized with', this.maxHealth, 'hearts');
  }

  updateHeartsDisplay(): void {
    this.hearts.forEach((heart, index) => {
      if (index < this.currentHealth) {
        heart.classList.remove('empty');
      } else {
        heart.classList.add('empty');
      }
    });
  }

  takeDamage(amount = 1): number {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    this.updateHeartsDisplay();

    console.log(`Took ${amount} damage. Health: ${this.currentHealth}/${this.maxHealth}`);

    if (this.currentHealth <= 0) {
      this.onDeath();
    }

    return this.currentHealth;
  }

  heal(amount = 1): number {
    const oldHealth = this.currentHealth;
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    this.updateHeartsDisplay();

    const healedAmount = this.currentHealth - oldHealth;
    if (healedAmount > 0) {
      console.log(`Healed ${healedAmount} health. Health: ${this.currentHealth}/${this.maxHealth}`);
      this.showHealEffect();
    }

    return healedAmount;
  }

  showHealEffect(): void {
    // Add a brief green glow effect to hearts
    this.hearts.forEach((heart, index) => {
      if (index < this.currentHealth) {
        heart.style.filter = 'drop-shadow(0 0 10px #4CAF50) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))';

        // Remove the effect after 500ms
        setTimeout(() => {
          heart.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))';
        }, 500);
      }
    });
  }

  onDeath(): void {
    console.log('Player died!');
    // Could implement respawn logic here
  }

  isFullHealth(): boolean {
    return this.currentHealth >= this.maxHealth;
  }

  getCurrentHealth(): number {
    return this.currentHealth;
  }

  getMaxHealth(): number {
    return this.maxHealth;
  }
}
