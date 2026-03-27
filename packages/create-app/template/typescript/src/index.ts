import { Client, __AUTH_CLASS__ } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const client = new Client({
  authStrategy: __AUTH_INIT__,
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  console.log(`Message from ${message.from}: ${message.body}`);
});

client.initialize();
