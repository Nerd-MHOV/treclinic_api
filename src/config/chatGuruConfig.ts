export default {
    key: process.env.CG_KEY,
    account_id: process.env.CG_ACCOUNT_ID,
    phone_id: process.env.CG_PHONE_ID,
    base_url: process.env.CG_BASE_URL || `https://s12.chatguru.app/api/v1`,
};