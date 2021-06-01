export interface Lead {
    id: number;
    name: string;
    mobile: string;
    assigned_user_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface LeadRequest {
    name: string;
    mobile: string;
    assigned_user_id: number;
}

export interface Policy {
    id: number;
    name: string;
    type: string;
    lead_id: number;
    created_at: Date;
    updated_at: Date;
}