export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    preload() {
        this.load.image('space2', '/Game/space2.png');
        this.load.image('space3', '/Game/space3.png');
        this.load.image('space4', '/Game/space4.png');
        this.load.image('space5', '/Game/space5.png');
        this.load.image('heart', '/Game/hearth.png');
        this.load.image('enemy1', '/Game/tiefighter.png');
        this.load.image('laserBlue', '/Game/blue_laser.png');
        this.load.image('laserRed', '/Game/red_laser.png');
        this.load.spritesheet('playerShip', '/Game/xwing.png',
            { frameWidth: 768, frameHeight: 512 });
        this.load.audio('laserShot', '/Song/laserX.wav');
        this.load.audio('enemyLaser', '/Song/laserTie.wav');
        this.load.audio('explosion', '/Song/pixelexplosion.mp3');
        this.load.audio('gameMusic', '/Song/invasion.mp3');
    }
    create() {
        this.initGame();
        this.createBackground();
        this.createPlayer();
        this.createUI();
        this.createEnemies();
        this.createAudio();
        this.setupCollisions();
    }
    initGame() {
        this.score = 0;
        this.totalEnemies = 40;
        this.enemiesKilled = 0;
        this.enemySpawnDelay = 1000;
        this.enemySpeed = -100;
        this.shootCooldown = 500;
        this.lastShootTime = 0;
        this.lives = 3;
        this.isGameOver = false;
        this.frenzyMode = false;
        this.enemiesEscaped = 0;
        this.frenzyAlert = null;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    createBackground() {
        this.bgStars = this.add.tileSprite(500, 400, 1000, 800, 'space2');
        this.planets = [
            this.add.image(200, 200, 'space3').setScale(0.3).setAngle(90),
            this.add.image(800, 300, 'space4').setScale(0.4),
            this.add.image(400, 600, 'space5').setScale(0.5)
        ];
    }
    createPlayer() {
        this.player = this.physics.add.sprite(100, 400, 'playerShip')
            .setScale(0.15).setAngle(0).setCollideWorldBounds(true);
        this.player.body.setSize(200, 200).setOffset(340, 230);
        this.player.isInvulnerable = false;
    }
    createUI() {
        // Coeurs
        this.hearts = Array.from({ length: this.lives }, (_, i) => 
            this.add.image(950 - i * 40, 30, 'heart').setScale(0.05).setScrollFactor(0)
        );
        // Score
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '20px', fill: '#ffffff', fontFamily: '"Press Start 2P", Courier, monospace'
        });
        // Compteur de fuite 
        this.escapedText = this.add.text(20, 50, 'Fuite: 0', {
            fontSize: '16px', fill: '#ff9900', fontFamily: '"Press Start 2P", Courier, monospace'
        });
        // Message d'alerte
        this.frenzyAlert = this.add.text(500, 100, 'ALERTE! SURCHARGE DES REACTEURS ENNEMIS!',{
            fontSize: '20px', fill: '#ff9900', fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5).setVisible(false);
        // Barre de progression
        this.createProgressBar();
    }
    createProgressBar() {
        this.progressBarBg = this.add.rectangle(500, 30, 400, 20, 0x000000).setStrokeStyle(2, 0xffffff);
        this.progressBar = this.add.rectangle(300, 30, 0, 16, 0x00ff00);
        this.progressText = this.add.text(500, 30, '0%', {
            fontSize: '16px', fill: '#ffffff', fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
    }
    createEnemies() {
        this.enemies = this.physics.add.group();
        this.playerLasers = this.physics.add.group();
        this.enemyLasers = this.physics.add.group();

        this.enemySpawnTimer = this.time.addEvent({
            delay: this.enemySpawnDelay,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        this.time.addEvent({
            delay: 20000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });
    }
    createAudio() {
        this.laserSound = this.sound.add('laserShot', { volume: 0.3 });
        this.enemyLaserSound = this.sound.add('enemyLaser', { volume: 0.2 });
        this.explosionSound = this.sound.add('explosion', { volume: 0.5 });
        this.gameMusic = this.sound.add('gameMusic', { volume: 0.4, loop: true });
        this.gameMusic.play();
    }
    setupCollisions() {
        this.physics.add.overlap(this.playerLasers, this.enemies, this.hitEnemy, null, this);
    }
    update() {
        if (this.isGameOver || !this.player?.active) {
            return;
        }
        this.updateBackground();
        this.updatePlayer();
        this.checkPlayerCollisions();
        this.cleanupObjects();
    }
    updateBackground() {
        this.bgStars.tilePositionX += 0.3;
        this.planets.forEach((planet, i) => {
            planet.x -= [0.5, 1, 1.5][i];
            if (planet.x < -100) planet.x = 1100;
        });
    }
    updatePlayer() {
        const { up, down } = this.cursors;
        this.player.setVelocityY(up.isDown ? -300 : down.isDown ? 300 : 0);
        const now = this.time.now;
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && now > this.lastShootTime + this.shootCooldown) {
            this.playerShoot();
            this.lastShootTime = now;
        }
    }
    checkPlayerCollisions() {
        if (this.player.isInvulnerable) return;
        [this.enemyLasers, this.enemies].forEach((group, index) => {
            group.getChildren().forEach(obj => {
                if (obj.active && this.checkCollision(this.player, obj)) {
                    obj.destroy();
                    if (index === 1) this.createExplosion(obj.x, obj.y);
                    this.playerDamaged();
                }
            });
        });
    }
    checkCollision(obj1, obj2) {
        const b1 = obj1.body, b2 = obj2.body;
        return Phaser.Geom.Rectangle.Overlaps(
            new Phaser.Geom.Rectangle(b1.x + b1.halfWidth, b1.y + b1.halfHeight, b1.width, b1.height),
            new Phaser.Geom.Rectangle(b2.x + b2.halfWidth, b2.y + b2.halfHeight, b2.width, b2.height)
        );
    }
    cleanupObjects() {
        [this.playerLasers, this.enemyLasers, this.enemies].forEach((group, index) => {
            const condition = index === 2 ? (obj => {
                if (obj.x < -100) {
                    obj.destroy();
                    this.enemiesEscaped++;
                    this.escapedText.setText('Fuite: ' + this.enemiesEscaped);
                    this.updateScore(-50);
                }
            }) : (obj => (obj.x > 1100 || obj.x < -100) && obj.destroy());
            group.getChildren().forEach(condition);
        });
    }
    playerShoot() {
        this.playerLasers.create(this.player.x + 50, this.player.y, 'laserBlue')
            .setScale(0.1).setVelocityX(400);
        this.laserSound.play();
    }
    spawnEnemy() {
        if (this.enemiesKilled >= this.totalEnemies) return;
        const enemy = this.enemies.create(1100, Phaser.Math.Between(100, 700), 'enemy1')
            .setScale(0.1).setAngle(180).setVelocityX(this.enemySpeed);
        const firstShootDelay = this.frenzyMode ? 
            Phaser.Math.Between(500, 1000) :   // 0.5 à 1 seconde
            Phaser.Math.Between(1000, 3000);   // 1 à 3 secondes
        this.time.delayedCall(firstShootDelay, () => {
            if (enemy.active) this.enemyShoot(enemy);
        });
    }
    enemyShoot(enemy) {
        this.enemyLasers.create(enemy.x - 30, enemy.y, 'laserRed')
            .setScale(0.1).setVelocityX(-300);
            this.enemyLaserSound.play();
        if (this.frenzyMode && enemy.active) {
            const nextShootDelay = Phaser.Math.Between(1000, 1400); // 0.6 à 1.2 secondes
            this.time.delayedCall(nextShootDelay, () => {
                if (enemy.active) this.enemyShoot(enemy);
            });
        }
    }
    hitEnemy(laser, enemy) {
        laser.destroy();
        enemy.destroy();
        this.explosionSound.play();
        this.enemiesKilled++;
        this.updateProgressBar();
        this.updateScore(100);
        this.createExplosion(enemy.x, enemy.y);
    }
    playerDamaged() {
        if (!this.player?.active || this.player.isInvulnerable || this.lives <= 0) return;

        this.player.setTint(0xff0000);
        this.player.isInvulnerable = true;
        this.lives--;
        this.hearts[this.lives]?.setVisible(false);

        if (this.lives <= 0) {
            this.tweens.killTweensOf(this.player);
            this.player.setVisible(false).setActive(false);
            this.createExplosion(this.player.x, this.player.y, true);
            this.explosionSound.play();
            this.time.delayedCall(800, () => {
                this.player?.destroy();
                this.gameOver();
            });
        } else {
            this.tweens.add({
                targets: this.player,
                alpha: 0.3, duration: 200, yoyo: true, repeat: 5,
                onComplete: () => {
                    if (this.player) {
                        this.player.setAlpha(1).clearTint();
                        this.player.isInvulnerable = false;
                    }
                }
            });
        }
    }
    createExplosion(x, y, isPlayer = false) {
        const size = isPlayer ? 20 : 10;
        const scale = isPlayer ? 4 : 2;
        const duration = isPlayer ? 500 : 300;
        
        const explosion = this.add.circle(x, y, size, 0xff0000).setAlpha(isPlayer ? 0.9 : 0.8);
        this.tweens.add({
            targets: explosion, scale, alpha: 0, duration,
            onComplete: () => explosion.destroy()
        });
        
        if (isPlayer) this.explosionSound.play();
    }
    updateProgressBar() {
        const progress = (this.enemiesKilled / this.totalEnemies) * 100;
        this.progressBar.width = (progress / 100) * 400;
        this.progressText.setText(`${Math.round(progress)}%`);
        const enemiesLeft = this.totalEnemies - this.enemiesKilled;
        if (enemiesLeft <= 5 && !this.frenzyMode) {
            this.frenzyMode = true;
            this.activateFrenzyAlert();
            console.log('Mode frénésie activé ! Les ennemis tirent plus vite !');
        }
        if (progress >= 100) this.progressToBoss();
    }
    progressToBoss() {
        this.enemySpawnTimer.destroy();
        this.gameMusic.stop();
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => this.scene.start('BossScene'));
    }
    updateScore(points) {
        this.score = Math.max(0, this.score + points);
        this.scoreText.setText('Score: ' + this.score);
    }
    activateFrenzyAlert() {
        this.frenzyAlert.setVisible(true);
        
        this.tweens.add({
            targets: this.frenzyAlert,
            alpha: 0.3,
            duration: 200,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.frenzyAlert.setVisible(false);
            }
        });
    }
    increaseDifficulty() {
        if (this.enemySpawnDelay > 400) {
            this.enemySpawnDelay -= 100;
            this.enemySpawnTimer.reset({ delay: this.enemySpawnDelay, callback: this.spawnEnemy, callbackScope: this, loop: true });
        }
        this.enemySpeed -= 20;
        this.shootCooldown = Math.min(this.shootCooldown + 100, 1000);
    }
    gameOver() {
        this.isGameOver = true;
        this.gameMusic.stop();
        this.scene.start('GameOverScene', { victory: false });
    }
    shutdown() {
        this.gameMusic?.stop();
    }
}