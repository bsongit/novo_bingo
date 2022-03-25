const Lote = require('../models/Lote');
const Cartela = require('../models/Cartela');
const Serie = require('../models/Serie');
const Pedido = require('../models/Pedido');
const Transacao = require('../models/Transacao')
const Parametro = require('../models/Parametro');

const randomCode = () => {
    const ascii_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789'
    const codigo =  ascii_letters[Math.floor(Math.random() * (ascii_letters.length - 1))] +
                    digits[Math.floor(Math.random() * (digits.length - 1))] +
                    ascii_letters[Math.floor(Math.random() * (ascii_letters.length - 1))] +
                    digits[Math.floor(Math.random() * (digits.length - 1))] +
                    ascii_letters[Math.floor(Math.random() * (ascii_letters.length - 1))] +
                    digits[Math.floor(Math.random() * (digits.length - 1))] +
                    ascii_letters[Math.floor(Math.random() * (ascii_letters.length - 1))] +
                    digits[Math.floor(Math.random() * (digits.length - 1))]
    return codigo
}

const generateLote = (times) => {
    let count = 0;
    let interval = setInterval(async () => {
        const cartelas = await Cartela.find({}).skip(count * 1000).select('_id').limit(1000);
        const lote = await Lote.create({numero : count, listaCartelasId: cartelas});
        count++;
        if(count >= times)
            clearInterval(interval);
    }, 500);
}

const generateSerie = async (body) => {
        let lote = await Lote.findOne({listaCartelasId : { $size : 1000}});
        let listaCartelasId  = lote.listaCartelasId.splice(0,body.tamanhoInicial);
        let UPDATE = await Lote.updateOne({_id: lote._id},{listaCartelasId: lote.listaCartelasId});
        let result = await Serie.create({...body,listaCartelasId: listaCartelasId})
        return result;
}

const generateSerieVendedor = async (body) => {
    const codigo = randomCode()
    let params = await Parametro.findOne({}).select('valorCartelaAtual baseComissaoVendedor')
    let serie = await Serie.findOne({tipo: 'GERENTE', gerenteId: body.gerenteId, listaCartelasId : {$exists: true}, $where: `this.listaCartelasId.length>=${body.tamanhoInicial}`});
    if(serie === null) return {}
    let listaCartelasId  = serie.listaCartelasId.splice(0, body.tamanhoInicial).map(item => item._id);
    let UPDATE = await Serie.updateOne({_id: serie._id},{listaCartelasId: serie.listaCartelasId});
    let resultSerie = await Serie.create({...body,listaCartelasId: listaCartelasId, tipo: 'VENDEDOR'})
    let resultTransacao = await Transacao.create({data : body.data, status: body.status, valor :  params.valorCartelaAtual * listaCartelasId.length, documento: codigo, taxaComissao: params.baseComissaoVendedor * listaCartelasId.length ,gerenteId: body.gerenteId, vendedorId : body.vendedorId ,listaCartelasId: listaCartelasId})
    let resultPedido = await Pedido.create({clienteNome: body.clienteNome, data : body.data, status: body.status, valorCadaCartela :  params.valorCartelaAtual, codigo: codigo, gerenteId: body.gerenteId, vendedorId : body.vendedorId ,listaCartelasId: listaCartelasId, transacaoId: resultTransacao._id});
    return resultSerie;
}



module.exports = {randomCode, generateLote, generateSerie, generateSerieVendedor}
