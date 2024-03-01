
import ResponseEntity from "../../../../core/entities/response.entity";
import WilayaEntity from "../../../../core/entities/wilaya.entity";
import { Api } from "../../../../core/api/api.source";

export default class WilayaRemote {
    async getAllWilayas(): Promise<ResponseEntity> {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("/data/wilayas.json");
            const data = await response.json();
            if (response.ok) {
                const uniqueWilayas = Array.from(new Set(data.map((item: any) => item.wilaya)));
                var wilayas: WilayaEntity[] = [];
                for (var wilayaName of uniqueWilayas) {
                    var wilaya = new WilayaEntity();
                    wilaya.name = wilayaName as string;
                    wilaya.communes = data
                        .filter((item: any) => item.wilaya === wilayaName)
                        .map((item: any) => item.commune);
                    wilayas.push(wilaya);
                }
                var wilayasResponse = await Api.instance.getAxios().get(`/wilayas`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (wilayasResponse.status === 200) {
                    for(let wilaya of wilayas){
                        for(let serverWilaya of wilayasResponse.data){
                            if(wilaya.name?.toLowerCase() === serverWilaya.name.toLowerCase()){
                                wilaya._id = serverWilaya._id;
                            }
                        }
                    }
                    return new ResponseEntity({ code: response.status, data: wilayas });
                }
            }
                return new ResponseEntity({ code: response.status, data: [] });
            } catch (error: any) {
                return new ResponseEntity({ code: error.response.status, message: error.response.message });
            }
        }
}