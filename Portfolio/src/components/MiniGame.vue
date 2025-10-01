<template>
    <div id="game-container"></div>
</template>

<script>
import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import EndGameScene from './scenes/EndGameScene';

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
            scene: [MenuScene, GameScene, EndGameScene]
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
}
</style>