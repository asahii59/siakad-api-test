const { json } = require("sequelize")
const {Dosen,MataKuliah,DosenMatkul} = require("../models")

const dosenMatkulController = {}

/*
    this is auto generate example, you can continue 

*/
dosenMatkulController.index = async(req,res) => {
    res.json({
        message : "Hello dosenMatkulController"
    })
}

//menambah dosen matkul
dosenMatkulController.create = async (req,res) => {
    const {id_dosen,id_matkul} = req.body
    try {
        const getDosen = await Dosen.findOne({
            where: {
                id: id_dosen
            }
        })
        const getMatKul = await MataKuliah.findOne({
            where: {
                id: id_matkul
            }
        })
        if (getDosen === null || getMatKul === null) {
            throw Error("Data Tidak Ditemkan")
        } else {
            const createDsnMat = await DosenMatkul.create({
                id_dosen    : getDosen.id,
                id_matkul   : getMatKul.id
            })
            return res.status(201).json({
                message: 'Data Berhasil Ditambahkan'
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

//menampilkan dosen matkul
dosenMatkulController.getAll = async (req,res) => {
    const getDsnMat = await Dosen.findAll({
        include: [
            {
                model: MataKuliah
            }
        ]
    })
    res.json({
        data: getDsnMat
    })
}

//menampilkan dosen matkul by id
dosenMatkulController.getById = async (req,res) => {
    const {id} = req.params
    const getDsnMat = await Dosen.findOne({
        include: [
            {
                model: MataKuliah
            }
        ],
        where : {
            id: id
        }
    })
    res.json({
        data: getDsnMat
    })
}

//update data dosen matkul
dosenMatkulController.update = async (req,res) => {
    const {id_dosen,id_matkul} = req.body
    const {id} = req.params
    try {
        const getDosen = await Dosen.findOne({
            where: {
                id: id_dosen
            }
        })
        const getMatKul = await MataKuliah.findOne({
            where: {
                id: id_matkul
            }
        })
        if (getDosen === null || getMatKul === null) {
            throw Error("Data Tidak Ditemukan")
        } else {
            const updteDsnMat = await DosenMatkul.update({
                id_dosen    : getDosen.id,
                id_matkul   : getMatKul.id
            },{
                where: {
                    id : id
                }
            })
            return res.status(200).json({
                message: 'Data Berhasil Diubah'
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

//hapus data dosen matkul
dosenMatkulController.delete = async (req,res) => {
    const {id} = req.params
    try {
        const deleteDsnMat = await DosenMatkul.destroy({
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

module.exports = dosenMatkulController

