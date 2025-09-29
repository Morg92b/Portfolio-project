export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('space2', 'src/assets/Game/space2.png');
        this.load.image('space3', 'src/assets/Game/space3.png');
        this.load.image('space4', 'src/assets/Game/space4.png');
        this.load.image('space5', 'src/assets/Game/space5.png');
        this.load.image('deathstar', 'src/assets/Game/deathstar.png');

        // === VAISSEAU EN SPRITE ===
        this.load.spritesheet('playerShip', 'src/assets/xwing.png', {
            frameWidth: 768,
            frameHeight: 512,
        });
    }

    create() {
        // === FOND QUI DEFILE ===
        this.bgStars = this.add.tileSprite(500, 400, 1000, 800, 'space2');

        // === Etoile de la mort ===
        this.deathStar = this.add.image(900, 50, 'deathstar')
            .setScale(0.10)
        // === PLANÈTES EN IMAGES NORMALES ===
        this.planet1 = this.add.image(200, 200, 'space3')
        .setScale(0.3)
        .setAngle(90);
        this.planet2 = this.add.image(800, 300, 'space4').setScale(0.4);
        this.planet3 = this.add.image(400, 600, 'space5').setScale(0.5);
        
        // === VAISSEAU JOUEUR QUI DEFILE ===
        this.playerShip = this.add.sprite(-100, 450, 'playerShip')
            .setScale(0.2)

        // Animation du vaisseau qui traverse l'écran
        this.tweens.add({
            targets: this.playerShip,
            x: 1100,
            duration: 4000,
            ease: 'Linear',
            repeat: -1
        });
        
        // === TITRE ===
        this.createPixelTitle();
        // === SOUS-TITRE ===
        this.createPixelUnderTitle();

        // === BOUTON JOUER ===
        const playButton = this.add.rectangle(500, 350, 240, 60, 0x000000)
        .setStrokeStyle(4, 0xffe81f) // bordure jaune pixel style
        .setInteractive();
        // Texte en police pixel (Press Start 2P)
        const playText = this.add.text(500, 350, 'ENGAGER LE COMBAT', {
            fontSize: '12px',
            fill: '#ffe81f',
            fontFamily: '"Press Start 2P", Courier, monospace',
            stroke: '#000000',
            strokeThickness: 4,
            resolution: 2
        }).setOrigin(0.5);
    
    // Effet hover façon pixel arcade
    playButton.on('pointerover', () => {
        playButton.setFillStyle(0x222222);
        playText.setStyle({ fill: '#99badd' });
        playText.setScale(1.1);
    });
    
    playButton.on('pointerout', () => {
        playButton.setFillStyle(0x000000);
        playText.setStyle({ fill: '#ffe81f' });
        playText.setScale(1.0);
    });
    
    // Clic sur le bouton
    playButton.on('pointerdown', () => {
        this.cameras.main.shake(200, 0.01); // petit effet arcade
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
            this.scene.start('GameScene');
        });
    });
    

        // === INSTRUCTIONS ===
        this.add.text(500, 600, 'Utilise les flèches pour te déplacer et ESPACE pour tirer', {
            fontSize: '14px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);

        // === CREDITS ===
        this.add.text(500, 750, 'Morgan Bouaziz ©2025', {
            fontSize: '12px',
            fill: '#666666'
        }).setOrigin(0.5);
    }
    // === TITRE ===
    createPixelTitle() {
        const title = this.add.text(500, 150, 'X-WING DEFENDER', {
            fontSize: '42px',
            fill: '#ffe81f',
            fontFamily: '"Press Start 2P", Courier, monospace',
            stroke: '#8b4513',
            strokeThickness: 6,
            letterSpacing: 3
        }).setOrigin(0.5);
    }

    createPixelUnderTitle() {
        const title = this.add.text(500, 200, 'Protège la galaxie contre l\'Empire', {
            fontSize: '14px',
            fill: '#99badd',
            fontFamily: '"Press Start 2P", Courier, monospace',
            stroke: '#137d8bff',
            strokeThickness: 6,
            letterSpacing: 3
        }).setOrigin(0.5);
    }

    update() {

        this.bgStars.tilePositionX += 0.3;
        
        this.planet1.x -= 0.5;
        this.planet2.x -= 1;
        this.planet3.x -= 1.5;

        this.deathStar.x -= 0.1;
        
        if (this.planet1.x < -100) this.planet1.x = 1100;
        if (this.planet2.x < -100) this.planet2.x = 1100;
        if (this.planet3.x < -100) this.planet3.x = 1100;
    }
}