const {Mahasiswa,MataKuliah,JadwalMatkul} = require("../models")

const jadwalMatkulController = {}

/*
    this is auto generate example, you can continue 

*/
jadwalMatkulController.index = async(req,res) => {
    res.json({
        message : "Hello jadwalMatkulController"
    })
}

//menambah jadwal matkul
jadwalMatkulController.create = async (req,res) => {
    const {id_matkul,hari,jam} = req.body
    try {
        const getMatKul = await MataKuliah.findOne({
            where: {
                id: id_matkul
            }
        })
        if (getMatKul === null) {
            throw Error("Data Tidak Ditemkan")
        } else {
            const createJadwalMatkul = await JadwalMatkul.create({
                id_matkul   : getMatKul.id,
                hari        : hari,
                jam         : jam
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

//menampilkan jadwal matkul
jadwalMatkulController.getAll = async (req,res) => {
    const getJadwalMatkul = await MataKuliah.findAll({
        include: [
            {
                model: JadwalMatkul
            }
        ]
    })
    res.json({
        data: getJadwalMatkul
    })
}

//menampilkan jadwal matkul by id
jadwalMatkulController.getById = async (req,res) => {
    const {id} = req.params
    const getJadwalMatkul = await MataKuliah.findOne({
        include: [
            {
                model: JadwalMatkul
            }
        ],
        where : {
            id: id
        }
    })
    res.json({
        data: getJadwalMatkul
    })
}

//udate data jadwal matkul
jadwalMatkulController.update = async (req,res) => {
    const {id_matkul,hari,jam} = req.body
    const {id} = req.params
    try {
        const getMatKul = await MataKuliah.findOne({
            where: {
                id: id_matkul
            }
        })
        if (getMatKul === null) {
            throw Error("Data Tidak Ditemukan")
        } else {
            const updateJadwalMatkul = await JadwalMatkul.update({
                id_matkul   : getMatKul.id,
                hari        : hari,
                jam         : jam
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

//hapus data jadwal matkul
jadwalMatkulController.delete = async (req,res) => {
    const {id} = req.params
    try {
        const deleteJadwalMatkul = await JadwalMatkul.destroy({
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

module.exports = jadwalMatkulController

