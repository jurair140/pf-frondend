import base_url from "./base_url";
import commonApi from "./commonApi"

export const registerApi = async(data)=>{
    return await commonApi(`${base_url}/reg`,"POST","",data)
}

export const loginApi = async(data)=>{
    return await commonApi(`${base_url}/log`,"POST","",data)
}

export const addprojectApi = async(data,header)=>{
    return await commonApi(`${base_url}/addproject`,"POST",header,data)
}

export const getProjectsApi = async(header)=>{
    return await commonApi(`${base_url}/getlist`,"GET",header,"")
}

export const deleteProjectApi = async(id,header)=>{
    return await commonApi(`${base_url}/deletepro/${id}`,"DELETE",header,{})
}

export const updateProjectApi = async(id,header,data)=>{
    return await commonApi(`${base_url}/updatepro/${id}`,"PUT",header,data)
}

export const updateUserApi = async(header,data)=>{
    return await commonApi(`${base_url}/updateuser`,"PUT",header,data)
}

export const getAllProjectsApi = async()=>{
    return await commonApi(`${base_url}/getallpro`,"GET","","")
}

export const searchProductsApi = async(key)=>{
    return await commonApi(`${base_url}/search?search=${key}`,"GET","","")
}
