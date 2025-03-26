import axios from "axios";

export const login = async (email, password) => {
    const response = await axios.get('https://api.starglobal3d.com/login')
    if(response.status != 200) throw new Error("Đăng nhập không thành công")
    return response.data
}