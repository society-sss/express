export interface FormDataProps {
    senderName: string;
    senderPhone: string;
    senderAddress: string;
    senderRegion: string;
    packagePhoto: File | null;
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
    receiverRegion: string;
}

export interface DeliveryStateProps {
    formData: FormDataProps;
    loading: boolean;
    error: boolean;
}

export interface OrderProps {
    id: string;
    locationAuserName: string;
    locationAuserPhone: string;
    locationAuserImage: string;
    locationAuserLocation: string;
    locationAuserRegion: string;
    locationBuserName: string;
    locationBuserPhone: string;
    locationBuserLocation: string;
    locationBuserRegion: string;
    status: string;
}

