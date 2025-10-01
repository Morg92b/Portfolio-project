<template>
    <div id="game-container"></div>
</template>

<script>
import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import EndGameScene from './scenes/EndGameScene';
import BossScene from './scenes/BossScene';
import UpdateScene from './scenes/UpdateScene';

export default {
    name: 'GameContainer',
    mounted() {
        const config = {
            type: Phaser.AUTO,
            parent: 'game-container',
            width: 1000,
            height: 800,
            backgroundColor: '#000000',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: [MenuScene, GameScene, EndGameScene, BossScene, UpdateScene]
        };

        this.game = new Phaser.Game(config);
    },
    beforeUnmount() {
        if (this.game) {
            this.game.destroy(true);
        }
    }
}
</script>

<style scoped>
#game-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 100px;
}
</style>