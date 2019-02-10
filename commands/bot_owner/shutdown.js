/**
 * @file shutdown command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let confirmation = await message.channel.send({
    embed: {
      color: Bastion.colors.ORANGE,
      description: 'Вы уверены, что хотите мне выключить?'
    }
  });

  const collector = confirmation.channel.createMessageCollector(m => Bastion.credentials.ownerId.includes(m.author.id) && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no')),
    {
      time: 30 * 1000,
      maxMatches: 1
    }
  );

  collector.on('collect', async answer => {
    if (answer.content.toLowerCase().startsWith('yes')) {
      await message.channel.send({
        embed: {
          description: 'Пока :wave:! Скоро встретимся.'
        }
      });

      if (Bastion.shard) {
        await Bastion.shard.broadcastEval('this.destroy().then(() => process.exitCode = 0)');
      }
      else {
        await Bastion.destroy();
        process.exitCode = 0;
        setTimeout(() => {
          process.exit(0);
        }, 5000);
      }

      Bastion.log.console('\n');
      Bastion.log.info('Пока! Скоро встретимся.');
    }
    else {
      await message.channel.send({
        embed: {
          description: 'Круто, я живой!'
        }
      });
    }
  });
};

exports.config = {
  aliases: [ 'die', 'turnoff' ],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'shutdown',
  description: 'Выключает бота.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'shutdown',
  example: []
};
