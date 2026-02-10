import {createVendorsService, getAllVendorsService, getVendorsByIDService, updateVendorsService, deleteVendorsService } from "../services/vendorService.js";

export const createVendors = async (req, res) => {
    try {
        const { id, vendor_name, email, phone, address } = req.body;

        const vendor = await createVendorsService(
            id,
            vendor_name,
            email,
            phone,
            address
        );

        res.status(201).json({
            msg: "Vendor berhasil ditambahkan",
            data: vendor
        });
    } catch (err) {
        res.status(400).json({
            msg: err.message
        });
    }
};


export const getAllVendor = async (req, res) => {
    try {
        const vendors = await getAllVendorsService();
        res.json(vendors);
    }catch (err){
        res.status(500).json({
            msg : "Gagal mengambil data vendors"
        })
    }
}

export const getVendorsByID = async (req,res) => {
    try{
        const vendors = await getVendorsByIDService(req.params.id)

        if(!vendors) {
            return res.status(404).json({
                msg : "Vendor tidak ditemukan"
            })
        }
        res.json(vendors)
    }catch (err) {
        res.status(500).json({
            msg : "Gagal mengambil detail vendor"
        })
    }
}

export const updateVendors = async (req,res) => {
    try{
        const {id} = req.params;
        const data = req.body;

        if(Object.keys(data).length === 0){
            return res.status(400).json({
                msg: "Data update tidak boleh kosong"
            });
        }

        const affectedRows = await updateVendorsService(id, data);

        if(affectedRows === 0){
            return res.status(404).json({
                msg: "Asset tidak ditemukan"
            });
        }

        res.json({
            msg: "Vendor berhasil diupdate"
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
             msg : error.message
        });
    }
}

export const deleteVendors = async(req,res) => {
    try{
        const deleted = await deleteVendorsService(req.params.id)

        if(!deleted){
            return res.status(404).json({
                message: "Vendor tidak ditemukan"
            });
        }

        res.json({
            message: "Vendor berhasil dihapus"
        });
    }catch (error) {
        res.status(500).json({
            message: "Gagal menghapus vendor"
        });
    }
}