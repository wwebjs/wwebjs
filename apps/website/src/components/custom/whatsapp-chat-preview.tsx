import { CodePreview } from '@/components/code-preview'

import { WhatsAppChat } from './whatsapp-chat'

const code = `const { Client } = require('whatsapp-web.js')

const client = new Client()

client.on('message', async (message) => {
  if (message.body === '!ping') {
    await message.reply('pong')
  }
})

client.initialize()`

export function WhatsAppChatPreview() {
  return <CodePreview preview={<WhatsAppChat />} code={code} language="js" />
}
