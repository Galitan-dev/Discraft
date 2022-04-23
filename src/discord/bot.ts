import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import EventEmitter from 'events';

export default class extends EventEmitter {

    private config: { clientId: string, guildId: string, token: string }
    private rest: REST
    public client: Client;

    constructor(config: { clientId: string, guildId: string, token: string }) {
        super();
        this.config = config;
        this.rest = new REST({ version: '9' }).setToken(config.token)
        this.client = new Client({ intents: ['GUILD_MESSAGE_REACTIONS'] });
        this.client.login(config.token);
        this.client.once('ready', () => {
            this.emit('ready');
        });
    }

    slash(commands: SlashCommandBuilder[]) {
        this.rest.put(Routes.applicationGuildCommands(
            this.config.clientId,
            this.config.guildId,
        ), {
            body: commands.map(c => c.toJSON())
        })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);

        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            const { commandName } = interaction;

            this.emit(commandName, interaction);
        });
    }

}