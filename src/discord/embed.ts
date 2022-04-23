import { CommandInteraction, Message, MessageEmbed, ReactionCollector, TextBasedChannel } from "discord.js";
import { EventEmitter } from "stream";
import { Bot } from ".";

export default class extends EventEmitter {

    private interaction: CommandInteraction;
    private message!: Message;
    private bot: Bot;

    constructor(interaction: CommandInteraction, bot: Bot) {
        super();
        this.interaction = interaction;
        this.bot = bot;
    }

    async init(
        emojis: string[],
    ) {
        this.message = await (
            <TextBasedChannel>await this.bot.client.channels
                .fetch(this.interaction.channelId)
        ).send('Loading...');

        for (const emoji of emojis) {
            this.message.react(emoji);
        }

        new ReactionCollector(this.message)
            .on('collect', (reaction, u) => {
                if (u.bot) return;
                reaction.users.remove(u);
                if (u.id !== this.interaction.user.id) return;
                this.emit(reaction.emoji.name!);
            });
    }

    async update(content: string) {

        const embed = new MessageEmbed()
            .setAuthor(this.interaction.user.username, this.interaction.user.avatarURL()!)
            .setTitle('Minecraft')
            .setDescription(content);

        this.message.edit({
            embeds: [embed],
        });
    }


}