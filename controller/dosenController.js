const {Dosen} = require("../models")

const dosenController = {}

/*
    this is auto generate example, you can continue 

*/
dosenController.index = async(req,res) => {
    res.json({
        message : "Hello dosenController"
    })
}

//tambah dosen
dosenController.create = async (req,res) => {
    const {nama,nidn,alamat} = req.body
    try {
        const createDosen = await Dosen.create({
            nama    : nama,
            nidn    : nidn,
            alamat  : alamat
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

//menampilkan semua dosen
dosenController.getAll = async (req,res) => {
    try {
        const getDosen = await Dosen.findAll({
            order : [["createdAt","DESC"]]
        })
        return res.status(200).json({
            data: getDosen
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

//menampilkan dosen by id
dosenController.getById = async (req,res) => {
    const {id} = req.params
    try {
        const getDetailDsn = await Dosen.findOne({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            data: getDetailDsn
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

//update data dosen
dosenController.update = async (req,res) => {
    const {nama,nidn,alamat} = req.body
    const id = req.params.id
    try {
        const getDetailDsn = await Dosen.findOne({
            where: {
                id: id
            }
        })
        if (getDetailDsn === null) {
            return res.status(404).json({
                message: 'Data Tidak Ditemukan!'
            })
        }

        const updateDosen = await Dosen.update({
            nama    : nama,
            nidn    : nidn,
            alamat  : alamat
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

//hapus data dosen
dosenController.delete = async (req,res) => {
    const {id} = req.params
    try {
        const deleteDsn = await Dosen.destroy({
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

module.exports = dosenController

