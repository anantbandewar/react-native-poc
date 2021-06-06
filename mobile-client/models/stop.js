class Stop {
    constructor(stopId, stopType, sequenceNumber, idealOperationalHrs, expectedFromDateUTC, expectedToDateUTC, actualInDateTimeUTC, actualOutDateTimeUTC, facility) {
        this.stopId = stopId;
        this.stopType = stopType;
        this.sequenceNumber = sequenceNumber;
        this.idealOperationalHrs = idealOperationalHrs;
        this.expectedFromDateUTC = expectedFromDateUTC;
        this.expectedToDateUTC = expectedToDateUTC;
        this.actualInDateTimeUTC = actualInDateTimeUTC;
        this.actualOutDateTimeUTC = actualOutDateTimeUTC;
        this.facility = facility;
    }
}

export default Stop;
