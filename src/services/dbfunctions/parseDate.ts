export function parseDate(dateString: any) {
    try {
        const parts = dateString.split("/")
        if(parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // Os meses em JavaScript são base 0 (janeiro é 0)
            const year = parseInt(parts[2], 10);

            return new Date(year, month, day);
        } else {
            throw new Error('Formato de data inválido. Use dd/MM/yyyy');
        }
    }catch (e){
        console.log(` [ ERROR ] - error parse date function...`)
        return null
    }
}