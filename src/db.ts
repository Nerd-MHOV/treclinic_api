import {Client, Pool} from "pg";

export const connectPG = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            // @ts-ignore
            port: process.env.PGPORT
        })

        await client.connect()
        return client;
    } catch (error) {
        console.log(` [ ERROR ] connection DB....`)
    }
}

export const end_connectionPG = async (client: Client | undefined) => {
    if(client) await client.end()
}

export const getAttendances = async () => {
    try {
        const client = await connectPG();
        if (!client) throw new Error (`Erro DB connection`)
        return await client
            .query('SELECT * FROM new_attendances ORDER BY updated_at DESC LIMIT 200')
            .then(res => res)
            .finally(async () => {
                await end_connectionPG(client);
                return null
            })
    } catch (e) {
        console.log(` [ ERROR ]: getAttendance error ....`)
    }
}

export const getFutureAttendances = async () => {
    try{
        const client = await connectPG();
        if (!client) throw new Error (`Erro DB connection`)
        const today = new Date().toISOString()
        return await client
            .query(`
            SELECT na.*,
                   p.name as patient_name, p.cpf, p.rg, p.born, p.jobrole, p.civil_status, p.email, p.contact_cellphone,
                   p.contact_phone_home, p.contact_phone_work, p.naturalness, p.address_cep, p.address_address,
                   p.address_number, p.address_complement, p.address_district, p.address_city,, p.address_state, p.address_country
                   ae.name as agenda_name, 
                   ui.name
            FROM new_attendances na 
            JOIN patients p ON na.patient_id = p.id 
            JOIN agenda_events ae ON na.event_id = ae.id
            JOIN users ui ON na.user_id = ui.id
            WHERE na.start_date > '${today}'
            AND na.user_id != 52276
            AND  na.user_id != 89207
            AND na.user_id != 44476
            AND na.USER_ID != 44475
            AND na.deleted_at IS NULL
            ORDER BY na.start_date ASC
            `)
            .then(res => {

                console.log('Futures attendances: ', res.rowCount);
                return res
            })
            .finally(async () => {
                await end_connectionPG(client);
                return null
            })

    } catch (e) {
        console.log(` [ ERROR ] getFutureAttendances error....`)
    }
}

export const getAttendancesAndSeparate = async () => {
    try{
        const attendances = await getFutureAttendances();
        if(!attendances) throw new Error(`Attendances undefined`)
        const attendances_surgery = attendances.rows.filter(row => row.agenda_name.includes("CIRURGIA"))
        const attendances_without_surgery = attendances.rows.filter(row => !row.agenda_name.includes("CIRURGIA"))
        const attendances_without_surgery_dermatology = attendances_without_surgery.filter(row => row.user_id === 42419 || row.user_id === 77511)
        const attendances_without_surgery_without_dermatology =  attendances_without_surgery.filter(row => row.user_id !== 42419 && row.user_id !== 77511)
        console.log('To dermatology: ', attendances_without_surgery_dermatology.length)
        console.log('To not dermatology: ', attendances_without_surgery_without_dermatology.length)
        return {
            attendances_without_surgery,
            to_dermatology: attendances_without_surgery_dermatology,
            not_dermatology: attendances_without_surgery_without_dermatology
        }
    } catch (e) {
        console.log(' [ ERROR ] get attendances error....')
    }

}

export const getPatientPK = async (pk: string | number) => {
    try {
        console.log('creating client..')
        const client = await connectPG();
        if (!client) throw new Error (`Erro DB connection`)
        console.log('making query..')

        return await client.query(`SELECT * FROM patients WHERE id = '${pk}' `)
            .then(response => {
                console.log (response.rowCount);
                return response
            })
            .finally(async () => {
                await end_connectionPG(client);
                return null
            })

    } catch (e) {
        console.log(` [ ERROR ] - erro to get patient to pk`, pk)
        return null
    }
}

export const getAttendancePk = async (pk: string | number) => {
    try {
        const today = new Date().toISOString()
        const client = await connectPG();
        if (!client) throw new Error (`Erro DB connection`)
        return await client.query(`
            SELECT na.*, ui.name as medic_name, ae.name as agenda_name
            FROM new_attendances na 
            JOIN users ui ON na.user_id = ui.id
            JOIN agenda_events ae ON na.event_id = ae.id
            WHERE na.id = '${pk}' AND na.start_date > '${today}'`)
            .then(response => {
                return response
            })
            .finally(async () => {
                await end_connectionPG(client);
                return null
            })
    } catch (e) {
        console.log(` [ ERROR ] - erro to get patient to pk`)
        return null
    }
}
export const saveLogAttendanceRoutine = async (attendance_id: number, patient_id: number, rd_id: string) => {
    try{
        const client = await connectPG();
        if (!client) throw new Error (`Erro DB connection`)
        return await client
            .query(`
                INSERT INTO rd_routines_attendance (attendance_id, patient_id, rd_id)
                VALUES ('${attendance_id}','${patient_id}', '${rd_id}');
            `)
            .then(response => {
                return response
            })
            .finally(async () => {
                await end_connectionPG(client);
                return null
            })
    } catch (e) {
        console.log(` [ ERROR ] Save in db rd_routines_attendance....`)
    }
}