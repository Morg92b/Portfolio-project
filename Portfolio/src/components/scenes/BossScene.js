export default class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BossScene' });
    }
    init(data) {
        console.log('Data reçue dans BossScene:', data);
        this.score = data.score || 0;
        this.lives = data.lives || 3;
        this.enemiesEscaped = data.enemiesEscaped || 0;
        this.enemiesKilled = data.enemiesKilled || 0;
    }
    preload() {
        this.load.image('space2', '/Game/space2.png');
        this.load.image('deathStar', '/Game/deathstar.png');
        this.load.image('enemy1', '/Game/tiefighter.png');
        this.load.image('heart', '/Game/hearth.png');
        this.load.image('laserBlue', '/Game/blue_laser.png');
        this.load.image('laserRed', '/Game/red_laser.png');
        this.load.image('laserGreen', '/Game/green_laser.png');
        this.load.spritesheet('playerShip', '/Game/xwing.png',
            { frameWidth: 768, frameHeight: 512 });
        this.load.audio('laserShot', '/Song/laserX.wav');
        this.load.audio('enemyLaser', '/Song/laserTie.wav');
        this.load.audio('explosion', '/Song/pixelexplosion.mp3');
        this.load.audio('bossMusic', '/Song/march.mp3');
        this.load.audio('bossDefeated', '/Song/chewieclick.mp3');
        this.load.audio('bossLaser', '/Song/laserTie.wav');
    }
    create() {
        console.log('BossScene créée avec score:', this.score, 'vies:', this.lives, 'fuite:', this.enemiesEscaped); // Debug
        this.initBossGame();
        this.createCinematic();
    }
    initBossGame() {
        this.isGameOver = false;
        this.cinematicActive = true;
        this.bossActive = false;
        this.bossMaxHealth = 1000;
        this.bossHealth = this.bossMaxHealth;
        this.bossPhase = 1;
        this.shootCooldown = 500;
        this.lastShootTime = 0;
        this.doubleShot = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enemies = this.physics.add.group();
        this.playerLasers = this.physics.add.group();
        this.enemyLasers = this.physics.add.group();
        this.bossLasers = this.physics.add.group();
    }
    createCinematic() {
        this.bgStars = this.add.tileSprite(500, 400, 1000, 800, 'space2');
        
        this.player = this.physics.add.sprite(-100, 400, 'playerShip')
            .setScale(0.15).setAngle(0).setCollideWorldBounds(true);
        this.player.body.setSize(200, 200).setOffset(340, 230);
        this.player.isInvulnerable = true;

        this.tweens.add({
            targets: this.player,
            x: 100,
            duration: 2000,
            ease: 'Power2'
        });
        this.boss = this.add.sprite(1200, 400, 'deathStar')
            .setScale(0.5)
            .setAlpha(0);

        this.tweens.add({
            targets: this.boss,
            x: 800,
            alpha: 1,
            duration: 3000,
            delay: 1000,
            ease: 'Power2',
            onComplete: () => this.startBossFight()
        });
        const introText = this.add.text(500, 200, 'ETOILE NOIRE DETECTEE!', {
            fontSize: '32px',
            fill: '#ff0000',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: introText,
            alpha: 1,
            duration: 1000,
            yoyo: true,
            repeat: 1,
            onComplete: () => introText.destroy()
        });
    }
    startBossFight() {
        this.cinematicActive = false;
        this.bossActive = true;
        this.player.isInvulnerable = false;
        
        this.createUI();
        this.createAudio();
        this.setupCollisions();
        this.startBossPatterns();
        this.startEnemySpawning();
        const powerupText = this.add.text(500, 120, 'TIR DOUBLE ACTIVÉ!', {
            fontSize: '18px',
            fill: '#00ffff',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: powerupText,
            alpha: 0,
            y: 80,
            duration: 3000,
            onComplete: () => powerupText.destroy()
        });
    }
    createUI() {
        // Coeurs
        this.hearts = [];
        for (let i = 0; i < this.lives; i++) {
            const heart = this.add.image(950 - i * 40, 30, 'heart')
                .setScale(0.05)
                .setScrollFactor(0);
            this.hearts.push(heart);
        }
        // Score
        this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
            fontSize: '20px', fill: '#ffffff', fontFamily: '"Press Start 2P", Courier, monospace'
        });
        // Compteur de fuite
        this.escapedText = this.add.text(20, 50, `Fuite: ${this.enemiesEscaped}`, {
            fontSize: '16px', fill: '#ff9900', fontFamily: '"Press Start 2P", Courier, monospace'
        });
        // Boss santé
        this.bossHealthBarBg = this.add.rectangle(500, 70, 400, 20, 0x000000)
            .setStrokeStyle(2, 0xff0000)
            .setOrigin(0.5, 0.5);
        this.bossHealthBar = this.add.rectangle(300, 70, 400, 16, 0xff0000)
            .setOrigin(0, 0.5);
        this.bossHealthText = this.add.text(500, 70, `BOSS: ${this.bossHealth}/${this.bossMaxHealth}`, {
            fontSize: '16px', fill: '#ffffff', fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
    }
    createAudio() {
        this.laserSound = this.sound.add('laserShot', { volume: 0.3 });
        this.enemyLaserSound = this.sound.add('enemyLaser', { volume: 0.2 });
        this.explosionSound = this.sound.add('explosion', { volume: 0.5 });
        this.bossMusic = this.sound.add('bossMusic', { volume: 0.5, loop: true });
        this.bossDefeatedSound = this.sound.add('bossDefeated', { volume: 0.6 });
        this.bossLaserSound = this.sound.add('bossLaser', { volume: 0.4 });
        this.bossMusic.play();
    }
    setupCollisions() {
        this.physics.add.overlap(this.playerLasers, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.enemyLasers, this.player, this.hitPlayer, null, this);
        this.physics.add.overlap(this.bossLasers, this.player, this.hitPlayer, null, this);
    }
    update() {
        if (this.isGameOver || this.cinematicActive) return;
        if (!this.player || !this.player.active) return;

        this.updateBackground();
        this.updatePlayer();
        this.checkPlayerCollisions();
        this.checkBossCollisions();
        this.cleanupObjects();
        this.updateBossHealthBar();
    }
    checkBossCollisions() {
        this.playerLasers.getChildren().forEach(laser => {
            if (laser.active) {
                const laserBounds = laser.getBounds();
                const bossBounds = this.boss.getBounds();
                const collision = this.checkBossLaserCollision(laser, this.boss);
                if (collision) {
                    this.hitBoss(laser, this.boss);
                }
            }
        });
    }
    checkBossLaserCollision(laser, boss) {
        const laserBounds = laser.getBounds();
        const bossBounds = boss.getBounds();
        const bossHitbox = new Phaser.Geom.Rectangle(
            bossBounds.x,
            bossBounds.y,
            bossBounds.width,
            bossBounds.height
        );
        const collision = Phaser.Geom.Intersects.RectangleToRectangle(laserBounds, bossHitbox);
        return collision;
    }
    updateBackground() {
        this.bgStars.tilePositionX += 0.5;
    }
    updatePlayer() {
        if (!this.player || !this.player.active) return;
        
        const { up, down } = this.cursors;
        this.player.setVelocityY(up.isDown ? -300 : down.isDown ? 300 : 0);

        const now = this.time.now;
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && now > this.lastShootTime + this.shootCooldown) {
            this.playerShoot();
            this.lastShootTime = now;
        }
    }
    updateBossHealthBar() {
        const healthPercent = this.bossHealth / this.bossMaxHealth;
        const barWidth = healthPercent * 400;
        this.bossHealthBar.width = barWidth;
        this.bossHealthText.setText(`BOSS: ${this.bossHealth}/${this.bossMaxHealth}`);
        if (healthPercent <= 0.5 && this.bossPhase === 1) {
            this.bossPhase = 2;
            this.activateBossPhase2();
        }
    }
    startBossPatterns() {
        this.bossShootPattern = this.time.addEvent({
            delay: 2000,
            callback: this.bossShoot,
            callbackScope: this,
            loop: true
        });
    }
    startEnemySpawning() {
        this.enemySpawnTimer = this.time.addEvent({
            delay: 1500,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
    }
    spawnEnemy() {
        const enemy = this.enemies.create(1100, Phaser.Math.Between(100, 700), 'enemy1')
            .setScale(0.1).setAngle(180).setVelocityX(-150);
        
        this.time.delayedCall(Phaser.Math.Between(1000, 2000), () => {
            if (enemy.active) this.enemyShoot(enemy);
        });
    }
    enemyShoot(enemy) {
        this.enemyLasers.create(enemy.x - 30, enemy.y, 'laserRed')
            .setScale(0.1).setVelocityX(-300);
        this.enemyLaserSound.play();
    }
    bossShoot() {
        if (this.bossPhase === 1) {
            this.bossLasers.create(this.boss.x - 100, this.boss.y, 'laserGreen')
                .setScale(0.2).setVelocityX(-400);
                this.bossLaserSound.play();
        } else {
            const angles = [-30, -15, 0, 15, 30];
            angles.forEach(angle => {
                const laser = this.bossLasers.create(this.boss.x - 100, this.boss.y, 'laserGreen')
                    .setScale(0.2)
                    .setRotation(Phaser.Math.DegToRad(angle + 180));
                this.physics.velocityFromRotation(laser.rotation, 400, laser.body.velocity);
            });
        }
        this.bossLaserSound.play({ volume: 0.6 });
    }
    activateBossPhase2() {
        this.bossShootPattern.delay = 1000;
        this.enemySpawnTimer.delay = 800;
        this.boss.setTint(0xff0000);
        this.time.delayedCall(1000, () => this.boss.clearTint());
        const phaseText = this.add.text(500, 150, 'PHASE 2 ACTIVÉE!', {
            fontSize: '24px',
            fill: '#ff0000',
            fontFamily: '"Press Start 2P", Courier, monospace'
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: phaseText,
            alpha: 0,
            duration: 2000,
            onComplete: () => phaseText.destroy()
        });
    }
    hitBoss(laser, boss) {
        console.log('Boss hit! Health:', this.bossHealth); // Debug
        laser.destroy();
        this.bossHealth -= 10;
        
        boss.setTint(0xffffff);
        this.time.delayedCall(100, () => boss.clearTint());
        
        if (this.bossHealth <= 0) {
            this.defeatBoss();
        }
    }
    hitEnemy(laser, enemy) {
        laser.destroy();
        enemy.destroy();
        this.explosionSound.play();
        this.updateScore(100);
        this.enemiesKilled++;
        this.createExplosion(enemy.x, enemy.y);
    }
    checkPlayerCollisions() {
        if (this.player.isInvulnerable) return;

        [this.enemyLasers, this.bossLasers, this.enemies].forEach((group, index) => {
            group.getChildren().forEach(obj => {
                if (obj.active && this.checkCollision(this.player, obj)) {
                    obj.destroy();
                    if (index === 2) this.createExplosion(obj.x, obj.y);
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
    playerShoot() {
        if (!this.player || !this.player.active) return;
        
        this.playerLasers.create(this.player.x + 50, this.player.y, 'laserBlue')
            .setScale(0.1).setVelocityX(400);
        this.playerLasers.create(this.player.x + 50, this.player.y + 30, 'laserBlue')
            .setScale(0.1).setVelocityX(400);
        this.laserSound.play();
    }
    playerDamaged() {
        if (!this.player || !this.player.active || this.player.isInvulnerable || this.lives <= 0) return;
        this.player.setTint(0xff0000);
        this.player.isInvulnerable = true;
        this.lives--;
        if (this.lives >= 0 && this.lives < this.hearts.length) {
            this.hearts[this.lives].setVisible(false);
        }

        if (this.lives <= 0) {
            this.tweens.killTweensOf(this.player);
            this.player.setVisible(false).setActive(false);
            this.createExplosion(this.player.x, this.player.y, true);
            this.explosionSound.play();
            this.time.delayedCall(800, () => {
                if (this.player) {
                    this.player.destroy();
                }
                this.gameOver();
            });
        } else {
            this.tweens.add({
                targets: this.player,
                alpha: 0.3, duration: 200, yoyo: true, repeat: 5,
                onComplete: () => {
                    if (this.player && this.player.active) {
                        this.player.setAlpha(1).clearTint();
                        this.player.isInvulnerable = false;
                    }
                }
            });
        }
    }
    cleanupObjects() {
        [this.playerLasers, this.enemyLasers, this.bossLasers, this.enemies].forEach((group, index) => {
            const condition = index === 3 ? (obj => {
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
    defeatBoss() {
        this.isGameOver = true;
        this.bossActive = false;
        this.bossShootPattern.destroy();
        this.enemySpawnTimer.destroy();
        this.bossMusic.stop();
        this.bossDefeatedSound.play();
        this.destroyAllEnemies();
        this.createBossExplosion();
        this.time.delayedCall(3000, () => {
            this.scene.start('EndGameScene', { 
                victory: true, 
                score: this.score + 2000,
                enemiesEscaped: this.enemiesEscaped,
                enemiesKilled: this.enemiesKilled
            });
        });
    }

    destroyAllEnemies() {
        this.enemies.getChildren().forEach((enemy, index) => {
            if (enemy.active) {
                this.time.delayedCall(index * 200, () => {
                    if (enemy.active) {
                        this.createExplosion(enemy.x, enemy.y);
                        this.explosionSound.play({ volume: 0.4 });
                        enemy.destroy();
                        this.updateScore(50);
                        this.enemiesKilled++;
                    }
                });
            }
        });
        this.enemyLasers.getChildren().forEach(laser => {
            if (laser.active) {
                this.time.delayedCall(Phaser.Math.Between(500, 1500), () => {
                    this.createExplosion(laser.x, laser.y);
                    laser.destroy();
                });
            }
        });
        this.bossLasers.getChildren().forEach(laser => {
            if (laser.active) {
                this.time.delayedCall(Phaser.Math.Between(500, 1500), () => {
                    this.createExplosion(laser.x, laser.y);
                    laser.destroy();
                });
            }
        });
    }
    createBossExplosion() {
        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 100, () => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100;
                const x = this.boss.x + Math.cos(angle) * distance;
                const y = this.boss.y + Math.sin(angle) * distance;
                
                this.createExplosion(x, y);
                this.explosionSound.play({ volume: 0.3 });
            });
        }
        
        this.boss.setVisible(false);
    }
    gameOver() {
        this.isGameOver = true;
        this.bossMusic.stop();
        
        this.cameras.main.shake(500, 0.01);
        this.enemies.clear(true, true);
        this.enemyLasers.clear(true, true);
        this.playerLasers.clear(true, true);
        this.bossLasers.clear(true, true);
        
        this.time.delayedCall(500, () => {
            this.cameras.main.fadeOut(800, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('EndGameScene', { 
                    victory: false, 
                    score: this.score,
                    enemiesEscaped: this.enemiesEscaped,
                    enemiesKilled: this.enemiesKilled
                });
            });
        });
    }
    updateScore(points) {
        this.score = Math.max(0, this.score + points);
        this.scoreText.setText('Score: ' + this.score);
    }
    shutdown() {
        this.bossMusic?.stop();
    }
}