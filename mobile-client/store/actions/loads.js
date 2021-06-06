import Load from "../../models/load";
import EquipmentType from "../../models/equipment-type";
import EquipmentCategory from "../../models/equipment-category";
import Facility from "../../models/facility";
import Stop from "../../models/stop";
import Address from "../../models/address";

export const SET_LOADS = "SET_LOADS";


export const fetchLoads = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://freight-docker.firebaseio.com/loads.json');

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const resData = await response.json();
            let loads = [];

            for (const key in resData) {
                let stops = [];

                for (const i in resData[key].stops) {

                    let address = new Address(
                        resData[key].stops[i].facility.address.addressId,
                        resData[key].stops[i].facility.address.city,
                        resData[key].stops[i].facility.address.cityId,
                        resData[key].stops[i].facility.address.country,
                        resData[key].stops[i].facility.address.postalCode,
                        resData[key].stops[i].facility.address.state,
                        resData[key].stops[i].facility.address.type,
                    );

                    let facility = new Facility(
                        resData[key].stops[i].facility.id,
                        resData[key].stops[i].facility.name,
                        resData[key].stops[i].facility.customerId,
                        resData[key].stops[i].facility.businessType,
                        resData[key].stops[i].facility.approvalStatus,
                        resData[key].stops[i].facility.approvedBy,
                        address
                    );

                    stops.push(
                        new Stop(
                            resData[key].stops[i].stopId,
                            resData[key].stops[i].stopType,
                            resData[key].stops[i].sequenceNumber,
                            resData[key].stops[i].idealOperationalHrs,
                            resData[key].stops[i].expectedFromDateUTC,
                            resData[key].stops[i].expectedToDateUTC,
                            resData[key].stops[i].actualInDateTimeUTC,
                            resData[key].stops[i].actualOutDateTimeUTC,
                            facility
                        )
                    );
                }

                let equipmentType = new EquipmentType(
                    resData[key].equipmentType.equipmentCategoryId,
                    resData[key].equipmentType.equipmentTypeId,
                    resData[key].equipmentType.description
                );

                let equipmentCategory = new EquipmentCategory(
                    resData[key].equipmentCategory.equipmentCategoryId,
                    resData[key].equipmentCategory.description
                );

                loads.push(
                    new Load(
                        resData[key].id,
                        resData[key].mode,
                        resData[key].overDimentions,
                        resData[key].progress,
                        resData[key].totalDistance,
                        stops,
                        equipmentType,
                        equipmentCategory
                    )
                );
            }                

            dispatch({ type: SET_LOADS, loads: loads });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};
