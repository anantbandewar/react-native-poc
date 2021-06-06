import Load from "../../models/load";
import EquipmentType from "../../models/equipment-type";
import EquipmentCategory from "../../models/equipment-category";
import Facility from "../../models/facility";
import Stop from "../../models/stop";
import Address from "../../models/address";

export const SET_LOAD = "SET_LOAD";


export const fetchLoad = (loadId) => {
    return async dispatch => {
        try {
            const response = await fetch('https://freight-docker.firebaseio.com/load.json');

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const jsonResponse = await response.json();

            let load = null;
            let stops = [];

            for (const i in jsonResponse.stops) {

                let address = new Address(
                    jsonResponse.stops[i].facility.address.addressId,
                    jsonResponse.stops[i].facility.address.city,
                    jsonResponse.stops[i].facility.address.cityId,
                    jsonResponse.stops[i].facility.address.country,
                    jsonResponse.stops[i].facility.address.postalCode,
                    jsonResponse.stops[i].facility.address.state,
                    jsonResponse.stops[i].facility.address.type,
                );

                let facility = new Facility(
                    jsonResponse.stops[i].facility.id,
                    jsonResponse.stops[i].facility.name,
                    jsonResponse.stops[i].facility.customerId,
                    jsonResponse.stops[i].facility.businessType,
                    jsonResponse.stops[i].facility.approvalStatus,
                    jsonResponse.stops[i].facility.approvedBy,
                    address
                );

                stops.push(
                    new Stop(
                        jsonResponse.stops[i].stopId,
                        jsonResponse.stops[i].stopType,
                        jsonResponse.stops[i].sequenceNumber,
                        jsonResponse.stops[i].idealOperationalHrs,
                        jsonResponse.stops[i].expectedFromDateUTC,
                        jsonResponse.stops[i].expectedToDateUTC,
                        jsonResponse.stops[i].actualInDateTimeUTC,
                        jsonResponse.stops[i].actualOutDateTimeUTC,
                        facility
                    )
                );
            }

            let equipmentType = new EquipmentType(
                jsonResponse.equipmentType.equipmentCategoryId,
                jsonResponse.equipmentType.equipmentTypeId,
                jsonResponse.equipmentType.description
            );

            let equipmentCategory = new EquipmentCategory(
                jsonResponse.equipmentCategory.equipmentCategoryId,
                jsonResponse.equipmentCategory.description
            );

            load = new Load(
                jsonResponse.id,
                jsonResponse.mode,
                jsonResponse.overDimentions,
                jsonResponse.progress,
                jsonResponse.totalDistance,
                stops,
                equipmentType,
                equipmentCategory
            );
            dispatch({ type: SET_LOAD, selectedLoad: load });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};