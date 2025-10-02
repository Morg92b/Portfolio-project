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
    data() {
        return {
            game: null
        }
    },
    mounted() {
        this.initGame();
        window.addEventListener('resize', this.handleResize);
    },
    methods: {
        initGame() {
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
                scene: [MenuScene, GameScene, EndGameScene, BossScene, UpdateScene],
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    autoRound: true
                }
            };
            this.game = new Phaser.Game(config);
        },

        handleResize() {
            if (this.game) {
                this.game.scale.refresh();
                this.game.renderer.resize(1000, 800);
                this.game.events.emit('resize');
            }
        }
    },
    beforeUnmount() {
        if (this.game) {
            this.game.destroy(true);
        }
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>

<style scoped>
#game-container {
    display: flex;
    margin: 0 auto;
    margin-top: 100px;
    width: 100%;
    min-height: 600px;
}

@media (max-height: 700px) {
    #game-container {
        margin-top: 10px;
    }
}
</style>