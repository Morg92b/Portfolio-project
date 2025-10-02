export default class UpdateScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UpdateScene' });
    }

    create() {
        // Fond semi-transparent
        this.add.rectangle(500, 400, 1000, 800, 0x000000, 0.8);
        
        // Panel principal
        const panel = this.add.rectangle(500, 400, 700, 500, 0x1a1a1a)
            .setStrokeStyle(4, 0xffe81f);

        // Titre
        this.add.text(500, 200, 'MISE À JOUR', {
            fontSize: '32px',
            fill: '#ffe81f',
            fontFamily: '"Press Start 2P", Courier, monospace',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Contenu des mises à jour
        const updateText = this.add.text(500, 380, 
            'Version 1.0.0\n\n' +
            '• Ajout du death star\n' +
            '• Ajout du double laser\n' +
            '• Equilibrage de la difficulté\n' +
            '\n'+
            'Version 1.0.1\n\n' +
            '• Optimisation de l\'affichage\n' +
            '• Des nouveautés arrive prochainement\n' +
            'Merci de jouer !', {
            fontSize: '14px',
            fill: '#ffffff',
            fontFamily: '"Press Start 2P", Courier, monospace',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Bouton retour
        const backButton = this.add.rectangle(500, 600, 200, 50, 0x000000)
            .setStrokeStyle(3, 0xffe81f)
            .setInteractive();

        const backText = this.add.text(500, 600, 'RETOUR', {
            fontSize: '12px',
            fill: '#ffe81f',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);

        // Effets bouton retour
        backButton.on('pointerover', () => {
            backButton.setFillStyle(0x222222);
            backText.setStyle({ fill: '#99badd' });
            this.sound.play('buttonHover', { volume: 0.3 });
        });

        backButton.on('pointerout', () => {
            backButton.setFillStyle(0x000000);
            backText.setStyle({ fill: '#ffe81f' });
        });

        backButton.on('pointerdown', () => {
            this.sound.play('buttonClick', { volume: 0.5 });
            this.scene.stop();
        });

        // Fermeture avec Echap
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop();
        });
    }
}