export default class EndGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndGameScene' });
    }
    preload() {
        this.load.audio('victorySound', '/Song/victory.mp3');
        this.load.audio('defeatSound', '/Song/loose.mp3');
        this.load.audio('laserShot', '/Song/laserX.wav');
    }
    init(data) {
        this.victory = data.victory;
        this.score = data.score || 0;
        this.enemiesEscaped = data.enemiesEscaped || 0;
        this.enemiesKilled = data.enemiesKilled || 0;
    }
    create() {
        // Fond
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.add.rectangle(500, 400, 1000, 800, 0x000000);
        if (this.victory) {
            this.victorySound = this.sound.add('victorySound', { volume: 0.6 });
            this.victorySound.play();
        } else {
            this.defeatSound = this.sound.add('defeatSound', { volume: 0.6 });
            this.defeatSound.play();
        }
        // Titre
        const titleText = this.add.text(500, 150, this.victory ? 'VICTOIRE!' : 'DEFAITE', {
            fontSize: '48px',
            fill: this.victory ? '#00ff00' : '#ff0000',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
        // Résumé
        const summaryY = 280;
        this.add.text(500, summaryY, 'RESUME DE LA PARTIE', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
        // Détails du résumé
        const detailsY = 350;
        this.add.text(500, detailsY, `Score: ${this.score}`, {
            fontSize: '20px',
            fill: '#ffff00',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);

        this.add.text(500, detailsY + 40, `Ennemis tués: ${this.enemiesKilled}`, {
            fontSize: '20px',
            fill: '#00ff00',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
        this.add.text(500, detailsY + 80, `Vaisseaux en fuite: ${this.enemiesEscaped}`, {
            fontSize: '20px',
            fill: '#ff9900',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
        // Boutons
        const buttonY = 550;
        // Bouton Rejouer
        this.replayButton = this.add.text(350, buttonY, 'REJOUER', {
            fontSize: '24px',
            fill: '#00ff00',
            fontFamily: '"Press Start 2P", Courier, monospace',
            backgroundColor: '#003300',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        // Bouton Menu Principal
        this.menuButton = this.add.text(650, buttonY, 'MENU', {
            fontSize: '24px',
            fill: '#ffff00',
            fontFamily: '"Press Start 2P", Courier, monospace',
            backgroundColor: '#333300',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        // Effets hover sur les boutons
        this.replayButton.on('pointerover', () => {
            this.replayButton.setStyle({ fill: '#ffffff', backgroundColor: '#005500' });
        });
        this.replayButton.on('pointerout', () => {
            this.replayButton.setStyle({ fill: '#00ff00', backgroundColor: '#003300' });
        });

        this.menuButton.on('pointerover', () => {
            this.menuButton.setStyle({ fill: '#ffffff', backgroundColor: '#555500' });
        });
        this.menuButton.on('pointerout', () => {
            this.menuButton.setStyle({ fill: '#ffff00', backgroundColor: '#333300' });
        });
        // Actions des boutons
        this.replayButton.on('pointerdown', () => {
            this.sound.play('laserShot', { volume: 0.3 });
            this.stopAllSounds();
            this.scene.start('GameScene');
        });
        this.menuButton.on('pointerdown', () => {
            this.sound.play('laserShot', { volume: 0.3 });
            // Arrêter les sons de victoire/défaite avant de changer de scène
            this.stopAllSounds();
            this.scene.start('MenuScene');
        });
        this.stopAllSounds = () => {
            if (this.victorySound && this.victorySound.isPlaying) {
                this.victorySound.stop();
            }
            if (this.defeatSound && this.defeatSound.isPlaying) {
                this.defeatSound.stop();
            }
        };
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.stopAllSounds();
            this.scene.start('GameScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.stopAllSounds();
            this.scene.start('MenuScene');
        }
    }
}