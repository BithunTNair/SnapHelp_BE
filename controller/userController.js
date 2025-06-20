const SERVICES = require('../models/serviceModel');

const serviceList = async (req, res) => {
    try {
        const list = await SERVICES.find();
        return res.status(200).json({ message: 'list of services', list })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const bookService= (req,res)=>{

}

module.exports = { serviceList }