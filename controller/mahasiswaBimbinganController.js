const {Mahasiswa,Dosen,MahasiswaBimbingan} = require("../models")

const mahasiswaBimbinganController = {}

/*
    this is auto generate example, you can continue 

*/
mahasiswaBimbinganController.index = async(req,res) => {
    res.json({
        message : "Hello mahasiswaBimbinganController"
    })
}

// menambah mahasiswa bimbingan
mahasiswaBimbinganController.create = async (req,res) => {
    const {id_mahasiswa,id_dosen} = req.body
    try {
        const getMahasiswa = await Mahasiswa.findOne({
            where: {
                id: id_mahasiswa
            }
        })
        const getDosen = await Dosen.findOne({
            where: {
                id: id_dosen
            }
        })
        if (getMahasiswa === null || getDosen === null) {
            throw Error("Data Tidak Ditemkan")
        } else {
            const createMhsBim = await MahasiswaBimbingan.create({
                id_mahasiswa: getMahasiswa.id,
                id_dosen    : getDosen.id
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

// menampilakan mahasiswa bimbingan
mahasiswaBimbinganController.getAll = async (req,res) => {
    const getMhsBim = await Mahasiswa.findAll({
        include: [
            {
                model: Dosen
            }
        ]
    })
    res.json({
        data: getMhsBim
    })
}

//menampilkan mahsiswa bimbingan by id
mahasiswaBimbinganController.getById = async (req,res) => {
    const {id} = req.params
    const getMhsBim = await Mahasiswa.findOne({
        include: [
            {
                model: Dosen
            }
        ],
        where : {
            id: id
        }
    })
    res.json({
        data: getMhsBim
    })
}

//update mahasiswa bimbingan
mahasiswaBimbinganController.update = async (req,res) => {
    const {id_mahasiswa,id_dosen} = req.body
    const {id} = req.params
    try {
        const getMahasiswa = await Mahasiswa.findOne({
            where: {
                id: id_mahasiswa
            }
        })
        const getDosen = await Dosen.findOne({
            where: {
                id: id_dosen
            }
        })
        if (getMahasiswa === null || getDosen === null) {
            throw Error("Data Tidak Ditemkan")
        } else {
            const updteMhsBim = await MahasiswaBimbingan.update({
                id_mahasiswa: getMahasiswa.id,
                id_dosen    : getDosen.id
            },{
                where: {
                    id : id
                }
            })
            return res.status(201).json({
                message: 'Data Berhasil Diubah'
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

mahasiswaBimbinganController.delete = async (req,res) => {
    const {id} = req.params
    try {
        const deleteMhsBim = await MahasiswaBimbingan.destroy({
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

module.exports = mahasiswaBimbinganController

