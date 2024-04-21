import { Api } from "../../../../core/api/api.source";
import ResponseEntity from "../../../../core/entities/response.entity";

export default class FileRemote {
    async uploadFile(file: File): Promise<ResponseEntity> {
        const token = localStorage.getItem('token');
        try {
            const formData = new FormData();
            formData.append('image', file);
            var response = await Api.instance.getAxios().post(`/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            if (response.status == 200) {

                return new ResponseEntity({ code: response.status, data: response.data.file._id });
            }
            return new ResponseEntity({ code: response.status, data: [] });
        } catch (error: any) {
            return new ResponseEntity({ code: error.response.status, message: error.response.statusText, data: [] });
        }
    }
}
