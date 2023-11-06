const {MataKuliah} = require("../models")

const matkulController = {}

/*
    this is auto generate example, you can continue 

*/
matkulController.index = async(req,res) => {
    res.json({
        message : "Hello matkulController"
    })
}

//tambah matkul
matkulController.create = async (req,res) => {
    const {kode_matkul,nama,sks} = req.body
    try {
        const createMatKul = await MataKuliah.create({
            nama        : nama,
            kode_matkul  : kode_matkul,
            sks         : sks
        })
        return res.status(201).json({
            message: 'Data Berhasil Diinput!'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

//menampilkan semua matkul
matkulController.getAll = async (req,res) => {
    try {
        const getMataKuliah = await MataKuliah.findAll({
            order : [["createdAt","DESC"]]
        })
        return res.status(200).json({
            data: getMataKuliah
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

//menampilkan matkul by id
matkulController.getById = async (req,res) => {
    const {id} = req.params
    try {
        const getDetailMatKul = await MataKuliah.findOne({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            data: getDetailMatKul
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

//update data matkul
matkulController.update = async (req,res) => {
    const {nama,kode_matkul,sks} = req.body
    const id = req.params.id
    try {
        const getDetailMatKul = await MataKuliah.findOne({
            where: {
                id: id
            }
        })
        if (getDetailMatKul === null) {
            return res.status(404).json({
                message: 'Data Tidak Ditemukan!'
            })
        }

        const updateMatkul = await MataKuliah.update({
            nama        : nama,
            kode_matkul  : kode_matkul,
            sks         : sks
        },{
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: 'Data Berhasil Diubah!'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

//hapus data matkul
matkulController.delete = async (req,res) => {
    const {id} = req.params
    try {
        const deleteMatKul = await MataKuliah.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: 'Data Berhasil Dihapus!'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

module.exports = matkulController

