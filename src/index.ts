import { SlashCommandBuilder } from "@discordjs/builders";
import { Bot, Embed } from "discord";
import { CommandInteraction } from "discord.js";
import { Game } from "minecraft";
import config from '../config.json';

const bot = new Bot(config);

bot.slash([
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),

    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play Minecraft!')
])

bot.on('ready', () => console.log('Bot is ready'))
bot.on('ping', async (interaction: CommandInteraction) => {
    await interaction.reply('pong!')
})

bot.on('play', async (interaction: CommandInteraction) => {

    await interaction.reply("Let's play!")

    const embed = new Embed(interaction, bot);
    await embed.init(['⬅️', '⬆️', '➡️']);

    const game = new Game();

    (async function loop() {
        game.update();
        await embed.update(game.draw(20, 9));
        setTimeout(loop, 100);
    })();

    embed.on('⬅️', () => game.playerX--);
    embed.on('⬆️', () => game.playerY -= 2);
    embed.on('➡️', () => game.playerX++);

})

new Game();
