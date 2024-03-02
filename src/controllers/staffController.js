import staffService from '../services/staffService';
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'test',
    })
};

const reristerStaff = async (req, res) => {
    try {
        if (req.body.staffname && req.body.passwords && req.body.address && req.body.phone) {
            return res.status(200).json({
                Mess: 'Bạn chưa điền đủ thông tin!',
                Data: '',
            });
        }
        if (req.body.password && req.body.password.length < 5) {
            return res.status(200).json({
                Mess: 'Mật khẩu phải dài hơn 5 ký tự',
                Data: '',
            });
        }
        if (req.body.phone && req.body.phone.length < 10) {
            return res.status(200).json({
                Mess: 'Số điện thoại không hợp lệ!!!',
                Data: '',
            });
        }

        let data = await staffService.reristerStaff(req.body);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error from server registerStaff',
            ErrC: '-1',
            Data: '',
        })
    }
};

module.exports = {
    testApi,
    reristerStaff,
}