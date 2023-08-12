export interface Opportunity {
    total: number,
    has_more: Boolean,
    deals: Deal[]
}

export interface Deal {
    _id: string;
    id: string;
    name: string;
    amount_montly: number;
    amount_unique: number;
    amount_total: number;
    prediction_date: string | null;
    markup: string;
    last_activity_at: string | null;
    interactions: number;
    markup_last_activities: string | null;
    created_at: string;
    updated_at: string;
    rating: number;
    markup_created: string;
    last_activity_content: string | null;
    user_changed: boolean;
    hold: string | null;
    win: boolean | null;
    closed_at: string | null;
    stop_time_limit: {
        expiration_date_time: string;
        expired: boolean;
        expired_days: number;
    };
    user: {
        _id: string;
        id: string;
        name: string;
        nickname: string;
        email: string;
    };
    deal_stage: {
        _id: string;
        id: string;
        name: string;
        nickname: string;
        created_at: string;
        updated_at: string;
    };
    next_task: {
        _id: string;
        id: string;
        date: string;
        subject: string;
        type: string;
        hour: string;
    };
    contacts: {
        name: string;
        title: string;
        notes: string | null;
        facebook: string | null;
        linkedin: string | null;
        skype: string | null;
        birthday: string | null;
        emails: string[];
        phones: {
            phone: string;
            type: string;
        }[];
    }[];
    deal_custom_fields: {
        value: string | number | null;
        created_at: string | null;
        updated_at: string | null;
        custom_field_id: string;
        custom_field: {
            _id: string;
            id: string;
            for: string;
            label: string;
            order: number;
            allow_new: boolean;
            required: boolean;
            type: string;
            unique: boolean;
            visible: boolean;
            created_at: string;
            updated_at: string;
        };
    }[];
    deal_products: any[]; // Assuming it's an array of some specific type, you can update this as needed.
}


export interface OpportunityParams {
    page?: string;
    limit?: string | number;
    order?: string;
    direction?: string;
    name?: string;
    win?: string;
    user_id?: string;
    closed_at?: string;
    closed_at_period?: string;
    created_at_period?: string;
    prediction_date_period?: string;
    start_date?: string;
    end_date?: string;
    campaign_id?: string;
    deal_stage_id?: string;
    deal_lost_reason_id?: string;
    deal_pipeline_id?: string;
    organization?: string;
    hold?: string;
    product_presence?: string;
}


export interface Email {
    _id: string;
    created_at: string | null;
    email: string;
    updated_at: string | null;
}

export interface CustomField {
    _id: string;
    created_at: string | null;
    custom_field_id: string;
    updated_at: string | null;
    value: string | null;
}

export interface Phone {
    phone: string;
    type: string | null;
    whatsapp: boolean;
    whatsapp_url_web: string;
    whatsapp_full_internacional: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface Contact {
    id: string;
    _id: string;
    name: string;
    title: string | null;
    notes: string | null;
    emails: Email[];
    birthday: string | null;
    facebook: string | null;
    linkedin: string | null;
    skype: string | null;
    organization_id: string | null;
    contact_custom_fields: CustomField[];
    created_at: string;
    updated_at: string;
    phones: Phone[];
    legal_bases: string[];
}

export interface UpdateDealParams {
    deal?: {
        name?: string,
        rating?: number,
        user_id?: string,
        deal_custom_fields?:  {
            custom_field_id: string,
            value: string | string[],
        }[],
    }
    deal_products?: DealProducts[]
}

export interface UpdateDealResponse {

}

export interface DealProducts {
    amount: number;
    base_price: number;
    description: string;
    discount_type: string;
    name: string;
    price: number;
    recurrence: string;
    total: number;
}

export interface UpdateContactParams {
    contact: {
        contact_custom_fields?: {
            custom_field_id: string,
            value: string | string [] | null,
        }[],
        deal_ids?: string[],
        emails?: {email: string}[]
        phones?: {phone: string}[]
    }
}

export interface UpdateContactResponse {

}

export interface GetContactResponse {
    total: number,
    has_more: Boolean,
    contacts: Contact[]
}

export interface CreateTaskParams {
    task: {
        date: string,
        deal_id: string,
        hour: string,
        notes: string,
        subject: string,
        type: string,
    }
    user_ids?: string[]
}

export interface CreateProductParams {
    amount: number,
    price: number,
    product_id: string,
}