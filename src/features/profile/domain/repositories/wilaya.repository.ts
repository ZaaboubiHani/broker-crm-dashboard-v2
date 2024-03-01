import WilayaModel from "../models/wilaya.model";

export default abstract class WilayaRespository{
    abstract getAllWilayas():Promise<WilayaModel[]>;
}