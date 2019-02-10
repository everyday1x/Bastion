/**
 * @file setNick command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!message.member.hasPermission('CHANGE_NICKNAME')) return;

  let description;

  if (args.length) {
    await message.guild.me.setNickname(args.join(' '));
    description = `Ник ${Bastion.user.username} сменен на **${args.join(' ')}**.`;
  }
  else {
    await message.guild.me.setNickname('');
    description = `Ник ${Bastion.user.username} возвращен на исходный`;
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: description
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'setn' ],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'setNick',
  description: 'Ставит новый ник боту в Discord.',
  botPermission: 'CHANGE_NICKNAME',
  userTextPermission: 'CHANGE_NICKNAME',
  userVoicePermission: '',
  usage: 'setNick [text]',
  example: [ 'setNick NewNick', 'setNick' ]
};
