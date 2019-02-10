/**
 * @file setStatus command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (args.status && /^(?:online|idle|dnd|invisible)$/i.test(args.status)) {
    await Bastion.user.setStatus(args.status);

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        description: `Статус ${Bastion.user.username} изменен на **${args.status}**`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  else {
    await Bastion.user.setStatus(Bastion.configurations.status);

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        description: `Статус ${Bastion.user.username} На исходный статус **${Bastion.configurations.status}**`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'status', type: String, defaultOption: true }
  ],
  ownerOnly: true
};

exports.help = {
  name: 'setStatus',
  description: 'Ставит новый статус для бота.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'setStatus [online|idle|dnd|invisible]',
  example: [ 'setStatus invisible', 'setStatus' ]
};
