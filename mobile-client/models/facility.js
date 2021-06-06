class Facility {
    constructor(id, name, customerId, businessType, approvalStatus, approvedBy, address) {
        this.id = id;
        this.name = name;
        this.customerId = customerId;
        this.businessType = businessType;
        this.approvalStatus = approvalStatus;
        this.approvedBy = approvedBy;
        this.address = address;
    }
}

export default Facility;
