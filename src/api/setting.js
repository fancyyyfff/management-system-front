import instance from '@/http/index'

// 上传轮播图的接口直接写在了vue文件中的template当中的上传轮播图方法的action当中


// 获取所有轮播图
export const getAllSwipers = () =>{
    return instance({
        url:'/set/getAllSwipers',
        method:'POST',
    })
}

// 获取公司名称
export const getCompanyName = (setName) =>{
    return instance({
        url:'/set/getCompanyName',
        method:'POST',
        data: {
            setName
        }
    })
}

// 修改公司名称
export const changeCompanyName = (setValue) =>{
    return instance({
        url:'/set/changeCompanyName',
        method:'POST',
        data: {
            setValue
        }
    })
}


// 修改公司介绍
export const changeCompanyIntroduce = (setText,setName) =>{
    return instance({
        url:'/set/changeCompanyIntroduce',
        method:'POST',
        data: {
            setText,
            setName
        }
    })
}

// 获取公司介绍
export const getCompanyIntroduce = (setName) =>{
    return instance({
        url:'/set/getCompanyIntroduce',
        method:'POST',
        data:{
            setName
        }
    })
}

// 获取所有公司信息
export const getAllCompanyIntroduce = () =>{
    return instance({
        url:'/set/getAllCompanyIntroduce',
        method:'POST',
    })
}


