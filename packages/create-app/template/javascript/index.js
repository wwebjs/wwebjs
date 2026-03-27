'use strict';

const { Client, __AUTH_CLASS__ } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: __AUTH_INIT__,
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  console.log(`Message from ${message.from}: ${message.body}`);
});

client.initialize();
