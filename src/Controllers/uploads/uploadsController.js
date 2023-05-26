const fs = require("fs");
const Picture = require("../../Modelos/uploadModel");
const Cliente = require('../../Modelos/clienteModel')
const Funcionario = require ('../../Modelos/funcionarioModel');
const Pet = require("../../Modelos/petModel");

exports.create = async (req, res) => {
  try {
    const { name,tipo,id } = req.body;
    const file = req.file;
    const picture = new Picture({
      name,
      src: file.destination,
    });
    
    
    const result = await picture.save();
    let target;
    console.log(tipo);
    switch(tipo){
      case 'cliente': 
        target = await Cliente.findById(id);
        break
      case 'funcionario':
        target = await Funcionario.findById(id);
        break;
      case 'pet':
        target = await Pet.findById(id);
        break;
    }

    target.foto = result._id
    target.save()

    res.json(picture);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao salvar a imagem :(" });
  }
};

exports.remove = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: "Imagem não encontrada :(" });
    }
    fs.unlinkSync(picture.src);
    await picture.remove();
    res.json({ message: "Imagem removida :(" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover a imagem" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.json(pictures);
  } catch (err) {
    res.status(500).json({ message: "Imagens não encontrada :(." });
  }
};