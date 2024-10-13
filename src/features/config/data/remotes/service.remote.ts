import ResponseEntity from "../../../../core/entities/response.entity";
import ServiceEntity from "../../../../core/entities/service.entity";
import { Api } from "../../../../core/api/api.source";

export default class ServiceRemote {
  async getServices(isDrafted?: boolean): Promise<ResponseEntity> {
    const token = localStorage.getItem("token");
    console.log("get services");

    try {
      var response = await Api.instance
        .getAxios()
        .get(`/dashboard/services?isDrafted=${isDrafted}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status == 200) {
        console.log(response);
        let services: ServiceEntity[] = [];
        services = response.data.docs.map((json: any) =>
          ServiceEntity.fromJson(json)
        );
        return new ResponseEntity({ code: response.status, data: services });
      }
      return new ResponseEntity({ code: response.status, data: [] });
    } catch (error: any) {
      return new ResponseEntity({
        code: error.response.status,
        message: error.response.statusText,
        data: [],
      });
    }
  }
  async createService(service: ServiceEntity): Promise<ResponseEntity> {
    const token = localStorage.getItem("token");
    try {
      var response = await Api.instance
        .getAxios()
        .post(`/dashboard/services`, service, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status == 200) {
        return new ResponseEntity({ code: response.status, data: {} });
      }
      return new ResponseEntity({ code: response.status, data: [] });
    } catch (error: any) {
      return new ResponseEntity({
        code: error.response.status,
        message: error.response.statusText,
        data: [],
      });
    }
  }

  async updateService(service: ServiceEntity): Promise<ResponseEntity> {
    const token = localStorage.getItem("token");
    try {
      var response = await Api.instance.getAxios().put(
        `/dashboard/services/${service._id}`,
        {
          name: service.name,
          isDrafted: service.isDrafted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        let updatedService = ServiceEntity.fromJson(response.data);
        return new ResponseEntity({
          code: response.status,
          data: updatedService,
        });
      }
      return new ResponseEntity({ code: response.status, data: [] });
    } catch (error: any) {
      return new ResponseEntity({
        code: error.response.status,
        message: error.response.statusText,
        data: [],
      });
    }
  }
}
