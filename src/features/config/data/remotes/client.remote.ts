import ResponseEntity from "../../../../core/entities/response.entity";
import ClientEntity from "../../../../core/entities/client.entity";
import { Api } from "../../../../core/api/api.source";

export default class ClientRemote {
  async getClients(isDrafted: boolean): Promise<ResponseEntity> {
    const token = localStorage.getItem("token");
    try {
      var response = await Api.instance
        .getAxios()
        .get(`/dashboard/clients/filter?type=Wholesaler`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status == 200) {
        let clients: ClientEntity[] = [];
        clients = response.data.map((json: any) => ClientEntity.fromJson(json));
        return new ResponseEntity({ code: response.status, data: clients });
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
  async createClient(client: ClientEntity): Promise<ResponseEntity> {
    const token = localStorage.getItem("token");
    try {
      var response = await Api.instance
        .getAxios()
        .post(`/dashboard/clients`, client, {
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

  async updateClient(client: ClientEntity): Promise<ResponseEntity> {
    const token = localStorage.getItem("token");

    try {
      var response = await Api.instance.getAxios().put(
        `/dashboard/clients/${client._id}`,
        {
          fullName: client.fullName,
          wilaya: client.wilaya?._id,
          commune: client.commune,
          speciality: client.speciality?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        let updatedClient = ClientEntity.fromJson(response.data);
        return new ResponseEntity({
          code: response.status,
          data: updatedClient,
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
