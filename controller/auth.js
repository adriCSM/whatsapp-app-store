const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    },
});
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('Client is ready!');
});
client.initialize();
module.exports = class {
    // SEND WHATS APP
    static async sendWaCostumer(req, res) {
        const { no, name } = req.body;
        if (!no || !name) res.status(400).json({ message: 'Field kosong' });
        else {
            const number = '62' + no.slice(1) + '@c.us';
            const jam = new Date().getHours();
            let waktu;

            if (jam >= 6 && jam <= 10) waktu = 'pagi';
            else if (jam <= 14) waktu = 'siang';
            else if (jam <= 18) waktu = 'sore';
            else if (jam <= 24 || jam <= 3) waktu = 'malam';
            else {
                waktu = 'subuh';
            }
            const pesan = `Assalamualikum, Selamat ${waktu}... \nHallo👋 ${name}... \nTerimakasih telah melakukan order. \nAgar paket anda di proses silakan kirim bukti pembayaran kepada pemilik product AM Store pada nomor dibawah👇. \nWhatsApp: 085256278587. \n\n\nTerimakasih.\nWeb AM Store: https://adricsm.github.io/store/. `;
            try {
                await client.sendMessage(number, pesan);
                res.status(200).json({ message: `Pesan kepada ${name} telah terkirim` });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
    }
    static async sendWaAdmin(req, res) {
        const { no, name } = req.body;
        if (!no || !name) res.status(400).json({ message: 'Field kosong' });
        else {
            const number = '62' + no.slice(1) + '@c.us';
            const pesan = `Hallo👋 ${name}... \nTerimakasih telah melakukan order. \nAgar paket anda di proses silakan chat pemilik product AM Store : 085256278587. \nWeb AM Store: https://adricsm.github.io/store/. \nTerimakasih`;
            try {
                await client.sendMessage(number, pesan);
                res.status(200).json({ message: `Pesan kepada ${name} telah terkirim` });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
    }
};
