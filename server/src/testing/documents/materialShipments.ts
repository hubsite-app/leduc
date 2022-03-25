import { MaterialShipment, MaterialShipmentDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededMaterialShipments {
  jobsite_1_base_1_1_shipment_1: MaterialShipmentDocument;
  jobsite_2_base_1_1_shipment_1: MaterialShipmentDocument;
}

const createMaterialShipments = () => {
  return new Promise<SeededMaterialShipments>(async (resolve, reject) => {
    try {
      const jobsite_1_base_1_1_shipment_1 = new MaterialShipment({
        _id: _ids.materialShipments.jobsite_1_base_1_1_shipment_1._id,
        shipmentType: "130MA",
        quantity: 50,
        unit: "m2",
        supplier: "Burnco",
        vehicle: _ids.vehicles.gravel_truck_1._id,
      });

      const jobsite_2_base_1_1_shipment_1 = new MaterialShipment({
        _ids: _ids.materialShipments.jobsite_2_base_1_1_shipment_1._id,
        jobsiteMaterial: _ids.jobsiteMaterials.jobsite_2_material_1._id,
        quantity: 200,
        vehicleObject: {
          source: "Burnco",
          vehicleCode: "13",
          vehicleType: "Tandem",
        },
      });

      const materialShipments = {
        jobsite_1_base_1_1_shipment_1,
        jobsite_2_base_1_1_shipment_1,
      };

      for (let i = 0; i < Object.values(materialShipments).length; i++) {
        await Object.values(materialShipments)[i].save();
      }

      resolve(materialShipments);
    } catch (e) {
      reject(e);
    }
  });
};

export default createMaterialShipments;
