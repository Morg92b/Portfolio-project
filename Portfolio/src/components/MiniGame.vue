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
            this.$nextTick(() => {
                setTimeout(() => {
                    this.handleResize();
                }, 100);
            });
        },

        handleResize() {
            if (this.game && this.game.scale) {
                this.game.scale.refresh();
                console.log('Game scaled to fit screen');
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
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 25px;
    width: 100vw;
    height: calc(100vh - 100px);
    max-width: 1000px;
    max-height: 800px;
}

@media (max-height: 850px) {
    #game-container {
        margin-top: 10px;
        height: calc(100vh - 50px);
    }
}

@media (max-height: 700px) {
    #game-container {
        margin-top: 5px;
        height: calc(100vh - 30px);
    }
}

@media (max-width: 1024px) {
    #game-container {
        margin-top: 10px;
    }
}
</style>