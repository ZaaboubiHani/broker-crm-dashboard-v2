import WilayaModel from "../models/wilaya.model";

export default abstract class WilayaRepository{
    abstract getAllWilayas():Promise<WilayaModel[]>;
}